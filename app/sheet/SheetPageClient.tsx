"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CharacterSheet } from "@/components/CharacterSheet";
import { decodeSheetData } from "@/lib/sheetEncoding";

export function SheetPageClient() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const result = useMemo(() => {
    if (!data) {
      return { payload: null, error: "ไม่พบข้อมูลชีตในลิงก์นี้" };
    }

    try {
      return { payload: decodeSheetData(data), error: "" };
    } catch {
      return { payload: null, error: "ไม่สามารถอ่านข้อมูลชีตจากลิงก์นี้ได้" };
    }
  }, [data]);

  if (!result.payload) {
    return (
      <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-2xl rounded-2xl border border-[#d8c9a6] bg-[#fffaf0] p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#be123c]">
            Sheet Error
          </p>
          <h1 className="mt-2 text-2xl font-bold text-[#25303b]">เปิดชีตไม่ได้</h1>
          <p className="mt-3 leading-7 text-[#5b6470]">{result.error}</p>
          <Link
            href="/builder"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0f766e] px-4 py-2 font-semibold text-white transition hover:bg-[#115e59]"
          >
            สร้างชีตใหม่
          </Link>
        </section>
      </main>
    );
  }

  return <CharacterSheet payload={result.payload} />;
}
