import { ReactNode } from "react";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";

interface TextStylingSelectorProps {
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
  onToggleBold: () => void;
  onToggleItalic: () => void;
  onToggleUnderline: () => void;
  onToggleStrikethrough: () => void;
}

interface TextStylingButtonProps {
  isToggle: boolean;
  onToggle: () => void;
  children: ReactNode;
}

function TextStylingButton({
  isToggle,
  onToggle,
  children,
}: TextStylingButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`rounded p-1 transition-colors hover:bg-gray-100 ${
        isToggle ? "bg-gray-200" : "bg-transparent"
      }`}
      title="Bold"
    >
      {children}
    </button>
  );
}

export default function TextStylingSelector({
  isBold,
  isItalic,
  isStrikethrough,
  isUnderline,
  onToggleItalic,
  onToggleUnderline,
  onToggleStrikethrough,
  onToggleBold,
}: TextStylingSelectorProps) {
  return (
    <div className="flex flex-row gap-1">
      <TextStylingButton isToggle={isBold} onToggle={onToggleBold}>
        <Bold
          size={16}
          className={isBold ? "text-gray-800" : "text-gray-600"}
        />
      </TextStylingButton>

      <TextStylingButton isToggle={isItalic} onToggle={onToggleItalic}>
        <Italic
          size={16}
          className={isItalic ? "text-gray-800" : "text-gray-600"}
        />
      </TextStylingButton>

      <TextStylingButton isToggle={isUnderline} onToggle={onToggleUnderline}>
        <Underline
          size={16}
          className={isUnderline ? "text-gray-800" : "text-gray-600"}
        />
      </TextStylingButton>

      <TextStylingButton
        isToggle={isStrikethrough}
        onToggle={onToggleStrikethrough}
      >
        <Strikethrough
          size={16}
          className={isStrikethrough ? "text-gray-800" : "text-gray-600"}
        />
      </TextStylingButton>
    </div>
  );
}
