import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getJobImagePath } from "@/lib/jobImages";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-4xl flex-col justify-between gap-8 rounded-[28px] border border-[#d8c9a6] bg-[#fffaf0] p-5 shadow-[0_20px_80px_rgba(37,48,59,0.12)] sm:p-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            CS Freshmen
          </p>
          <h1 className="mt-1 text-4xl font-bold leading-tight text-[#25303b] sm:text-6xl">
            Character Builder
          </h1>
        </header>

        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1fr]">
          <div>
            <Link
              href="/builder"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0f766e] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[#115e59] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:ring-offset-2 sm:w-fit"
            >
              เริ่มสร้างตัวละคร
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <section aria-labelledby="sample-character-title">
            <h2
              id="sample-character-title"
              className="mb-3 text-xl font-bold text-[#25303b]"
            >
              ตัวอย่างตัวละคร
            </h2>
            <div className="overflow-hidden rounded-2xl border border-[#d8c9a6] bg-white p-3 shadow-sm">
              <Image
                src={getJobImagePath("Scholar", "female")}
                alt="ตัวอย่างตัวละคร"
                width={1254}
                height={1254}
                className="aspect-square w-full rounded-xl object-cover"
                priority
              />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
