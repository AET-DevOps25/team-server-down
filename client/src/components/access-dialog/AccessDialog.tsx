import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useGetWhiteboardCollaborators,
  useInviteCollaboratorsToWhiteboard,
  useRemoveCollaboratorsFromWhiteboard,
} from "@/hooks/api/whiteboard.api";
import { UserResponse } from "@/api/main/generated";
import InviteTab from "@/components/access-dialog/access-dialog-components/InviteTab";
import ManageAccessTab from "@/components/access-dialog/access-dialog-components/ManageAccessTab";

type TabType = "invite" | "manage";

interface InviteDialogProps {
  whiteboardId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface TabButtonProps {
  isActive: boolean;
  label: string;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, label, onClick }) => (
  <button
    className={`px-1 pb-2 ${
      isActive ? "border-primary text-primary border-b-2" : "text-gray-500"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

const AccessDialog: React.FC<InviteDialogProps> = ({
  whiteboardId,
  isOpen,
  setIsOpen,
}) => {
  const [pendingInvites, setPendingInvites] = useState<string[]>([]);
  const [activeCollaborators, setActiveCollaborators] = useState<
    UserResponse[]
  >([]);
  const [removedCollaborators, setRemovedCollaborators] = useState<
    UserResponse[]
  >([]);

  const [activeTab, setActiveTab] = useState<TabType>("invite");

  const inviteCollaborators = useInviteCollaboratorsToWhiteboard();
  const removeCollaborators = useRemoveCollaboratorsFromWhiteboard();
  const { data: collaborators } = useGetWhiteboardCollaborators(whiteboardId);

  useEffect(() => {
    if (collaborators) {
      setActiveCollaborators(collaborators);
      setRemovedCollaborators([]);
    }
  }, [collaborators]);

  const handleAddInvite = (email: string) => {
    setPendingInvites((prev) => [...prev, email]);
  };

  const handleRemoveInvite = (email: string) => {
    setPendingInvites((prev) => prev.filter((inv) => inv !== email));
  };

  const handleSendInvitations = () => {
    inviteCollaborators.mutate({ whiteboardId, emails: pendingInvites });
    setPendingInvites([]);
    setIsOpen(false);
  };

  const handleRemoveCollaborator = (email: string) => {
    const collaboratorToRemove = activeCollaborators.find(
      (collaborator) => collaborator.email === email,
    );

    if (collaboratorToRemove) {
      setRemovedCollaborators((prev) => [...prev, collaboratorToRemove]);
      setActiveCollaborators((prev) =>
        prev.filter((collaborator) => collaborator.email !== email),
      );
    }
  };

  const handleSaveCollaboratorChanges = () => {
    const userIds = removedCollaborators
      .filter((collaborator) => collaborator.id)
      .map((collaborator) => collaborator.id!);
    removeCollaborators.mutate({ whiteboardId, userIds });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle> Dummy Title</DialogTitle>
        </DialogHeader>
        <div className="mb-4 flex space-x-4 border-b">
          <TabButton
            isActive={activeTab === "invite"}
            label="Invite"
            onClick={() => setActiveTab("invite")}
          />
          <TabButton
            isActive={activeTab === "manage"}
            label="Manage Access"
            onClick={() => setActiveTab("manage")}
          />
        </div>

        {activeTab === "invite" ? (
          <InviteTab
            pendingInvites={pendingInvites}
            onAddInvite={handleAddInvite}
            onRemoveInvite={handleRemoveInvite}
            onSendInvitations={handleSendInvitations}
          />
        ) : (
          <ManageAccessTab
            collaborators={activeCollaborators}
            onRemoveCollaborator={handleRemoveCollaborator}
            onSaveChanges={handleSaveCollaboratorChanges}
            originalCollaboratorCount={collaborators?.length ?? 0}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AccessDialog;
