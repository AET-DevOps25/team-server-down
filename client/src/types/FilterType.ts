export type FilterOption = "all-boards" | "my-boards" | "shared";

export interface SortConfig {
  key: FilterOption;
  label: string;
}

export const SORT_OPTIONS: SortConfig[] = [
  { key: "all-boards", label: "All boards" },
  { key: "my-boards", label: "My boards" },
  { key: "shared", label: "Shared with me" },
];
