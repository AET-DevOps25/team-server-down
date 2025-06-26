"use client";

import { useGetMe } from "@/hooks/api/account.api";
import { redirect } from "next/navigation";

export default function Home() {
  const { data } = useGetMe();
  console.log(data);

  redirect("/dashboard");
}
