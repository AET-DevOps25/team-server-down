export type SortOption = "last-edited" | "name" | "created";

export interface SortConfig {
  key: SortOption;
  label: string;
}

export const SORT_OPTIONS: SortConfig[] = [
  { key: "last-edited", label: "Last edited" },
  { key: "name", label: "Name" },
  { key: "created", label: "Created" },
];
