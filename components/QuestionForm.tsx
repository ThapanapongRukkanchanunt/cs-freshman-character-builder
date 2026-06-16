"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { answerOptions, questions } from "@/lib/questions";
import { buildGeneratedSheet } from "@/lib/scoring";
import { encodeSheetData } from "@/lib/sheetEncoding";
import type { AnswerValue, BuilderPayload, CharacterGender } from "@/types/sheet";

type ProfileState = {
  nickname: string;
  gender: CharacterGender | "";
};

type BuilderStage = "profile" | "questions";

export function QuestionForm() {
  const router = useRouter();
  const [stage, setStage] = useState<BuilderStage>("profile");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [profile, setProfile] = useState<ProfileState>({
    nickname: "",
    gender: "",
  });
  const [answers, setAnswers] = useState<Record<string, AnswerValue | undefined>>({});
  const [error, setError] = useState("");

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const answeredCount = useMemo(
    () => questions.filter((question) => answers[question.id] !== undefined).length,
    [answers],
  );
  const progressPercent =
    stage === "profile" ? 0 : ((currentQuestionIndex + 1) / questions.length) * 100;

  function updateProfile(key: keyof ProfileState, value: string) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function handlePrimaryAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (stage === "profile") {
      if (!profile.nickname.trim()) {
        setError("กรุณากรอกชื่อเล่น");
        return;
      }

      if (!profile.gender) {
        setError("กรุณาเลือกลักษณะภาพตัวละคร");
        return;
      }

      setStage("questions");
      setCurrentQuestionIndex(0);
      return;
    }

    if (currentAnswer === undefined) {
      setError(`กรุณาตอบข้อ ${currentQuestionIndex + 1}`);
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((index) => index + 1);
      return;
    }

    submitSheet();
  }

  function submitSheet() {
    if (!profile.gender) {
      setStage("profile");
      setError("กรุณาเลือกลักษณะภาพตัวละคร");
      return;
    }

    const completeAnswers = Object.fromEntries(
      questions.map((question) => [question.id, answers[question.id] ?? 0]),
    ) as Record<string, AnswerValue>;

    const payload: BuilderPayload = {
      v: 1,
      profile: {
        nickname: profile.nickname.trim(),
        gender: profile.gender,
      },
      answers: completeAnswers,
      generated: buildGeneratedSheet(completeAnswers, profile.gender),
    };

    router.push(`/sheet/?data=${encodeSheetData(payload)}`);
  }

  function goBack() {
    setError("");

    if (stage === "profile") {
      return;
    }

    if (currentQuestionIndex === 0) {
      setStage("profile");
      return;
    }

    setCurrentQuestionIndex((index) => index - 1);
  }

  return (
    <form onSubmit={handlePrimaryAction} className="space-y-5">
      <section className="rounded-2xl border border-[#d8c9a6] bg-[#fffaf0] p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d3b88]">
              {stage === "profile" ? "Profile" : `Quest ${currentQuestionIndex + 1}`}
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#25303b]">
              {stage === "profile"
                ? "เริ่มจากข้อมูลสั้น ๆ"
                : `คำถามข้อ ${currentQuestionIndex + 1} / ${questions.length}`}
            </h2>
            {stage === "questions" ? (
              <p className="mt-1 text-sm text-[#5b6470]">ตอบแล้ว {answeredCount}/20 ข้อ</p>
            ) : null}
          </div>
          {stage === "questions" ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#d8c9a6] bg-white px-3 text-sm font-semibold text-[#25303b] transition hover:border-[#0f766e]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              ย้อนกลับ
            </button>
          ) : null}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#eadfca]">
          <div
            className="h-full rounded-full bg-[#0f766e] transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {stage === "profile" ? (
        <ProfileStep
          profile={profile}
          onNicknameChange={(value) => updateProfile("nickname", value)}
          onGenderChange={(value) => updateProfile("gender", value)}
        />
      ) : (
        <QuestionStep
          question={currentQuestion}
          selectedAnswer={currentAnswer}
          onAnswer={(value) =>
            setAnswers((current) => ({
              ...current,
              [currentQuestion.id]: value,
            }))
          }
        />
      )}

      {error ? (
        <p className="rounded-lg border border-[#fecdd3] bg-[#fff1f2] px-4 py-3 text-sm font-semibold text-[#be123c]">
          {error}
        </p>
      ) : null}

      <div className="sticky bottom-3 z-10 rounded-2xl border border-[#d8c9a6] bg-white/95 p-3 shadow-lg backdrop-blur no-print">
        <Button type="submit" className="w-full">
          {stage === "profile"
            ? "ถัดไป"
            : currentQuestionIndex === questions.length - 1
              ? "สร้างชีตตัวละคร"
              : "ถัดไป"}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Button>
      </div>
    </form>
  );
}

function ProfileStep({
  profile,
  onNicknameChange,
  onGenderChange,
}: {
  profile: ProfileState;
  onNicknameChange: (value: string) => void;
  onGenderChange: (value: CharacterGender) => void;
}) {
  return (
    <section className="rounded-2xl border border-[#d8c9a6] bg-white p-4 shadow-sm sm:p-5">
      <label className="block">
        <span className="text-sm font-semibold text-[#25303b]">ชื่อเล่น</span>
        <input
          value={profile.nickname}
          onChange={(event) => onNicknameChange(event.target.value)}
          className="mt-2 min-h-12 w-full rounded-lg border border-[#d8c9a6] bg-[#fffaf0] px-3 text-[#25303b] outline-none transition focus:border-[#0f766e] focus:ring-2 focus:ring-[#0f766e]/20"
        />
      </label>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-[#25303b]">
          ลักษณะภาพตัวละคร
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          {[
            ["male", "ชาย"],
            ["female", "หญิง"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => onGenderChange(value as CharacterGender)}
              className={`min-h-12 rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                profile.gender === value
                  ? "border-[#0f766e] bg-[#0f766e] text-white shadow-sm"
                  : "border-[#d8c9a6] bg-[#fffaf0] text-[#25303b] hover:border-[#0f766e]"
              }`}
              aria-pressed={profile.gender === value}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>
    </section>
  );
}

function QuestionStep({
  question,
  selectedAnswer,
  onAnswer,
}: {
  question: (typeof questions)[number];
  selectedAnswer?: AnswerValue;
  onAnswer: (value: AnswerValue) => void;
}) {
  return (
    <fieldset className="rounded-2xl border border-[#d8c9a6] bg-white p-4 shadow-sm sm:p-5">
      <legend className="sr-only">คำถาม {question.id}</legend>
      <p className="text-lg font-semibold leading-8 text-[#25303b]">{question.text}</p>
      <div className="mt-5 grid grid-cols-1 gap-2">
        {answerOptions.map((option) => {
          const selected = selectedAnswer === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onAnswer(option.value)}
              className={`min-h-12 rounded-lg border px-3 py-2 text-left text-sm font-semibold transition ${
                selected
                  ? "border-[#0f766e] bg-[#0f766e] text-white shadow-sm"
                  : "border-[#d8c9a6] bg-[#fffaf0] text-[#25303b] hover:border-[#0f766e]"
              }`}
              aria-pressed={selected}
            >
              <span className="font-bold">{option.value}</span>
              <span className="mx-2">-</span>
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
