import { Plus } from "lucide-react";
import { useCreateWhiteboard } from "@/hooks/api/whiteboard.api";
import generateWhiteboardName from "@/util/generateWhiteboardName";

export default function CreateWhiteboardCard() {
  const createMutation = useCreateWhiteboard();
  const title = generateWhiteboardName();
  const handleCreate = () => createMutation.mutate(title);

  return (
    <div
      onClick={handleCreate}
      className="group relative cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-white transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
    >
      <div className="flex aspect-video items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 transition-colors group-hover:bg-gray-200">
            <Plus className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-center font-medium text-gray-600">
          Create a new board
        </h3>
      </div>
    </div>
  );
}
