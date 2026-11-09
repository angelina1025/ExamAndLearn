'use client';

import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen flex flex-col bg-[#f8f9fa]">{children}</div>;
}

