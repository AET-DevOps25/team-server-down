"use client";
import { Palette } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import {
  useGetWhiteboardTitle,
  useUpdateWhiteboardTitle,
} from "@/hooks/api/whiteboard.api";
import { useRouter } from "next/navigation";

interface MenuBarProps {
  whiteboardId: number;
  isEditable?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({
  whiteboardId,
  isEditable = true,
}) => {
  const { data: whiteboardTitle } = useGetWhiteboardTitle(whiteboardId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(whiteboardTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const updateTitle = useUpdateWhiteboardTitle(whiteboardId);

  const cancelEdit = () => {
    setEditedTitle(whiteboardTitle);
    setIsEditing(false);
  };

  useEffect(() => {
    setEditedTitle(whiteboardTitle);
  }, [whiteboardTitle]);

  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (event: MouseEvent | PointerEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        cancelEdit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("pointerdown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("pointerdown", handleClickOutside, true);
    };
  }, [cancelEdit, isEditing]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const saveTitle = () => {
    const trimmedTitle = editedTitle?.trim();
    if (!trimmedTitle) {
      setEditedTitle(whiteboardTitle);
    } else if (trimmedTitle !== whiteboardTitle) {
      updateTitle.mutate(trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      saveTitle();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={menuBarRef}
      className="w-auto items-center rounded-md border border-gray-200 bg-white px-4 py-2 shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-1 font-medium">
        <div
          className="text-2xl font-bold hover:cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Palette className="text-gray-800" />
        </div>
        <div className="mx-2 h-8 w-px bg-gray-300"></div>
        {isEditing && isEditable ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={handleInputClick}
            className="tex rounded border border-blue-400 bg-white py-1 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            maxLength={50}
            aria-label="Whiteboard title"
          />
        ) : (
          <div
            className={`flex items-center gap-3 rounded py-1 font-medium ${isEditable ? "hover:bg-gray-100r cursor-pointer" : ""}`}
            onClick={handleRename}
            title="Click to edit whiteboard name"
          >
            {editedTitle}
            {!isEditable && (
              <span className="text-xs font-light text-gray-600">
                (view only)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
