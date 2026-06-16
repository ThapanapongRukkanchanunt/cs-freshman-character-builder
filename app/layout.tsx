import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Freshman Character Builder",
  description: "แบบประเมินตัวตนสำหรับนิสิต CS ปีหนึ่งในรูปแบบชีตตัวละคร",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
