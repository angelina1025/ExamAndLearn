'use client';

import React, { useState } from 'react';
import { NotificationItem, UserProfile } from '@/types';

interface HeaderProps {
  onOpenSearch: () => void;
  onLogout: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  currentUser?: UserProfile | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onLogout,
  notifications,
  onMarkNotificationRead,
  currentUser,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const displayName =
    currentUser?.name || currentUser?.nickname || '王敏行 (Admin Wang)';
  const roleCode = String(currentUser?.role || '').toUpperCase();
  const isAdmin = roleCode === 'ADMIN';

  const systemPortalTitle = isAdmin
    ? '線上測驗管理系統 (Admin Portal)'
    : '線上測驗與自主學習系統 (User Portal)';

  const displayRole = currentUser
    ? currentUser.roleName && currentUser.roleName !== currentUser.role
      ? `${currentUser.roleName} (${currentUser.role})`
      : String(currentUser.role)
    : '系統管理員';

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#ffffff]/95 backdrop-blur-md z-40 border-b border-[#c3c6d7]/30 flex items-center justify-between px-6">
      {/* Brand & System Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#004ac6] flex items-center justify-center text-white shadow-sm font-bold text-sm tracking-wider">
          PP
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[16px] leading-[24px] text-[#191c1e] font-semibold tracking-tight">
            {systemPortalTitle}
          </span>
          <span className="text-[11px] leading-[14px] px-1.5 py-0.5 bg-[#dae2fd] text-[#131b2e] rounded border border-[#c3c6d7]/40 font-medium">
            v2.4 Pro
          </span>
        </div>
      </div>

      {/* Global Actions, Search & Admin Profile */}
      <div className="flex items-center gap-4">
        {/* Search trigger button (⌘K) */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-3 px-3 py-1.5 bg-[#f2f4f6] border border-[#c3c6d7]/50 rounded text-[#434655] hover:text-[#191c1e] hover:bg-[#eceef0] transition-colors cursor-pointer text-[13px]"
          type="button"
          title="全域快速搜尋 (⌘K)"
        >
          <span className="material-symbols-outlined text-[18px]">search</span>
          <span className="hidden sm:inline">搜尋試題、試卷或考生...</span>
          <kbd className="font-mono text-[11px] bg-[#e0e3e5] px-1.5 py-0.5 rounded text-[#434655]">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-[#434655] hover:text-[#191c1e] hover:bg-[#e6e8ea] rounded transition-colors relative cursor-pointer"
            title="系統通知"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#007d55] rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl z-50 p-3 border border-[#c3c6d7]/40 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#c3c6d7]/30">
                <span className="font-semibold text-sm text-[#191c1e]">系統通知與日誌</span>
                <span className="text-[11px] text-[#004ac6] cursor-pointer hover:underline">
                  {unreadCount} 則未讀
                </span>
              </div>
              <div className="divide-y divide-[#eceef0] max-h-64 overflow-y-auto mt-1">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onMarkNotificationRead(item.id)}
                    className={`py-2 px-1 flex flex-col gap-1 cursor-pointer rounded hover:bg-[#f2f4f6] transition-colors ${
                      !item.read ? 'bg-[#dbe1ff]/20 font-medium' : 'text-[#434655]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#191c1e]">{item.title}</span>
                      {!item.read && <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6]"></span>}
                    </div>
                    <span className="text-[11px] text-[#434655]/80">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Vertical divider */}
        <div className="h-5 w-[1px] bg-[#c3c6d7]/40"></div>

        {/* Admin profile & logout */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-[14px] leading-tight text-[#191c1e] font-semibold">
              {displayName}
            </div>
            <div className="text-[11px] text-[#004ac6] font-medium">{displayRole}</div>
          </div>
          <div
            className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center text-white shadow-sm"
            title={
              currentUser?.identifier
                ? `帳號: ${currentUser.identifier} | UUID: ${currentUser.uuid}`
                : '系統管理員帳號'
            }
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-[#434655] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded transition-colors cursor-pointer"
            title="登出系統"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
