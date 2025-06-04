import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPickerPanel from "@/components/style-bar/style-bar-components/style-popover-components/ColorPickerPanel";
import React, { useState } from "react";
import SliderControl from "@/components/style-bar/style-bar-components/style-popover-components/SliderControl";

interface SliderConfig {
  title: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface StylePopoverProps {
  title: string;
  color: string;
  onChangeColor: (color: string) => void;
  buttonIcon: React.ReactNode;
  sliders?: SliderConfig[];
}

export default function StylePopover({
  title,
  color,
  onChangeColor,
  buttonIcon,
  sliders,
}: StylePopoverProps) {
  const [localColor, setLocalColor] = useState(color);

  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor);
    onChangeColor(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center justify-center  w-4 h-4  hover:cursor-pointer">
          {buttonIcon}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-3 mt-3" align="start">
        <div className="font-medium text-sm mt-1 mb-4">{title}</div>

        {sliders && (
          <div className="my-5 space-y-4">
            {sliders.map((slider, index) => (
              <SliderControl
                key={index}
                title={slider.title}
                value={slider.value}
                onChange={slider.onChange}
                min={slider.min ?? 0}
                max={slider.max ?? 100}
                step={slider.step ?? 1}
                unit={slider.unit ?? ""}
              />
            ))}
          </div>
        )}

        <ColorPickerPanel
          color={color}
          localColor={localColor}
          handleColorChange={handleColorChange}
          isTextPopOver={title === "Text Color"}
        />
      </PopoverContent>
    </Popover>
  );
}
