import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { CoursesTable } from '@/components/admin/CoursesTable';
import { Plus } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CursosPage() {
  const courses = await prisma.course.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cursos</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            {courses.length} {courses.length === 1 ? 'curso' : 'cursos'} cadastrados
          </p>
        </div>
        <Link
          href="/admin/cursos/novo"
          className="inline-flex items-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition"
        >
          <Plus className="w-4 h-4" />
          Novo curso
        </Link>
      </div>

      <CoursesTable
        courses={courses.map((c) => ({
          id: c.id,
          slug: c.slug,
          titlePt: c.titlePt,
          imageUrl: c.imageUrl,
          track: c.track,
          modality: c.modality,
          price: c.price,
          totalSeats: c.totalSeats,
          seatsTaken: c.seatsTaken,
          status: c.status,
          featured: c.featured,
          startDate: c.startDate.toISOString(),
        }))}
      />
    </div>
  );
}
