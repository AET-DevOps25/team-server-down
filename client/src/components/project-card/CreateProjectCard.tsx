import { Plus } from "lucide-react";

interface CreateProjectCardProps {
  createProject: () => void;
}

export default function CreateProjectCard({
  createProject,
}: CreateProjectCardProps) {
  return (
    <div
      onClick={createProject}
      className="group relative bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-all duration-200 cursor-pointer hover:bg-gray-50"
    >
      <div className="aspect-video p-4 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Plus className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-600 text-center">Blank board</h3>
      </div>
    </div>
  );
}
