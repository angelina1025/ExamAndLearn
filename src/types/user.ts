export type UserRoleCode = 'ADMIN' | 'USER' | 'TEACHER' | 'EXAMINER' | 'STUDENT' | 'GUEST' | string;
export type UserRole = 'student' | 'teacher' | 'admin' | UserRoleCode;

export interface RoleItem {
  id: number;
  code: string; // 角色代碼（程式判斷用，如 ADMIN, USER, GUEST）
  name: string; // 角色顯示名稱（如管理員、用戶、訪客）
  description: string; // 角色描述
  created_at?: string; // 建立時間
}

export interface UserProfile {
  id?: number; // 流水編號
  uuid: string; // 全域唯一識別碼，對外公開用(防刷ID)
  status?: number; // 帳號狀態: 0=停用, 1=啟用, 2=未驗證
  role: UserRole; // 角色（外鍵關聯至 roles.code）
  roleName?: string; // 關聯 roles.name（如 管理員、用戶、訪客）
  roleDescription?: string; // 關聯 roles.description
  name?: string; // 暱稱 (對應 Sheet 的 name)
  nickname: string; // 顯示暱稱 (對應 Sheet 的 name)
  identifier?: string; // 帳號
  credential?: string; // 密碼
  google_sheet_URL?: string; // 使用者資料庫
  last_login_at?: string; // 最後登入時間
  created_at?: string; // 帳號建立時間
  updated_at?: string; // 帳號資料更新時間
}

export interface AuthLoginResult {
  success: boolean;
  user?: UserProfile;
  roleInfo?: RoleItem;
  error?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  target: string;
  operator: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}
