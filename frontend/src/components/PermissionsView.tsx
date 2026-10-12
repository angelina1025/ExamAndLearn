import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  UserCheck,
  Lock,
  Unlock,
  Check,
  X,
  Search,
  Plus,
  RefreshCw,
  FileText,
  BarChart2,
  Database,
  UploadCloud,
  Settings,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  User,
  KeyRound,
  History,
} from 'lucide-react';
import { UserRole, NavTab } from './Navbar';

interface PermissionsViewProps {
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onNavigateTab: (tab: NavTab) => void;
}

interface AccountItem {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  lastLogin: string;
  department: string;
}

export const PermissionsView: React.FC<PermissionsViewProps> = ({
  currentRole,
  onChangeRole,
  onNavigateTab,
}) => {
  // Accounts mock state
  const [accounts, setAccounts] = useState<AccountItem[]>([
    {
      id: 'USR-001',
      name: 'AAA (當前使用者)',
      email: 'aaa@test-eval.edu.tw',
      role: currentRole,
      status: 'active',
      lastLogin: '剛剛 (在線中)',
      department: '電腦科學與資訊工程學系',
    },
    {
      id: 'USR-002',
      name: '李維倫 講座教授',
      email: 'wl.lee@test-eval.edu.tw',
      role: 'admin',
      status: 'active',
      lastLogin: '10 分鐘前',
      department: '測驗評量與題庫審定委員會',
    },
    {
      id: 'USR-003',
      name: '王小明 學員',
      email: 'xm.wang@student.edu.tw',
      role: 'user',
      status: 'active',
      lastLogin: '昨天 19:42',
      department: '資工所 碩一',
    },
    {
      id: 'USR-004',
      name: '陳助教',
      email: 'ta.chen@test-eval.edu.tw',
      role: 'user',
      status: 'active',
      lastLogin: '3 天前',
      department: '資訊工程系 助教小組',
    },
    {
      id: 'USR-005',
      name: '林專員',
      email: 'admin.lin@test-eval.edu.tw',
      role: 'admin',
      status: 'active',
      lastLogin: '5 天前',
      department: '教務處 考選行政組',
    },
  ]);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('user');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keep AAA account in sync with currentRole
  const handleRoleToggle = (newRole: UserRole) => {
    onChangeRole(newRole);
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === 'USR-001' ? { ...acc, role: newRole } : acc))
    );
    showToast(`已成功切換為「${newRole === 'admin' ? '管理員' : '一般使用者'}」權限身分`);
  };

  const handleUpdateAccountRole = (id: string, role: UserRole) => {
    if (id === 'USR-001') {
      handleRoleToggle(role);
      return;
    }
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, role } : acc))
    );
    showToast(`帳號權限已更新`);
  };

  const handleToggleStatus = (id: string) => {
    if (id === 'USR-001') {
      showToast('無法停用當前操作者帳號');
      return;
    }
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id
          ? { ...acc, status: acc.status === 'active' ? 'inactive' : 'active' }
          : acc
      )
    );
    showToast(`帳號狀態已更新`);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const newAcc: AccountItem = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      status: 'active',
      lastLogin: '從未登入',
      department: '一般學員帳號',
    };
    setAccounts([newAcc, ...accounts]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddModal(false);
    showToast(`已成功建立 ${newAcc.name} 帳號`);
  };

  const filteredAccounts = accounts.filter((acc) => {
    if (roleFilter !== 'all' && acc.role !== roleFilter) return false;
    if (
      searchKeyword.trim() &&
      !acc.name.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      !acc.email.toLowerCase().includes(searchKeyword.toLowerCase()) &&
      !acc.department.toLowerCase().includes(searchKeyword.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-[1580px] mx-auto px-4 sm:px-6 py-4 space-y-6">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-500">
          <span>系統核心管理</span>
          <span>&gt;</span>
          <span>安全存取控制 (RBAC)</span>
          <span>&gt;</span>
          <span className="font-semibold text-slate-800">平台權限設定</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>當前系統角色：{currentRole === 'admin' ? '管理員 (Admin)' : '使用者 (User)'}</span>
          </div>
        </div>
      </div>

      {/* Role Switcher Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-blue-200">
            <KeyRound className="w-3.5 h-3.5 text-amber-300" />
            <span>角色視圖即時切換體驗 (Role View Switcher)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            平台權限與角色功能存取管理
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            系統嚴格劃分「管理員」與「使用者」兩大存取權限。點擊右側按鈕可即時切換當前 AAA 身分，上方導覽列頁籤將動態依據權限重組呈現。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => handleRoleToggle('admin')}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2.5 cursor-pointer shadow-md ${
              currentRole === 'admin'
                ? 'bg-blue-600 text-white ring-4 ring-blue-500/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
            }`}
          >
            <Shield className="w-4 h-4 text-blue-300" />
            <span>切換為「管理員」</span>
            {currentRole === 'admin' && <Check className="w-4 h-4 text-white ml-1" />}
          </button>

          <button
            onClick={() => handleRoleToggle('user')}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2.5 cursor-pointer shadow-md ${
              currentRole === 'user'
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-500/30'
                : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15'
            }`}
          >
            <User className="w-4 h-4 text-emerald-300" />
            <span>切換為「使用者」</span>
            {currentRole === 'user' && <Check className="w-4 h-4 text-white ml-1" />}
          </button>
        </div>
      </div>

      {/* Permissions Matrix Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                角色頁面與功能存取權限矩陣 (RBAC Matrix)
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              各權限角色可瀏覽與操作之頁面模組配置規範
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            規則版本: v2.4 (Strict Access Policy)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-slate-600 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">頁面模組名稱</th>
                <th className="py-3 px-4 font-bold">路徑代號</th>
                <th className="py-3 px-4 font-bold text-center">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-blue-100/70 text-blue-800">
                    <Shield className="w-3.5 h-3.5" />
                    <span>管理員 (Admin)</span>
                  </div>
                </th>
                <th className="py-3 px-4 font-bold text-center">
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800">
                    <User className="w-3.5 h-3.5" />
                    <span>使用者 (User)</span>
                  </div>
                </th>
                <th className="py-3 px-4 font-bold">功能職責說明</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* 線上測驗 */}
              <tr className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>線上測驗</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">/exam</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                  參加全學科即時模擬評量、限時作答與自動交卷評分。
                </td>
              </tr>

              {/* 成績與錯題分析 */}
              <tr className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4 text-indigo-600" />
                  <span>成績與錯題分析</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">/analysis</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                  檢視個人測驗成績單、雷達圖五維能力診斷與錯題重測突破。
                </td>
              </tr>

              {/* 題庫管理系統 */}
              <tr className="hover:bg-slate-50/50 transition bg-blue-50/20">
                <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>題庫管理系統</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">/bank</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                  檢視題庫階層樹、題幹關鍵字檢索、多欄位排序與題目預覽。
                </td>
              </tr>

              {/* 題目匯入 */}
              <tr className="hover:bg-slate-50/50 transition bg-blue-50/20">
                <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                  <UploadCloud className="w-4 h-4 text-teal-600" />
                  <span>題目匯入</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">/import</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                  文字快速貼上與批次檔案匯入、智慧語意解析與題庫卡片校訂。
                </td>
              </tr>

              {/* 平台權限設定 */}
              <tr className="hover:bg-slate-50/50 transition">
                <td className="py-3.5 px-4 font-semibold text-slate-800 flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-rose-600" />
                  <span>平台權限設定</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-slate-400">/permissions</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 text-[11px]">
                  管理使用者帳號、身分授權分配、RBAC 存取控制規則與稽核日誌。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* User Accounts Management Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">使用者帳號與權限指派清單</h2>
            </div>
            <p className="text-xs text-slate-500">
              檢視系統登入帳號、所屬單位與指派權限身分
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>新增使用者</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="搜尋使用者姓名、Email、所屬單位..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-slate-500 font-medium">篩選角色：</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 text-xs focus:outline-none"
            >
              <option value="all">全部角色 ({accounts.length})</option>
              <option value="admin">管理員 ({accounts.filter((a) => a.role === 'admin').length})</option>
              <option value="user">一般使用者 ({accounts.filter((a) => a.role === 'user').length})</option>
            </select>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <th className="py-3 px-4 font-bold">使用者名稱 / 帳號</th>
                <th className="py-3 px-4 font-bold">所屬單位</th>
                <th className="py-3 px-4 font-bold">指派角色權限</th>
                <th className="py-3 px-4 font-bold">帳號狀態</th>
                <th className="py-3 px-4 font-bold">最後登入時間</th>
                <th className="py-3 px-4 font-bold text-right">權限操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.map((acc) => {
                const isCurrentUser = acc.id === 'USR-001';
                return (
                  <tr
                    key={acc.id}
                    className={`hover:bg-slate-50/60 transition ${
                      isCurrentUser ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            acc.role === 'admin'
                              ? 'bg-blue-600 text-white'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {acc.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                            <span>{acc.name}</span>
                            {isCurrentUser && (
                              <span className="px-1.5 py-0.2 bg-blue-100 text-blue-700 text-[10px] rounded font-mono font-bold">
                                目前帳號
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-mono mt-0.5">{acc.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-600">{acc.department}</td>

                    <td className="py-3 px-4">
                      <select
                        value={acc.role}
                        onChange={(e) => handleUpdateAccountRole(acc.id, e.target.value as UserRole)}
                        className={`px-2.5 py-1 rounded-lg border font-semibold text-xs transition cursor-pointer ${
                          acc.role === 'admin'
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        }`}
                      >
                        <option value="admin">管理員</option>
                        <option value="user">使用者</option>
                      </select>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleStatus(acc.id)}
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-medium border transition cursor-pointer ${
                          acc.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            acc.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        <span>{acc.status === 'active' ? '正常啟用' : '已停用'}</span>
                      </button>
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {acc.lastLogin}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {isCurrentUser ? (
                          <span className="text-[11px] text-blue-600 font-medium">使用中</span>
                        ) : (
                          <button
                            onClick={() => handleUpdateAccountRole(acc.id, acc.role === 'admin' ? 'user' : 'admin')}
                            className="text-xs text-slate-600 hover:text-blue-600 font-medium transition cursor-pointer"
                          >
                            切換為{acc.role === 'admin' ? '使用者' : '管理員'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <h3 className="font-bold text-slate-800 text-base">新增平台使用者帳號</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">使用者姓名 *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="例如：林大明 助教"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">電子信箱 (Email) *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="name@test-eval.edu.tw"
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">初始指派權限角色</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="user">一般使用者 (線上測驗、成績與錯題分析、題庫、題目匯入)</option>
                  <option value="admin">管理員 (題庫管理系統、題目匯入、平台權限設定)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-xs"
                >
                  確認建立
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
