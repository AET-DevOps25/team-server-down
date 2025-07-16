import generateColorFromString, {
  getHashOfString,
  normalizeHash,
} from "@/util/generateUserUniqueColor";

describe('Color Generation Functions', () => {
  describe('getHashOfString', () => {
    test('returns consistent hash for same input', () => {
      const input = 'test@example.com';
      const firstHash = getHashOfString(input);
      const secondHash = getHashOfString(input);
      expect(firstHash).toBe(secondHash);
    });

    test('returns different hashes for different inputs', () => {
      const hash1 = getHashOfString('test1@example.com');
      const hash2 = getHashOfString('test2@example.com');
      expect(hash1).not.toBe(hash2);
    });

    test('handles empty string', () => {
      const hash = getHashOfString('');
      expect(hash).toBe(0);
    });

    test('returns positive numbers', () => {
      const inputs = ['test', 'example@mail.com', 'longeremail@domain.com'];
      inputs.forEach(input => {
        const hash = getHashOfString(input);
        expect(hash).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('normalizeHash', () => {
    test('returns value within specified range', () => {
      const hash = 12345;
      const min = 0;
      const max = 360;
      const normalized = normalizeHash(hash, min, max);
      expect(normalized).toBeGreaterThanOrEqual(min);
      expect(normalized).toBeLessThan(max);
    });

    test('returns integer values', () => {
      const hash = 12345;
      const normalized = normalizeHash(hash, 0, 100);
      expect(Number.isInteger(normalized)).toBe(true);
    });

    test('handles different ranges', () => {
      const testCases = [
        { hash: 12345, min: 0, max: 360 },
        { hash: 12345, min: 50, max: 75 },
        { hash: 12345, min: 25, max: 60 }
      ];

      testCases.forEach(({ hash, min, max }) => {
        const normalized = normalizeHash(hash, min, max);
        expect(normalized).toBeGreaterThanOrEqual(min);
        expect(normalized).toBeLessThan(max);
      });
    });
  });

  describe('generateColorFromString', () => {
    test('returns valid HSL color string', () => {
      const color = generateColorFromString('test@example.com');
      expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    test('returns consistent colors for same input', () => {
      const input = 'test@example.com';
      const color1 = generateColorFromString(input);
      const color2 = generateColorFromString(input);
      expect(color1).toBe(color2);
    });

    test('returns different colors for different inputs', () => {
      const color1 = generateColorFromString('test1@example.com');
      const color2 = generateColorFromString('test2@example.com');
      expect(color1).not.toBe(color2);
    });

    test('generates color with correct HSL ranges', () => {
      const color = generateColorFromString('test@example.com');
      const matches = color.match(/^hsl\((\d+), (\d+)%, (\d+)%\)$/);

      expect(matches).not.toBeNull();
      if (matches) {
        const [, hue, saturation, lightness] = matches.map(Number);

        expect(hue).toBeGreaterThanOrEqual(0);
        expect(hue).toBeLessThan(360);

        expect(saturation).toBeGreaterThanOrEqual(50);
        expect(saturation).toBeLessThan(75);

        expect(lightness).toBeGreaterThanOrEqual(25);
        expect(lightness).toBeLessThan(60);
      }
    });

    test('handles special characters', () => {
      const specialChars = '!@#$%^&*()_+';
      expect(() => generateColorFromString(specialChars)).not.toThrow();
      expect(generateColorFromString(specialChars)).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });

    test('handles empty string', () => {
      expect(() => generateColorFromString('')).not.toThrow();
      expect(generateColorFromString('')).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
    });
  });
});