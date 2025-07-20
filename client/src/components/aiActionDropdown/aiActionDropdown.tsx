import {
  Sparkles,
  Type,
  FileText,
  RefreshCw,
  LoaderCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface AIActionsProps {
  disabled?: boolean;
  onAIAction: (action: "complete" | "summarize" | "rephrase") => void;
}

export function AIActionDropdown({
  disabled = false,
  onAIAction,
}: AIActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleAIAction = async (
    action: "complete" | "summarize" | "rephrase",
  ) => {
    if (disabled) return;

    setLoading(true);
    try {
      await onAIAction(action);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`p-2 transition-all ${
              disabled
                ? "cursor-not-allowed opacity-50"
                : "bg-purple-100 text-purple-600 hover:bg-purple-200 hover:text-purple-600"
            }`}
            disabled={disabled}
          >
            {loading ? (
              <LoaderCircle className="size-5 animate-spin" />
            ) : (
              <Sparkles className={`size-5 ${loading ? "animate-spin" : ""}`} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => handleAIAction("complete")}
            className="cursor-pointer"
            disabled={loading}
          >
            <Type className="mr-2 h-4 w-4" />
            Complete Text
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAIAction("summarize")}
            className="cursor-pointer"
            disabled={loading}
          >
            <FileText className="mr-2 h-4 w-4" />
            Summarize Text
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleAIAction("rephrase")}
            className="cursor-pointer"
            disabled={loading}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Rephrase Text
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
