"use client";

import React, { useState, useRef, useEffect } from "react";
import formatDate from "@/util/formatDate";
import { useRouter } from "next/navigation";
import { WhiteboardResponse } from "@/api/main/generated";
import {
  useDeleteWhiteboard,
  useUpdateWhiteboardTitle,
} from "@/hooks/api/whiteboard.api";
import WhiteboardThumbnail from "@/components/whiteboard-card/whiteboard-card-components/WhiteboardThumbnail";
import WhiteboardEditPopover from "@/components/whiteboard-card/whiteboard-card-components/WhiteboardEditPopover";

export default function ProjectCard({ project }: { project: WhiteboardResponse }) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title!);
  const inputRef = useRef<HTMLInputElement>(null);

  const deleteWhiteboard = useDeleteWhiteboard();
  const updateTitle = useUpdateWhiteboardTitle(project.id!);

  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, editedTitle]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleRename = () => {
    setIsEditing(true);
    setEditedTitle(project.title!);
  };

  const handleDelete = () => {
    deleteWhiteboard.mutate(project.id!);
  };

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();
    if (trimmedTitle && trimmedTitle !== project.title) {
      updateTitle.mutate(trimmedTitle);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(project.title!);
      setIsEditing(false);
    }
  };

  return (
    <div
      className="group relative cursor-pointer rounded-lg border-2 border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 hover:shadow-md"
      onClick={() => router.push(`/board/${project.id}`)}
    >
      <div className="flex aspect-video items-center justify-center rounded-t-lg bg-gray-50 p-2">
        <WhiteboardThumbnail id={project.id!} title={project.title} />
      </div>
      <div className="flex flex-row justify-between p-4">
        <div className="mr-2 w-3/4 flex-1">
          <div className="mb-1 flex items-center space-x-2">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded border border-blue-500 bg-transparent px-1 py-0.5 font-medium text-gray-900 outline-none focus:ring-1 focus:ring-blue-500"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="truncate font-medium text-gray-900">
                {project.title}
              </h3>
            )}
          </div>

          <div className="text-sm text-gray-500">
            <span>Last edited: </span>
            <span>{formatDate(project.lastUpdatedAt!)}</span>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <WhiteboardEditPopover
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
