import { z } from 'zod';

export const courseInputSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, 'slug muito curto')
    .regex(/^[a-z0-9-]+$/, 'use apenas letras minúsculas, números e hífen'),
  titlePt: z.string().trim().min(2),
  titleEs: z.string().trim().min(2),
  descriptionShortPt: z.string().trim().min(10),
  descriptionShortEs: z.string().trim().min(10),
  imageUrl: z.string().trim().min(1, 'informe uma URL ou faça upload'),
  track: z.enum(['tecnica', 'ia_tech']),
  category: z.string().trim().min(1),
  modality: z.enum(['presencial', 'online_ao_vivo', 'hibrido']),
  price: z.coerce.number().int().nonnegative(),
  installments: z.coerce.number().int().min(1),
  installmentValue: z.coerce.number().int().nonnegative(),
  workloadHours: z.coerce.number().int().positive(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  locationPt: z.string().trim().min(1),
  locationEs: z.string().trim().min(1),
  totalSeats: z.coerce.number().int().positive(),
  seatsTaken: z.coerce.number().int().nonnegative(),
  status: z.enum(['active', 'inactive', 'upcoming', 'finished']).default('active'),
  featured: z.coerce.boolean().default(false),
  nrsCovered: z.array(z.string().trim()).default([]),
  toolsCovered: z.array(z.string().trim()).default([]),
  includesPt: z.array(z.string().trim()).default([]),
  includesEs: z.array(z.string().trim()).default([]),
  machinesUsed: z.array(z.string().trim()).default([]),
  order: z.coerce.number().int().default(0),
});

export type CourseInput = z.infer<typeof courseInputSchema>;

export const TRACK_OPTIONS = [
  { value: 'tecnica', label: 'Trilha técnica' },
  { value: 'ia_tech', label: 'IA & Tecnologia' },
];

export const MODALITY_OPTIONS = [
  { value: 'presencial', label: 'Presencial' },
  { value: 'online_ao_vivo', label: 'Online ao vivo' },
  { value: 'hibrido', label: 'Híbrido' },
];

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'upcoming', label: 'Em breve' },
  { value: 'finished', label: 'Finalizado' },
];

export const CATEGORY_OPTIONS = [
  { value: 'agricola', label: 'Agrícola' },
  { value: 'climatizacao', label: 'Climatização' },
  { value: 'construcao', label: 'Construção' },
  { value: 'ia', label: 'Inteligência Artificial' },
  { value: 'automacao', label: 'Automação' },
  { value: 'dev', label: 'Desenvolvimento' },
  { value: 'outros', label: 'Outros' },
];
