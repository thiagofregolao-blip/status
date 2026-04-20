import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function FaqPage() {
  const rows = await prisma.faq.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {rows.length} {rows.length === 1 ? 'pergunta' : 'perguntas'}
          </p>
        </div>
        <Link
          href="/admin/faq/nova"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-800"
        >
          <Plus className="w-4 h-4" /> Nova pergunta
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Pergunta (PT)</th>
              <th className="px-4 py-3 text-left">Ordem</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                  Nenhuma pergunta cadastrada
                </td>
              </tr>
            )}
            {rows.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900 max-w-xl truncate">{f.questionPt}</td>
                <td className="px-4 py-3 text-slate-700">{f.order}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      f.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {f.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/faq/${f.id}`}
                    className="inline-flex p-2 rounded hover:bg-emerald-50 text-slate-500 hover:text-emerald-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
