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
  INT: "การคิดเชิงนามธรรม",
  DEX: "ความคล่องมือในการเขียนโค้ด",
  PER: "สายตานักดีบัก",
  TEC: "ความเข้าใจระบบและเครื่องมือ",
  VIT: "ความอึดในการเรียนรู้",
  CHA: "การสื่อสารและทำงานร่วมกัน",
};
