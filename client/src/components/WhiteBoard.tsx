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
import { useRephraseTextMutation } from "@/hooks/api/llm.api";

const nodeTypes = {
  text: TextNode,
  shapeNode: ShapeNode,
};

export default function WhiteBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]); 
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: rephraseText } = useRephraseTextMutation();

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
  
    setIsLoading(true);
  
    try {
      let data: { [key: string]: string } = {};
  
      if (action === 'rephrase') {
        data = await rephraseText([currentText]);
      } else {
        throw new Error(`Action "${action}" not supported via hook yet.`);
      }
  
      const llmResponse = data?.llm_response || Object.values(data)[0] || '';
  
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeToUpdate.id
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: (() => {
                    switch (action) {
                      case 'rephrase':
                        return llmResponse;
                      default:
                        return currentText;
                    }
                  })(),
                },
              }
            : node
        )
      );
    } catch (error) {
      console.error("Error calling LLM service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed top-1/2 left-4 z-10 -translate-y-1/2">
        <Sidebar onAddNode={handleAddNode} />
      </div>
      <AIActionDropdown 
        selectedNodes={selectedNodes}
        onAIAction={handleAIAction}
      />

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
