import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { NotificationItem, Question, SubjectFilter } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: 'question-bank' | 'exam-papers' | 'system-settings';
  selectedSubject: SubjectFilter;
  onSelectSubject: (id: SubjectFilter) => void;
  onNavigate: (page: 'question-bank' | 'exam-papers' | 'system-settings') => void;
  onOpenCreateQuestion: () => void;
  collapsedSidebar: boolean;
  onToggleCollapse: () => void;
  questions: Question[];
  isSheetsConnected: boolean;
  spreadsheetUrl: string | null;
  onSync: () => void;
  isSyncing: boolean;
  onOpenSearch: () => void;
  onLogout: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  activePage,
  selectedSubject,
  onSelectSubject,
  onNavigate,
  onOpenCreateQuestion,
  collapsedSidebar,
  onToggleCollapse,
  questions,
  isSheetsConnected,
  spreadsheetUrl,
  onSync,
  isSyncing,
  onOpenSearch,
  onLogout,
  notifications,
  onMarkNotificationRead,
}) => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      <Header
        onOpenSearch={onOpenSearch}
        onLogout={onLogout}
        notifications={notifications}
        onMarkNotificationRead={onMarkNotificationRead}
        isSheetsConnected={isSheetsConnected}
        spreadsheetUrl={spreadsheetUrl}
        onSync={onSync}
        isSyncing={isSyncing}
      />

      <Sidebar
        activePage={activePage}
        selectedSubject={selectedSubject}
        onSelectSubject={onSelectSubject}
        onNavigate={onNavigate}
        onOpenCreateQuestion={onOpenCreateQuestion}
        collapsed={collapsedSidebar}
        onToggleCollapse={onToggleCollapse}
        questions={questions}
        isSheetsConnected={isSheetsConnected}
      />

      <div className={`${collapsedSidebar ? 'pl-16' : 'pl-64'} transition-all duration-150`}>
        <main className="w-full pt-18 px-6 pb-12 bg-[#f7f9fb] min-h-screen">{children}</main>
      </div>
    </div>
  );
};

