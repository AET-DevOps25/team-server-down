"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { allFonts, getFontStyle } from "@/types/NodeProperties";

interface FontSelectorProps {
  fontFamily: string;
  onChangeFontFamily: (font: string) => void;
}

export default function FontFamilySelector({
  fontFamily,
  onChangeFontFamily,
}: FontSelectorProps) {
  return (
    <div className="flex items-center">
      <Select value={fontFamily} onValueChange={onChangeFontFamily}>
        <SelectTrigger className="h-8 w-[90px] border-0 bg-transparent shadow-none ring-0 hover:bg-gray-50 focus:ring-0">
          <SelectValue>
            <span style={{ fontFamily: getFontStyle(fontFamily) }}>
              {fontFamily}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-80 w-50 p-1">
          <SelectGroup>
            {Object.entries(allFonts).map(([fontName, fontFamily]) => (
              <SelectItem
                key={`all-${fontName}`}
                value={fontName}
                className="cursor-pointer"
              >
                <span style={{ fontFamily }}>{fontName}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
