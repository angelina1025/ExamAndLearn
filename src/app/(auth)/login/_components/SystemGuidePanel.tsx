'use client';

import React from 'react';
import { RoleItem } from '@/types';
import { DATABASE_TABLE_SCHEMAS, INITIAL_ROLES_DATA } from '@/services/publicSheet';

interface SystemGuidePanelProps {
  roles: RoleItem[];
  isLoadingRoles?: boolean;
  onBackToLogin: () => void;
}

export const SystemGuidePanel: React.FC<SystemGuidePanelProps> = ({
  roles,
  isLoadingRoles = false,
  onBackToLogin,
}) => {
  const displayRoles = roles.length > 0 ? roles : INITIAL_ROLES_DATA;
  const userColumns = DATABASE_TABLE_SCHEMAS.users.columns;
  const roleColumns = DATABASE_TABLE_SCHEMAS.roles.columns;

  return (
    <div className="flex flex-col gap-5 text-[#191c1e] animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-[#dbe1ff]/40 border border-[#004ac6]/20 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[#004ac6] text-[22px] mt-0.5">
          verified_user
        </span>
        <div className="flex-1">
          <h3 className="text-[14px] font-bold text-[#004ac6]">
            系統登入與 Google Sheet 資料庫驗證說明
          </h3>
          <p className="text-[12px] text-[#434655] mt-1 leading-relaxed">
            本系統直接串接 Google Sheet 雲端資料庫中的{' '}
            <code className="px-1.5 py-0.5 rounded bg-white text-[#004ac6] font-mono font-semibold">
              users
            </code>{' '}
            與{' '}
            <code className="px-1.5 py-0.5 rounded bg-white text-[#004ac6] font-mono font-semibold">
              roles
            </code>{' '}
            工作表。登入時會即時比對帳號（<code className="font-mono">identifier</code>）與密碼（
            <code className="font-mono">credential</code>），確認使用者存在、檢查啟用狀態（
            <code className="font-mono">status</code>），並透過外鍵{' '}
            <code className="font-mono">users.role → roles.code</code> 解析對應的角色權限。
          </p>
        </div>
      </div>

      {/* Account Status Specification */}
      <div className="bg-[#f8f9fa] border border-[#c3c6d7]/50 rounded-xl p-4">
        <h4 className="text-[13px] font-bold text-[#191c1e] mb-2.5 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#004ac6]">
            fact_check
          </span>
          <span>帳號狀態碼（users.status）判定規則</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[12px]">
          <div className="bg-white p-3 rounded-lg border border-[#c3c6d7]/40 flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#d1fae5] text-[#065f46]">
              1 = 啟用
            </span>
            <span className="text-[#434655]">正常登入並載入角色權限</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#c3c6d7]/40 flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#fee2e2] text-[#991b1b]">
              0 = 停用
            </span>
            <span className="text-[#434655]">禁止登入，提示聯繫管理員</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#c3c6d7]/40 flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#fef3c7] text-[#92400e]">
              2 = 未驗證
            </span>
            <span className="text-[#434655]">禁止登入，需先完成驗證</span>
          </div>
        </div>
      </div>

      {/* Roles List from Google Sheet */}
      <div className="bg-white border border-[#c3c6d7]/50 rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-[#f2f4f6] border-b border-[#c3c6d7]/40 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#004ac6]">
              badge
            </span>
            <h4 className="text-[13px] font-bold text-[#191c1e]">
              角色權限定義表（table: roles）
            </h4>
          </div>
          <span className="text-[11px] text-[#434655]">
            {isLoadingRoles ? '讀取雲端角色中...' : `共 ${displayRoles.length} 種角色`}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="border-b border-[#c3c6d7]/30 bg-[#f8f9fa] text-[#434655]">
                <th className="py-2 px-3 font-semibold">id</th>
                <th className="py-2 px-3 font-semibold">code (角色代碼)</th>
                <th className="py-2 px-3 font-semibold">name (顯示名稱)</th>
                <th className="py-2 px-3 font-semibold">description (角色描述)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c3c6d7]/20">
              {displayRoles.map((r) => (
                <tr key={r.code} className="hover:bg-[#f8f9fa]">
                  <td className="py-2 px-3 font-mono text-[#434655]">{r.id}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#dbe1ff] text-[#004ac6] font-mono font-bold text-[11px]">
                      {r.code}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-[#191c1e]">{r.name}</td>
                  <td className="py-2 px-3 text-[#434655]">{r.description || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Schema Reference for users & roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white border border-[#c3c6d7]/50 rounded-xl p-3.5">
          <h4 className="text-[12px] font-bold text-[#004ac6] mb-2 font-mono">
            table: users 欄位結構
          </h4>
          <ul className="space-y-1 text-[11px] text-[#434655]">
            {userColumns.map((col) => (
              <li key={col.key} className="flex items-center justify-between gap-2">
                <code className="font-mono font-bold text-[#191c1e]">{col.label}</code>
                <span className="text-right text-[#737686]">{col.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-[#c3c6d7]/50 rounded-xl p-3.5 flex flex-col justify-between">
          <div>
            <h4 className="text-[12px] font-bold text-[#004ac6] mb-2 font-mono">
              table: roles 欄位結構
            </h4>
            <ul className="space-y-1 text-[11px] text-[#434655]">
              {roleColumns.map((col) => (
                <li key={col.key} className="flex items-center justify-between gap-2">
                  <code className="font-mono font-bold text-[#191c1e]">{col.label}</code>
                  <span className="text-right text-[#737686]">{col.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c3c6d7]/30 flex justify-end">
            <button
              type="button"
              onClick={onBackToLogin}
              className="px-4 py-2 rounded-lg bg-[#004ac6] text-white text-[12px] font-semibold hover:bg-[#003ea8] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              <span>返回登入畫面</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

