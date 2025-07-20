"use client";

import { use } from "react";
import Whiteboard from "@/components/Whiteboard";
import { ReactFlowProvider } from "@xyflow/react";
import { redirect } from "next/navigation";
import { useGetWhiteboardById } from "@/hooks/api/whiteboard.api";

export default function Board({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const isNumber = !isNaN(Number(id));

  if (!isNumber) {
    redirect("/dashboard");
  }

  const { isError, isLoading } = useGetWhiteboardById(Number(id));

  if (isError) {
    redirect("/dashboard");
  }

  if (!isLoading) {
    return (
      <ReactFlowProvider>
        <Whiteboard whiteboardId={Number(id)} />
      </ReactFlowProvider>
    );
  }
}
