"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { allFonts, getFontStyle } from "@/types/ShapeNodeProperties";

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
        <SelectTrigger className=" w-[90px]  h-8 border-0 ring-0 shadow-none bg-transparent hover:bg-gray-50 focus:ring-0">
          <SelectValue>
            <span style={{ fontFamily: getFontStyle(fontFamily) }}>
              {fontFamily}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-50 max-h-80 p-1">
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
