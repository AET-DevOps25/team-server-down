import Circle from "@/assets/shapes/circle.svg";
import Rectangle from "@/assets/shapes/rectangle.svg";
import Trapezoid from "@/assets/shapes/trapezoid.svg";
import Diamond from "@/assets/shapes/diamond.svg";
import Hexagon from "@/assets/shapes/hexagon.svg";
import Parallelogram from "@/assets/shapes/parallelogram.svg";
import Triangle from "@/assets/shapes/triangle.svg";

interface ShapeRegistryParams {
  shapeType: string;
}

export default function shapeRegistry({ shapeType }: ShapeRegistryParams) {
  switch (shapeType.toLowerCase()) {
    case "circle":
      return Circle;
    case "rectangle":
      return Rectangle;
    case "trapezoid":
      return Trapezoid;
    case "diamond":
      return Diamond;
    case "hexagon":
      return Hexagon;
    case "parallelogram":
      return Parallelogram;
    case "triangle":
      return Triangle;
    default:
      return Circle;
  }
}
