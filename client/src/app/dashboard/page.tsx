"use client";
import React from "react";
import ProjectCard from "@/components/project-card/ProjectCard";
import CreateProjectCard from "@/components/project-card/CreateProjectCard";
import { useWhiteboards } from "@/hooks/api/whiteboard.api";
import DashboardSidebar from "@/components/dashboard-sidebar/DashboardSidebar";
import Header from "@/components/header/Header";
import FilterBar from "@/components/filters/Filterbar";

const Dashboard = () => {
  const { data: projects = [] } = useWhiteboards();

  return (
    <div className="flex min-h-screen bg-white">
      <DashboardSidebar />

      <div className="ml-64 flex h-screen flex-1 flex-col">
        <Header />

        <div className="flex flex-1 flex-col overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-medium text-gray-900">
              Your Boards
            </h2>
            <FilterBar />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <CreateProjectCard />
              {[...projects]
                .sort(
                  (a, b) =>
                    new Date(b.lastUpdatedAt!).getTime() -
                    new Date(a.lastUpdatedAt!).getTime(),
                )
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
