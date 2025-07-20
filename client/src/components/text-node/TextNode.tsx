import React, { useEffect, useState } from "react";
import {
  Handle,
  NodeProps,
  NodeResizer,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFontStyle,
  handleStyle,
  NodeProperties,
} from "@/types/NodeProperties";
import StyleBar from "@/components/style-bar/StyleBar";
import { updateNode } from "@/util/updateNode";
import { useParams } from "next/navigation";
import { useGetMe } from "@/hooks/api/account.api";
import { useAmIOwner } from "@/hooks/api/whiteboard.api";

interface TextNodeProps extends NodeProps {
  id: string;
  data: {
    label?: string;
    nodeProperties: NodeProperties;
  };
  selected: boolean;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export default function TextNode({ id, data, selected }: TextNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(data.label as string);
  const [showStyleBar, setShowStyleBar] = useState(true);
  const { setNodes } = useReactFlow();

  const params = useParams();
  const whiteboardId = Number(params.id);

  const { data: user } = useGetMe();
  const { data: isOwner } = useAmIOwner(whiteboardId, user?.id);

  const { nodeProperties, label } = data;
  const bgRgb = hexToRgb(nodeProperties.color);
  const borderRgb = hexToRgb(nodeProperties.borderColor);

  const showBorder = borderRgb && nodeProperties.borderColor !== "none";
  const showBackground = bgRgb && nodeProperties.color !== "none";

  const onUpdateNode = (updater: {
    label?: string;
    nodeProperties?: Partial<NodeProperties>;
  }) => {
    setNodes(updateNode(id, updater));
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    onUpdateNode({ label: newText });
  };

  useEffect(() => {
    setText(data.label as string);
  }, [data.label]);

  return (
    <>
      {isOwner && showStyleBar && (
        <NodeToolbar isVisible={selected} position={Position.Top}>
          <StyleBar
            nodeProperties={nodeProperties}
            onUpdateNode={(updatedProperties: Partial<NodeProperties>) =>
              onUpdateNode({ nodeProperties: updatedProperties })
            }
            onUpdateLabel={(newLabel: string) =>
              onUpdateNode({ label: newLabel })
            }
            selectedNodeLabel={text}
          />
        </NodeToolbar>
      )}

      <NodeToolbar position={Position.Right}>
        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowStyleBar(!showStyleBar)}
            className="h-7 w-7 p-1"
          >
            {showStyleBar ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </NodeToolbar>

      <NodeResizer
        color="#3859ff"
        isVisible={selected}
        minWidth={100}
        minHeight={50}
      />
      <div className="h-full w-full">
        <div
          className="flex h-full w-full items-center justify-center p-4"
          style={{
            ...(showBorder && {
              borderWidth: nodeProperties.borderWidth,
              borderStyle: "solid",
              borderColor: `rgba(${borderRgb.r!}, ${borderRgb.g!}, ${borderRgb.b!}, ${nodeProperties.borderOpacity})`,
            }),
            ...(showBackground && {
              backgroundColor: `rgba(${bgRgb.r!}, ${bgRgb.g!}, ${bgRgb.b!}, ${nodeProperties.opacity})`,
            }),
          }}
          onDoubleClick={(e) => {
            e.stopPropagation();
            setIsEditing(true);
          }}
        >
          {isEditing ? (
            <input
              value={text}
              onChange={(e) => handleTextChange(e.target.value)}
              onBlur={() => setIsEditing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="m-0 h-auto w-auto border-none bg-transparent p-0 text-center outline-none"
              style={{
                color: nodeProperties.textColor,
                fontSize: `${nodeProperties.fontSize}px`,
                fontFamily: getFontStyle(nodeProperties.fontFamily),
                fontWeight: nodeProperties.isBold ? "bold" : "normal",
                fontStyle: nodeProperties.isItalic ? "italic" : "normal",
                textDecoration:
                  `${nodeProperties.isUnderline ? "underline" : ""} ${nodeProperties.isStrikethrough ? "line-through" : ""}`.trim() ||
                  "none",
              }}
            />
          ) : (
            <p
              style={{
                color: nodeProperties.textColor,
                fontSize: `${nodeProperties.fontSize}px`,
                fontFamily: getFontStyle(nodeProperties.fontFamily),
                fontWeight: nodeProperties.isBold ? "bold" : "normal",
                fontStyle: nodeProperties.isItalic ? "italic" : "normal",
                textDecoration:
                  `${nodeProperties.isUnderline ? "underline" : ""} ${nodeProperties.isStrikethrough ? "line-through" : ""}`.trim() ||
                  "none",
              }}
            >
              {label}
            </p>
          )}
        </div>
      </div>

      <Handle
        type="source"
        id="top-source"
        position={Position.Top}
        style={handleStyle}
      />
      <Handle
        type="target"
        id="top-target"
        position={Position.Top}
        style={handleStyle}
      />

      <Handle
        type="source"
        id="bottom-source"
        position={Position.Bottom}
        style={handleStyle}
      />
      <Handle
        type="target"
        id="bottom-target"
        position={Position.Bottom}
        style={handleStyle}
      />

      <Handle
        type="source"
        id="left-source"
        position={Position.Left}
        style={handleStyle}
      />
      <Handle
        type="target"
        id="left-target"
        position={Position.Left}
        style={handleStyle}
      />

      <Handle
        type="source"
        id="right-source"
        position={Position.Right}
        style={handleStyle}
      />
      <Handle
        type="target"
        id="right-target"
        position={Position.Right}
        style={handleStyle}
      />
    </>
  );
}
