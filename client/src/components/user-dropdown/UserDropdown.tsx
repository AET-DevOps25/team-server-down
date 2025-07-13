"use client";
import { signOut as nextAuthSignOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserIcon } from "lucide-react";
import React, { useState } from "react";
import AccountModal from "@/components/account-modal/AccountModal";
import { useGetMe } from "@/hooks/api/account.api";
import Avatar from "@/components/avatar/Avatar";

export default function UserDropdown() {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const { data: user } = useGetMe();

  const session = useSession();

  async function signOut() {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sso-sign-out`, {
        headers: {
          // @ts-ignore
          refresh_token: session.data?.refreshToken,
        },
      });
    } catch (error) {
      console.error("Error occurred during sign out:", error);
    }
    await nextAuthSignOut();
  }

  return (
    <>
      <DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex flex-row items-center gap-2">
            <button className="flex items-center gap-2 rounded-full p-1 hover:cursor-pointer hover:bg-gray-100 focus:outline-none">
              <Avatar
                firstname={user?.firstName ?? ""}
                lastname={user?.lastName ?? ""}
                className="h-8 w-8"
                fallbackClassName="text-sm"
              />
            </button>
            <span>Hi {user?.username}!</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="mt-3 w-56">
          <div className="flex flex-col items-center gap-3 p-3">
            <Avatar
              firstname={user?.firstName ?? ""}
              lastname={user?.lastName ?? ""}
              className="h-10 w-10"
            />
            <span className="font-medium">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2"
            onClick={() => setIsAccountModalOpen(true)}
          >
            <UserIcon className="h-4 w-4" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center gap-3 px-3 py-2"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />
    </>
  );
}
