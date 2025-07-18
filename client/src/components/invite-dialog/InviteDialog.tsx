import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmailBadge from "@/components/email-badge/EmailBadge";
import { useInviteCollaboratorsToWhiteboard } from "@/hooks/api/whiteboard.api";

interface InviteDialogProps {
  whiteboardId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const InviteDialog = ({
  whiteboardId,
  isOpen,
  setIsOpen,
}: InviteDialogProps) => {
  const [invitees, setInvitees] = useState<string[]>([]);

  const inviteCollaborators = useInviteCollaboratorsToWhiteboard();

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const inputValue = e.currentTarget.value;
      setInvitees([...invitees, inputValue]);

      e.currentTarget.value = "";
    }
  }

  function onDeleteEmailBadge(email: string) {
    setInvitees((prev) => prev.filter((inv) => inv !== email));
  }

  function onSendInvitationsClick() {
    inviteCollaborators.mutate({ whiteboardId, emails: invitees });
    setInvitees([]);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
        </DialogHeader>
        <Input
          aria-selected="true"
          placeholder="Enter emails here"
          onKeyDown={(e) => onInputKeyDown(e)}
        />
        <div className="flex flex-wrap gap-2">
          {invitees.map((invitee, i) => (
            <EmailBadge key={i} email={invitee} onDelete={onDeleteEmailBadge} />
          ))}
        </div>
        <div className="flex justify-end">
          <Button
            className="w-32"
            variant="default"
            disabled={invitees.length === 0}
            onClick={onSendInvitationsClick}
          >
            Send invitations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
