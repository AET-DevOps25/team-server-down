import { useGetMe } from "@/hooks/api/account.api";
import Avatar from "@/components/avatar/Avatar";
import React, { useState } from "react";
import AccessDialog from "@/components/access-dialog/AccessDialog";
import { UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetWhiteboardCollaborators } from "@/hooks/api/whiteboard.api";

interface CollaborationTopbarProps {
  whiteboardId: number;
  userActivity: Record<string, boolean>;

  isSharable?: boolean;
}

const CollaborationTopbar = ({
  whiteboardId,
  userActivity,

  isSharable = true,
}: CollaborationTopbarProps) => {
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
        {collaboratorsWithoutSelf?.map((collaborator, i) => {
          if (!collaborator?.username) return null;
          const isInactive =
            collaborator.username in userActivity &&
            !userActivity[collaborator.username];

          return (
            <Avatar
              key={i}
              username={collaborator?.username ?? ""}
              firstname={collaborator?.firstName ?? ""}
              lastname={collaborator?.lastName ?? ""}
              className={`h-8 w-8 ${isInactive ? "opacity-70 grayscale-25" : ""}`}
              fallbackClassName="text-sm"
            />
          );
        })}
      </div>
      {isSharable && (
        <Button
          className="flex gap-3"
          variant="default"
          onClick={() => setIsInviteDialogOpen(true)}
        >
          <UsersIcon /> Share
        </Button>
      )}
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
