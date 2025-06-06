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
        <SelectTrigger className="w-[40px] text-center px-2 border-0 ring-0 shadow-none bg-transparent hover:bg-gray-50 focus:ring-0 [&>svg]:hidden">
          <SelectValue>
            <span className="font-medium  text-gray-700">{fontSize}</span>
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

      <div className="flex flex-col ml-1">
        <button
          onClick={increaseFontSize}
          className="focus:outline-none hover:cursor-pointer"
          disabled={fontSize === fontSizes[fontSizes.length - 1]}
        >
          <ChevronUp className="text-gray-700 w-3 h-3" />
        </button>
        <button
          onClick={decreaseFontSize}
          className="focus:outline-none hover:cursor-pointer "
          disabled={fontSize === fontSizes[0]}
        >
          <ChevronDown className="text-gray-700 w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
