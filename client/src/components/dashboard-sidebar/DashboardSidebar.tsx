import UserDropdown from "@/components/user-dropdown/UserDropdown";
import { Clock, Home, Star } from "lucide-react";
import React from "react";

export default function DashboardSidebar() {
  return (
    <div className="fixed top-0 left-0 z-10 h-full w-64 border-r border-gray-200 bg-gray-50">
      <div className="p-4">
        <div className="mb-6 flex items-center gap-2">
          <UserDropdown />
        </div>

        <nav className="space-y-1">
          <div className="flex items-center gap-3 rounded-md bg-blue-50 px-3 py-2 text-gray-900">
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">Home</span>
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Recent</span>
          </div>
          <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
            <Star className="h-4 w-4" />
            <span className="text-sm">Starred</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
