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
    { icon: Circle, label: "Circle", shape: "circle" },
    {
      icon: Diamond,
      label: "Diamond",
      shape: "diamond",
    },
    {
      icon: Hexagon,
      label: "Hexagon",
      shape: "hexagon",
    },
    {
      icon: Parallelogram,
      label: "Parallelogram",
      shape: "parallelogram",
    },
    {
      icon: Rectangle,
      label: "Rectangle",
      shape: "rectangle",
    },
    {
      icon: Trapezoid,
      label: "Trapezoid",
      shape: "trapezoid",
    },
    {
      icon: Triangle,
      label: "Triangle",
      shape: "triangle",
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
      id: `shape-${Date.now()}`, // Use timestamp for unique ID // TODO combine with user id so it s actually unique
      type: "shapeNode",
      data: {
        shapeType: item.shape,
        label: item.label,
        nodeProperties: defaultShapeNodeProperties,
      },
      position: { x: Math.random() * 300, y: Math.random() * 300 }, // Random position
    };
    onAddNode(newNode);
  };

  return (
    <div className="flex h-auto w-16 flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-3 shadow-lg backdrop-blur-sm">
      {additionalItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button
            key={`additional-${index}`}
            onClick={handleAddTextNode}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
            title={item.label}
          >
            <IconComponent size={20} strokeWidth={1.5} />
          </button>
        );
      })}

      <div className="my-2 h-px w-10 bg-gray-300"></div>

      <div className="flex flex-col items-center space-y-2">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={index}
              onClick={() => handleAddShapeNode(item)}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200 hover:bg-gray-200 hover:text-gray-800"
              title={item.label}
            >
              <IconComponent
                className="h-5 w-5 fill-transparent stroke-gray-600 hover:stroke-gray-800"
                style={{ strokeWidth: 3 }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
