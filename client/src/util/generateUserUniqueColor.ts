export function getHashOfString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function normalizeHash(hash: number, min: number, max: number): number {
  return Math.floor((hash % (max - min)) + min);
}

export default function generateColorFromString(text: string): string {
  const hash = getHashOfString(text);

  const hue = normalizeHash(hash, 0, 360);
  const saturation = normalizeHash(hash, 50, 75);
  const lightness = normalizeHash(hash, 25, 60);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
