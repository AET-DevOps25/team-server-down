import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
      className="flex flex-row p-2 rounded-sm text-gray-500 text-center hover:cursor-pointer hover:bg-gray-100"
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
    >
      <Icon className="pl-1 mr-4" strokeWidth={1.5} />
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
          <button className="flex justify-center w-8 hover:cursor-pointer">
            <Ellipsis className="text-gray-500 w-full py-1 px-2 hover:bg-gray-100 rounded-sm" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-52 -mt-2 px-2 py-3" align="start">
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
