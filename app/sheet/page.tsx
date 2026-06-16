import { Suspense } from "react";
import { SheetPageClient } from "./SheetPageClient";

function SheetFallback() {
  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-[#d8c9a6] bg-[#fffaf0] p-6 text-[#25303b]">
        กำลังเปิดชีตตัวละคร...
      </div>
    </main>
  );
}

export default function SheetPage() {
  return (
    <Suspense fallback={<SheetFallback />}>
      <SheetPageClient />
    </Suspense>
  );
}
