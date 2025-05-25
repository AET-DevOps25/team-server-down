import React, { useState } from 'react';
import { NodeProps } from '@xyflow/react';
import { Bold, Italic, Underline, Settings, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TextStyle {
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  textDecoration?: 'none' | 'underline';
  color?: string;
}

export function Text({ data }: NodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(data.label as string);
  const [style, setStyle] = useState<TextStyle>(data.style || {});
  const [showFormatting, setShowFormatting] = useState(false);
  const [showSettings, setShowSettings] = useState(true);

  const handleStyleChange = (styleProperty: keyof TextStyle, value: TextStyle[keyof TextStyle]) => {
    const newStyle = { ...style };
    if (styleProperty === 'fontWeight') {
      newStyle.fontWeight = newStyle.fontWeight === value ? 'normal' : value as 'normal' | 'bold';
    } else if (styleProperty === 'fontStyle') {
      newStyle.fontStyle = newStyle.fontStyle === value ? 'normal' : value as 'normal' | 'italic';
    } else if (styleProperty === 'textDecoration') {
      newStyle.textDecoration = newStyle.textDecoration === value ? 'none' : value as 'none' | 'underline';
    }
    setStyle(newStyle);
    data.style = newStyle;
  };

  const handleColorChange = (color: string) => {
    const newStyle = { ...style, color };
    setStyle(newStyle);
    data.style = newStyle;
  };

  return (
    <div className="relative group">
      {/* Toggle Settings Visibility Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowSettings(!showSettings)}
        className="absolute -right-10 -top-8 h-7 w-7 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {showSettings ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </Button>
      {/* Settings button to toggle formatting menu */}
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

      {/* Formatting Menu - Visible when showFormatting is true */}
      {showFormatting && (
        <div className="absolute -left-32 top-0 flex flex-col gap-1 p-2 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStyleChange('fontWeight', 'bold')}
            className={`h-7 w-7 p-1 ${style.fontWeight === 'bold' ? 'bg-slate-200' : ''}`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStyleChange('fontStyle', 'italic')}
            className={`h-7 w-7 p-1 ${style.fontStyle === 'italic' ? 'bg-slate-200' : ''}`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleStyleChange('textDecoration', 'underline')}
            className={`h-7 w-7 p-1 ${style.textDecoration === 'underline' ? 'bg-slate-200' : ''}`}
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

      {/* Text Content */}
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
            style={style}
          />
        ) : (
          <p style={style}>{text}</p>
        )}
      </div>
    </div>
  );
}