'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { testimonialInputSchema, type TestimonialInput } from '@/lib/admin/testimonial-schema';
import { ImageUpload } from './ImageUpload';
import { Save, Trash2 } from 'lucide-react';

type Props = { initial?: Partial<TestimonialInput> & { id?: string }; mode: 'create' | 'edit' };

export function TestimonialForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const form = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialInputSchema) as never,
    defaultValues: {
      name: initial?.name ?? '',
      role: initial?.role ?? '',
      location: initial?.location ?? '',
      quotePt: initial?.quotePt ?? '',
      quoteEs: initial?.quoteEs ?? '',
      imageUrl: initial?.imageUrl ?? '',
      rating: initial?.rating ?? 5,
      courseRef: initial?.courseRef ?? '',
      featured: initial?.featured ?? false,
      active: initial?.active ?? true,
      order: initial?.order ?? 0,
    },
  });
  const { register, handleSubmit, control, formState } = form;
  const err = formState.errors;
  const inputBase = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none';

  async function onSubmit(values: TestimonialInput) {
    setSaving(true);
    try {
      const url = mode === 'create' ? '/api/admin/depoimentos' : `/api/admin/depoimentos/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        toast.error('Erro ao salvar');
        return;
      }
      toast.success(mode === 'create' ? 'Depoimento criado' : 'Depoimento atualizado');
      router.push('/admin/depoimentos');
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm('Excluir este depoimento?')) return;
    const res = await fetch(`/api/admin/depoimentos/${initial.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Depoimento excluído');
      router.push('/admin/depoimentos');
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="bg-white rounded-xl border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Nome" error={err.name?.message}>
          <input {...register('name')} className={inputBase} />
        </Field>
        <Field label="Cargo / atividade" error={err.role?.message}>
          <input {...register('role')} className={inputBase} />
        </Field>
        <Field label="Localização" error={err.location?.message}>
          <input {...register('location')} className={inputBase} />
        </Field>
        <Field label="Curso relacionado (opcional)">
          <input {...register('courseRef')} className={inputBase} placeholder="slug do curso" />
        </Field>
        <Field label="Depoimento (PT)" error={err.quotePt?.message} full>
          <textarea rows={3} {...register('quotePt')} className={inputBase} />
        </Field>
        <Field label="Depoimento (ES)" error={err.quoteEs?.message} full>
          <textarea rows={3} {...register('quoteEs')} className={inputBase} />
        </Field>
        <Field label="Foto" full>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <ImageUpload value={field.value ?? ''} onChange={field.onChange} />}
          />
        </Field>
        <Field label="Estrelas (1–5)" error={err.rating?.message}>
          <input type="number" min={1} max={5} {...register('rating', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Ordem">
          <input type="number" {...register('order', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Destaque">
          <label className="flex items-center gap-2 text-sm h-10">
            <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-emerald-600" />
            Marcar como destaque
          </label>
        </Field>
        <Field label="Ativo">
          <label className="flex items-center gap-2 text-sm h-10">
            <input type="checkbox" {...register('active')} className="w-4 h-4 accent-emerald-600" />
            Exibir no site
          </label>
        </Field>
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

function Field({
  label,
  error,
  children,
  full,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
