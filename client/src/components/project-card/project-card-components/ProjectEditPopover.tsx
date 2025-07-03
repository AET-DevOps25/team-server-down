import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React, { ComponentType, SVGProps, useState } from "react";
import DeletionAlertDialog from "@/components/project-card/project-card-components/DeletionAlertDialog";

interface ProjectEditPopoverProps {
  onRename: () => void;
  onDelete: () => void;
}

interface PopoverOptionProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

function PopoverOption({ label, Icon, onClick }: PopoverOptionProps) {
  return (
    <div
      className="flex flex-row rounded-sm p-2 text-center text-gray-500 hover:cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <Icon className="mr-4 pl-1" strokeWidth={1.5} />
      <span className="py-auto">{label}</span>
    </div>
  );
}

export default function ProjectEditPopover({
  onRename,
  onDelete,
}: ProjectEditPopoverProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRename = () => {
    onRename();
    setPopoverOpen(false);
  };

  const handleDeleteClick = () => {
    setPopoverOpen(false);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setDialogOpen(false);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <button className="flex w-8 justify-center hover:cursor-pointer">
            <Ellipsis className="w-full rounded-sm px-2 py-1 text-gray-500 hover:bg-gray-100" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="-mt-2 w-52 px-2 py-3" align="start">
          <div className="flex flex-col gap-y-2">
            <PopoverOption
              label="Rename"
              Icon={Pencil}
              onClick={handleRename}
            />
            <PopoverOption
              label="Delete"
              Icon={Trash2}
              onClick={handleDeleteClick}
            />
          </div>
        </PopoverContent>
      </Popover>

      <DeletionAlertDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
