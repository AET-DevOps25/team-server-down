"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Node,
  useNodesState,
} from "@xyflow/react";
import { Button } from "@/components/ui/button";
import { Type } from "lucide-react";
import "@xyflow/react/dist/style.css";
import { Text } from "@/components/ui/Text";

const nodeTypes = {
  text: Text,
};

export function WhiteBoard() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);

  const onAddTextNode = useCallback(() => {
    const newNode: Node = {
      id: `text-${nodes.length + 1}`,
      type: 'text',
      position: { x: 100, y: 100 },
      data: { 
        label: 'Add your text here',
        style: {
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          color: '#000000'
        }
      },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 bg-white/50 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200/50 w-40 h-[200px] items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onAddTextNode}
          className="hover:bg-slate-100 w-8 h-8 rounded-lg"
        >
          <Type className="size-10"/>
        </Button>
      </div>

      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}