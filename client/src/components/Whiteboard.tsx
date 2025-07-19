"use client";
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import {
  ReactFlow,
  Node,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  ReactFlowInstance,
  useReactFlow,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "@/components/sidebar/Sidebar";
import TextNode from "@/components/text-node/TextNode";
import ShapeNode from "@/components/shape-node/ShapeNode";
import { useSaveWhiteboardState } from "@/hooks/api/whiteboard.save.state.api";
import { useRestoreWhiteboard } from "@/hooks/api/whiteboard.restore.state.api";
import useInterval from "@/hooks/useInterval";
import MenuBar from "./menu-bar/MenuBar";
import CollaborationTopbar from "@/components/collaboration-topbar/CollaborationTopbar";
import {
  useAmIOwner,
  usePublishWhiteboardEvents,
  useSubscribeToWhiteboardEvents,
} from "@/hooks/api/whiteboard.api";
import CustomCursor from "@/components/custom-cursor/CustomCursor";
import { useGetMe } from "@/hooks/api/account.api";
import { WhiteboardEvent } from "@/api/realtime/dtos/WhiteboardEvent";
import { z } from "zod";

const nodeTypes = {
  text: TextNode,
  shapeNode: ShapeNode,
};

interface WhiteboardProps {
  whiteboardId: number;
}

interface Cursor {
  id: number;
  position?: { x: number; y: number };
  username: string;
}

export default function Whiteboard({ whiteboardId }: WhiteboardProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  type ActivityMap = Record<string, boolean>;
  const [userActivity, setUserActivity] = useState<ActivityMap>({});
  const userTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const { getNodes, getEdges, getViewport } = useReactFlow();

  const { data: user } = useGetMe();

  const { data: isOwner } = useAmIOwner(whiteboardId, user?.id);

  const [dragStart, setDragStart] = useState<{
    cursor: { x: number; y: number };
    node: { x: number; y: number };
  } | null>(null);

  useEffect(() => {
    if (user && user.id && user.username)
      setCursor({
        id: user.id,
        username: user.username,
        position: undefined,
      });
  }, [user]);

  const [cursor, setCursor] = useState<Cursor>();

  const [allCursors, setAllCursors] = useState<Cursor[]>([]);

  // whiteboard logic
  const { saveWhiteboardState } = useSaveWhiteboardState({
    whiteboardId,
    nodes: getNodes(),
    edges: getEdges(),
    viewport: getViewport(),
  });

  useInterval(saveWhiteboardState, 1000, isOwner);

  useRestoreWhiteboard({
    whiteboardId,
  });

  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, rfInstance],
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  // custom cursor logic
  const prevCursorRef = useRef<{ x: number; y: number } | null>(null);

  const onMouseMove: MouseEventHandler = (event) => {
    if (!rfInstance) return;

    const position = rfInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const prev = prevCursorRef.current;
    if (!prev || prev.x !== position.x || prev.y !== position.y) {
      prevCursorRef.current = position;
      setCursor((prev) => (prev ? { ...prev, position } : prev));
    }
  };

  const onMove = () => {
    if (cursor && cursor.position) {
      const x = cursor.position.x;
      const y = cursor.position.y;

      const position = { x, y };

      setCursor((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          position,
        };
      });
    }
  };

  const handleNodeDragStart = (event: React.MouseEvent, node: Node) => {
    if (!rfInstance) return;
    const flowPos = rfInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setDragStart({
      cursor: { x: flowPos.x, y: flowPos.y },
      node: { x: node.position.x, y: node.position.y },
    });
  };

  const handleNodeDrag = (event: React.MouseEvent, node: Node) => {
    if (!dragStart) return;

    const dx = node.position.x - dragStart.node.x;
    const dy = node.position.y - dragStart.node.y;

    const x = dragStart.cursor.x + dx;
    const y = dragStart.cursor.y + dy;

    setCursor((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        position: { x, y },
      };
    });
  };

  const handleNodeDragStop = () => {
    setDragStart(null);
  };

  const handleMouseLeave = () => {
    if (cursor)
      setCursor((prev) => {
        if (!prev) return prev;

        return { ...prev, position: undefined };
      });
  };

  const renderedCursors = useMemo(() => {
    if (!rfInstance) return [];

    const viewport = rfInstance.getViewport();

    return allCursors
      .filter((cursor) => cursor.position)
      .map((cursor) => {
        const pos = cursor.position!;
        const position = {
          x: pos.x * viewport.zoom + viewport.x,
          y: pos.y * viewport.zoom + viewport.y,
        };

        return (
          <CustomCursor
            key={cursor.id}
            username={cursor.username}
            position={position}
            visible
          />
        );
      });
  }, [allCursors, rfInstance]);

  // Realtime synchronisation logic
  const handleWhiteboardEvent = useCallback(
    (event: z.infer<typeof WhiteboardEvent>) => {
      if (event.type === "mousePosition") {
        const { id, username, position } = event.payload;

        if (id === user?.id) return; // skip current user
        if (!position) return;

        setUserActivity((prev) => ({ ...prev, [username]: true }));

        if (userTimeouts.current[username]) {
          clearTimeout(userTimeouts.current[username]);
        }

        userTimeouts.current[username] = setTimeout(() => {
          setUserActivity((prev) => ({ ...prev, [username]: false }));
        }, 10000);

        setAllCursors((prevCursors) => {
          const otherCursors = prevCursors.filter((c) => c.id !== id);
          return [...otherCursors, { id, username, position }];
        });
      }

      if (isOwner) {
        return;
      }

      if (event.type === "nodePosition") {
        const incomingNodes = event.payload;

        setNodes((prevNodes) => {
          const incomingMap = new Map(incomingNodes.map((n) => [n.id, n]));

          const updatedNodes = incomingNodes.map((node) => {
            const incoming = incomingMap.get(node.id);
            if (!incoming) return node;

            return {
              id: incoming.id,
              type: incoming.type,
              position: incoming.position,
              width: incoming.width,
              height: incoming.height,
              measured: incoming.measured,
              selected: incoming.selected,
              dragging: incoming.dragging,
              data: {
                shapeType: incoming.data.shapeType,
                label: incoming.data.label,
                nodeProperties: incoming.data.nodeProperties,
              },
            };
          });

          const newNodes = incomingNodes.filter(
            (incoming) => !prevNodes.some((n) => n.id === incoming.id),
          );

          return [...updatedNodes, ...newNodes];
        });
      }

      if (event.type === "edgePosition") {
        const incomingEdges = event.payload;

        setEdges((prevEdges) => {
          const incomingMap = new Map(incomingEdges.map((e) => [e.id, e]));

          const updatedEdges = incomingEdges.map((edge) => {
            const incoming = incomingMap.get(edge.id);
            if (!incoming) return edge;

            return {
              id: incoming.id,
              source: incoming.source,
              sourceHandle: incoming.sourceHandle,
              target: incoming.target,
              targetHandle: incoming.targetHandle,
            };
          });

          const newEdges = incomingEdges.filter(
            (incoming) => !prevEdges.some((e) => e.id === incoming.id),
          );

          return [...updatedEdges, ...newEdges];
        });
      }
    },
    [user?.id, isOwner],
  );

  useSubscribeToWhiteboardEvents(whiteboardId, handleWhiteboardEvent);
  const publishEvent = usePublishWhiteboardEvents(whiteboardId);

  // Publish cursor events
  const latestCursorPositionRef = useRef(cursor);
  const lastCursorPublishedPositionRef = useRef<typeof cursor | null>(null);

  useEffect(() => {
    latestCursorPositionRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = latestCursorPositionRef.current;
      const last = lastCursorPublishedPositionRef.current;

      const hasChanged =
        !last ||
        current?.position?.x !== last.position?.x ||
        current?.position?.y !== last.position?.y;

      if (hasChanged) {
        lastCursorPublishedPositionRef.current = current;
        publishEvent(
          JSON.stringify({
            type: "mousePosition",
            payload: current,
          }),
        );
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Publish node events
  const latestNodesPositionRef = useRef<Node[]>(nodes);
  const lastNodesPublishedPositionRef = useRef<Node[] | null>(null);

  useEffect(() => {
    latestNodesPositionRef.current = nodes;
  }, [nodes]);

  useEffect(() => {
    if (!isOwner) return;

    const interval = setInterval(() => {
      const current = latestNodesPositionRef.current;
      const last = lastNodesPublishedPositionRef.current;

      const hasChanged =
        !last || JSON.stringify(current) !== JSON.stringify(last);

      if (hasChanged) {
        lastNodesPublishedPositionRef.current = current;
        publishEvent(
          JSON.stringify({
            type: "nodePosition",
            payload: nodes,
          }),
        );
      }
    }, 50);

    return () => clearInterval(interval);
  });

  // Publish edge events
  const latestEdgesPositionRef = useRef<Edge[]>(edges);
  const lastEdgesPublishedPositionRef = useRef<Edge[] | null>(null);

  useEffect(() => {
    latestEdgesPositionRef.current = edges;
  }, [edges]);

  const haveEdgesChanged = (a: Edge[], b: Edge[]) => {
    if (a.length !== b.length) return true;

    const byId = new Map(b.map((edge) => [edge.id, edge]));

    return a.some((edge) => {
      const prev = byId.get(edge.id);
      if (!prev) return true;
      return edge.source !== prev.source || edge.target !== prev.target;
    });
  };

  useEffect(() => {
    if (!isOwner) return;

    const interval = setInterval(() => {
      const current = latestEdgesPositionRef.current;
      const last = lastEdgesPublishedPositionRef.current;

      const hasChanged = !last || haveEdgesChanged(current, last);
      if (hasChanged) {
        lastEdgesPublishedPositionRef.current = current;
        publishEvent(
          JSON.stringify({
            type: "edgePosition",
            payload: edges,
          }),
        );
      }
    }, 50);

    return () => clearInterval(interval);
  });

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-0 right-0 left-0 z-20 mx-4 my-6">
        <div className="flex flex-row justify-between">
          <MenuBar whiteboardId={whiteboardId} isEditable={isOwner} />
          <CollaborationTopbar
            whiteboardId={whiteboardId}
            userActivity={userActivity}
            isSharable={isOwner}
          />
        </div>
      </div>
      {isOwner && (
        <div className="fixed top-1/2 left-4 z-10 -translate-y-1/2">
          <Sidebar onAddNode={handleAddNode} />
        </div>
      )}
      <ReactFlow
        nodesDraggable={isOwner}
        nodesConnectable={isOwner}
        nodesFocusable={isOwner}
        elementsSelectable={isOwner}
        nodes={nodes}
        edges={edges}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMove={onMove}
        onNodeDragStart={handleNodeDragStart}
        onNodeDrag={handleNodeDrag}
        onNodeDragStop={handleNodeDragStop}
        onMouseMove={onMouseMove}
        onMouseLeave={handleMouseLeave}
        onInit={(instance) => {
          setRfInstance(instance);
        }}
        nodeTypes={nodeTypes}
      >
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
          {renderedCursors}
        </div>
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
