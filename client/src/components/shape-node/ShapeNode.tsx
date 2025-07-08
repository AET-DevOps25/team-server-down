"use client";
import { memo, useCallback, useState, useRef, useEffect } from "react";
import {
  Handle,
  NodeProps,
  NodeResizer,
  NodeToolbar,
  Position,
  useReactFlow,
} from "@xyflow/react";
import StyleBar from "@/components/style-bar/StyleBar";
import {
  getFontStyle,
  handleStyle,
  NodeProperties,
} from "@/types/NodeProperties";
import { updateNode } from "@/util/updateNode";
export interface ShapeNodeParams extends NodeProps {
  id: string;
  data: {
    label: string;
    Shape: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    nodeProperties: NodeProperties;
  };
  selected: boolean;
}

const ShapeNode = ({ id, data, selected }: ShapeNodeParams) => {
  const { Shape, nodeProperties, label } = data;
  const { setNodes} = useReactFlow();
  const inputRef = useRef<HTMLInputElement>(null);

  const onUpdateNode = (updater: {
    label?: string;
    nodeProperties?: Partial<NodeProperties>;
  }) => {
    setNodes(updateNode(id, updater));
  };

  const handleClick = useCallback((evt: React.MouseEvent) => {
    evt.stopPropagation();
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: node.id === id,
      }))
    );
  }, [id, setNodes]);


  return (
    <div 
    className="shape-node-wrapper" 
    onClick={handleClick}
    data-nodeid={id}
    style={{ 
      width: '100%',
      height: '100%',
      minHeight: '100px',
      position: 'relative'
    }}
    >
      <NodeToolbar isVisible={selected} position={Position.Top}>
       <div className="flex items-center gap-2">
        <StyleBar
          nodeProperties={nodeProperties}
          onUpdateNode={(updatedProperties: Partial<NodeProperties>) =>
            onUpdateNode({ nodeProperties: updatedProperties })
          }
          onUpdateLabel={(newLabel: string) => onUpdateNode({ label: newLabel })}
          selectedNodeLabel={label}
        />
          </div>
      </NodeToolbar>

      <NodeResizer
        color="#3859ff"
        isVisible={selected}
        minWidth={100}
        minHeight={100}
      />

      <div className={`relative flex h-full w-full justify-center`}>
        {Shape && (
          <div className="pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center p-0.5">
            <Shape
              className={`h-full w-full`}
              preserveAspectRatio="none"
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
          ref = {inputRef}
          className={`z-10 min-h-[100px] w-4/5 bg-transparent text-center focus:outline-none`}
          style={{
            color: nodeProperties.textColor,
            fontSize: `${nodeProperties.fontSize}px`,
            fontFamily: getFontStyle(nodeProperties.fontFamily),
            fontWeight: nodeProperties.isBold ? "bold" : "normal",
            fontStyle: nodeProperties.isItalic ? "italic" : "normal",
            textDecoration:
              `${nodeProperties.isUnderline ? "underline" : ""} ${nodeProperties.isStrikethrough ? "line-through" : ""}`.trim() ||
              "none",
            textOverflow: "ellipsis",
          }}
          value={label}
          onChange={(e) => onUpdateNode({ label: e.target.value })}
          placeholder=""
        />
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
    </div>
  );
};

export default memo(ShapeNode);
