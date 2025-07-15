import React from "react";
import { Button } from "@/components/ui/button";
import EmailBadge from "@/components/email-badge/EmailBadge";
import { UserResponse } from "@/api/main/generated";
import generateColorFromString from "@/util/generateUserUniqueColor";

interface ManageAccessTabProps {
  collaborators: UserResponse[];
  onRemoveCollaborator: (email: string) => void;
  onSaveChanges: () => void;
  isButtonDisabled: boolean;
}

export default function ManageAccessTab({
  collaborators,
  onRemoveCollaborator,
  onSaveChanges,
  isButtonDisabled,
}: ManageAccessTabProps) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {collaborators.length > 0 ? (
          collaborators.map((collaborator, index) => {
            const color = generateColorFromString(collaborator.username ?? "");

            return (
              <EmailBadge
                key={index}
                email={collaborator.email!}
                onDelete={onRemoveCollaborator}
                bgColor={color}
                className={"text-white"}
              />
            );
          })
        ) : (
          <div className="font-thin text-gray-500 italic">
            You&#39;re the only collaborator
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          className="w-32"
          variant="default"
          disabled={isButtonDisabled}
          onClick={onSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}
