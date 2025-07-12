"use client";

import { use } from "react";
import WhiteBoard from "@/components/WhiteBoard";

export default function Board({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log(`boardId: ${id}`);
  return <WhiteBoard id={Number(id)} />;
}
