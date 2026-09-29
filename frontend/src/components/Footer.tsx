import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/90 bg-white/80 backdrop-blur-xs py-6 text-xs text-slate-500">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-800">Test</span>
          <span>© 2026 Test 測驗評量與題庫平台. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-6 text-slate-500">
          <a href="#policy" className="hover:text-blue-600 transition">評量標準政策</a>
          <span className="text-slate-300">|</span>
          <a href="#privacy" className="hover:text-blue-600 transition">隱私條款</a>
          <span className="text-slate-300">|</span>
          <a href="#support" className="hover:text-blue-600 transition">技術支援與回報</a>
        </div>
      </div>
    </footer>
  );
};
