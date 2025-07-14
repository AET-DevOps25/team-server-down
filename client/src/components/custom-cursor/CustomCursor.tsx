"use client";
import CursorIcon from "@/assets/cursor.svg";
import generateColorFromString from "@/util/generateUserUniqueColor";

interface CustomCursorProps {
  username: string;
  firstname: string;
  lastname: string;
  position: { x: number; y: number };
  visible: boolean;
}

export default function CustomCursor({
  username,
  firstname,
  lastname,
  position,
  visible,
}: CustomCursorProps) {
  const concatenated = firstname.concat(lastname);
  const color = generateColorFromString(concatenated);

  return (
    <div
      className="cursor-icon pointer-events-none z-9999 transition-all duration-75 ease-linear"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <CursorIcon
        style={{
          fill: color,
          width: 24,
          height: 24,
        }}
      />

      <div
        style={{ backgroundColor: color }}
        className={
          "ml-4 rounded-full px-2 py-1 text-xs leading-4 font-bold text-white"
        }
      >
        {username}
      </div>
    </div>
  );
}
