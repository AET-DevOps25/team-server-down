"use client";
import { ChevronUp, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontSizes } from "@/types/NodeProperties";

interface FontSizeSelectorProps {
  fontSize: number;
  onChangeFontSize: (fontSize: number) => void;
}

export default function FontSizeSelector({
  fontSize,
  onChangeFontSize,
}: FontSizeSelectorProps) {
  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      onChangeFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      onChangeFontSize(fontSizes[currentIndex - 1]);
    }
  };

  return (
    <div className="flex items-center">
      <Select
        value={fontSize.toString()}
        onValueChange={(value) => onChangeFontSize(parseInt(value))}
      >
        <SelectTrigger className="w-[40px] border-0 bg-transparent px-2 text-center shadow-none ring-0 hover:bg-gray-50 focus:ring-0 [&>svg]:hidden">
          <SelectValue>
            <span className="font-medium text-gray-700">{fontSize}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="min-w-[60px]">
          {fontSizes.map((size) => (
            <SelectItem
              key={size}
              value={size.toString()}
              className="cursor-pointer"
            >
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="ml-1 flex flex-col">
        <button
          onClick={increaseFontSize}
          className="hover:cursor-pointer focus:outline-none"
          disabled={fontSize === fontSizes[fontSizes.length - 1]}
        >
          <ChevronUp className="h-3 w-3 text-gray-700" />
        </button>
        <button
          onClick={decreaseFontSize}
          className="hover:cursor-pointer focus:outline-none"
          disabled={fontSize === fontSizes[0]}
        >
          <ChevronDown className="h-3 w-3 text-gray-700" />
        </button>
      </div>
    </div>
  );
}
