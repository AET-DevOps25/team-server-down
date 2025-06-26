"use client";
import React from "react";
import ProjectCard from "@/components/project-card/ProjectCard";
import CreateProjectCard from "@/components/project-card/CreateProjectCard";
import { useWhiteboards } from "@/hooks/api/whiteboard.api";

const Dashboard = () => {
  const { data: projects = [] } = useWhiteboards();

  return (
    <div className="min-h-screen text-white">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-medium">My boards</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
