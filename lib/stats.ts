import type { Stat } from "@/types/sheet";

export const STAT_ORDER: Stat[] = ["INT", "DEX", "PER", "TEC", "VIT", "CHA"];

export const STAT_DISPLAY: Record<Stat, string> = {
  INT: "Abstract Reasoning",
  DEX: "Code Dexterity",
  PER: "Debugging Perception",
  TEC: "System & Tool Awareness",
  VIT: "Learning Endurance",
  CHA: "Communication & Collaboration",
};

export const STAT_THAI: Record<Stat, string> = {
  INT: "การคิดเป็นระบบ",
  DEX: "ความคล่องในการลองทำ",
  PER: "สายตาจับจุดผิดปกติ",
  TEC: "ความเข้าใจเครื่องมือ",
  VIT: "ความอึดและการตั้งหลัก",
  CHA: "การสื่อสารกับทีม",
};
