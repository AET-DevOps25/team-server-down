"use client";

import WhiteBoard from "@/components/WhiteBoard";
import {useGetRoot} from "@/hooks/api/root.api";

export default function Home() {
  const {data} = useGetRoot()
  console.log(data)

  return <WhiteBoard />;
}
