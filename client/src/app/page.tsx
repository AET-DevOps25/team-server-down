"use client";

import React from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useGetRoot } from "@/hooks/api/root.api";

export default function Home() {
  const { data } = useGetRoot();
  console.log(data?.data);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow fitView>
        <Controls position="bottom-right" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
