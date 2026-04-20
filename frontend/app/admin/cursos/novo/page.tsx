import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { CourseForm } from '@/components/admin/CourseForm';

export default function NovoCursoPage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/cursos"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para cursos
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Novo curso</h1>
      <CourseForm mode="create" />
    </div>
  );
}
