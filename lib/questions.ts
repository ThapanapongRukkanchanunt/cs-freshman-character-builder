import type { AnswerValue, Stat } from "@/types/sheet";

export type Question = {
  id: string;
  text: string;
  primary: Stat;
  secondary: Stat;
};

export const answerOptions: { value: AnswerValue; label: string }[] = [
  { value: 0, label: "ไม่เหมือนฉัน" },
  { value: 1, label: "คล้ายเล็กน้อย" },
  { value: 2, label: "คล้ายบางครั้ง" },
  { value: 3, label: "ค่อนข้างเหมือน" },
  { value: 4, label: "เหมือนฉันมาก" },
];

export const questions: Question[] = [
  {
    id: "q1",
    text: "เมื่อเจอสิ่งที่ไม่คุ้นเคย ฉันยอมลองทำก่อนที่จะเข้าใจทั้งหมด",
    primary: "DEX",
    secondary: "VIT",
  },
  {
    id: "q2",
    text: "ฉันยังใจเย็นได้เมื่อความพยายามครั้งแรกไม่สำเร็จ",
    primary: "VIT",
    secondary: "PER",
  },
  {
    id: "q3",
    text: "ฉันสนุกกับการค้นหาว่าสิ่งต่าง ๆ ทำงานอย่างไรใต้ผิวหน้า",
    primary: "INT",
    secondary: "TEC",
  },
  {
    id: "q4",
    text: "ฉันอยากเข้าใจเหตุผลของกฎ มากกว่าแค่จำกฎนั้น",
    primary: "INT",
    secondary: "PER",
  },
  {
    id: "q5",
    text: "ก่อนลงมือ ฉันมักแบ่งงานใหญ่ให้เป็นงานย่อย",
    primary: "INT",
    secondary: "PER",
  },
  {
    id: "q6",
    text: "ฉันทำตามลำดับขั้นตอนอย่างละเอียดโดยไม่ข้ามส่วนสำคัญได้",
    primary: "PER",
    secondary: "DEX",
  },
  {
    id: "q7",
    text: "ฉันเริ่มเห็นรูปแบบหลังจากดูตัวอย่างหลายครั้ง",
    primary: "PER",
    secondary: "INT",
  },
  {
    id: "q8",
    text: "ฉันอธิบายกระบวนการคิดของตัวเองให้คนอื่นฟังได้",
    primary: "CHA",
    secondary: "INT",
  },
  {
    id: "q9",
    text: "ฉันทบทวนสิ่งที่เรียนเป็นระยะก่อนที่งานจะเร่งด่วน",
    primary: "VIT",
    secondary: "TEC",
  },
  {
    id: "q10",
    text: "เมื่อฉันติดปัญหา ฉันลองมากกว่าหนึ่งวิธี",
    primary: "PER",
    secondary: "VIT",
  },
  {
    id: "q11",
    text: "ฉันรู้ว่าเมื่อไรควรหยุดฝืนคนเดียวและขอความช่วยเหลือ",
    primary: "CHA",
    secondary: "VIT",
  },
  {
    id: "q12",
    text: "ฉันรักษากิจวัตรได้แม้ไม่มีใครคอยตรวจ",
    primary: "VIT",
    secondary: "TEC",
  },
  {
    id: "q13",
    text: "ฉันเรียนรู้ได้ดีขึ้นเมื่อได้แลกเปลี่ยนความคิดกับผู้อื่น",
    primary: "CHA",
    secondary: "INT",
  },
  {
    id: "q14",
    text: "ฉันรู้สึกสบายใจที่จะถามคำถามในกลุ่ม",
    primary: "CHA",
    secondary: "VIT",
  },
  {
    id: "q15",
    text: "ฉันมีคนที่พึ่งพาได้เมื่อเจอความยากลำบาก",
    primary: "CHA",
    secondary: "VIT",
  },
  {
    id: "q16",
    text: "ฉันรับฟีดแบ็กได้โดยไม่รู้สึกว่าถูกโจมตีเป็นการส่วนตัว",
    primary: "VIT",
    secondary: "CHA",
  },
  {
    id: "q17",
    text: "ฉันมีเหตุผลที่ชัดเจนในการเลือกเส้นทางนี้",
    primary: "VIT",
    secondary: "INT",
  },
  {
    id: "q18",
    text: "ฉันนึกภาพได้ว่างานแบบไหนที่ฉันอาจอยากทำในอนาคต",
    primary: "TEC",
    secondary: "INT",
  },
  {
    id: "q19",
    text: "ฉันระบุได้ว่าอะไรคือสิ่งที่จำกัดความก้าวหน้าของฉันตอนนี้",
    primary: "PER",
    secondary: "INT",
  },
  {
    id: "q20",
    text: "ฉันรู้สึกว่าที่นี่เป็นพื้นที่ที่ฉันเติบโตได้",
    primary: "VIT",
    secondary: "CHA",
  },
];
