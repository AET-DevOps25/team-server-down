import { X } from "lucide-react";

interface UserBadgeInterface {
  email: string;
  onDelete: (email: string) => void;
}

const EmailBadge = ({ email, onDelete }: UserBadgeInterface) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-gray-200 px-2 py-[0.5]">
      <X
        className="text-gray-700"
        strokeWidth={3}
        width={12}
        onClick={() => onDelete(email)}
      />
      <p className="text-xs">{email}</p>
    </div>
  );
};

export default EmailBadge;
