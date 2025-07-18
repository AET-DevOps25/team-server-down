import { useState, useMemo } from "react";
import { WhiteboardResponse } from "@/api/main/generated/api";
import { SortOption } from "@/types/SortingType";

export function useSortedWhiteboards(whiteboards: WhiteboardResponse[]) {
  const [sortBy, setSortBy] = useState<SortOption>("last-edited");

  const sortedWhiteboards = useMemo(() => {
    const boards = [...whiteboards];

    switch (sortBy) {
      case "name":
        return boards.sort((a, b) => {
          if (!a.title) return 1;
          if (!b.title) return -1;
          return a.title.localeCompare(b.title);
        });

      case "created":
        return boards.sort((a, b) => {
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

      case "last-edited":
      default:
        return boards.sort((a, b) => {
          if (!a.lastUpdatedAt) return 1;
          if (!b.lastUpdatedAt) return -1;
          return (
            new Date(b.lastUpdatedAt).getTime() -
            new Date(a.lastUpdatedAt).getTime()
          );
        });
    }
  }, [whiteboards, sortBy]);

  return {
    sortedWhiteboards,
    sortBy,
    setSortBy,
  };
}
