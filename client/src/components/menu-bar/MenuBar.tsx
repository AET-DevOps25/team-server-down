"use client";
import { BrainCircuit } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import {
  useGetWhiteboardTitle,
  useUpdateWhiteboardTitle,
} from "@/hooks/api/whiteboard.api";

interface MenuBarProps {
  whiteboardId: number;
}

const MenuBar: React.FC<MenuBarProps> = ({ whiteboardId }) => {
  const { data: whiteboardTitle } = useGetWhiteboardTitle(whiteboardId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(whiteboardTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

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
      className="w-140 items-center rounded-md border border-gray-200 bg-white px-4 py-2 shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold">
          <BrainCircuit />
        </div>
        <div className="mx-2 h-8 w-px bg-gray-300"></div>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={handleInputClick}
            className="rounded border border-blue-400 bg-white px-2 py-1 text-lg font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            maxLength={50}
            aria-label="Whiteboard title"
          />
        ) : (
          <div
            className="cursor-pointer rounded px-2 py-1 text-lg font-medium hover:bg-gray-100"
            onClick={handleRename}
            title="Click to edit whiteboard name"
          >
            {editedTitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
