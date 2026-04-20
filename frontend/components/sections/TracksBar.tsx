'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Tractor, BrainCircuit } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type TrackFilter = 'tecnica' | 'ia_tech';

export function TracksBar() {
  const { t } = useI18n();

  const goToTrack = (track: TrackFilter) => {
    const el = document.querySelector('#cursos');
    if (!el) return;
    window.dispatchEvent(new CustomEvent('status:setTrackFilter', { detail: { track } }));
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative -mt-10 sm:-mt-12 pb-8 sm:pb-12">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h2 className="text-display-md text-slate-900">{t.tracks.title}</h2>
          <p className="mt-2 text-slate-600">{t.tracks.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Trilha Técnica */}
          <motion.button
            type="button"
            onClick={() => goToTrack('tecnica')}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-left shadow-soft hover:shadow-glow-tech hover:-translate-y-1 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-tech-soft to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-tech/10 blur-3xl transition-all duration-500 group-hover:scale-150" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tech text-white shadow-glow-tech">
                <Tractor className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-tech transition-colors">
                {t.tracks.tech.label}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{t.tracks.tech.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-tech">
                {t.tracks.tech.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>

          {/* Trilha IA */}
          <motion.button
            type="button"
            onClick={() => goToTrack('ia_tech')}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-left shadow-soft hover:shadow-glow-ai hover:-translate-y-1 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ai-soft to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-ai/15 blur-3xl transition-all duration-500 group-hover:scale-150" />
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ai text-white shadow-glow-ai">
                <BrainCircuit className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 group-hover:text-ai transition-colors">
                {t.tracks.ai.label}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{t.tracks.ai.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ai">
                {t.tracks.ai.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
