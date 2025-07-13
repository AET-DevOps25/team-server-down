import React from "react";
import {
  Avatar as ShadeCnAvatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import generateColorFromString from "@/util/generateUserUniqueColor";

interface PersonalAvatarProps {
  firstname: string;
  lastname: string;
  className?: string;
  fallbackClassName?: string;
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
