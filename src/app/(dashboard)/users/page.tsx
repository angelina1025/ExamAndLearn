'use client';

import React, { useState } from 'react';
import { UserProfile, RoleItem } from '@/types';
import { UserFormModal } from '@/app/(dashboard)/users/_components/UserFormModal';

interface AccountManagementViewProps {
  users: UserProfile[];
  roles: RoleItem[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onSaveUser: (user: UserProfile) => Promise<void>;
  onDeleteUser?: (user: UserProfile) => void;
}

export const AccountManagementView: React.FC<AccountManagementViewProps> = ({
  users = [],
  roles = [],
  isLoading = false,
  onRefresh = () => {},
  onSaveUser = async () => {},
  onDeleteUser,
}) => {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  const filteredUsers = users.filter((u) => {
    const term = search.trim().toLowerCase();
    const matchSearch =
      !term ||
      (u.name || '').toLowerCase().includes(term) ||
      (u.identifier || '').toLowerCase().includes(term) ||
      (u.uuid || '').toLowerCase().includes(term);

    const matchRole = roleFilter === 'all' || String(u.role).toUpperCase() === roleFilter.toUpperCase();
    const matchStatus = statusFilter === 'all' || String(u.status) === statusFilter;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="flex flex-col gap-5 w-full max-w-6xl mx-auto">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#dbe1ff] text-[#004ac6]">
              <span className="material-symbols-outlined text-[24px]">manage_accounts</span>
            </span>
            <h1 className="text-2xl font-bold text-[#191c1e] tracking-tight">
              帳號管理 (table: users)
            </h1>
          </div>
          <p className="text-xs text-[#434655] mt-1">
            直接綁定公用 Google Sheet「<code className="font-mono text-[#004ac6]">users</code>」與「<code className="font-mono text-[#004ac6]">roles</code>」工作表
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3 py-2 rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#434655] hover:bg-[#eceef0] flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-[16px] ${isLoading ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>重新載入</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setEditingUser(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>新增帳號</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-[#c3c6d7]/40 shadow-2xs flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px] relative">
          <span className="material-symbols-outlined text-[18px] text-[#737686] absolute left-3 top-1/2 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋帳號 (identifier)、暱稱 (name) 或 UUID..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-[#434655] font-semibold">角色:</label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-xs"
          >
            <option value="all">全部角色 ({roles.length})</option>
            {roles.map((r) => (
              <option key={r.code} value={r.code}>
                {r.code} - {r.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-[#434655] font-semibold">狀態:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#f8f9fa] border border-[#c3c6d7] rounded-xl text-xs"
          >
            <option value="all">全部狀態</option>
            <option value="1">1 = 啟用</option>
            <option value="0">0 = 停用</option>
            <option value="2">2 = 未驗證</option>
          </select>
        </div>

        <span className="text-xs text-[#737686] ml-auto">
          共 <strong className="text-[#191c1e]">{filteredUsers.length}</strong> 位使用者
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-[#c3c6d7]/40 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-[#c3c6d7]/30 bg-[#f8f9fa] text-[#434655] font-bold">
                <th className="py-3 px-4 w-12">#</th>
                <th className="py-3 px-4">帳號 (identifier)</th>
                <th className="py-3 px-4">暱稱 (name)</th>
                <th className="py-3 px-4">角色 (roles.code)</th>
                <th className="py-3 px-4">狀態 (status)</th>
                <th className="py-3 px-4">使用者資料庫 (Sheet URL)</th>
                <th className="py-3 px-4">最後登入時間</th>
                <th className="py-3 px-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-[#737686]">
                    查無符合條件的使用者帳號資料
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u, idx) => (
                  <tr key={u.uuid || idx} className="hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#737686]">{u.id || idx + 1}</td>
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-[#004ac6]">
                        {u.identifier}
                      </span>
                      <div className="text-[10px] text-[#737686] font-mono">{u.uuid}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-[#191c1e]">
                      {u.name || u.nickname}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-[#dbe1ff] text-[#004ac6] font-mono font-bold text-[11px]">
                        {u.role}
                      </span>
                      <span className="text-[11px] text-[#434655] ml-1.5 font-medium">
                        {u.roleName}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {u.status === 1 ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#d1fae5] text-[#065f46] font-bold text-[10px]">
                          1 = 啟用
                        </span>
                      ) : u.status === 0 ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#fee2e2] text-[#991b1b] font-bold text-[10px]">
                          0 = 停用
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] font-bold text-[10px]">
                          2 = 未驗證
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate">
                      {u.google_sheet_URL ? (
                        <a
                          href={u.google_sheet_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#004ac6] hover:underline font-mono text-[11px] flex items-center gap-1"
                          title={u.google_sheet_URL}
                        >
                          <span className="truncate">{u.google_sheet_URL}</span>
                          <span className="material-symbols-outlined text-[14px] shrink-0">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <span className="text-[#737686] italic">未設定</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-[#434655]">
                      {u.last_login_at || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingUser(u);
                            setIsModalOpen(true);
                          }}
                          className="p-1 text-[#434655] hover:text-[#004ac6] hover:bg-[#e6e8ea] rounded-lg transition-colors"
                          title="編輯帳號"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        {onDeleteUser && (
                          <button
                            type="button"
                            onClick={() => onDeleteUser(u)}
                            className="p-1 text-[#434655] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/30 rounded-lg transition-colors"
                            title="刪除帳號"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Create Modal */}
      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSaveUser}
        initialUser={editingUser}
        roles={roles}
      />
    </div>
  );
};

export default AccountManagementView;

