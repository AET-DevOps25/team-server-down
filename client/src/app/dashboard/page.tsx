"use client";
import React from "react";
import ProjectCard from "@/components/project-card/ProjectCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createWhiteboard,
  getWhiteboards,
} from "@/app/dashboard/whiteboardApi";
import CreateProjectCard from "@/components/project-card/CreateProjectCard";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = 1; // TODO: Replace with real user ID

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["whiteboards", userId],
    queryFn: () => getWhiteboards(userId),
  });

  const createMutation = useMutation({
    mutationFn: () => createWhiteboard(userId, "Untitled"),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ["whiteboards", userId] });
      router.push(`/board/${newProject.id}`);
    },
  });

  const handleCreateProject = () => {
    createMutation.mutate();
  };

  return (
    <div className="min-h-screen text-white">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-xl font-medium">My boards</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <CreateProjectCard createProject={handleCreateProject} />
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
