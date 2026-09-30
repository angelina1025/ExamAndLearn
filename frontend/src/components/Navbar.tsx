import React, { useState } from 'react';
import {
  FileText,
  BarChart2,
  Database,
  Sparkles,
  Globe,
  Bell,
  User,
  ChevronDown,
  Check,
  LogOut,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export type NavTab = 'exam' | 'analysis' | 'bank' | 'import';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  examProgress?: number;
  onOpenOfflineManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab, onOpenOfflineManager }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNoticeMenu, setShowNoticeMenu] = useState(false);
  const [lang, setLang] = useState('繁體中文');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'exam', label: '線上測驗', icon: <FileText className="w-4 h-4" /> },
    { id: 'analysis', label: '成績與錯題分析', icon: <BarChart2 className="w-4 h-4" /> },
    { id: 'bank', label: '題庫管理系統', icon: <Database className="w-4 h-4" /> },
    { id: 'import', label: '智慧組題匯入', icon: <Sparkles className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('analysis')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 flex items-center leading-none">
              Test
            </span>
            <span className="text-[11px] font-medium text-slate-400 leading-tight tracking-wider mt-0.5">
              測驗評量平台
            </span>
          </div>
        </div>

        {/* Center: Main Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center space-x-2 ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Offline/Sync, Lang, Notifications, Admin Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Offline / Download Bank Button */}
          <button
            onClick={onOpenOfflineManager}
            className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              isOnline
                ? 'bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-400/30'
            }`}
            title="離線題庫下載與管理"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500 animate-ping'
              }`}
            />
            <span className="hidden sm:inline">
              {isOnline ? '離線題庫預載' : '離線模式'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>文A {lang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs">
                {['繁體中文', 'English', '日本語'].map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setShowLangMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 text-slate-700"
                  >
                    <span>{l}</span>
                    {lang === l && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNoticeMenu(!showNoticeMenu)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              aria-label="通知中心"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {showNoticeMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-semibold text-slate-800">最新通知</span>
                  <span className="text-[10px] bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded font-medium">2 則未讀</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-blue-50/50 hover:bg-blue-50 transition cursor-pointer">
                    <p className="font-medium text-slate-800">CS-302 期中考成績已完成彙整</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">系統已自動產出 8 道待鞏固錯題診斷分析。</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">10 分鐘前</span>
                  </div>
                  <div className="p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer">
                    <p className="font-medium text-slate-800">題庫雲端同步完成</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">排序與搜尋分類新增 5 道同儕審定試題。</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 小時前</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Admin User Badge */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 bg-slate-100/90 hover:bg-slate-200/80 rounded-full transition"
            >
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold shadow-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left text-xs leading-none hidden sm:block">
                <div className="text-[10px] text-slate-400 font-medium">管理員</div>
                <div className="text-slate-800 font-semibold mt-0.5">AAA</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-500 hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">管理員 AAA</p>
                  <p className="text-[11px] text-slate-400">admin@test-eval.edu.tw</p>
                </div>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-slate-700 hover:bg-slate-50"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>平台權限與設定</span>
                </button>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-3 py-2 flex items-center space-x-2 text-rose-600 hover:bg-rose-50"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  <span>登出帳號</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 px-4 py-2 space-x-2 bg-slate-50/50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
              currentTab === item.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 bg-white border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
