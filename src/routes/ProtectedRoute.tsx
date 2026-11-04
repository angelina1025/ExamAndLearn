import React from 'react';
import { UserRoleCode } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRoleCode[];
  currentRole?: UserRoleCode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  currentRole = 'ADMIN',
}) => {
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(currentRole)) {
    return (
      <div className="p-8 text-center text-[#ba1a1a] font-medium">
        您目前的角色權限 ({currentRole}) 無法存取此頁面。
      </div>
    );
  }
  return <>{children}</>;
};

