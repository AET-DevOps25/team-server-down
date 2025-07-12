"use client";

import React from "react";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetMe } from "@/hooks/api/account.api";
import Avatar from "@/components/avatar/Avatar";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { data: user } = useGetMe();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>View your account details</DialogDescription>
        </DialogHeader>

        <div className="my-4 flex flex-row space-x-10 px-4">
          <div className="h-full">
            <Avatar
              firstname={user?.firstName ?? ""}
              lastname={user?.lastName ?? ""}
              className="h-20 w-20"
              fallbackClassName="text-4xl"
            />
          </div>

          <div className="items-center space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Username
              </h3>
              <p className="text-base text-gray-900">{user?.username}</p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-700">Name</h3>
              <p className="text-base text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Email</h3>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-base text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
