import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import React, { ComponentType, SVGProps, useState } from "react";

interface ProjectEditPopoverProps {
  onRename: () => void;
  onDelete?: () => void;
}

interface PopoverOptionProps {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

function PopoverOption({ label, Icon, onClick }: PopoverOptionProps) {
  return (
    <div
      className="flex flex-row p-2 rounded-sm text-gray-500 text-center hover:cursor-pointer hover:bg-gray-100"
      onClick={onClick}
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
  const [open, setOpen] = useState(false);

  const handleRename = () => {
    onRename();
    setOpen(false);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex justify-center w-8 hover:cursor-pointer"
          onClick={(e) => e.stopPropagation()} // Prevent card click
        >
          <Ellipsis className="text-gray-500 w-full py-1 px-2 hover:bg-gray-100 rounded-sm" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-52 -mt-2 px-2 py-3" align="start">
        <div className="flex flex-col gap-y-2">
          <PopoverOption label="Rename" Icon={Pencil} onClick={handleRename} />
          <PopoverOption label="Delete" Icon={Trash2} onClick={handleDelete} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
