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

const nodeTypes = {
  text: TextNode,
  shapeNode: ShapeNode,
};

export default function WhiteBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);

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

  const handleAIAction = async (action: 'complete' | 'summarize' | 'rephrase') => {
    const textNodes = selectedNodes.filter(node => node.type === 'text');
    if (textNodes.length === 0) return;
  
    const nodeToUpdate = textNodes[0];
    const currentText = nodeToUpdate.data.label as string;
  
    const endpointMap: Record<typeof action, string> = {
      complete: 'completion',
      summarize: 'summarization',
      rephrase: 'rephrase'
    };
  
    const endpoint = endpointMap[action];
    const url = `http://localhost:8080/${endpoint}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_text: [currentText] }),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeToUpdate.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label:
                    action === 'complete'
                      ? `${currentText} ${data.llm_response || ''}`
                      : data.llm_response || ''
                }
              }
            : node
        )
      );
    } catch (error) {
      console.error("Error calling LLM service:", error);
    }
  };
  
  


  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 ">
        <Sidebar onAddNode={handleAddNode} />
      </div>

      <AIActionDropdown 
        selectedNodes={selectedNodes}
        onAIAction={handleAIAction}
      />

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
