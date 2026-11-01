import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="exam-card w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold">找不到這份考卷</h1>
        <p className="mt-2 text-sm text-[#5b6673]">請回到試卷選擇頁重新選擇。</p>
        <Link href="/" className="exam-btn exam-btn-primary mt-6 inline-block px-6 py-2">
          返回試卷選擇
        </Link>
      </div>
    </main>
  );
}
