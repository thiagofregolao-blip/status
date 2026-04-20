'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { CourseCard } from './CourseCard';
import type { Track, Modality, Course } from '@/lib/types';

type TrackFilter = 'all' | Track;
type ModalityFilter = 'all' | 'presencial' | 'online';

export function CoursesClient({ courses: allCourses }: { courses: Course[] }) {
  const { t } = useI18n();
  const [trackFilter, setTrackFilter] = useState<TrackFilter>('all');
  const [modalityFilter, setModalityFilter] = useState<ModalityFilter>('all');

  // Listen for programmatic track changes from TracksBar
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { track: Track };
      if (detail?.track) setTrackFilter(detail.track);
    };
    window.addEventListener('status:setTrackFilter', handler as EventListener);
    return () => window.removeEventListener('status:setTrackFilter', handler as EventListener);
  }, []);

  const filtered = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return allCourses
      .filter((c) => c.status === 'active')
      .filter((c) => new Date(c.startDate + 'T00:00:00') >= now)
      .filter((c) => trackFilter === 'all' || c.track === trackFilter)
      .filter((c) => {
        if (modalityFilter === 'all') return true;
        if (modalityFilter === 'presencial')
          return c.modality === 'presencial' || c.modality === 'hibrido';
        if (modalityFilter === 'online')
          return c.modality === 'online_ao_vivo' || c.modality === 'gravado' || c.modality === 'hibrido';
        return true;
      })
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [trackFilter, modalityFilter]);

  return (
    <section id="cursos" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-slate-50 to-white" />
      <span id="cursos-tecnica" className="absolute -top-20" aria-hidden />
      <span id="cursos-ia" className="absolute -top-20" aria-hidden />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="section-eyebrow">{t.courses.eyebrow}</span>
          <h2 className="mt-3 text-display-lg text-slate-900">{t.courses.title}</h2>
          <p className="mt-4 text-slate-600">{t.courses.subtitle}</p>
        </motion.div>

        {/* Filters */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <Filter className="h-3.5 w-3.5" />
            <span>{t.courses.filters.all} · {t.courses.filters.tech} · {t.courses.filters.ai}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {([
              { key: 'all', label: t.courses.filters.all },
              { key: 'tecnica', label: t.courses.filters.tech },
              { key: 'ia_tech', label: t.courses.filters.ai },
            ] as Array<{ key: TrackFilter; label: string }>).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setTrackFilter(f.key)}
                aria-pressed={trackFilter === f.key}
                className={cn(
                  'chip',
                  trackFilter === f.key ? 'chip-active' : 'chip-outline',
                  f.key === 'tecnica' && trackFilter === f.key && '!bg-tech !border-tech',
                  f.key === 'ia_tech' && trackFilter === f.key && '!bg-ai !border-ai',
                )}
              >
                {f.label}
              </button>
            ))}

            <span className="mx-2 hidden sm:inline-block h-4 w-px bg-slate-300" />

            {([
              { key: 'presencial', label: t.courses.filters.in_person },
              { key: 'online', label: t.courses.filters.online },
            ] as Array<{ key: ModalityFilter; label: string }>).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setModalityFilter(modalityFilter === f.key ? 'all' : f.key)}
                aria-pressed={modalityFilter === f.key}
                className={cn(
                  'chip',
                  modalityFilter === f.key ? 'chip-active' : 'chip-outline',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((course, i) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center text-slate-500">
            {t.courses.empty}
          </div>
        )}
      </div>
    </section>
  );
}
