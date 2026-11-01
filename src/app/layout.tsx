import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ExamAndLearn 線上測驗",
  description: "考試頁面展示版",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
