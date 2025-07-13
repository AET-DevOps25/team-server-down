"use client";
import React, {useCallback, useEffect, useRef, useState} from "react";
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

const nodeTypes = {
  text: TextNode,
  shapeNode: ShapeNode,
};

interface WhiteboardProps {
  whiteboardId: number;
}

export default function Whiteboard({ whiteboardId }: WhiteboardProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { getNodes, getEdges, getViewport } = useReactFlow();

  const { saveWhiteboardState } = useSaveWhiteboardState({
    whiteboardId,
    nodes: getNodes(),
    edges: getEdges(),
    viewport: getViewport(),
  });

  useEffect(() => {
    const mouseCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseCursor);
    return () => window.removeEventListener("mousemove", mouseCursor);
  }, []);

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

  useSubscribeToWhiteboardEvents();
  const publishEvent = usePublishWhiteboardEvents();

  const latestPositionRef = useRef(mousePosition);

  useEffect(() => {
    latestPositionRef.current = mousePosition;
  }, [mousePosition]);

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
        onInit={(instance) => {
          setRfInstance(instance);
        }}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
