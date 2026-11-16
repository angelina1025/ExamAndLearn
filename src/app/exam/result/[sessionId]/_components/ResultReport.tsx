'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Answer, Exam } from '@/types/exam';
import { analyzeQuestions, buildExamReport, difficultyName, isWrongQuestion, subjectName } from '@/utils/examReport';
import { QuestionReviewList } from './QuestionReviewList';
import { SubjectAnalysisChart } from './SubjectAnalysisChart';
import { ExportActions } from './ExportActions';

export function ResultReport({ exam, answers, autoSubmitted, onReset, initiallyExpanded = true, savedUrl, warning }: {
  exam: Exam;
  answers: Record<string, Answer>;
  autoSubmitted: boolean;
  onReset?: () => void;
  initiallyExpanded?: boolean;
  savedUrl?: string;
  warning?: string;
}) {
  const report = useMemo(() => buildExamReport(exam, answers), [exam, answers]);
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [filter, setFilter] = useState('all');
  const [subject, setSubject] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const scoped = report.items.filter((item) => (subject === 'all' || subjectName(item.question) === subject) &&
    (difficulty === 'all' || difficultyName(item.question) === difficulty));
  const wrongItems = scoped.filter(isWrongQuestion);
  const visible = scoped.filter((item) => filter === 'all' || (filter === 'wrong' ? isWrongQuestion(item) : item.status === 'unanswered'));
  const subjects = [...new Set(report.items.map((item) => subjectName(item.question)))];
  const difficulties = [...new Set(report.items.map((item) => difficultyName(item.question)))];

  return (
    <main className="min-h-screen bg-[#eef1f5] pb-12 text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="exam-shell flex flex-wrap items-center justify-between gap-3 py-5">
          <div><p className="text-xs font-semibold tracking-widest text-[#2f5597]">考試結果詳情</p><h1 className="mt-1 text-xl font-bold">{exam.title}</h1></div>
          <Link href="/lobby" className="exam-btn rounded-lg">返回測驗大廳</Link>
        </div>
      </header>
      <div className="exam-shell space-y-6 pt-7">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div><h2 className="text-2xl font-bold">交卷成功</h2><p className="mt-2 text-sm text-slate-600">{autoSubmitted ? '時間到，系統已自動交卷。' : '答案已送出，交卷後無法再修改。'}</p></div>
            <div className="text-right"><p className="text-sm text-slate-500">總得分</p><p className="text-4xl font-bold text-[#2f5597]">{report.earned}<span className="ml-2 text-lg font-normal text-slate-400">/ {report.maximum}</span></p></div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {([['全部題目', report.total], ['答對題數', report.correct], ['答錯題數', report.wrong], ['未作答', report.unanswered], ['正確率', `${report.accuracy}%`]] as const).map(([label, value]) => (
              <div key={label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>
            ))}
          </div>
          {report.ungraded > 0 && <p role="alert" className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">有 {report.ungraded} 題缺少標準答案，目前分數與正確率僅供參考，請題庫管理員補齊答案。</p>}
          <p className="mt-3 text-xs text-slate-500">正確率以全部題目計算；未作答獨立統計，錯題檢討包含未作答題目。</p>
          {warning && <p role="alert" className="mt-3 text-sm text-amber-800">{warning}</p>}
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="exam-btn rounded-lg" aria-expanded={expanded} aria-controls="result-details" onClick={() => setExpanded(!expanded)}>{expanded ? '收合詳解與分析' : '查看逐題詳解與分析'}</button>
            {onReset && <button className="exam-btn rounded-lg" onClick={onReset}>重新測驗</button>}
            {savedUrl && <Link href={savedUrl} className="exam-btn rounded-lg">開啟獨立結果頁</Link>}
          </div>
        </section>
        {expanded && <div id="result-details" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <SubjectAnalysisChart title="錯題分析 · 學科" items={analyzeQuestions(report.items, 'subject')} />
            <SubjectAnalysisChart title="錯題分析 · 難度" items={analyzeQuestions(report.items, 'difficulty')} />
          </div>
          <section className="rounded-xl border border-slate-200 bg-white p-5" aria-label="題目篩選">
            <div className="flex flex-wrap gap-2">
              {([['all', '全部題目', scoped.length], ['wrong', '只看錯題', wrongItems.length], ['unanswered', '未作答', scoped.filter((item) => item.status === 'unanswered').length]] as const).map(([value, label, count]) => (
                <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)} className={`exam-btn rounded-lg ${filter === value ? '!border-[#2f5597] !bg-[#2f5597] !text-white' : ''}`}>{label}（{count}）</button>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <label>學科<select className="ml-2 rounded-lg border border-slate-300 p-2" value={subject} onChange={(event) => setSubject(event.target.value)}><option value="all">全部學科</option>{subjects.map((name) => <option key={name}>{name}</option>)}</select></label>
              <label>難度<select className="ml-2 rounded-lg border border-slate-300 p-2" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option value="all">全部難度</option>{difficulties.map((name) => <option key={name}>{name}</option>)}</select></label>
              <button className="text-[#2f5597] underline" onClick={() => { setFilter('all'); setSubject('all'); setDifficulty('all'); }}>清除篩選</button>
            </div>
            <p role="status" className="mt-3 text-xs text-slate-500">顯示 {visible.length} / {report.total} 題。上方分析固定顯示整份試卷，不受篩選影響。</p>
          </section>
          <ExportActions items={wrongItems} title={exam.title} />
          <QuestionReviewList items={visible} />
        </div>}
      </div>
    </main>
  );
}
