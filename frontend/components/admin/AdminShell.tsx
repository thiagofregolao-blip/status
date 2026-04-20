'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

export function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string;
}) {
  const pathname = usePathname();
  const isLogin = pathname === '/admin/login';

  if (isLogin) return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar userEmail={userEmail} />
      <main className="flex-1 overflow-x-auto">{children}</main>
    </div>
  );
}
