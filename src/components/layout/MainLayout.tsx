'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar, AppPageId } from '@/components/layout/Sidebar';
import { NotificationItem, Question, SubjectFilter, UserProfile } from '@/types';

interface MainLayoutProps {
  children: React.ReactNode;
  activePage: AppPageId;
  selectedSubject: SubjectFilter;
  onSelectSubject: (id: SubjectFilter) => void;
  onNavigate: (page: AppPageId) => void;
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
  currentUser?: UserProfile | null;
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
  currentUser,
}) => {
  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">
      <Header
        onOpenSearch={onOpenSearch}
        onLogout={onLogout}
        notifications={notifications}
        onMarkNotificationRead={onMarkNotificationRead}
        currentUser={currentUser}
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
        spreadsheetUrl={spreadsheetUrl}
        onSync={onSync}
        isSyncing={isSyncing}
        currentUser={currentUser}
      />

      <div className={`${collapsedSidebar ? 'pl-16' : 'pl-64'} transition-all duration-150`}>
        <main className="w-full pt-18 px-6 pb-12 bg-[#f7f9fb] min-h-screen">{children}</main>
      </div>
    </div>
  );
};

