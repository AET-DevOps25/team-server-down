import React, { useMemo } from "react";

const COLORS = [
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-red-100",
  "bg-orange-100",
  "bg-teal-100",
];

const EMOJI_PATTERNS = [
  "🧠",
  "📊",
  "✏️",
  "🔍",
  "💡",
  "🚀",
  "🎨",
  "📝",
  "🧩",
  "📈",
  "🔮",
  "🌟",
];

const PATTERN_TYPES = [
  "dots",
  "lines",
  "waves",
  "grid",
  "triangles",
  "circles",
];

interface ProjectThumbnailProps {
  id: number;
  title?: string;
}

export default function WhiteboardThumbnail({
  id,
  title,
}: ProjectThumbnailProps) {
  const visualElements = useMemo(() => {
    const idSum =
      id
        .toString()
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;

    return {
      color: COLORS[idSum % COLORS.length],

      emoji: EMOJI_PATTERNS[idSum % EMOJI_PATTERNS.length],

      patternType: PATTERN_TYPES[idSum % PATTERN_TYPES.length],

      initials: title
        ? title
            .split(" ")
            .map((word) => word[0]?.toUpperCase() || "")
            .join("")
            .slice(0, 2)
        : "?",

      shapeCount: (idSum % 5) + 3,
    };
  }, [id, title]);

  switch (visualElements.patternType) {
    case "dots":
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color}`}
        >
          <div className="relative h-4/5 w-4/5">
            {[...Array(visualElements.shapeCount)].map((_, i) => (
              <div
                key={i}
                className="absolute h-3 w-3 rounded-full bg-gray-400 opacity-60"
                style={{
                  left: `${(i * 25) % 80}%`,
                  top: `${(i * 20) % 70}%`,
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-700">
              {visualElements.initials}
            </div>
          </div>
        </div>
      );

    case "lines":
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color}`}
        >
          <div className="relative h-4/5 w-4/5">
            {[...Array(visualElements.shapeCount)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 rounded-full bg-gray-400 opacity-60"
                style={{
                  width: `${30 + i * 10}%`,
                  left: "10%",
                  top: `${20 + i * 15}%`,
                }}
              />
            ))}
            <div className="absolute top-4 right-4 text-2xl">
              {visualElements.emoji}
            </div>
          </div>
        </div>
      );

    case "waves":
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color} overflow-hidden`}
        >
          <div className="relative h-full w-full">
            {[...Array(visualElements.shapeCount)].map((_, i) => (
              <div
                key={i}
                className="absolute h-16 w-64 rounded-full bg-white opacity-20"
                style={{
                  left: `${i * 30 - 30}%`,
                  top: `${60 + i * 10}%`,
                  transform: "rotate(-20deg)",
                }}
              />
            ))}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
              {visualElements.emoji}
            </div>
          </div>
        </div>
      );

    case "grid":
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color}`}
        >
          <div className="grid h-4/5 w-4/5 grid-cols-3 grid-rows-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`rounded ${i === 4 ? "bg-gray-600" : "bg-gray-300"} opacity-40`}
              />
            ))}
          </div>
          <div className="absolute text-xl font-bold text-gray-700">
            {visualElements.initials}
          </div>
        </div>
      );

    case "triangles":
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color}`}
        >
          <div className="relative h-4/5 w-4/5">
            {[...Array(visualElements.shapeCount)].map((_, i) => (
              <div
                key={i}
                className="absolute h-0 w-0 border-r-[20px] border-b-[30px] border-l-[20px] border-r-transparent border-b-gray-400 border-l-transparent opacity-50"
                style={{
                  left: `${(i * 20) % 80}%`,
                  top: `${(i * 25) % 70}%`,
                  transform: `rotate(${i * 45}deg)`,
                }}
              />
            ))}
            <div className="absolute right-4 bottom-4 text-2xl">
              {visualElements.emoji}
            </div>
          </div>
        </div>
      );

    case "circles":
    default:
      return (
        <div
          className={`flex h-full w-full items-center justify-center rounded ${visualElements.color}`}
        >
          <div className="bg-opacity-70 relative flex h-20 w-20 items-center justify-center rounded-full bg-white">
            <span className="text-3xl">{visualElements.emoji}</span>
          </div>
          <div className="absolute right-3 bottom-3 text-lg font-medium text-gray-700">
            {visualElements.initials}
          </div>
        </div>
      );
  }
}
