import { describe, expect, it } from "vitest";
import { buildGeneratedSheet } from "@/lib/scoring";
import { decodeSheetData, encodeSheetData } from "@/lib/sheetEncoding";
import { questions } from "@/lib/questions";
import type { AnswerValue, BuilderPayload } from "@/types/sheet";

function makePayload(): BuilderPayload {
  const answers = Object.fromEntries(
    questions.map((question, index) => [question.id, (index % 5) as AnswerValue]),
  ) as Record<string, AnswerValue>;

  return {
    v: 1,
    profile: {
      displayName: "นิสิตปีหนึ่ง",
      nickname: "ซีเอส",
      semester: "1/2569",
      section: "A",
      gender: "female",
    },
    answers,
    generated: buildGeneratedSheet(answers, "female"),
  };
}

describe("sheet encoding", () => {
  it("round trips Thai payloads without storing image data", () => {
    const payload = makePayload();
    const encoded = encodeSheetData(payload);
    const decoded = decodeSheetData(encoded);

    expect(decoded.profile.nickname).toBe("ซีเอส");
    expect(decoded.generated.imagePath).toMatch(/\/characters\/.+-female\.png$/);
    expect(decoded.generated.imagePath).not.toContain("base64");
  });

  it("throws on invalid data", () => {
    expect(() => decodeSheetData("not-valid")).toThrow("Invalid sheet data");
  });
});
