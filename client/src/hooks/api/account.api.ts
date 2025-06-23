import { useQuery } from "@tanstack/react-query";
import { accountApiFactory } from "@/api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: accountApiFactory.getCurrentUser,
  });
};
