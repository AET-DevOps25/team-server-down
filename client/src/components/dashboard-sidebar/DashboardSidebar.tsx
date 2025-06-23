import UserDropdown from "@/components/UserDropdown/UserDropdown";
import { Clock, Home, Star } from "lucide-react";
import React from "react";

export default function DashboardSidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200 z-10">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-6">
          <UserDropdown />
        </div>

        <nav className="space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-blue-50 rounded-md">
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Recent</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer">
            <Star className="w-4 h-4" />
            <span className="text-sm">Starred</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
