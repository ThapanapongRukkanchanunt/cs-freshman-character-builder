import { normalizeBasePath, SITE_BASE_PATH } from "@/lib/config";
import type { CharacterGender, JobClass } from "@/types/sheet";

export { type CharacterGender };

export const jobImageSlug: Record<JobClass, string> = {
  "Red Mage": "red-mage",
  Scholar: "scholar",
  Sage: "sage",
  "Black Mage": "black-mage",
  Summoner: "summoner",
  Ninja: "ninja",
  Machinist: "machinist",
  Monk: "monk",
  Dancer: "dancer",
  Ranger: "ranger",
  Dragoon: "dragoon",
  Bard: "bard",
  Knight: "knight",
  Engineer: "engineer",
  Paladin: "paladin",
};

export function withBasePath(path: string, basePath = SITE_BASE_PATH): string {
  const cleanBasePath = normalizeBasePath(basePath);
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanBasePath}${cleanPath}`;
}

export function getJobImagePath(
  job: JobClass,
  gender: CharacterGender,
  basePath = SITE_BASE_PATH,
): string {
  return withBasePath(`/characters/${jobImageSlug[job]}-${gender}.png`, basePath);
}
