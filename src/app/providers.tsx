'use client';

import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ExamSessionProvider } from '@/contexts/ExamSessionContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExamSessionProvider>{children}</ExamSessionProvider>
    </AuthProvider>
  );
}

export default Providers;

