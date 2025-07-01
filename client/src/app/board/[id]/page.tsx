"use client";

import { use } from "react";
import Whiteboard from "@/components/Whiteboard";
import { ReactFlowProvider } from "@xyflow/react";

export default function Board({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log(`boardId: ${id}`);

  return (
    <ReactFlowProvider>
      <Whiteboard />
    </ReactFlowProvider>
  );
}
