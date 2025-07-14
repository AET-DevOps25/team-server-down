"use client";
import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
  useRef,
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
  usePublishWhiteboardEvents,
  useSubscribeToWhiteboardEvents,
} from "@/hooks/api/whiteboard.api";
import CustomCursor from "@/components/custom-cursor/CustomCursor";
import { useGetMe } from "@/hooks/api/account.api";
import { User } from "@/api/main/generated";

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
  firstname: string;
  lastname: string;
}

export default function Whiteboard({ whiteboardId }: WhiteboardProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);

  const { getNodes, getEdges, getViewport } = useReactFlow();

  const { data: user } = useGetMe();

  const fallbackId = Math.random();

  const [dragStart, setDragStart] = useState<{
    cursor: { x: number; y: number };
    node: { x: number; y: number };
  } | null>(null);

  const [cursor, setCursor] = useState<Cursor>({
    id: user?.id ?? fallbackId,
    username: user?.username ?? "",
    firstname: user?.firstName ?? "",
    lastname: user?.lastName ?? "",
    position: undefined,
  });

  const [allCursors, setAllCursors] = useState<Cursor[]>([]);

  // whiteboard logic

  const { saveWhiteboardState } = useSaveWhiteboardState({
    whiteboardId,
    nodes: getNodes(),
    edges: getEdges(),
    viewport: getViewport(),
  });

  useInterval(saveWhiteboardState, 1000);

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

  // cursor render logic

  const onMouseMove: MouseEventHandler = (event) => {
    if (!rfInstance) return;

    const position = rfInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    setCursor((prev) => ({
      ...prev,
      position,
    }));
  };

  const onMove = () => {
    if (cursor.position) {
      const x = cursor.position.x;
      const y = cursor.position.y;

      const position = { x, y };

      setCursor((prev) => ({
        ...prev,
        position,
      }));
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

    setCursor((prev) => ({
      ...prev,
      position: { x, y },
    }));
  };

  const handleNodeDragStop = () => {
    setDragStart(null);
  };

  const handleMouseLeave = () => {
    setCursor((prev) => ({
      ...prev,
      position: undefined,
    }));
  };

  useEffect(() => {
    if (!cursor.id) return;
    setAllCursors((prevCursors) => {
      const otherCursors = prevCursors.filter((c) => c.id !== cursor.id);
      return [...otherCursors, cursor];
    });
  }, [cursor]);

  function renderCursors(): ReactNode[] {
    if (!rfInstance) return [];

    const viewport = rfInstance.getViewport();

    return allCursors
      .filter((cursor) => cursor.position)
      .map((cursor) => {
        const position = {
          x: cursor.position!.x * viewport.zoom + viewport.x,
          y: cursor.position!.y * viewport.zoom + viewport.y,
        };
        return (
          <CustomCursor
            key={cursor.id}
            username={cursor.username}
            firstname={cursor.firstname}
            lastname={cursor.lastname}
            position={position}
            visible={true}
          />
        );
      });
  }

    useSubscribeToWhiteboardEvents(whiteboardId);
    const publishEvent = usePublishWhiteboardEvents(whiteboardId);

    const latestPositionRef = useRef(cursor);

    useEffect(() => {
        latestPositionRef.current = cursor;
    }, [cursor]);

    useEffect(() => {
        const interval = setInterval(() => {
            publishEvent(JSON.stringify({
                type: "mousePosition",
                payload: latestPositionRef.current,
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-0 right-0 left-0 z-20 mx-4 my-6 ">
        <div className="flex flex-row justify-between">
          <MenuBar whiteboardId={whiteboardId} />
          <CollaborationTopbar whiteboardId={whiteboardId} />
        </div>
      </div>

      <div className="fixed top-1/2 left-4 z-10 -translate-y-1/2">
        <Sidebar onAddNode={handleAddNode} />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
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
        fitView
      >
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
          {renderCursors()}
        </div>
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
