import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { SORT_OPTIONS, SortOption } from "@/types/SortingType";
import { FilterOption } from "@/types/FilterType";

interface FilterBarProps {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  filterBy: string;
  onFilterChange: (value: FilterOption) => void;
}

export default function FilterBar({ sortBy, onSortChange, filterBy, onFilterChange }: FilterBarProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Filter by</span>
        <Select 
        value={filterBy}
        onValueChange={(value) => onFilterChange(value as FilterOption)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-boards">All boards</SelectItem>
            <SelectItem value="my-boards">My boards</SelectItem>
            <SelectItem value="shared">Shared with me</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by</span>
        <Select
          value={sortBy}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
