import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { TestimonialForm } from '@/components/admin/TestimonialForm';

export const dynamic = 'force-dynamic';

export default async function EditDepoimentoPage({ params }: { params: { id: string } }) {
  const t = await prisma.testimonial.findUnique({ where: { id: params.id } });
  if (!t) notFound();

  return (
    <div className="p-8">
      <Link
        href="/admin/depoimentos"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para depoimentos
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Editar · {t.name}</h1>
      <TestimonialForm
        mode="edit"
        initial={{
          id: t.id,
          name: t.name,
          role: t.role,
          location: t.location,
          quotePt: t.quotePt,
          quoteEs: t.quoteEs,
          imageUrl: t.imageUrl ?? '',
          rating: t.rating,
          courseRef: t.courseRef ?? '',
          featured: t.featured,
          active: t.active,
          order: t.order,
        }}
      />
    </div>
  );
}
