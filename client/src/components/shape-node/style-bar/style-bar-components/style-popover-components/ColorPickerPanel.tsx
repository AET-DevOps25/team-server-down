import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { predefinedColors } from "@/types/ShapeNodeProperties";

type Props = {
  color: string;
  localColor: string;
  handleColorChange: (color: string) => void;
};

const ColorOption = ({
  color,
  onClick,
  isSelected = false,
}: {
  color: string;
  onClick: () => void;
  isSelected?: boolean;
}) => (
  <div
    className={`w-6 h-6 rounded-full cursor-pointer border ${isSelected ? "border-black ring-2 ring-offset-2 ring-black" : "border-gray-200"}`}
    style={{ backgroundColor: color }}
    onClick={onClick}
  />
);

const ColorPickerPanel: React.FC<Props> = ({
  color,
  localColor,
  handleColorChange,
}) => {
  return (
    <Tabs defaultValue="palette">
      <TabsList className="w-full">
        <TabsTrigger value="palette" className="flex-1">
          Palette
        </TabsTrigger>
        <TabsTrigger value="custom" className="flex-1">
          Custom
        </TabsTrigger>
      </TabsList>

      <TabsContent value="palette" className="mt-2">
        <div className="grid grid-cols-5 gap-2 mb-2">
          {predefinedColors.map((hex, idx) => (
            <ColorOption
              key={idx}
              color={hex}
              onClick={() => handleColorChange(hex)}
              isSelected={color === hex}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent
        value="custom"
        className="mt-2 flex flex-col items-center gap-3"
      >
        <HexColorPicker
          color={localColor}
          onChange={handleColorChange}
          className="w-full"
        />
        <div className="flex items-center w-full gap-2">
          <span className="text-sm text-gray-500">#</span>
          <HexColorInput
            color={localColor}
            onChange={handleColorChange}
            prefixed={false}
            className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ColorPickerPanel;
