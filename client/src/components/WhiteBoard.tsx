import React, { useCallback, useState } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "@/components/sidebar/Sidebar";
import TextNode from "@/components/text-node/TextNode";
import ShapeNode from "@/components/shape-node/ShapeNode";
import { AIActionDropdown } from "./aiActionDropdown/aiActionDropdown";
import SpinnerDemo from "./spinner/Lucidespinner";
import { useTextRephrase, useTextCompletion, useTextSummarization } from "@/hooks/api/llm.api";
import { TextResponse } from "@/api/genai/generated";

const nodeTypes = {
  text: TextNode,
  shapeNode: ShapeNode,
};

export default function WhiteBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: rephraseText } = useTextRephrase();
  const { mutateAsync: completeText } = useTextCompletion();
  const { mutateAsync: summarizedText } = useTextSummarization();


  const handleAddNode = useCallback(
    (newNode: Node) => {
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes],
  );

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const handleNodesChange = useCallback((changes: any) => {
    onNodesChange(changes);
    setSelectedNodes(nodes.filter(node => node.selected));
  }, [nodes, onNodesChange]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-1/2 left-4 z-10 -translate-y-1/2">
        <Sidebar onAddNode={handleAddNode} />
      </div>
    {isLoading && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <SpinnerDemo />
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
