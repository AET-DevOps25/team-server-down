import { useState, useMemo } from "react";
import { WhiteboardResponse } from "@/api/main/generated/api";
import { FilterOption } from "@/types/FilterType";
import { useGetMe } from "@/hooks/api/account.api";

export function useFilteredWhiteboards(whiteboards: WhiteboardResponse[]) {
  const [filterBy, setFilterBy] = useState<FilterOption>("all-boards");
  const getCurrentUser = useGetMe();

  const filteredWhiteboards = useMemo(() => {
    switch (filterBy) {
      case "my-boards":
        return whiteboards.filter(board => board.user?.id === getCurrentUser.data?.id);
      case "shared":
        return whiteboards.filter(board => board.user?.id != getCurrentUser.data?.id);
      case "all-boards":
      default:
        return whiteboards;
    }
  }, [whiteboards, filterBy, getCurrentUser.data]);

  return {
    filteredWhiteboards,
    filterBy,
    setFilterBy,
  };
}