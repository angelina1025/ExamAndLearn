export type UserRoleCode = 'ADMIN' | 'TEACHER' | 'EXAMINER' | 'STUDENT' | 'GUEST';
export type UserRole = 'student' | 'teacher' | 'admin' | UserRoleCode;

export interface UserProfile {
  id?: number;
  uuid: string;
  nickname: string; // 對應 Sheet 的 name
  identifier?: string;
  role: UserRole;
  status?: number; // 0=停用, 1=啟用, 2=未驗證
  google_sheet_URL?: string; // 個人私人 Sheet 網址
  last_login_at?: string;
  created_at?: string;
  updated_at?: string;
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
