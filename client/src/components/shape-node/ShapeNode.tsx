"use client";
import { memo } from "react";
import {
  Handle,
  NodeResizer,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import StyleBar from "@/components/shape-node/style-bar/StyleBar";
import { getFontStyle, ShapeNodeProperties } from "@/types/ShapeNodeProperties";

const handleStyle = {
  width: 2,
  height: 2,
  background: "#ffffff",
  border: "1px solid gray",
};

export interface ShapeNodeParams {
  id: string;
  data: {
    label: string;
    Shape: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    nodeProperties: ShapeNodeProperties;
  };
  selected: boolean;
}

const ShapeNode = ({ id, data, selected }: ShapeNodeParams) => {
  const { Shape, nodeProperties, label } = data;

  const { setNodes } = useReactFlow();

  const onUpdateNode = (
    updater: Partial<{
      label: string;
      nodeProperties: Partial<ShapeNodeProperties>;
    }>,
  ) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...(updater.label !== undefined && { label: updater.label }),
              ...(updater.nodeProperties && {
                nodeProperties: {
                  ...(node.data.nodeProperties || {}),
                  ...updater.nodeProperties,
                },
              }),
            },
          };
        }
        return node;
      }),
    );
  };

  return (
    <>
      <NodeToolbar isVisible={selected}>
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 z-20">
          <StyleBar
            nodeProperties={nodeProperties}
            onUpdateNode={(updatedProperties: Partial<ShapeNodeProperties>) =>
              onUpdateNode({ nodeProperties: updatedProperties })
            }
          />
        </div>
      </NodeToolbar>

      <NodeResizer
        color="#3859ff"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
      />

      <div className={`w-full h-full flex justify-center relative`}>
        {Shape && (
          <div className="p-0.5 absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full ">
            <Shape
              className={`w-full h-full `}
              style={{
                fill: nodeProperties.color,
                fillOpacity: nodeProperties.opacity,
                strokeWidth: nodeProperties.borderWidth,
                stroke: nodeProperties.borderColor,
                strokeOpacity: nodeProperties.borderOpacity,
                shapeRendering: "geometricPrecision",
              }}
            />
          </div>
        )}

        <input
          className={`w-4/5 min-h-[100px] bg-transparent text-center z-10 focus:outline-none`}
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
          value={label}
          onChange={(e) => onUpdateNode({ label: e.target.value })}
          placeholder=""
        />
      </div>

      <Handle type="target" position={Position.Top} style={handleStyle} />

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />

      <Handle
        type="source"
        position={Position.Left}
        id="l"
        style={handleStyle}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="r"
        style={handleStyle}
      />
    </>
  );
};

export default memo(ShapeNode);
