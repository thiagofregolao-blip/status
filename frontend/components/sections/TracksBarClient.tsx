'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

type Track = 'tecnica' | 'ia_tech';
type Counts = { tecnica: number; ia_tech: number };

export function TracksBarClient({ counts }: { counts: Counts }) {
  const { t, locale } = useI18n();
  const prefersReduced = useReducedMotion();

  const goToTrack = (track: Track) => {
    const el = document.querySelector('#cursos');
    if (!el) return;
    window.dispatchEvent(new CustomEvent('status:setTrackFilter', { detail: { track } }));
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cards = [
    {
      key: 'tecnica' as const,
      image:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&auto=format&fit=crop&q=80',
      tag: `🚜 ${locale === 'pt' ? 'Trilha Técnica' : 'Trayecto Técnico'}`,
      title: t.tracks.tech.label,
      description: t.tracks.tech.description,
      cta: t.tracks.tech.cta,
      count: counts.tecnica,
      gradient: 'from-tech/95 via-tech/50',
      priority: true,
    },
    {
      key: 'ia_tech' as const,
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&auto=format&fit=crop&q=80',
      tag: `🤖 ${locale === 'pt' ? 'Trilha IA & Tech' : 'Trayecto IA & Tech'}`,
      title: t.tracks.ai.label,
      description: t.tracks.ai.description,
      cta: t.tracks.ai.cta,
      count: counts.ia_tech,
      gradient: 'from-ai/95 via-ai/50',
      priority: false,
    },
  ];

  const coursesLabel = (n: number) =>
    n === 1
      ? locale === 'pt'
        ? 'curso ativo'
        : 'curso activo'
      : locale === 'pt'
      ? 'cursos ativos'
      : 'cursos activos';

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center max-w-2xl mx-auto"
        >
          <span className="section-eyebrow">{t.tracks.subtitle}</span>
          <h2 className="mt-3 text-display-lg text-slate-900">{t.tracks.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card, i) => (
            <motion.button
              key={card.key}
              type="button"
              onClick={() => goToTrack(card.key)}
              aria-label={`${card.title} — ${card.count} ${coursesLabel(card.count)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={prefersReduced ? undefined : { y: -6 }}
              className="group relative overflow-hidden rounded-3xl shadow-lifted text-left min-h-[460px] sm:min-h-[520px] transition-shadow duration-500 hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/40"
            >
              {/* Background image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt=""
                aria-hidden
                loading={card.priority ? 'eager' : 'lazy'}
                className={`absolute inset-0 h-full w-full object-cover ${
                  prefersReduced
                    ? ''
                    : 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]'
                }`}
              />

              {/* Color-shifted gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${card.gradient} to-transparent transition-opacity duration-500 group-hover:opacity-85`}
              />

              {/* Subtle grid for premium depth */}
              <div className="absolute inset-0 grid-bg opacity-[0.08] mix-blend-overlay" aria-hidden />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                {/* Top row: tag + live count */}
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-soft">
                    {card.tag}
                  </span>
                  {card.count > 0 && (
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/35 backdrop-blur-md border border-white/25 px-3 py-1.5 text-xs font-semibold text-white">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                      {card.count} {coursesLabel(card.count)}
                    </span>
                  )}
                </div>

                {/* Bottom: title + description + CTA */}
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
                    {card.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-bold shadow-soft transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:gap-3 group-hover:bg-slate-50 group-hover:shadow-lifted">
                    {card.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
