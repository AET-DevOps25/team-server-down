import { useQuery } from "@tanstack/react-query";
import { accountApiFactory } from "@/api";

export const useGetWhiteboards = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: accountApiFactory.getCurrentUser,
  });
};
