import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { FaqForm } from '@/components/admin/FaqForm';

export const dynamic = 'force-dynamic';

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const f = await prisma.faq.findUnique({ where: { id: params.id } });
  if (!f) notFound();

  return (
    <div className="p-8">
      <Link
        href="/admin/faq"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para FAQ
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Editar pergunta</h1>
      <FaqForm
        mode="edit"
        initial={{
          id: f.id,
          questionPt: f.questionPt,
          questionEs: f.questionEs,
          answerPt: f.answerPt,
          answerEs: f.answerEs,
          order: f.order,
          active: f.active,
        }}
      />
    </div>
  );
}
