'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { faqInputSchema, type FaqInput } from '@/lib/admin/faq-schema';
import { Save, Trash2 } from 'lucide-react';

type Props = { initial?: Partial<FaqInput> & { id?: string }; mode: 'create' | 'edit' };

export function FaqForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, formState } = useForm<FaqInput>({
    resolver: zodResolver(faqInputSchema) as never,
    defaultValues: {
      questionPt: initial?.questionPt ?? '',
      questionEs: initial?.questionEs ?? '',
      answerPt: initial?.answerPt ?? '',
      answerEs: initial?.answerEs ?? '',
      order: initial?.order ?? 0,
      active: initial?.active ?? true,
    },
  });
  const err = formState.errors;
  const inputBase = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none';

  async function onSubmit(values: FaqInput) {
    setSaving(true);
    try {
      const url = mode === 'create' ? '/api/admin/faq' : `/api/admin/faq/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        toast.error('Erro ao salvar');
        return;
      }
      toast.success(mode === 'create' ? 'Pergunta criada' : 'Pergunta atualizada');
      router.push('/admin/faq');
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm('Excluir esta pergunta?')) return;
    const res = await fetch(`/api/admin/faq/${initial.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Pergunta excluída');
      router.push('/admin/faq');
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <Field label="Pergunta (PT)" error={err.questionPt?.message}>
          <input {...register('questionPt')} className={inputBase} />
        </Field>
        <Field label="Pergunta (ES)" error={err.questionEs?.message}>
          <input {...register('questionEs')} className={inputBase} />
        </Field>
        <Field label="Resposta (PT)" error={err.answerPt?.message}>
          <textarea rows={4} {...register('answerPt')} className={inputBase} />
        </Field>
        <Field label="Resposta (ES)" error={err.answerEs?.message}>
          <textarea rows={4} {...register('answerEs')} className={inputBase} />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Ordem">
            <input type="number" {...register('order', { valueAsNumber: true })} className={inputBase} />
          </Field>
          <Field label="Ativo">
            <label className="flex items-center gap-2 text-sm h-10">
              <input type="checkbox" {...register('active')} className="w-4 h-4 accent-emerald-600" />
              Exibir no site
            </label>
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {mode === 'edit' && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 border border-red-200"
            >
              <Trash2 className="w-4 h-4" /> Excluir
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
