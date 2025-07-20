import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmailBadge from "@/components/email-badge/EmailBadge";

interface InviteTabProps {
  pendingInvites: string[];
  onAddInvite: (email: string) => void;
  onRemoveInvite: (email: string) => void;
  onSendInvitations: () => void;
}

export default function InviteTab({
  pendingInvites,
  onAddInvite,
  onRemoveInvite,
  onSendInvitations,
}: InviteTabProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      onAddInvite(e.currentTarget.value.trim());
      e.currentTarget.value = "";
    }
  };

  return (
    <>
      <div className="text-md text-gray-800">
        Share with viewers (read-only access)
      </div>
      <Input
        placeholder="Enter emails here"
        onKeyDown={handleKeyDown}
        aria-label="Email input for invitations"
      />
      <div className="flex flex-wrap gap-2">
        {pendingInvites.map((email, index) => (
          <EmailBadge
            key={`invite-${email}-${index}`}
            email={email}
            onDelete={onRemoveInvite}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          className="w-32"
          variant="default"
          disabled={pendingInvites.length === 0}
          onClick={onSendInvitations}
        >
          Send invitations
        </Button>
      </div>
    </>
  );
}
