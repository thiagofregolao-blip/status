import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { CourseForm } from '@/components/admin/CourseForm';

export const dynamic = 'force-dynamic';

export default async function EditCursoPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) notFound();

  return (
    <div className="p-8">
      <Link
        href="/admin/cursos"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para cursos
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">{course.titlePt}</h1>
      <p className="text-sm text-slate-500 mb-6">Editar curso · {course.slug}</p>
      <CourseForm
        mode="edit"
        initial={{
          id: course.id,
          slug: course.slug,
          titlePt: course.titlePt,
          titleEs: course.titleEs,
          descriptionShortPt: course.descriptionShortPt,
          descriptionShortEs: course.descriptionShortEs,
          imageUrl: course.imageUrl,
          track: course.track as 'tecnica' | 'ia_tech',
          category: course.category,
          modality: course.modality as 'presencial' | 'online_ao_vivo' | 'hibrido',
          price: course.price,
          installments: course.installments,
          installmentValue: course.installmentValue,
          workloadHours: course.workloadHours,
          startDate: course.startDate,
          endDate: course.endDate,
          locationPt: course.locationPt,
          locationEs: course.locationEs,
          totalSeats: course.totalSeats,
          seatsTaken: course.seatsTaken,
          status: course.status as 'active' | 'inactive' | 'upcoming' | 'finished',
          featured: course.featured,
          nrsCovered: course.nrsCovered,
          toolsCovered: course.toolsCovered,
          includesPt: course.includesPt,
          includesEs: course.includesEs,
          machinesUsed: course.machinesUsed,
          order: course.order,
        }}
      />
    </div>
  );
}
