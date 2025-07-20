import generateWhiteboardName, { nameGenerators } from "@/util/generateWhiteboardName";

describe('generateWhiteboardName', () => {
  // Mock Math.random for deterministic testing
  let mockMathRandom: jest.SpyInstance;

  beforeEach(() => {
    mockMathRandom = jest.spyOn(Math, 'random');
  });

  afterEach(() => {
    mockMathRandom.mockRestore();
  });

  test('generates valid name format', () => {
    const name = generateWhiteboardName();
    expect(name).toMatch(/^[A-Z][a-zA-Z]+ [A-Z][a-zA-Z]+$/);
  });

  test('generates name from project category', () => {
    mockMathRandom
      .mockReturnValueOnce(0) // For category selection
      .mockReturnValueOnce(0) // For adjective selection
      .mockReturnValueOnce(0); // For noun selection

    const name = generateWhiteboardName();
    expect(name).toBe('Active Project');
  });

  test('generates name from creative category', () => {
    mockMathRandom
      .mockReturnValueOnce(0.25) // For category selection
      .mockReturnValueOnce(0) // For adjective selection
      .mockReturnValueOnce(0); // For noun selection

    const name = generateWhiteboardName();
    expect(name).toBe('Creative Canvas');
  });

  test('generates name from tech category', () => {
    mockMathRandom
      .mockReturnValueOnce(0.5) // For category selection
      .mockReturnValueOnce(0) // For adjective selection
      .mockReturnValueOnce(0); // For noun selection

    const name = generateWhiteboardName();
    expect(name).toBe('Digital Hub');
  });

  test('generates name from nature category', () => {
    mockMathRandom
      .mockReturnValueOnce(0.75) // For category selection
      .mockReturnValueOnce(0) // For adjective selection
      .mockReturnValueOnce(0); // For noun selection

    const name = generateWhiteboardName();
    expect(name).toBe('Green Garden');
  });

  test('generates different names on subsequent calls', () => {
    mockMathRandom.mockRestore();

    const names = new Set();
    for (let i = 0; i < 10; i++) {
      names.add(generateWhiteboardName());
    }
    expect(names.size).toBeGreaterThan(1);
  });

  test('all generated names use words from nameGenerators', () => {
    const name = generateWhiteboardName();
    const [adjective, noun] = name.split(' ');

    // Create sets of all possible adjectives and nouns
    const allAdjectives = new Set(
      Object.values(nameGenerators).flatMap(category => category.adjectives)
    );
    const allNouns = new Set(
      Object.values(nameGenerators).flatMap(category => category.nouns)
    );

    expect(allAdjectives).toContain(adjective);
    expect(allNouns).toContain(noun);
  });

  test('handles all possible combinations in each category', () => {
    Object.entries(nameGenerators).forEach(([category, { adjectives, nouns }]) => {
      adjectives.forEach((adj, adjIndex) => {
        nouns.forEach((noun, nounIndex) => {
          mockMathRandom
            .mockReset()
            .mockReturnValueOnce(Object.keys(nameGenerators).indexOf(category) / Object.keys(nameGenerators).length)
            .mockReturnValueOnce(adjIndex / adjectives.length)
            .mockReturnValueOnce(nounIndex / nouns.length);

          const name = generateWhiteboardName();
          expect(name).toBe(`${adj} ${noun}`);
        });
      });
    });
  });

  test('name parts are properly capitalized', () => {
    for (let i = 0; i < 10; i++) {
      const name = generateWhiteboardName();
      const [adjective, noun] = name.split(' ');

      expect(adjective[0]).toMatch(/[A-Z]/);
      expect(noun[0]).toMatch(/[A-Z]/);
    }
  });

  test('generated names have exactly two words', () => {
    for (let i = 0; i < 10; i++) {
      const name = generateWhiteboardName();
      expect(name.split(' ')).toHaveLength(2);
    }
  });
});