"use client";
import React, { useState } from "react";
import WhiteboardCard from "@/components/whiteboard-card/WhiteboardCard";
import CreateWhiteboardCard from "@/components/whiteboard-card/CreateWhiteboardCard";
import { useWhiteboards } from "@/hooks/api/whiteboard.api";
import Header from "@/components/header/Header";
import FilterBar from "@/components/filters/Filterbar";
import { useSortedWhiteboards } from "@/hooks/useSortedWhiteboards";
import { Clock, Home } from "lucide-react";
import UserDropdown from "@/components/user-dropdown/UserDropdown";

const Dashboard = () => {
  const { data: whiteboards = [] } = useWhiteboards();
  const { sortedWhiteboards, sortBy, setSortBy } =
    useSortedWhiteboards(whiteboards);
  const [activeSection, setActiveSection] = useState<"home" | "recent">("home");

  const recentWhiteboards = React.useMemo(() => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return whiteboards
      .filter((board) => {
        const lastEditDate = board.lastUpdatedAt
          ? new Date(board.lastUpdatedAt)
          : board.createdAt
            ? new Date(board.createdAt)
            : null;

        return lastEditDate && lastEditDate > oneWeekAgo;
      })
      .sort((a, b) => {
        const dateA = a.lastUpdatedAt
          ? new Date(a.lastUpdatedAt)
          : new Date(a.createdAt || 0);
        const dateB = b.lastUpdatedAt
          ? new Date(b.lastUpdatedAt)
          : new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });
  }, [whiteboards]);

  return (
    <div className="flex min-h-screen bg-white">
      <div className="fixed top-0 left-0 z-10 h-full w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <div className="mb-6 flex items-center gap-2">
            <UserDropdown />
          </div>

          <nav className="space-y-1">
            <div
              className={`flex cursor-pointer items-center gap-4 rounded-md px-3 py-2 ${
                activeSection === "home"
                  ? "bg-blue-50 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveSection("home")}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </div>

            <div
              className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 ${
                activeSection === "recent"
                  ? "bg-blue-50 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={() => setActiveSection("recent")}
            >
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5" />
                <span>Recent</span>
              </div>
              <span className="text-sm text-gray-400">
                {recentWhiteboards.length > 0 ? recentWhiteboards.length : ""}
              </span>
            </div>
          </nav>
        </div>
      </div>

      <div className="ml-64 flex h-screen flex-1 flex-col">
        <Header />

        <div className="flex flex-1 flex-col overflow-hidden p-6">
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-medium text-gray-900">
              {activeSection === "home" ? "Your Boards" : "Recent Boards"}
            </h2>
            {activeSection === "home" && (
              <FilterBar sortBy={sortBy} onSortChange={setSortBy} />
            )}
          </div>

          <div className="flex-1 overflow-y-auto">
            {activeSection === "home" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <CreateWhiteboardCard />
                {sortedWhiteboards.map((project) => (
                  <WhiteboardCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {recentWhiteboards.length > 0 ? (
                  recentWhiteboards.map((project) => (
                    <WhiteboardCard key={project.id} project={project} />
                  ))
                ) : (
                  <div className="col-span-full flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                      <Clock className="mx-auto h-8 w-8 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No recent boards
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Boards edited or created in the last 7 days will appear
                        here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
