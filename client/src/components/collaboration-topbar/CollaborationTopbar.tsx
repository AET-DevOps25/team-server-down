import { useGetMe } from "@/hooks/api/account.api";
import Avatar from "@/components/avatar/Avatar";
import React, { useState } from "react";
import AccessDialog from "@/components/access-dialog/AccessDialog";
import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetWhiteboardCollaborators } from "@/hooks/api/whiteboard.api";

interface CollaborationTopbarProps {
  whiteboardId: number;
}

const CollaborationTopbar = ({ whiteboardId }: CollaborationTopbarProps) => {
  const { data: user } = useGetMe();
  const { data: collaboratorsData } =
    useGetWhiteboardCollaborators(whiteboardId);

  const collaboratorsWithoutSelf = collaboratorsData?.filter(
    (collaborator) => collaborator.username !== user?.username,
  );

  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  return (
    <div className="flex gap-8">
      <div className="flex gap-2">
        <Avatar
          username={user?.username ?? ""}
          firstname={user?.firstName ?? ""}
          lastname={user?.lastName ?? ""}
          className="h-8 w-8"
          fallbackClassName="text-sm"
        />
        {collaboratorsWithoutSelf?.map((collaborator, i) => (
          <Avatar
            key={i}
            username={collaborator?.username ?? ""}
            firstname={collaborator?.firstName ?? ""}
            lastname={collaborator?.lastName ?? ""}
            className="h-8 w-8"
            fallbackClassName="text-sm"
          />
        ))}
      </div>
      <Button
        className="flex gap-3"
        variant="default"
        onClick={() => setIsInviteDialogOpen(true)}
      >
        <UsersIcon /> Share
      </Button>
      <AccessDialog
        currentUserId={user?.id}
        whiteboardId={whiteboardId}
        isOpen={isInviteDialogOpen}
        setIsOpen={setIsInviteDialogOpen}
      />
    </div>
  );
};

export default CollaborationTopbar;
