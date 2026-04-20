'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { BookOpen, MessageSquare, HelpCircle, LogOut, ExternalLink } from 'lucide-react';

const links = [
  { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/admin/depoimentos', label: 'Depoimentos', icon: MessageSquare },
  { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
];

export function Sidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 min-h-screen bg-slate-900 text-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <Link href="/admin/cursos" className="block">
          <div className="text-lg font-bold text-white">Evolua <span className="text-emerald-400">Academy</span></div>
          <div className="text-xs text-slate-400">Painel admin</div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                active
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <ExternalLink className="w-4 h-4" />
          Ver site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
        {userEmail && (
          <div className="px-3 pt-2 text-xs text-slate-500 truncate">{userEmail}</div>
        )}
      </div>
    </aside>
  );
}
