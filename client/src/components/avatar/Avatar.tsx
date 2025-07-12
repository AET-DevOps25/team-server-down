import React from "react";
import {
  Avatar as ShadeCnAvatar,
  AvatarFallback,
} from "@/components/ui/avatar";

interface PersonalAvatarProps {
  firstname: string;
  lastname: string;
  className?: string;
  fallbackClassName?: string;
}

// edit: deterministic way to calculate color for avatar
function getHashOfString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function normalizeHash(hash: number, min: number, max: number): number {
  return Math.floor((hash % (max - min)) + min);
}

function generateColorFromString(text: string): string {
  const hash = getHashOfString(text);

  const hue = normalizeHash(hash, 0, 360);
  const saturation = normalizeHash(hash, 50, 75);
  const lightness = normalizeHash(hash, 25, 60);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function Avatar({
  firstname,
  lastname,
  className = "",
  fallbackClassName = "",
}: PersonalAvatarProps) {
  const concatenated = firstname.concat(lastname);
  const color = generateColorFromString(concatenated);
  return (
    <ShadeCnAvatar className={`h-10 w-10 ${className}`}>
      <AvatarFallback
        style={{ backgroundColor: color }}
        className={`font-medium text-white ${fallbackClassName}`}
      >
        {firstname.charAt(0).toUpperCase()}
        {lastname.charAt(0).toUpperCase()}
      </AvatarFallback>
    </ShadeCnAvatar>
  );
}
