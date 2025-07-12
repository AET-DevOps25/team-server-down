"use client";

import { use } from "react";
import Whiteboard from "@/components/Whiteboard";
import { ReactFlowProvider } from "@xyflow/react";
import { redirect } from "next/navigation";

export default function Board({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log(`boardId: ${id}`);

  const isNumber = !isNaN(Number(id));

  if (isNumber) {
    return (
      <ReactFlowProvider>
        <Whiteboard whiteboardId={Number(id)} />
      </ReactFlowProvider>
    );
  } else {
    redirect("/dashboard");
  }
}
