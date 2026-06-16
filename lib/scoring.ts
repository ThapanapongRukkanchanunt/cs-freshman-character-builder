import { getJobImagePath, type CharacterGender } from "@/lib/jobImages";
import {
  advisorSuggestionsByStat,
  jobByStatPair,
  jobMeta,
  pairKey,
  statGrowthEdges,
  statQuests,
  statTraits,
} from "@/lib/jobs";
import { questions } from "@/lib/questions";
import { STAT_ORDER } from "@/lib/stats";
import type { AnswerValue, GeneratedCharacterSheet, JobClass, Stat } from "@/types/sheet";

export type StatScores = Record<Stat, number>;

export function calculateDecimalStats(answers: Record<string, AnswerValue>): StatScores {
  const rawScores = emptyScores();

  for (const question of questions) {
    if (!question.primary || !question.secondary) {
      continue;
    }

    const value = answers[question.id] ?? 0;
    rawScores[question.primary] += value * 0.5;
    rawScores[question.secondary] += value * 0.5;
  }

  const rawTotal = sumStats(rawScores);
  if (rawTotal === 0) {
    return {
      INT: 5,
      DEX: 5,
      PER: 5,
      TEC: 5,
      VIT: 5,
      CHA: 5,
    };
  }

  return STAT_ORDER.reduce((scores, stat) => {
    scores[stat] = 1 + (rawScores[stat] / rawTotal) * 24;
    return scores;
  }, emptyScores());
}

export function roundStats(decimalStats: StatScores): StatScores {
  const rounded = STAT_ORDER.reduce((scores, stat) => {
    scores[stat] = Math.floor(decimalStats[stat]);
    return scores;
  }, emptyScores());

  const remaining = 30 - sumStats(rounded);
  const byRemainder = [...STAT_ORDER].sort((a, b) => {
    const remainderDifference = decimalStats[b] % 1 - (decimalStats[a] % 1);
    if (remainderDifference !== 0) {
      return remainderDifference;
    }
    return STAT_ORDER.indexOf(a) - STAT_ORDER.indexOf(b);
  });

  for (let index = 0; index < remaining; index += 1) {
    rounded[byRemainder[index]] += 1;
  }

  return rounded;
}

export function getDominantStats(decimalStats: StatScores): [Stat, Stat] {
  const [first, second] = [...STAT_ORDER].sort((a, b) => {
    const scoreDifference = decimalStats[b] - decimalStats[a];
    if (scoreDifference !== 0) {
      return scoreDifference;
    }
    return STAT_ORDER.indexOf(a) - STAT_ORDER.indexOf(b);
  });

  return [first, second];
}

export function getJobForDominantStats(dominantStats: [Stat, Stat]): JobClass {
  return jobByStatPair[pairKey(dominantStats[0], dominantStats[1])];
}

export function buildGeneratedSheet(
  answers: Record<string, AnswerValue>,
  gender: CharacterGender,
): GeneratedCharacterSheet {
  const decimalStats = calculateDecimalStats(answers);
  const roundedStats = roundStats(decimalStats);
  const dominantStats = getDominantStats(decimalStats);
  const job = getJobForDominantStats(dominantStats);
  const lowStats = [...STAT_ORDER].sort((a, b) => {
    const scoreDifference = roundedStats[a] - roundedStats[b];
    if (scoreDifference !== 0) {
      return scoreDifference;
    }
    return STAT_ORDER.indexOf(a) - STAT_ORDER.indexOf(b);
  });

  return {
    roundedStats,
    decimalStats,
    dominantStats,
    job,
    imagePath: getJobImagePath(job, gender),
    traits: uniqueList([jobMeta[job].trait, ...dominantStats.map((stat) => statTraits[stat])]),
    growthEdges: lowStats.slice(0, 3).map((stat) => statGrowthEdges[stat]),
    quests: uniqueList([
      jobMeta[job].quest,
      ...dominantStats.map((stat) => statQuests[stat]),
    ]).slice(0, 3),
    advisorSuggestions: lowStats.slice(0, 3).map((stat) => advisorSuggestionsByStat[stat]),
  };
}

export function sumStats(scores: StatScores): number {
  return STAT_ORDER.reduce((total, stat) => total + scores[stat], 0);
}

function emptyScores(): StatScores {
  return {
    INT: 0,
    DEX: 0,
    PER: 0,
    TEC: 0,
    VIT: 0,
    CHA: 0,
  };
}

function uniqueList(items: string[]): string[] {
  return [...new Set(items)];
}
