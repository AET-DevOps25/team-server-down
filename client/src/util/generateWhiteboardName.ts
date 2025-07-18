const nameGenerators = {
  project: {
    adjectives: [
      "Active",
      "Agile",
      "Bold",
      "Core",
      "Prime",
      "Smart",
      "Strategic",
    ],
    nouns: [
      "Project",
      "Sprint",
      "Plan",
      "Vision",
      "Mission",
      "Strategy",
      "Goal",
    ],
  },
  creative: {
    adjectives: ["Creative", "Artistic", "Wild", "Free", "Inspired", "Vibrant"],
    nouns: ["Canvas", "Studio", "Design", "Sketch", "Draft", "Artwork"],
  },
  tech: {
    adjectives: ["Digital", "Tech", "Cloud", "Cyber", "Smart", "Virtual"],
    nouns: ["Hub", "Lab", "Space", "Zone", "Platform", "System"],
  },
  nature: {
    adjectives: ["Green", "Blue", "Crystal", "Forest", "Ocean", "Mountain"],
    nouns: ["Garden", "Valley", "Peak", "Stream", "Field", "Path"],
  },
};

export default function generateWhiteboardName(): string {
  const selectedCategory = Object.keys(nameGenerators)[
    Math.floor(Math.random() * Object.keys(nameGenerators).length)
  ] as keyof typeof nameGenerators;

  const { adjectives, nouns } = nameGenerators[selectedCategory];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adjective} ${noun}`;
}
