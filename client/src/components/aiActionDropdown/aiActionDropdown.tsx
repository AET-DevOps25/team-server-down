import { Node } from "@xyflow/react";
import { Sparkles, Type, FileText, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface AIActionsProps {
  selectedNodes: Node[];
  onAIAction: (action: 'complete' | 'summarize' | 'rephrase') => void;
}

export function AIActionDropdown({ selectedNodes, onAIAction }: AIActionsProps) {
  const [loading, setLoading] = useState(false);
  const hasSelectedTextNodes = selectedNodes.some(node => node.type === 'text' || node.type === 'shapeNode');

  const handleAIAction = async (action: 'complete' | 'summarize' | 'rephrase') => {
    if (!hasSelectedTextNodes) return;
    
    setLoading(true);
    try {
      await onAIAction(action);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-1 left-4 z-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`p-2 transition-all ${
              hasSelectedTextNodes
                ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                : 'opacity-50 cursor-not-allowed'
            }`}
            disabled={!hasSelectedTextNodes || loading}
          >
            <Sparkles className={`h-25 w-25 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem 
            onClick={() => handleAIAction('complete')}
            className="cursor-pointer"
            disabled={loading}
          >
            <Type className="mr-2 h-4 w-4" />
            Complete Text
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleAIAction('summarize')}
            className="cursor-pointer"
            disabled={loading}
          >
            <FileText className="mr-2 h-4 w-4" />
            Summarize Text
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => handleAIAction('rephrase')}
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