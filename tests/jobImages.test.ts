import { describe, expect, it } from "vitest";
import { getJobImagePath, jobImageSlug, withBasePath } from "@/lib/jobImages";
import { DEFAULT_BASE_PATH, normalizeBasePath } from "@/lib/config";

describe("job images", () => {
  it("returns a GitHub Pages base-path-safe image URL", () => {
    expect(getJobImagePath("Machinist", "female")).toBe(
      `${DEFAULT_BASE_PATH}/characters/machinist-female.png`,
    );
  });

  it("supports root-hosted builds", () => {
    expect(getJobImagePath("Scholar", "male", "")).toBe("/characters/scholar-male.png");
    expect(withBasePath("characters/sage-female.png", "/")).toBe(
      "/characters/sage-female.png",
    );
  });

  it("has image slugs for all 15 jobs", () => {
    expect(Object.keys(jobImageSlug)).toHaveLength(15);
    expect(jobImageSlug.Paladin).toBe("paladin");
  });

  it("normalizes base paths", () => {
    expect(normalizeBasePath("course-tools/")).toBe("/course-tools");
    expect(normalizeBasePath("/course-tools/")).toBe("/course-tools");
  });
});
