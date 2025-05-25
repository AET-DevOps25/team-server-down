export interface ShapeNodeProperties {
  color: string;
  borderColor: string;
  borderWidth?: number;
  borderOpacity?: number;
  opacity?: number;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  isBold: boolean;
  isItalic: boolean;
  isStrikethrough: boolean;
  isUnderline: boolean;
}

// constants:
export const fontSizes = [10, 12, 14, 18, 24, 36, 48, 64, 80, 144, 288];

export const predefinedColors = [
  "#FFFFFF",
  "#FFF9C4",
  "#FFCC80",
  "#FFAB91",
  "#C8E6C9",
  "#B3E5FC",
  "#D1C4E9",
  "#FFF176",
  "#FFAB40",
  "#FF7043",
  "#4CAF50",
  "#2196F3",
  "#9575CD",
  "#8D6E63",
  "#5D4037",
  "#B71C1C",
  "#1B5E20",
  "#EEEEEE",
  "#6C0F0F",
  "#000000",
];

export const allFonts: { [key: string]: string } = {
  "Abril Fatface": "'Abril Fatface', serif",
  Arial: "Arial, sans-serif",
  Caveat: "'Caveat', cursive",
  "EB Garamond": "'EB Garamond', serif",
  Georgia: "Georgia, serif",
  Helvetica: "Helvetica, sans-serif",
  Inter: "'Inter', sans-serif",
  Lato: "'Lato', sans-serif",
  Montserrat: "'Montserrat', sans-serif",
  "Open Sans": "'Open Sans', sans-serif",
  "Playfair Display": "'Playfair Display', serif",
  Poppins: "'Poppins', sans-serif",
  Roboto: "'Roboto', sans-serif",
  "Times New Roman": "'Times New Roman', Times, serif",
};

export const getFontStyle = (fontName: string) => {
  return allFonts[fontName] || "sans-serif";
};

export const defaultShapeNodeProperties: ShapeNodeProperties = {
  color: "#FFCC80",
  borderColor: "#FFAB40",
  borderWidth: 3,
  borderOpacity: 1,
  opacity: 1,
  textColor: "#4A4A4A",
  fontSize: 16,
  fontFamily: "Arial",
  isBold: false,
  isItalic: false,
  isStrikethrough: false,
  isUnderline: false,
};
