import {
  AccountApiFactory,
  Configuration,
  RootApiFactory,
} from "@/api/generated";
import globalAxios from "axios";
import { getSession } from "next-auth/react";
import { DefaultApiFactory } from "./genai/generated";

globalAxios.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    // @ts-ignore
    request.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }
  return request;
});

const configuration: Configuration = {
  isJsonMime(mime: string): boolean {
    const jsonMime = new RegExp(
      "^(application/json|[^;/ \t]+/[^;/ \t]+[+]json)[ \t]*(;.*)?$",
      "i",
    );
    return (
      mime !== null &&
      (jsonMime.test(mime) ||
        mime.toLowerCase() === "application/json-patch+json")
    );
  },
  basePath: process.env.NEXT_PUBLIC_API_URL,
};
console.log("API URL:", configuration, process);

export const rootApiFactory = RootApiFactory(configuration);
export const accountApiFactory = AccountApiFactory(configuration);
export const llmApiFactory = DefaultApiFactory(undefined, "http://localhost:8000");


