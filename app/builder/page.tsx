import { QuestionForm } from "@/components/QuestionForm";

export default function BuilderPage() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-5 rounded-2xl border border-[#d8c9a6] bg-[#fffaf0] p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Builder
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-[#25303b]">
            สร้างชีตตัวละครของคุณ
          </h1>
          <p className="mt-3 text-base leading-7 text-[#5b6470]">
            กรอกชื่อเล่น เลือกลักษณะภาพตัวละคร แล้วตอบคำถามทีละข้อ
          </p>
        </div>

        <QuestionForm />
      </div>
    </main>
  );
}
