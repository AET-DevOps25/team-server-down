import { FileText } from "lucide-react";
import Project from "@/types/ProjectType";
import ProjectEditPopover from "@/components/project-card/project-card-components/ProjectEditPopover";
import { useState, useRef, useEffect } from "react";

export default function ProjectCard({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleSave();
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
    setEditedTitle(project.title);
  };

  const handleSave = () => {
    project.title = editedTitle.trim() || project.title;
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditedTitle(project.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-md">
      <div className="aspect-video p-4 flex items-center justify-center bg-gray-50 rounded-t-lg">
        {/*theoretically the img of the white board*/}
        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-row p-4 justify-between">
        <div className="flex-1 mr-2 w-3/4">
          <div className="flex items-center space-x-2 mb-1">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="font-medium text-gray-900 bg-transparent border border-blue-500 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-blue-500 w-full"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="font-medium text-gray-900 truncate">
                {project.title}
              </h3>
            )}
          </div>
          <p className="text-sm text-gray-500">{project.lastEdited}</p>
        </div>
        <ProjectEditPopover onRename={handleRename} />
      </div>
    </div>
  );
}
