import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { JOB_CLASSES } from "@/lib/jobs";
import { questions } from "@/lib/questions";
import { STAT_ORDER } from "@/lib/stats";
import type { AnswerValue, BuilderPayload, CharacterGender, Stat } from "@/types/sheet";

const answerValues = new Set([0, 1, 2, 3, 4]);
const genders = new Set<CharacterGender>(["male", "female"]);
const jobs = new Set(JOB_CLASSES);

export function encodeSheetData(payload: BuilderPayload): string {
  return compressToEncodedURIComponent(JSON.stringify(payload));
}

export function decodeSheetData(data: string): BuilderPayload {
  const json = decompressFromEncodedURIComponent(data);
  if (!json) {
    throw new Error("Invalid sheet data");
  }

  const parsed = JSON.parse(json) as unknown;
  if (!isBuilderPayload(parsed)) {
    throw new Error("Invalid sheet data");
  }

  return parsed;
}

function isBuilderPayload(value: unknown): value is BuilderPayload {
  if (!isRecord(value) || value.v !== 1) {
    return false;
  }

  const profile = value.profile;
  const answers = value.answers;
  const generated = value.generated;

  if (!isRecord(profile) || !genders.has(profile.gender as CharacterGender)) {
    return false;
  }

  if (!isRecord(answers) || !isRecord(generated)) {
    return false;
  }

  const answersValid = questions.every((question) =>
    answerValues.has(answers[question.id] as AnswerValue),
  );

  return (
    answersValid &&
    isStatRecord(generated.roundedStats) &&
    isStatRecord(generated.decimalStats) &&
    isDominantStats(generated.dominantStats) &&
    jobs.has(generated.job as never) &&
    typeof generated.imagePath === "string" &&
    Array.isArray(generated.traits) &&
    Array.isArray(generated.growthEdges) &&
    Array.isArray(generated.quests) &&
    Array.isArray(generated.advisorSuggestions)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isStatRecord(value: unknown): value is Record<Stat, number> {
  return (
    isRecord(value) &&
    STAT_ORDER.every((stat) => typeof value[stat] === "number" && Number.isFinite(value[stat]))
  );
}

function isDominantStats(value: unknown): value is [Stat, Stat] {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    STAT_ORDER.includes(value[0] as Stat) &&
    STAT_ORDER.includes(value[1] as Stat)
  );
}
