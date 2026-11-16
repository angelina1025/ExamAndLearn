'use client';

import { useMemo, useState } from 'react';
import type { DifficultyLevel, Question, SubjectId } from '@/types';

const SUBJECT_LABELS: Record<SubjectId, string> = {
  chinese: '國文',
  english: '英文',
  math: '數學',
  biology: '生物',
  physics: '物理',
  chemistry: '化學',
  astronomy: '天文',
  civics: '公民',
  geography: '地理',
  history: '歷史',
};

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: '簡單',
  medium: '中等',
  hard: '困難',
};

type SelectionAction = 'compose' | 'practice';

export function QuestionSelection({ questions }: { questions: Question[] }) {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState<SubjectId | 'all'>('all');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [action, setAction] = useState<SelectionAction | null>(null);

  const subjects = useMemo(
    () => [...new Set(questions.map((question) => question.subjectId))],
    [questions],
  );
  const filteredQuestions = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();
    return questions.filter((question) => {
      const matchesSearch = !keyword
        || question.content.toLocaleLowerCase().includes(keyword)
        || question.tags.some((tag) => tag.toLocaleLowerCase().includes(keyword));
      return matchesSearch
        && (subject === 'all' || question.subjectId === subject)
        && (difficulty === 'all' || question.difficulty === difficulty);
    });
  }, [questions, search, subject, difficulty]);

  const selectedQuestions = questions.filter((question) => selectedIds.includes(question.id));
  const selectedScore = selectedQuestions.reduce((total, question) => total + question.points, 0);

  function toggleQuestion(id: string) {
    setAction(null);
    setSelectedIds((current) => current.includes(id)
      ? current.filter((selectedId) => selectedId !== id)
      : [...current, id]);
  }

  function prepareAction(nextAction: SelectionAction) {
    if (selectedIds.length === 0) return;
    setAction(nextAction);
  }

  return (
    <main className="selection-page min-h-screen bg-surface px-4 py-6 sm:px-6 sm:py-10">
      <div className="selection-container mx-auto max-w-6xl">
        <header className="selection-header mb-6">
          <p className="text-xs font-bold tracking-[0.18em] text-primary">EXAM AND LEARN</p>
          <h1 className="mt-2 text-2xl font-bold text-on-surface sm:text-3xl">選擇題目</h1>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">
            可以挑選題目組成試卷，也可以選題後開始自我練習。
          </p>
        </header>

        <section className="selection-filters mb-5 rounded-2xl border border-outline-variant bg-white p-4 sm:p-5" aria-label="題目篩選">
          <div className="selection-filters-grid grid gap-3 md:grid-cols-[minmax(220px,1fr)_180px_160px]">
            <label className="text-sm font-semibold text-on-surface-variant">
              搜尋題目
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="輸入題目或標籤關鍵字"
                className="mt-2 min-h-11 w-full rounded-lg border border-outline-variant px-3 font-normal text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </label>
            <label className="text-sm font-semibold text-on-surface-variant">
              科目
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value as SubjectId | 'all')}
                className="mt-2 min-h-11 w-full rounded-lg border border-outline-variant bg-white px-3 font-normal text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">所有科目</option>
                {subjects.map((item) => <option key={item} value={item}>{SUBJECT_LABELS[item]}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-on-surface-variant">
              難度
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as DifficultyLevel | 'all')}
                className="mt-2 min-h-11 w-full rounded-lg border border-outline-variant bg-white px-3 font-normal text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">所有難度</option>
                {Object.entries(DIFFICULTY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <div className="selection-layout grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="selection-list space-y-3" aria-label="題目清單">
            <div className="flex items-center justify-between px-1 text-sm text-on-surface-variant">
              <span>符合條件的題目</span>
              <span>{filteredQuestions.length} 題</span>
            </div>
            {filteredQuestions.length === 0 ? (
              <div className="selection-empty rounded-2xl border border-dashed border-outline-variant bg-white p-10 text-center text-sm text-on-surface-variant">
                找不到符合條件的題目，請調整搜尋或篩選條件。
              </div>
            ) : filteredQuestions.map((question) => {
              const checked = selectedIds.includes(question.id);
              return (
                <label
                  key={question.id}
                  className={`selection-card question-selection-card block cursor-pointer rounded-2xl border bg-white p-4 transition-colors sm:p-5 ${checked ? 'selected border-primary ring-1 ring-primary/30' : 'border-outline-variant hover:border-primary/50'}`}
                >
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleQuestion(question.id)}
                      className="mt-1 h-4 w-4 shrink-0 accent-primary"
                      aria-label={`選取題目：${question.content}`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="selection-chip subject-chip rounded-full bg-primary-fixed px-2.5 py-1 text-on-primary-fixed">{SUBJECT_LABELS[question.subjectId]}</span>
                        <span className="selection-chip rounded-full bg-surface-container px-2.5 py-1 text-on-surface-variant">{DIFFICULTY_LABELS[question.difficulty]}</span>
                        <span className="text-on-surface-variant">{question.points} 分</span>
                      </div>
                      <p className="text-sm leading-6 text-on-surface">{question.content}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {question.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="text-xs text-on-surface-variant">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}
          </section>

          <aside className="selection-summary rounded-2xl border border-outline-variant bg-white p-5 lg:sticky lg:top-5">
            <h2 className="text-base font-bold text-on-surface">已選題目</h2>
            <p className="mt-3 text-3xl font-bold text-primary">{selectedIds.length}<span className="ml-1 text-sm font-medium text-on-surface-variant">題</span></p>
            <p className="mt-1 text-sm text-on-surface-variant">目前總分：{selectedScore} 分</p>
            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={() => prepareAction('compose')}
                disabled={selectedIds.length === 0}
                className="selection-button primary min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container disabled:cursor-not-allowed disabled:bg-surface-container-high disabled:text-on-surface-variant"
              >
                加入自組試卷
              </button>
              <button
                type="button"
                onClick={() => prepareAction('practice')}
                disabled={selectedIds.length === 0}
                className="selection-button min-h-11 w-full rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-primary-fixed/50 disabled:cursor-not-allowed disabled:border-outline-variant disabled:text-on-surface-variant"
              >
                開始自我練習
              </button>
            </div>
            {action && (
              <p role="status" className="mt-4 rounded-lg bg-primary-fixed px-3 py-3 text-sm leading-5 text-on-primary-fixed">
                {action === 'compose'
                  ? `已選好 ${selectedIds.length} 題（${selectedScore} 分），可接續設定試卷。`
                  : `已選好 ${selectedIds.length} 題，準備進入自我練習。`}
                <span className="mt-1 block text-xs opacity-80">目前為前端示範，後續可串接試卷建立與作答頁。</span>
              </p>
            )}
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={() => { setSelectedIds([]); setAction(null); }}
                className="mt-4 w-full text-sm text-on-surface-variant underline underline-offset-4 hover:text-on-surface"
              >
                清除已選題目
              </button>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
