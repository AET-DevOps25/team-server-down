"use client";
import React from "react";
import { memo } from "react";
import StylePopover from "@/components/shape-node/style-bar/style-bar-components/StylePopover";
import FontSizeSelector from "@/components/shape-node/style-bar/style-bar-components/FontSizeSelector";
import TextStylingSelector from "@/components/shape-node/style-bar/style-bar-components/TextStylingSelector";
import FontFamilySelector from "@/components/shape-node/style-bar/style-bar-components/FontFamilySelector";
import { ShapeNodeProperties } from "@/types/ShapeNodeProperties";

interface StyleBarProps {
  nodeProperties: ShapeNodeProperties;
  onUpdateNode: (updatedProperties: Partial<ShapeNodeProperties>) => void;
}

const StyleBar = ({ nodeProperties, onUpdateNode }: StyleBarProps) => {
  const {
    color: bgColor,
    borderColor,
    textColor,
    fontSize,
    fontFamily,
    isBold,
    isItalic,
    isStrikethrough,
    isUnderline,
    borderWidth = 1,
    borderOpacity = 1,
    opacity = 1,
  } = nodeProperties;

  const onChangeBgColor = (color: string) => {
    onUpdateNode({ color });
  };

  const onChangeBorderColor = (color: string) => {
    onUpdateNode({ borderColor: color });
  };

  const onChangeTextColor = (color: string) => {
    onUpdateNode({ textColor: color });
  };

  const onChangeOpacity = (opacity: number) => {
    onUpdateNode({ opacity });
  };

  const onChangeBorderWidth = (borderWidth: number) => {
    onUpdateNode({ borderWidth });
  };

  const onChangeBorderOpacity = (borderOpacity: number) => {
    onUpdateNode({ borderOpacity });
  };

  const onChangeFontSize = (fontSize: number) => {
    onUpdateNode({ fontSize });
  };

  const onChangeFontFamily = (fontFamily: string) => {
    onUpdateNode({ fontFamily });
  };

  const onToggleBold = () => {
    onUpdateNode({ isBold: !isBold });
  };

  const onToggleItalic = () => {
    onUpdateNode({ isItalic: !isItalic });
  };

  const onToggleUnderline = () => {
    onUpdateNode({ isUnderline: !isUnderline });
  };

  const onToggleStrikethrough = () => {
    onUpdateNode({ isStrikethrough: !isStrikethrough });
  };

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-md shadow-lg py-1.5 px-3 gap-4">
      <StylePopover
        title="Background Style"
        color={bgColor}
        onChangeColor={onChangeBgColor}
        buttonIcon={
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: bgColor }}
          />
        }
        sliders={[
          {
            title: "Opacity",
            value: opacity,
            onChange: onChangeOpacity,
            min: 0,
            max: 1,
            step: 0.01,
            unit: "×",
          },
        ]}
      />

      <StylePopover
        title="Border Style"
        color={borderColor}
        onChangeColor={onChangeBorderColor}
        buttonIcon={
          <div
            className="w-4 h-4 rounded-full border-2 bg-transparent"
            style={{ borderColor: borderColor }}
          />
        }
        sliders={[
          {
            title: "Width",
            value: borderWidth,
            onChange: onChangeBorderWidth,
            min: 0,
            max: 10,
            step: 1,
            unit: "px",
          },
          {
            title: "Opacity",
            value: borderOpacity,
            onChange: onChangeBorderOpacity,
            min: 0,
            max: 1,
            step: 0.01,
            unit: "×",
          },
        ]}
      />

      <div className="w-px h-5 bg-gray-300 mx-0.5" />

      <StylePopover
        title="Text Color"
        color={textColor}
        onChangeColor={onChangeTextColor}
        buttonIcon={
          <div
            className="inline-block border-b-2 border-current leading-none px-0.5 m-0 text-base"
            style={{ borderColor: textColor }}
          >
            A
          </div>
        }
      />

      <div className="w-px h-5 bg-gray-300 mx-0.5" />

      <FontSizeSelector
        fontSize={fontSize}
        onChangeFontSize={onChangeFontSize}
      />

      <div className="w-px h-5 bg-gray-300 mx-0.5" />

      <TextStylingSelector
        isBold={isBold}
        isItalic={isItalic}
        isUnderline={isUnderline}
        isStrikethrough={isStrikethrough}
        onToggleBold={onToggleBold}
        onToggleItalic={onToggleItalic}
        onToggleUnderline={onToggleUnderline}
        onToggleStrikethrough={onToggleStrikethrough}
      />

      <div className="w-px h-5 bg-gray-300 mx-0.5" />

      <FontFamilySelector
        fontFamily={fontFamily}
        onChangeFontFamily={onChangeFontFamily}
      />
    </div>
  );
};

export default memo(StyleBar);
