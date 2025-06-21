"use client";

import WhiteBoard from "@/components/WhiteBoard";
import {useGetMe} from "@/hooks/api/account.api";

export default function Home() {
  const {data} = useGetMe()
  console.log(data)

  return <WhiteBoard />;
}
