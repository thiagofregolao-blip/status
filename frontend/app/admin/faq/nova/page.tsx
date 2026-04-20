import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { FaqForm } from '@/components/admin/FaqForm';

export default function NovaFaqPage() {
  return (
    <div className="p-8">
      <Link
        href="/admin/faq"
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 mb-4"
      >
        <ChevronLeft className="w-4 h-4" /> Voltar para FAQ
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Nova pergunta</h1>
      <FaqForm mode="create" />
    </div>
  );
}
