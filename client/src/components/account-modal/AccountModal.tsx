"use client";

import React, { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User } from "@/api/generated/api";
import { useGetMe } from "@/hooks/api/account.api";
import DeletionAlertDialog from "@/components/deletion-alert-dialog/DeletionAlertDialog";
import Avatar from "@/components/avatar/Avatar";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { data } = useGetMe();
  const user: User | undefined = data?.data;

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleConfirmDelete = () => {
    console.log("handle delete account");
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>Manage your account details</DialogDescription>
          </DialogHeader>

          <div className="my-4 flex flex-row space-x-10">
            <div className="h-full">
              <Avatar
                username={user?.firstName}
                className="h-20 w-20"
                fallbackClassName="text-4xl"
              />
            </div>

            <div className="items-center space-y-8">
              <div className="space-y-3">
                <div>
                  <h3 className="mb-2 text-sm font-medium text-gray-700">
                    Name
                  </h3>
                  <p className="text-base text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Change name
                </button>
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
          <div className="mb-2 border-t border-gray-200" />

          <button
            className="flex items-center space-x-2 text-red-600 transition-colors hover:text-red-700"
            onClick={() => setDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-sm font-medium">Delete account</span>
          </button>
        </DialogContent>
      </Dialog>

      <DeletionAlertDialog
        toDelete="account"
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
