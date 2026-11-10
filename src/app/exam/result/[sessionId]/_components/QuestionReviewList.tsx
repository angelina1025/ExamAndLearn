'use client';

import { difficultyName, statusLabels, subjectName, type ReviewQuestion } from '@/utils/examReport';

export function QuestionReviewList({ items }: { items: ReviewQuestion[] }) {
  return (
    <section aria-labelledby="review-title" className="space-y-4">
      <h2 id="review-title" className="text-lg font-bold text-slate-800">逐題詳解檢討（{items.length} 題）</h2>
      {!items.length && <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">此條件下沒有題目，試試其他篩選條件。</p>}
      {items.map((item) => (
        <article key={`${item.question.id}-${item.number}`} className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-slate-800">第 {item.number} 題 <span className="text-sm font-normal text-slate-500">／ {item.question.points} 分</span></h3>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === 'correct' ? 'bg-emerald-50 text-emerald-800' : item.status === 'wrong' ? 'bg-rose-50 text-rose-800' : 'bg-amber-50 text-amber-900'}`}>{statusLabels[item.status]}</span>
          </div>
          <p className="mt-2 text-xs text-slate-500">{subjectName(item.question)} · {difficultyName(item.question)}</p>
          <p className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-slate-900">{item.question.prompt}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {item.question.options.map((option) => (
              <li key={option.id} className={`rounded-lg border p-3 text-sm ${item.expected.includes(option.id.toUpperCase()) ? 'border-emerald-300 bg-emerald-50' : item.actual.includes(option.id.toUpperCase()) ? 'border-rose-200 bg-rose-50' : 'border-slate-200'}`}>
                <span className="font-semibold">{option.id}.</span> {option.text}
                {item.expected.includes(option.id.toUpperCase()) && <span className="ml-2 text-xs font-semibold text-emerald-800">正確答案</span>}
                {item.actual.includes(option.id.toUpperCase()) && <span className="ml-2 text-xs font-semibold">你的選擇</span>}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
            <p>你的答案：<strong>{item.actual.join('、') || '未作答'}</strong></p>
            <p>正確答案：<strong>{item.expected.join('、') || '未提供，無法判分'}</strong></p>
            <p>得分：<strong>{item.earned} / {item.question.points}</strong></p>
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            <h4 className="mb-1 font-bold">詳解</h4>
            <p className="whitespace-pre-wrap">{item.question.explanation || '本題尚未提供解析，請向題庫管理員確認。'}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
