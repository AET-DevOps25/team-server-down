"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import Project from "@/types/ProjectType";
import ProjectCard from "@/components/project-card/ProjectCard";

// fetch old porjects here
const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "fyfu",
      lastEdited: "Edited 5 minutes ago",
      preview: "blank",
    },
    {
      id: "2",
      title: "Untitled",
      lastEdited: "Edited 3 years ago",
      preview: "blank",
    },
    {
      id: "3",
      title: "Xhulla Jasimi's team library",
      lastEdited: "Edited 3 years ago",
      preview: "library",
      isTeamProject: true,
    },
  ]);

  const handleCreateProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "Untitled",
      lastEdited: "Just created",
      preview: "blank",
    };
    setProjects([newProject, ...projects]);
  };

  // must directly redirect you to /board
  const CreateProjectCard = () => (
    <div
      onClick={handleCreateProject}
      className="group relative bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer hover:bg-gray-50"
    >
      <div className="aspect-video p-4 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Plus className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-600 text-center">Blank board</h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-white">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-medium">My boards</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateProjectCard />
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
