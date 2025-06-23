"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowUp,
  Code,
  Download,
  HelpCircle,
  LogOut,
  Settings,
  ShoppingCart,
  Trash2,
  User,
} from "lucide-react";
import React, { useState } from "react";

{
  /* User dropdown */
}

export default function UserDropdown() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const username = "Max Mustermann"; // TODO change
  const avatarLetter = username.charAt(0);
  const firstName = "Max"; //TODO chnage

  return (
    <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-row items-center gap-2">
          <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 focus:outline-none hover:cursor-pointer">
            <Avatar className="w-8 h-8 bg-blue-600">
              <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">
                {avatarLetter}
              </AvatarFallback>
            </Avatar>
          </button>
          <span>Hey {firstName} !</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 mt-3">
        <div className="flex flex-col items-center gap-3 p-3 ">
          <Avatar className="w-10 h-10 bg-blue-600">
            <AvatarFallback className="bg-blue-600 text-white font-medium">
              {avatarLetter}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{username}</span>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
          <User className="w-4 h-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 px-3 py-2">
          <LogOut className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
