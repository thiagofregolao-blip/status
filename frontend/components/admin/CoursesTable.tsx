'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Search, Star, Power, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type Row = {
  id: string;
  slug: string;
  titlePt: string;
  imageUrl: string;
  track: string;
  modality: string;
  price: number;
  totalSeats: number;
  seatsTaken: number;
  status: string;
  featured: boolean;
  startDate: string;
};

const trackLabel: Record<string, string> = {
  tecnica: 'Técnica',
  ia_tech: 'IA & Tech',
};

const modalityLabel: Record<string, string> = {
  presencial: 'Presencial',
  online_ao_vivo: 'Online',
  hibrido: 'Híbrido',
};

const statusPillClass: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  inactive: 'bg-slate-200 text-slate-600',
  upcoming: 'bg-blue-100 text-blue-800',
  finished: 'bg-amber-100 text-amber-800',
};

const statusLabel: Record<string, string> = {
  active: 'Ativo',
  inactive: 'Inativo',
  upcoming: 'Em breve',
  finished: 'Finalizado',
};

export function CoursesTable({ courses }: { courses: Row[] }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = useMemo(() => {
    const qlc = q.trim().toLowerCase();
    return courses.filter((c) => {
      if (filter === 'active' && c.status !== 'active') return false;
      if (filter === 'inactive' && c.status === 'active') return false;
      if (!qlc) return true;
      return c.titlePt.toLowerCase().includes(qlc) || c.slug.toLowerCase().includes(qlc);
    });
  }, [courses, q, filter]);

  async function toggleStatus(id: string, current: string) {
    const next = current === 'active' ? 'inactive' : 'active';
    const res = await fetch(`/api/admin/cursos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      toast.success(next === 'active' ? 'Curso ativado' : 'Curso desativado');
      router.refresh();
    } else {
      toast.error('Erro ao atualizar');
    }
  }

  async function toggleFeatured(id: string, current: boolean) {
    const res = await fetch(`/api/admin/cursos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !current }),
    });
    if (res.ok) {
      toast.success(!current ? 'Marcado como destaque' : 'Destaque removido');
      router.refresh();
    } else {
      toast.error('Erro ao atualizar');
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-slate-200">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por título ou slug…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-emerald-600"
          />
        </div>
        <div className="flex gap-1 text-xs">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-2 rounded-lg ${
                filter === f ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : 'Inativos'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Curso</th>
              <th className="px-4 py-3 text-left">Trilha</th>
              <th className="px-4 py-3 text-left">Modalidade</th>
              <th className="px-4 py-3 text-left">Preço</th>
              <th className="px-4 py-3 text-left">Vagas</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                  Nenhum curso encontrado
                </td>
              </tr>
            )}
            {filtered.map((c) => {
              const seatsLeft = c.totalSeats - c.seatsTaken;
              return (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.imageUrl}
                        alt=""
                        className="w-12 h-12 rounded object-cover border border-slate-200 bg-slate-100"
                      />
                      <div>
                        <div className="font-medium text-slate-900 flex items-center gap-2">
                          {c.titlePt}
                          {c.featured && <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />}
                        </div>
                        <div className="text-xs text-slate-500">{c.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{trackLabel[c.track] ?? c.track}</td>
                  <td className="px-4 py-3 text-slate-700">{modalityLabel[c.modality] ?? c.modality}</td>
                  <td className="px-4 py-3 text-slate-700">R$ {c.price.toLocaleString('pt-BR')}</td>
                  <td className="px-4 py-3 text-slate-700">
                    {seatsLeft}/{c.totalSeats}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                        statusPillClass[c.status] ?? 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {statusLabel[c.status] ?? c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleFeatured(c.id, c.featured)}
                        title="Destaque"
                        className="p-2 rounded hover:bg-amber-50 text-slate-500 hover:text-amber-600"
                      >
                        <Star className={`w-4 h-4 ${c.featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                      </button>
                      <button
                        onClick={() => toggleStatus(c.id, c.status)}
                        title={c.status === 'active' ? 'Desativar' : 'Ativar'}
                        className="p-2 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/admin/cursos/${c.id}`}
                        className="p-2 rounded hover:bg-emerald-50 text-slate-500 hover:text-emerald-700"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
