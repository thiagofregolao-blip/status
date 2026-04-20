import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import { auth } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = { title: 'Admin · Status' };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <Toaster position="top-right" richColors />
      <AdminShell userEmail={session?.user?.email ?? undefined}>{children}</AdminShell>
    </SessionProvider>
  );
}
