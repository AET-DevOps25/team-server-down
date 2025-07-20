import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { checkerboardStyle, predefinedColors } from "@/types/NodeProperties";

type Props = {
  color: string;
  localColor: string;
  handleColorChange: (color: string) => void;
  isTextPopOver?: boolean;
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
    className={`h-6 w-6 cursor-pointer rounded-full border ${isSelected ? "border-black ring-2 ring-black ring-offset-2" : "border-gray-200"}`}
    style={{ backgroundColor: color }}
    onClick={onClick}
  />
);

const TransparentOption = ({
  onClick,
  isSelected = false,
}: {
  onClick: () => void;
  isSelected?: boolean;
}) => (
  <div
    className={`relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full ${
      isSelected ? "ring-2 ring-black ring-offset-2" : ""
    }`}
    style={checkerboardStyle}
    onClick={onClick}
  ></div>
);

const ColorPickerPanel: React.FC<Props> = ({
  color,
  localColor,
  handleColorChange,
  isTextPopOver,
}) => {
  const isTransparent = color === "none";

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
        <div className="mb-2 grid grid-cols-5 gap-2">
          {!isTextPopOver && (
            <TransparentOption
              onClick={() => handleColorChange("none")}
              isSelected={isTransparent}
            />
          )}
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
        <div className="flex w-full items-center gap-2">
          <span className="text-sm text-gray-500">#</span>
          <HexColorInput
            color={localColor}
            onChange={handleColorChange}
            prefixed={false}
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ColorPickerPanel;
