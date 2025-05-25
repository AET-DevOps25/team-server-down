"use client";
import React from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ShapeNode from "@/components/shape-node/ShapeNode";
import Circle from "@/assets/shapes/circle.svg";
import Rectangle from "@/assets/shapes/rectangle.svg";
import Trapezoid from "@/assets/shapes/trapezoid.svg";
import Diamond from "@/assets/shapes/diamond.svg";
import Hexagon from "@/assets/shapes/hexagon.svg";
import Parallelogram from "@/assets/shapes/parallelogram.svg";
import Triangle from "@/assets/shapes/triangle.svg";
import { defaultShapeNodeProperties } from "@/types/ShapeNodeProperties";

export default function Home() {
  const nodeTypes = {
    ShapeNode,
  };

  const initialNodes: Node[] = [
    {
      id: "2",
      type: "ShapeNode",
      data: {
        label: "circle",
        Shape: Circle,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 0, y: 50 },
    },

    {
      id: "1",
      type: "ShapeNode",
      data: {
        label: "rectangle",
        Shape: Rectangle,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 0, y: 300 },
    },

    {
      id: "3",
      type: "ShapeNode",
      data: {
        label: "trapezoid",
        Shape: Trapezoid,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 300, y: 50 },
    },

    {
      id: "4",
      type: "ShapeNode",
      data: {
        label: "diamond",
        Shape: Diamond,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 300, y: 300 },
    },

    {
      id: "5",
      type: "ShapeNode",
      data: {
        label: "hexagon",
        Shape: Hexagon,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 600, y: 50 },
    },

    {
      id: "6",
      type: "ShapeNode",
      data: {
        label: "parallelogram",
        Shape: Parallelogram,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 600, y: 300 },
    },
    {
      id: "7",
      type: "ShapeNode",
      data: {
        label: "triangle",
        Shape: Triangle,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: 900, y: 150 },
    },
  ];

  const initialEdges: Edge[] = [];

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        minZoom={0.2}
        maxZoom={4}
        fitView
        nodeTypes={nodeTypes}
        fitViewOptions={{ padding: 0.5 }}
      >
        <Background variant={BackgroundVariant.Dots} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
