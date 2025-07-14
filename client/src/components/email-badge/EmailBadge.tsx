import { X } from "lucide-react";

interface UserBadgeInterface {
  email: string;
  onDelete: (email: string) => void;
  bgColor?: string;
  className?: string;
}

const EmailBadge = ({
  email,
  onDelete,
  bgColor,
  className,
}: UserBadgeInterface) => {
  return (
    <div
      style={{ backgroundColor: bgColor || "#E5E7EB" }}
      className={`inline-flex items-center gap-2 rounded-2xl px-2 py-[0.5] ${className}`}
    >
      <X
        className={bgColor ? "text-white" : "bg-gray-200 text-gray-700"}
        strokeWidth={3}
        width={12}
        onClick={() => onDelete(email)}
      />
      <p className="text-xs">{email}</p>
    </div>
  );
};

export default EmailBadge;
