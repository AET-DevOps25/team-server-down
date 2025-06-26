"use client";

import WhiteBoard from "@/components/WhiteBoard";
import { useGetMe } from "@/hooks/api/account.api";
import { redirect } from "next/navigation";

export default function Home() {
  const { data } = useGetMe();
  console.log(data);

  redirect("/dashboard");
}
