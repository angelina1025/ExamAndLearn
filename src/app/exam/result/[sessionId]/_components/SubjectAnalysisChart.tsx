import type { AnalysisGroup } from '@/utils/examReport';

export function SubjectAnalysisChart({ title, items }: { title: string; items: AnalysisGroup[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="mb-4 font-bold text-slate-800">{title}</h2>
      {!items.length && <p className="text-sm text-slate-500">尚無分析資料</p>}
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.name}>
            <div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-semibold">{item.name}</span><span>正確率 {item.accuracy}%</span></div>
            <div role="meter" aria-label={`${item.name}正確率`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.accuracy} className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#2f5597]" style={{ width: `${item.accuracy}%` }} />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">共 {item.total} 題 · 答對 {item.correct} · 答錯 {item.wrong} · 未作答 {item.unanswered}{item.ungraded > 0 ? ` · 無法判分 ${item.ungraded}` : ''}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
