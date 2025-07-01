"use client";

import React, { useState, useCallback } from "react";
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Node,
  Edge,
  Connection,
  ReactFlowInstance,
  Viewport,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

const flowKey = "example-flow";

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes: Node[] = [
  { id: "1", data: { label: "Node 1" }, position: { x: 0, y: -50 } },
  { id: "2", data: { label: "Node 2" }, position: { x: 0, y: 50 } },
];

const initialEdges: Edge[] = [{ id: "e1-2", source: "1", target: "2" }];

const SaveRestore: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const { setViewport } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flowStr = localStorage.getItem(flowKey);
      if (!flowStr) return;

      try {
        const flow = JSON.parse(flowStr);
        const { x = 0, y = 0, zoom = 1 }: Viewport = flow.viewport || {};

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      } catch (err) {
        console.error("Failed to restore flow from localStorage", err);
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onAdd = useCallback(() => {
    const newNode: Node = {
      id: getNodeId(),
      data: { label: "Added node" },
      position: {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={(instance) => {
        console.log("✅ Initialized", instance);
        setRfInstance(instance);
      }}
      fitView
      fitViewOptions={{ padding: 2 }}
    >
      <Background />
      <Panel position="top-right">
        <button className="xy-theme__button" onClick={onSave}>
          save
        </button>
        <button className="xy-theme__button" onClick={onRestore}>
          restore
        </button>
        <button className="xy-theme__button" onClick={onAdd}>
          add node
        </button>
      </Panel>
    </ReactFlow>
  );
};

export default () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <ReactFlowProvider>
      <SaveRestore />
    </ReactFlowProvider>
  </div>
);
