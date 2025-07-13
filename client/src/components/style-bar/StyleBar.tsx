"use client";
import React from "react";
import { memo, useState } from "react";
import StylePopover from "@/components/style-bar/style-bar-components/StylePopover";
import FontSizeSelector from "@/components/style-bar/style-bar-components/FontSizeSelector";
import TextStylingSelector from "@/components/style-bar/style-bar-components/TextStylingSelector";
import FontFamilySelector from "@/components/style-bar/style-bar-components/FontFamilySelector";
import { checkerboardStyle, NodeProperties } from "@/types/NodeProperties";
import {
  useTextRephrase,
  useTextCompletion,
  useTextSummarization,
} from "@/hooks/api/llm.api";
import { AIActionDropdown } from "../aiActionDropdown/aiActionDropdown";
import { LoadingOverlay } from "../spinner/LoadingOverlay";

interface StyleBarProps {
  nodeProperties: NodeProperties;
  onUpdateNode: (updatedProperties: Partial<NodeProperties>) => void;
  onUpdateLabel: (newLabel: string) => void;
  selectedNodeLabel: string;
}

const StyleBar = ({
  nodeProperties,
  onUpdateNode,
  onUpdateLabel,
  selectedNodeLabel,
}: StyleBarProps) => {
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

  const { mutateAsync: rephraseText } = useTextRephrase();
  const { mutateAsync: completeText } = useTextCompletion();
  const { mutateAsync: summarizedText } = useTextSummarization();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAIAction = async (
    action: "complete" | "summarize" | "rephrase",
  ) => {
    setIsLoading(true);

    try {
      let data;

      if (action === "rephrase") {
        data = await rephraseText({ user_text: [selectedNodeLabel] });
      } else if (action === "complete") {
        data = await completeText({ user_text: [selectedNodeLabel] });
      } else {
        data = await summarizedText({ user_text: [selectedNodeLabel] });
      }

      const llmResponse = data.llm_response;
      onUpdateLabel(llmResponse);
    } catch (error) {
      console.error("LLM error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-white px-3 py-1 shadow-lg">
        <StylePopover
          title="Background Style"
          color={bgColor}
          onChangeColor={onChangeBgColor}
          buttonIcon={
            <div
              className="h-4 w-4 rounded-full border-[0.5px] border-gray-200"
              style={
                bgColor !== "none"
                  ? { backgroundColor: bgColor }
                  : checkerboardStyle
              }
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
              className="flex h-4 w-4 items-center justify-center rounded-full border-[0.5px] border-gray-200"
              style={
                borderColor !== "none"
                  ? { backgroundColor: borderColor }
                  : checkerboardStyle
              }
            >
              <div className="h-2 w-2 rounded-full border-[0.5px] border-gray-200 bg-white" />
            </div>
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

        <div className="mx-0.5 h-5 w-px bg-gray-300" />

        <StylePopover
          title="Text Color"
          color={textColor}
          onChangeColor={onChangeTextColor}
          buttonIcon={
            <div className="flex flex-col items-center justify-center text-base">
              <span className="-mt-1">A</span>
              <div
                className="-mt-1 h-1 w-4 border-[0.5px] border-gray-200"
                style={
                  textColor !== "none"
                    ? { backgroundColor: textColor }
                    : checkerboardStyle
                }
              />
            </div>
          }
        />

        <div className="mx-0.5 h-5 w-px bg-gray-300" />

        <FontSizeSelector
          fontSize={fontSize}
          onChangeFontSize={onChangeFontSize}
        />

        <div className="mx-0.5 h-5 w-px bg-gray-300" />

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

        <div className="mx-0.5 h-5 w-px bg-gray-300" />

        <FontFamilySelector
          fontFamily={fontFamily}
          onChangeFontFamily={onChangeFontFamily}
        />

        <AIActionDropdown
          disabled={!selectedNodeLabel || isLoading}
          onAIAction={handleAIAction}
        />
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
};

export default memo(StyleBar);
