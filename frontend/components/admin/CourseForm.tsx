'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  courseInputSchema,
  type CourseInput,
  TRACK_OPTIONS,
  MODALITY_OPTIONS,
  STATUS_OPTIONS,
  CATEGORY_OPTIONS,
} from '@/lib/admin/course-schema';
import { ImageUpload } from './ImageUpload';
import { TagsInput } from './TagsInput';
import { Save, Trash2 } from 'lucide-react';

type Props = {
  initial?: Partial<CourseInput> & { id?: string };
  mode: 'create' | 'edit';
};

export function CourseForm({ initial, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const toDateInput = (d?: Date | string) => {
    if (!d) return '';
    const date = typeof d === 'string' ? new Date(d) : d;
    return date.toISOString().slice(0, 10);
  };

  const form = useForm<CourseInput>({
    resolver: zodResolver(courseInputSchema) as never,
    defaultValues: {
      slug: initial?.slug ?? '',
      titlePt: initial?.titlePt ?? '',
      titleEs: initial?.titleEs ?? '',
      descriptionShortPt: initial?.descriptionShortPt ?? '',
      descriptionShortEs: initial?.descriptionShortEs ?? '',
      imageUrl: initial?.imageUrl ?? '',
      track: (initial?.track as CourseInput['track']) ?? 'tecnica',
      category: initial?.category ?? 'agricola',
      modality: (initial?.modality as CourseInput['modality']) ?? 'presencial',
      price: initial?.price ?? 0,
      installments: initial?.installments ?? 1,
      installmentValue: initial?.installmentValue ?? 0,
      workloadHours: initial?.workloadHours ?? 1,
      startDate: (toDateInput(initial?.startDate as Date | undefined) as unknown) as Date,
      endDate: (toDateInput(initial?.endDate as Date | undefined) as unknown) as Date,
      locationPt: initial?.locationPt ?? '',
      locationEs: initial?.locationEs ?? '',
      totalSeats: initial?.totalSeats ?? 10,
      seatsTaken: initial?.seatsTaken ?? 0,
      status: (initial?.status as CourseInput['status']) ?? 'active',
      featured: initial?.featured ?? false,
      nrsCovered: initial?.nrsCovered ?? [],
      toolsCovered: initial?.toolsCovered ?? [],
      includesPt: initial?.includesPt ?? [],
      includesEs: initial?.includesEs ?? [],
      machinesUsed: initial?.machinesUsed ?? [],
      order: initial?.order ?? 0,
    },
  });

  const { register, handleSubmit, control, formState } = form;

  async function onSubmit(values: CourseInput) {
    setSaving(true);
    try {
      const url = mode === 'create' ? '/api/admin/cursos' : `/api/admin/cursos/${initial?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        if (json.error === 'slug_exists') toast.error('Slug já existe');
        else if (json.error === 'validation') toast.error('Dados inválidos');
        else toast.error('Erro ao salvar');
        return;
      }
      toast.success(mode === 'create' ? 'Curso criado' : 'Curso atualizado');
      router.push('/admin/cursos');
      router.refresh();
    } catch {
      toast.error('Erro de rede');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial?.id) return;
    if (!confirm('Excluir este curso? Ação não pode ser desfeita.')) return;
    const res = await fetch(`/api/admin/cursos/${initial.id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Curso excluído');
      router.push('/admin/cursos');
      router.refresh();
    } else {
      toast.error('Erro ao excluir');
    }
  }

  const err = formState.errors;
  const labelBase = 'block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide';
  const inputBase = 'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none';
  const errText = 'text-xs text-red-600 mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-5xl">
      {/* Bloco: Título e identificação */}
      <Section title="Identificação">
        <Field label="Título (PT)" error={err.titlePt?.message}>
          <input {...register('titlePt')} className={inputBase} />
        </Field>
        <Field label="Título (ES)" error={err.titleEs?.message}>
          <input {...register('titleEs')} className={inputBase} />
        </Field>
        <Field label="Slug (URL)" error={err.slug?.message} hint="Ex: operador-maquinas-agricolas">
          <input {...register('slug')} className={inputBase} />
        </Field>
        <Field label="Ordem de exibição" error={err.order?.message} hint="Menor aparece antes">
          <input type="number" {...register('order', { valueAsNumber: true })} className={inputBase} />
        </Field>
      </Section>

      {/* Bloco: Descrição e imagem */}
      <Section title="Conteúdo do card">
        <Field label="Descrição curta (PT)" error={err.descriptionShortPt?.message} full>
          <textarea rows={3} {...register('descriptionShortPt')} className={inputBase} />
        </Field>
        <Field label="Descrição curta (ES)" error={err.descriptionShortEs?.message} full>
          <textarea rows={3} {...register('descriptionShortEs')} className={inputBase} />
        </Field>
        <Field label="Imagem de capa" error={err.imageUrl?.message} full>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => <ImageUpload value={field.value || ''} onChange={field.onChange} />}
          />
        </Field>
      </Section>

      {/* Bloco: Classificação */}
      <Section title="Classificação">
        <Field label="Trilha" error={err.track?.message}>
          <select {...register('track')} className={inputBase}>
            {TRACK_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Categoria" error={err.category?.message}>
          <select {...register('category')} className={inputBase}>
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Modalidade" error={err.modality?.message}>
          <select {...register('modality')} className={inputBase}>
            {MODALITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status" error={err.status?.message}>
          <select {...register('status')} className={inputBase}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Destaque (featured)" hint="Aparece com mais prioridade">
          <label className="flex items-center gap-2 text-sm h-10">
            <input type="checkbox" {...register('featured')} className="w-4 h-4 accent-emerald-600" />
            Marcar como destaque
          </label>
        </Field>
      </Section>

      {/* Bloco: Preço e carga */}
      <Section title="Investimento e carga">
        <Field label="Preço (R$)" error={err.price?.message}>
          <input type="number" {...register('price', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Parcelas" error={err.installments?.message}>
          <input type="number" {...register('installments', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Valor da parcela (R$)" error={err.installmentValue?.message}>
          <input type="number" {...register('installmentValue', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Carga horária (h)" error={err.workloadHours?.message}>
          <input type="number" {...register('workloadHours', { valueAsNumber: true })} className={inputBase} />
        </Field>
      </Section>

      {/* Bloco: Turma */}
      <Section title="Turma">
        <Field label="Início" error={err.startDate?.message}>
          <input type="date" {...register('startDate')} className={inputBase} />
        </Field>
        <Field label="Término" error={err.endDate?.message}>
          <input type="date" {...register('endDate')} className={inputBase} />
        </Field>
        <Field label="Local (PT)" error={err.locationPt?.message}>
          <input {...register('locationPt')} className={inputBase} />
        </Field>
        <Field label="Local (ES)" error={err.locationEs?.message}>
          <input {...register('locationEs')} className={inputBase} />
        </Field>
        <Field label="Total de vagas" error={err.totalSeats?.message}>
          <input type="number" {...register('totalSeats', { valueAsNumber: true })} className={inputBase} />
        </Field>
        <Field label="Vagas preenchidas" error={err.seatsTaken?.message} hint="Mostra 'X vagas restantes' no card">
          <input type="number" {...register('seatsTaken', { valueAsNumber: true })} className={inputBase} />
        </Field>
      </Section>

      {/* Bloco: Coberturas */}
      <Section title="Coberturas e equipamentos">
        <Field label="NRs cobertas" full hint="Ex: NR-11, NR-12, NR-31 — aperte Enter após cada uma">
          <Controller
            name="nrsCovered"
            control={control}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} placeholder="NR-11" />}
          />
        </Field>
        <Field label="Ferramentas / tech cobertas" full hint="Ex: ChatGPT, Claude, n8n">
          <Controller
            name="toolsCovered"
            control={control}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} placeholder="ChatGPT" />}
          />
        </Field>
        <Field label="Máquinas usadas" full hint="Aparece como pílulas no card. Ex: John Deere S440">
          <Controller
            name="machinesUsed"
            control={control}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} placeholder="John Deere S440" />}
          />
        </Field>
        <Field label="Inclui (PT)" full hint="Ex: Certificado bilíngue, Carteirinha">
          <Controller
            name="includesPt"
            control={control}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} placeholder="Certificado bilíngue" />}
          />
        </Field>
        <Field label="Inclui (ES)" full>
          <Controller
            name="includesEs"
            control={control}
            render={({ field }) => <TagsInput value={field.value} onChange={field.onChange} placeholder="Certificado bilingüe" />}
          />
        </Field>
      </Section>

      {/* Ações */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div>
          {mode === 'edit' && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 border border-red-200"
            >
              <Trash2 className="w-4 h-4" /> Excluir curso
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => history.back()}
            className="px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 border border-slate-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Salvando…' : mode === 'create' ? 'Criar curso' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  hint,
  children,
  full,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? 'md:col-span-2' : ''}>
      <label className="block text-xs font-semibold text-slate-700 mb-1 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
