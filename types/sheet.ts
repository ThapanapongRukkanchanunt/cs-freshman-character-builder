export type Stat = "INT" | "DEX" | "PER" | "TEC" | "VIT" | "CHA";

export type AnswerValue = 0 | 1 | 2 | 3 | 4;

export type JobClass =
  | "Red Mage"
  | "Scholar"
  | "Sage"
  | "Black Mage"
  | "Summoner"
  | "Ninja"
  | "Machinist"
  | "Monk"
  | "Dancer"
  | "Ranger"
  | "Dragoon"
  | "Bard"
  | "Knight"
  | "Engineer"
  | "Paladin";

export type CharacterGender = "male" | "female";

export type BuilderPayload = {
  v: 1;
  profile: {
    displayName?: string;
    nickname?: string;
    semester?: string;
    section?: string;
    gender: CharacterGender;
  };
  answers: Record<string, AnswerValue>;
  generated: GeneratedCharacterSheet;
};

export type GeneratedCharacterSheet = {
  roundedStats: Record<Stat, number>;
  decimalStats: Record<Stat, number>;
  dominantStats: [Stat, Stat];
  job: JobClass;
  imagePath: string;
  traits: string[];
  growthEdges: string[];
  quests: string[];
  advisorSuggestions: string[];
};
