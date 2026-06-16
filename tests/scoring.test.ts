import { describe, expect, it } from "vitest";
import { jobByStatPair, pairKey } from "@/lib/jobs";
import {
  buildGeneratedSheet,
  calculateDecimalStats,
  getDominantStats,
  getJobForDominantStats,
  roundStats,
  sumStats,
  type StatScores,
} from "@/lib/scoring";
import { questions } from "@/lib/questions";
import { STAT_ORDER } from "@/lib/stats";
import type { AnswerValue, Stat } from "@/types/sheet";

function answers(value: AnswerValue) {
  return Object.fromEntries(questions.map((question) => [question.id, value])) as Record<
    string,
    AnswerValue
  >;
}

describe("scoring", () => {
  it("returns balanced stats when every answer is zero", () => {
    const sheet = buildGeneratedSheet(answers(0), "female");

    expect(sheet.roundedStats).toEqual({
      INT: 5,
      DEX: 5,
      PER: 5,
      TEC: 5,
      VIT: 5,
      CHA: 5,
    });
    expect(sheet.dominantStats).toEqual(["INT", "DEX"]);
    expect(sheet.job).toBe("Red Mage");
  });

  it("always rounds to exactly 30 total points", () => {
    const sheet = buildGeneratedSheet(answers(4), "male");

    expect(sumStats(sheet.roundedStats)).toBe(30);
    expect(sumStats(roundStats(calculateDecimalStats(answers(2))))).toBe(30);
  });

  it("distributes remainder points by largest decimal remainders", () => {
    const decimalStats: StatScores = {
      INT: 5.9,
      DEX: 5.8,
      PER: 5.7,
      TEC: 5.6,
      VIT: 3.5,
      CHA: 3.5,
    };

    expect(roundStats(decimalStats)).toEqual({
      INT: 6,
      DEX: 6,
      PER: 6,
      TEC: 6,
      VIT: 3,
      CHA: 3,
    });
  });

  it("uses stat order to break dominant-stat ties", () => {
    const tiedStats = STAT_ORDER.reduce((scores, stat) => {
      scores[stat] = 5;
      return scores;
    }, {} as Record<Stat, number>);

    expect(getDominantStats(tiedStats)).toEqual(["INT", "DEX"]);
  });

  it("maps every dominant stat pair to the expected job", () => {
    for (const [key, job] of Object.entries(jobByStatPair)) {
      const [first, second] = key.split("+") as [Stat, Stat];
      const scores = STAT_ORDER.reduce((allScores, stat) => {
        allScores[stat] = 1;
        return allScores;
      }, {} as Record<Stat, number>);
      scores[first] = 9;
      scores[second] = 8;

      expect(getJobForDominantStats(getDominantStats(scores))).toBe(job);
    }
  });

  it("uses one scored adventure question for each job pair", () => {
    const scoredQuestions = questions.filter((question) => question.primary && question.secondary);
    const scoredPairs = scoredQuestions.map((question) =>
      pairKey(question.primary as Stat, question.secondary as Stat),
    );

    expect(scoredQuestions).toHaveLength(15);
    expect(new Set(scoredPairs)).toEqual(new Set(Object.keys(jobByStatPair)));
  });

  it("lets each scored question independently select its matching job", () => {
    for (const question of questions.filter((item) => item.primary && item.secondary)) {
      const singleStrongAnswer = answers(0);
      singleStrongAnswer[question.id] = 4;

      expect(buildGeneratedSheet(singleStrongAnswer, "female").job).toBe(
        jobByStatPair[pairKey(question.primary as Stat, question.secondary as Stat)],
      );
    }
  });

  it("does not use reflection questions for stat scoring", () => {
    const reflectionOnlyAnswers = answers(0);
    for (const question of questions.filter((item) => !item.primary || !item.secondary)) {
      reflectionOnlyAnswers[question.id] = 4;
    }

    expect(buildGeneratedSheet(reflectionOnlyAnswers, "male").roundedStats).toEqual({
      INT: 5,
      DEX: 5,
      PER: 5,
      TEC: 5,
      VIT: 5,
      CHA: 5,
    });
  });
});
