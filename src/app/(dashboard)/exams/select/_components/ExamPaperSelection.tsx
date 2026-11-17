'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ExamPaper, SubjectId, UserProfile } from '@/types';
import { clearSession } from '@/contexts/examStorage';
import { SheetBindGuardModal } from '@/components/common/SheetBindGuardModal';
import { ensurePersonalSpreadsheetTablesExist } from '@/services/userSheet';
import { getAccessToken, googleSignIn } from '@/services/googleAuth';

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

type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

function difficultyFor(level: number): Exclude<Difficulty, 'all'> {
  if (level <= 2) return 'easy';
  if (level >= 4) return 'hard';
  return 'medium';
}

const DIFFICULTY_LABELS: Record<Exclude<Difficulty, 'all'>, string> = {
  easy: '簡單',
  medium: '中等',
  hard: '困難',
};

export function ExamPaperSelection({
  papers,
  personalPapers,
  onStartExam,
  currentUser,
  onNavigate,
}: {
  papers: ExamPaper[];
  personalPapers?: ExamPaper[];
  onStartExam?: (paper: ExamPaper) => void;
  currentUser?: UserProfile | null;
  onNavigate?: (page: string) => void;
}) {
  const [paperTab, setPaperTab] = useState<'public' | 'private'>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('exam_paper_tab');
      if (saved === 'private' || saved === 'public') return saved;
    }
    return 'public';
  });
  const [isGuardModalOpen, setIsGuardModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState<SubjectId | 'all'>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [allPapers, setAllPapers] = useState<ExamPaper[]>(papers);
  const [isInitializingSheet, setIsInitializingSheet] = useState(false);
  const [initSheetMessage, setInitSheetMessage] = useState('');

  const hasBoundSheet = Boolean(
    currentUser?.google_sheet_URL && currentUser.google_sheet_URL.trim() !== ''
  );

  const handleInitPersonalSheet = async () => {
    if (!currentUser?.google_sheet_URL) return;
    setIsInitializingSheet(true);
    setInitSheetMessage('');
    try {
      let token = await getAccessToken();
      if (!token) {
        const signRes = await googleSignIn();
        token = signRes?.accessToken || null;
      }
      if (!token) {
        throw new Error('需先完成 Google 登入授權，才能在您的雲端硬碟試算表建立分頁。');
      }
      const res = await ensurePersonalSpreadsheetTablesExist(token, currentUser.google_sheet_URL);
      const msg = res.createdSheets.length > 0
        ? `🎉 成功為試算表建立標準分頁：${res.createdSheets.join(', ')}，並填入公用格式標題！`
        : `✅ 試算表格式已符合規範（test_bank, quiz_bank_publish, quiz_bank_unpublish, log）！`;
      setInitSheetMessage(msg);
    } catch (err: any) {
      if (err?.code === 'auth/unauthorized-domain' || err?.message?.includes('auth/unauthorized-domain')) {
        setInitSheetMessage('⚠️ 本地開發環境 (localhost) 尚未列入 Firebase 授權網域。建議直接點擊「一鍵複製標準範本」，在您的 Google 雲端秒速建立完整標準試算表！');
      } else {
        setInitSheetMessage(`建立失敗: ${err.message || '未知錯誤'}`);
      }
    } finally {
      setIsInitializingSheet(false);
    }
  };

  useEffect(() => {
    let custom: ExamPaper[] = [];
    if (personalPapers !== undefined) {
      custom = personalPapers;
    } else if (!hasBoundSheet && typeof window !== 'undefined') {
      try {
        custom = JSON.parse(localStorage.getItem('quiz_custom_exams') || '[]');
      } catch {}
    }
    const markedCustom = custom.map((p) => ({ ...p, sourceScope: 'private' as const }));
    const markedPublic = papers.map((p) => ({ ...p, sourceScope: 'public' as const }));
    const merged = [...markedCustom, ...markedPublic];
    const seen = new Set<string>();
    const unique = merged.filter((p) => {
      if (seen.has(p.id)) return false;
      seen.add(p.id);
      return true;
    });
    setAllPapers(unique);
  }, [papers, personalPapers, hasBoundSheet]);

  const handleTabChange = (newTab: 'public' | 'private') => {
    if (newTab === 'private') {
      const hasBoundSheet = Boolean(
        currentUser?.google_sheet_URL && currentUser.google_sheet_URL.trim() !== ''
      );
      if (!hasBoundSheet) {
        setIsGuardModalOpen(true);
        return;
      }
    }
    setPaperTab(newTab);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('exam_paper_tab', newTab);
    }
  };

  const subjects = useMemo(
    () => [...new Set(allPapers.map((paper) => paper.subjectId))],
    [allPapers],
  );
  const filteredPapers = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();
    return allPapers.filter((paper) => {
      const isPrivate = paper.id.startsWith('CUSTOM-') || paper.sourceScope === 'private';
      if (paperTab === 'public' && isPrivate) return false;
      if (paperTab === 'private' && !isPrivate) return false;

      const matchesSearch = !keyword
        || paper.title.toLocaleLowerCase().includes(keyword)
        || paper.description.toLocaleLowerCase().includes(keyword);
      const matchesDifficulty = difficulty === 'all' || difficultyFor(paper.difficultyLv) === difficulty;
      return matchesSearch
        && (subject === 'all' || paper.subjectId === subject)
        && matchesDifficulty;
    });
  }, [allPapers, search, subject, difficulty, paperTab]);
  const selectedPaper = allPapers.find((paper) => paper.id === selectedPaperId) ?? null;

  function selectPaper(paper: ExamPaper) {
    setSelectedPaperId(paper.id);
    setNotice('');
  }

  return (
    <main className="selection-page min-h-screen bg-surface px-4 py-6 sm:px-6 sm:py-10">
      {/* 防護彈窗：自組考卷需存放於個人 Google Sheet */}
      <SheetBindGuardModal
        isOpen={isGuardModalOpen}
        onClose={() => setIsGuardModalOpen(false)}
        onGoToPublicExams={() => {
          setIsGuardModalOpen(false);
          setPaperTab('public');
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('exam_paper_tab', 'public');
          }
        }}
        onGoToSettings={() => {
          setIsGuardModalOpen(false);
          if (onNavigate) {
            onNavigate('user-settings');
          } else if (typeof window !== 'undefined') {
            window.location.href = '/profile';
          }
        }}
      />

      <div className="selection-container mx-auto max-w-6xl">
        <header className="selection-header mb-6">
          <p className="text-xs font-bold tracking-[0.18em] text-primary">EXAM AND LEARN</p>
          <h1 className="mt-2 text-2xl font-bold text-on-surface sm:text-3xl">選擇試卷</h1>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">挑選一份已發布的試卷，查看題數、配分和作答時間。</p>
        </header>

        {/* 頁籤切換：公用試卷 / 私人試卷 */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant/60 pb-3">
          <div className="inline-flex rounded-xl bg-[#f2f4f6] p-1 border border-[#c3c6d7]/30">
            <button
              type="button"
              onClick={() => handleTabChange('public')}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                paperTab === 'public'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#191c1d]'
              }`}
            >
              公用試卷
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('private')}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                paperTab === 'private'
                  ? 'bg-white text-[#004ac6] shadow-sm'
                  : 'text-[#434655] hover:text-[#191c1d]'
              }`}
            >
              私人試卷
            </button>
          </div>
          <div className="text-xs text-[#565e74]">
            {paperTab === 'public'
              ? '提供公用標準模考與各科歷屆考卷，隨選即測。'
              : '展示由您挑選題目組成的自選考卷或綁定 Google Sheet 的專屬試卷。'}
          </div>
        </div>

        <section className="selection-filters mb-5 rounded-2xl border border-outline-variant bg-white p-4 sm:p-5" aria-label="試卷篩選">
          <div className="selection-filters-grid grid gap-3 md:grid-cols-[minmax(220px,1fr)_180px_160px]">
            <label className="text-sm font-semibold text-on-surface-variant">
              搜尋試卷
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="輸入試卷名稱或說明"
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
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
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

        <div className="selection-layout grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="selection-list space-y-3" aria-label="已發布試卷">
            <div className="flex items-center justify-between px-1 text-sm text-on-surface-variant">
              <span>已發布試卷</span>
              <span>{filteredPapers.length} 份</span>
            </div>
            {filteredPapers.length === 0 ? (
              <div className="selection-empty rounded-2xl border border-dashed border-outline-variant bg-white p-8 text-center text-sm text-on-surface-variant">
                {paperTab === 'private' ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-[#004ac6] flex items-center justify-center font-bold text-xl">
                      0
                    </div>
                    <p className="font-semibold text-slate-800 text-base">目前您的個人 Google 試算表中尚無已發布的試卷（0 份）</p>
                    <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                      若您的 Google 試算表剛建立且只有空白「工作表1」，請點擊下方按鈕進行 Google 授權並一鍵建立 4 張標準分頁（test_bank、quiz_bank_publish、quiz_bank_unpublish、log）。
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={handleInitPersonalSheet}
                        disabled={isInitializingSheet}
                        className="px-4 py-2 bg-[#004ac6] hover:bg-[#003ea8] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">playlist_add</span>
                        <span>{isInitializingSheet ? '正在建立標準分頁與標題…' : '🛠️ 在我的 Google Sheet 建立標準分頁'}</span>
                      </button>
                      {onNavigate && (
                        <button
                          type="button"
                          onClick={() => onNavigate('user-selector')}
                          className="px-4 py-2 border border-[#004ac6] text-[#004ac6] hover:bg-[#eef3ff] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          前往「題目選擇頁面」挑選組卷
                        </button>
                      )}
                    </div>
                    {initSheetMessage && (
                      <p className={`text-xs mt-2 font-medium ${initSheetMessage.includes('成功') || initSheetMessage.includes('✅') ? 'text-green-600' : 'text-red-500'}`}>
                        {initSheetMessage}
                      </p>
                    )}
                  </div>
                ) : (
                  '找不到符合條件的公用試卷，請調整搜尋或篩選條件。'
                )}
              </div>
            ) : filteredPapers.map((paper) => {
              const selected = paper.id === selectedPaperId;
              return (
                <article
                  key={paper.id}
                  className={`selection-card exam-selection-card rounded-2xl border bg-white p-4 transition-all sm:p-5 ${selected ? 'border-[#004ac6] ring-2 ring-[#004ac6]/20 shadow-sm' : 'border-[#c3c6d7] hover:border-[#7598da]'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
                        <span className="selection-chip subject-chip rounded-full bg-[#dbe1ff] px-2.5 py-1 text-[#00174b]">{paper.subject}</span>
                        <span className="selection-chip rounded-full bg-[#eceef0] px-2.5 py-1 text-[#434655]">
                          {DIFFICULTY_LABELS[difficultyFor(paper.difficultyLv)]}難度
                        </span>
                      </div>
                      <h2 className="text-base font-bold leading-6 text-[#191c1e]">{paper.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-[#565e74] line-clamp-2">{paper.description || '無詳細說明'}</p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#565e74]">
                        <span>{paper.questionCount} 題</span>
                        <span>{paper.totalScore} 分</span>
                        <span>{paper.durationMinutes} 分鐘</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectPaper(paper)}
                      aria-pressed={selected}
                      className={`shrink-0 self-start sm:self-center min-w-[96px] h-10 rounded-lg px-4 py-2 text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                        selected
                          ? 'bg-[#004ac6] border border-[#004ac6] text-white shadow-sm'
                          : 'border border-[#004ac6] text-[#004ac6] bg-white hover:bg-[#eef3ff]'
                      }`}
                    >
                      {selected ? '已選擇' : '選擇試卷'}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="selection-summary rounded-2xl border border-outline-variant bg-white p-5 lg:sticky lg:top-5">
            <h2 className="text-base font-bold text-on-surface">試卷摘要</h2>
            {selectedPaper ? (
              <>
                <p className="mt-4 font-semibold leading-6 text-on-surface">{selectedPaper.title}</p>
                <dl className="mt-4 space-y-2 text-sm text-on-surface-variant">
                  <div className="flex justify-between gap-3"><dt>科目</dt><dd>{selectedPaper.subject}</dd></div>
                  <div className="flex justify-between gap-3"><dt>題數</dt><dd>{selectedPaper.questionCount} 題</dd></div>
                  <div className="flex justify-between gap-3"><dt>總分</dt><dd>{selectedPaper.totalScore} 分</dd></div>
                  <div className="flex justify-between gap-3"><dt>作答時間</dt><dd>{selectedPaper.durationMinutes} 分鐘</dd></div>
                </dl>
                <button
                  type="button"
                  onClick={() => {
                    const isCompleted = typeof window !== 'undefined' && selectedPaper && (() => {
                      try {
                        const raw = localStorage.getItem(`exam-session:v1:${selectedPaper.id}`);
                        if (!raw) return false;
                        const parsed = JSON.parse(raw);
                        return parsed.status === 'submitted' || (parsed.deadline && parsed.deadline < Date.now());
                      } catch {
                        return false;
                      }
                    })();

                    if (isCompleted) {
                      if (window.confirm(`試卷「${selectedPaper.title}」先前已作答完成（或作答時間已結束）。\n\n是否清除舊紀錄重新開始測驗？\n（按「確定」重新作答，按「取消」查看上次成績結果）`)) {
                        clearSession(selectedPaper.id);
                      }
                    }

                    if (onStartExam) {
                      onStartExam(selectedPaper);
                      return;
                    }
                    if (typeof window !== 'undefined') {
                      window.history.pushState(null, '', `/exam/${encodeURIComponent(selectedPaper.id)}`);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="selection-button primary mt-5 min-h-11 w-full rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-container transition-colors shadow-sm"
                >
                  開始測驗
                </button>
                {notice && <p role="status" className="mt-3 rounded-lg bg-primary-fixed px-3 py-3 text-sm leading-5 text-on-primary-fixed">{notice}</p>}
              </>
            ) : (
              <p className="mt-3 text-sm leading-6 text-on-surface-variant">選擇一份試卷後，這裡會顯示作答資訊。</p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
