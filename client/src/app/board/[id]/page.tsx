"use client";

import WhiteBoard from "@/components/WhiteBoard";

export default function Board({ params }: { params: { id: number } }) {
  const { id } = params;
  console.log(`boardId: ${id}`);
  return <WhiteBoard />;
}
