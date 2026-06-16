"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Copy, Home, Printer, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatRadarChart } from "@/components/StatRadarChart";
import { jobMeta } from "@/lib/jobs";
import type { BuilderPayload } from "@/types/sheet";

export function CharacterSheet({ payload }: { payload: BuilderPayload }) {
  const [copied, setCopied] = useState(false);
  const { profile, generated } = payload;
  const meta = jobMeta[generated.job];
  const displayName = profile.nickname || profile.displayName || "Freshman Adventurer";

  async function copyUrl() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <article className="print-sheet mx-auto max-w-5xl rounded-[24px] border border-[#d8c9a6] bg-[#fffaf0] p-4 shadow-[0_20px_80px_rgba(37,48,59,0.12)] sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 no-print">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d8c9a6] bg-white px-3 py-2 text-sm font-semibold text-[#25303b] transition hover:border-[#0f766e]"
          >
            <Home className="h-4 w-4" aria-hidden />
            หน้าแรก
          </Link>
          <Link
            href="/builder"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#d8c9a6] bg-white px-3 py-2 text-sm font-semibold text-[#25303b] transition hover:border-[#0f766e]"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            สร้างใหม่
          </Link>
        </div>

        <header className="mt-5 text-center sm:mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6d3b88]">
            Character Class
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight text-[#25303b] sm:text-6xl">
            {generated.job}
          </h1>
          <p className="mt-2 text-xl font-semibold text-[#0f766e]">{meta.thaiName}</p>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#5b6470]">
            {meta.description}
          </p>
        </header>

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-[#d8c9a6] bg-white lg:col-start-1">
            <Image
              src={generated.imagePath}
              alt={`ภาพตัวละคร ${generated.job}`}
              width={768}
              height={768}
              className="aspect-square w-full object-cover"
              priority
            />
          </div>

          <div className="rounded-2xl border border-[#d8c9a6] bg-white p-4 sm:p-5 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <h2 className="text-xl font-bold text-[#25303b]">ค่าสถานะ</h2>
            <StatRadarChart stats={generated.roundedStats} />
          </div>

          <div className="rounded-2xl border border-[#d8c9a6] bg-white p-4 lg:col-start-1">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d3b88]">
              Profile
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#25303b]">{displayName}</h2>
            <p className="mt-4 rounded-lg border border-[#d8c9a6] bg-[#fffaf0] px-3 py-2 text-sm font-semibold text-[#25303b]">
              ผู้ที่มีลิงก์นี้สามารถดูชีตนี้ได้
            </p>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          <ListSection title="Traits" eyebrow="จุดเด่น" items={generated.traits} />
          <ListSection title="Growth Edges" eyebrow="จุดที่ควรพัฒนา" items={generated.growthEdges} />
          <ListSection title="Semester Quests" eyebrow="เควสต์ประจำเทอม" items={generated.quests} />
          <ListSection
            title="Advisor Notes"
            eyebrow="ข้อเสนอแนะ"
            items={generated.advisorSuggestions}
          />
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 no-print">
          <Button type="button" variant="secondary" onClick={copyUrl}>
            <Copy className="h-5 w-5" aria-hidden />
            {copied ? "คัดลอกแล้ว" : "คัดลอกลิงก์แชร์"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => window.print()}>
            <Printer className="h-5 w-5" aria-hidden />
            พิมพ์ / บันทึกเป็น PDF
          </Button>
        </div>
      </article>
    </main>
  );
}

function ListSection({
  title,
  eyebrow,
  items,
}: {
  title: string;
  eyebrow: string;
  items: string[];
}) {
  return (
    <section className="rounded-2xl border border-[#d8c9a6] bg-white p-4">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6d3b88]">
        {title}
      </p>
      <h2 className="mt-1 text-xl font-bold text-[#25303b]">{eyebrow}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#4b5563]">
        {items.map((item) => (
          <li key={item} className="rounded-lg border border-[#eadfca] bg-[#fffaf0] px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
