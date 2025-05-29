import React, { useState } from 'react';
import { NodeProps } from '@xyflow/react';
import { Bold, Italic, Underline, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextNodeStyle {
  color?: string;
}

export function TextNode({ data }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(data.label as string);
  const [style, setStyle] = useState<TextNodeStyle>(data.style || {});
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [showFormatting, setShowFormatting] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const updateStyle = () => {
    const computedStyle: React.CSSProperties = {
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none',
      color: style.color || '#000000',
    };
    data.style = computedStyle;
    return computedStyle;
  };

  const handleColorChange = (color: string) => {
    const newStyle = { ...style, color };
    setStyle(newStyle);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSettings(!showSettings)}
        className="absolute -right-10 -top-8 h-7 w-7 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {showSettings ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Button>

      {showSettings && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFormatting(!showFormatting)}
          className="absolute -left-10 top-2 h-7 w-7 p-1"
        >
          <Settings className="h-4 w-4" />
        </Button>
      )}

      {showFormatting && (
        <div className="absolute -left-32 top-0 flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBold(!isBold)}
            className={`h-7 w-7 p-1 ${isBold ? 'bg-slate-200' : ''}`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsItalic(!isItalic)}
            className={`h-7 w-7 p-1 ${isItalic ? 'bg-slate-200' : ''}`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsUnderline(!isUnderline)}
            className={`h-7 w-7 p-1 ${isUnderline ? 'bg-slate-200' : ''}`}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <input
            type="color"
            onChange={(e) => handleColorChange(e.target.value)}
            value={style.color || '#000000'}
            className="w-7 h-7 rounded cursor-pointer"
          />
        </div>
      )}

      <div
        className="p-4 border rounded bg-white min-w-[100px] shadow-sm"
        onDoubleClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
      >
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              data.label = text;
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsEditing(false);
                data.label = text;
              }
            }}
            autoFocus
            className="bg-transparent outline-none w-full border-none p-0"
            style={updateStyle()}
          />
        ) : (
          <p style={updateStyle()}>{text}</p>
        )}
      </div>
    </div>
  );
}
