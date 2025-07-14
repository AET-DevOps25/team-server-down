import { X } from "lucide-react";

interface UserBadgeInterface {
  email: string;
  onDelete: (email: string) => void;
  className? :string
}

const EmailBadge = ({ email, onDelete, className }: UserBadgeInterface) => {
  return (
    <div className={`inline-flex items-center gap-2 rounded-2xl px-2 py-[0.5] ${className}`}>
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
