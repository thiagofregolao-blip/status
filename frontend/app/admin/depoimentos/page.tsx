import Link from 'next/link';
import { Plus, Pencil, Star } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function DepoimentosPage() {
  const rows = await prisma.testimonial.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Depoimentos</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {rows.length} {rows.length === 1 ? 'depoimento' : 'depoimentos'}
          </p>
        </div>
        <Link
          href="/admin/depoimentos/novo"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-800"
        >
          <Plus className="w-4 h-4" /> Novo depoimento
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Pessoa</th>
              <th className="px-4 py-3 text-left">Cargo</th>
              <th className="px-4 py-3 text-left">Localização</th>
              <th className="px-4 py-3 text-left">Estrelas</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                  Nenhum depoimento cadastrado
                </td>
              </tr>
            )}
            {rows.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {t.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.imageUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-sm">
                        {t.name[0]}
                      </div>
                    )}
                    <div className="font-medium text-slate-900 flex items-center gap-2">
                      {t.name}
                      {t.featured && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-700">{t.role}</td>
                <td className="px-4 py-3 text-slate-700">{t.location}</td>
                <td className="px-4 py-3 text-slate-700">{'★'.repeat(t.rating)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      t.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {t.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/depoimentos/${t.id}`}
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
