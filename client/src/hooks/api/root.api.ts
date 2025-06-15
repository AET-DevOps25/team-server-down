import { useQuery } from "@tanstack/react-query";
import { rootApiFactory } from "@/api";

export const useGetRoot = () => {
  return useQuery({
    queryKey: ["root"],
    queryFn: rootApiFactory.root,
  });
};
