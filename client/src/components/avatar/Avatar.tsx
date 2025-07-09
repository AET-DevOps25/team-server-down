import React from "react";
import {
  Avatar as ShadeCnAvatar,
  AvatarFallback,
} from "@/components/ui/avatar"; // adjust as needed

interface PersonalAvatarProps {
  username?: string;
  className?: string;
  fallbackClassName?: string;
}

export default function Avatar({
  username,
  className = "",
  fallbackClassName = "",
}: PersonalAvatarProps) {
  return (
    <ShadeCnAvatar className={`h-10 w-10 bg-blue-600 ${className}`}>
      <AvatarFallback
        className={`bg-blue-600 font-medium text-white ${fallbackClassName}`}
      >
        {username?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </ShadeCnAvatar>
  );
}
