import { Type } from "lucide-react";
import { Node } from "@xyflow/react";
import Circle from "@/assets/shapes/circle.svg";
import Rectangle from "@/assets/shapes/rectangle.svg";
import Trapezoid from "@/assets/shapes/trapezoid.svg";
import Diamond from "@/assets/shapes/diamond.svg";
import Hexagon from "@/assets/shapes/hexagon.svg";
import Parallelogram from "@/assets/shapes/parallelogram.svg";
import Triangle from "@/assets/shapes/triangle.svg";
import {
  defaultShapeNodeProperties,
  defaultTextNodeProperties,
} from "@/types/NodeProperties";

interface SidebarProps {
  onAddNode: (node: Node) => void;
}

export default function Sidebar({ onAddNode }: SidebarProps) {
  const menuItems = [
    { icon: Circle, label: "Circle", shape: "circle", ShapeComponent: Circle },
    {
      icon: Diamond,
      label: "Diamond",
      shape: "diamond",
      ShapeComponent: Diamond,
    },
    {
      icon: Hexagon,
      label: "Hexagon",
      shape: "hexagon",
      ShapeComponent: Hexagon,
    },
    {
      icon: Parallelogram,
      label: "Parallelogram",
      shape: "parallelogram",
      ShapeComponent: Parallelogram,
    },
    {
      icon: Rectangle,
      label: "Rectangle",
      shape: "rectangle",
      ShapeComponent: Rectangle,
    },
    {
      icon: Trapezoid,
      label: "Trapezoid",
      shape: "trapezoid",
      ShapeComponent: Trapezoid,
    },
    {
      icon: Triangle,
      label: "Triangle",
      shape: "triangle",
      ShapeComponent: Triangle,
    },
  ];

  const additionalItems = [{ icon: Type, label: "Text" }];

  const handleAddTextNode = () => {
    const newNode: Node = {
      id: `text-${Date.now()}`, // Use timestamp for unique ID
      type: "text",
      position: { x: Math.random() * 300, y: Math.random() * 300 }, // Random position
      data: {
        label: "Add your text here",
        nodeProperties: defaultTextNodeProperties,
      },
    };
    onAddNode(newNode);
  };

  const handleAddShapeNode = (item: (typeof menuItems)[0]) => {
    const newNode: Node = {
      id: `shape-${Date.now()}`, // Use timestamp for unique ID
      type: "shapeNode", // Note: should match your nodeTypes key
      data: {
        label: item.shape,
        Shape: item.ShapeComponent,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: Math.random() * 300, y: Math.random() * 300 }, // Random position
    };
    onAddNode(newNode);
  };

  return (
    <div className="flex flex-col h-auto w-16 bg-white/50 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-gray-200/50 items-center justify-center">
      {additionalItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={`additional-${index}`}
            onClick={handleAddTextNode}
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
            title={item.label}
          >
            <IconComponent size={20} strokeWidth={1.5} />
          </button>
        );
      })}

      <div className="w-8 h-px bg-gray-300 my-2"></div>

      <div className="flex flex-col items-center py-4 space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleAddShapeNode(item)}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
              title={item.label}
            >
              <IconComponent
                className="w-5 h-5 fill-transparent stroke-gray-600 hover:stroke-gray-800"
                style={{ strokeWidth: 3 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
