import React from "react";
import { Button } from "@/components/ui/button";
import EmailBadge from "@/components/email-badge/EmailBadge";
import { UserResponse } from "@/api/main/generated";

interface ManageAccessTabProps {
  collaborators: UserResponse[];
  onRemoveCollaborator: (email: string) => void;
  onSaveChanges: () => void;
  originalCollaboratorCount: number;
}

export default function ManageAccessTab ({
                                                           collaborators,
                                                           onRemoveCollaborator,
                                                           onSaveChanges,
                                                           originalCollaboratorCount,
                                                         }: ManageAccessTabProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {collaborators.map((collaborator, index) => {

          // const color = gene

          return (
          <EmailBadge
          key={index}
        email={collaborator.email!}
        onDelete={onRemoveCollaborator}
      />
      )})}
      </div>
      <div className="flex justify-end">
        <Button
          className="w-32"
          variant="default"
          disabled={collaborators.length === originalCollaboratorCount}
          onClick={onSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};
