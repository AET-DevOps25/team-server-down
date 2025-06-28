"use client";
import React from "react";
import ProjectCard from "@/components/project-card/ProjectCard";
import CreateProjectCard from "@/components/project-card/CreateProjectCard";
import { useWhiteboards } from "@/hooks/api/whiteboard.api";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/components/dashboard-sidebar/DashboardSidebar";
import Header from "@/components/header/Header";
import FilterBar from "@/components/filters/Filterbar";

const Dashboard = () => {
  const { data: projects = [] } = useWhiteboards();

  return (
    <div className="min-h-screen bg-white flex">
      <DashboardSidebar />

      <div className="flex flex-col flex-1 ml-64 h-screen">
        <Header />

        <div className="flex flex-col flex-1 p-6 overflow-hidden">
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Your Boards
            </h2>
            <FilterBar />
          </div>

          <div className="flex-1 mx-8 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <CreateProjectCard />
              {[...projects]
                  .sort((a, b) => new Date(b.lastEditedTime).getTime() - new Date(a.lastEditedTime).getTime())
                  .map((project) => (
                      <ProjectCard key={project.id} project={project} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
