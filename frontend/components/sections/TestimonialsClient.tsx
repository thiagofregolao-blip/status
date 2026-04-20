'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/lib/types';

export function TestimonialsClient({ testimonials }: { testimonials: Testimonial[] }) {
  const { t, locale } = useI18n();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-testimonial]');
    const offset = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: offset * dir, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-testimonial]');
    const offset = card ? card.offsetWidth + 20 : 320;
    const idx = Math.round(el.scrollLeft / offset);
    setActiveIdx(idx);
  };

  return (
    <section id="depoimentos" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-white" />

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-xl">
            <span className="section-eyebrow">{t.testimonials.eyebrow}</span>
            <h2 className="mt-3 text-display-lg text-slate-900">{t.testimonials.title}</h2>
            <p className="mt-4 text-slate-600">{t.testimonials.subtitle}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-400 hover:-translate-y-0.5"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-400 hover:-translate-y-0.5"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 sm:scroll-pl-6 lg:scroll-pl-8 pb-2"
          >
            {testimonials.map((item, i) => {
              const isTech = item.track === 'tecnica';
              return (
                <motion.article
                  key={item.id}
                  data-testimonial
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className={cn(
                    'relative shrink-0 snap-start w-[85%] sm:w-[420px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-500',
                  )}
                >
                  <Quote
                    className={cn(
                      'absolute -right-3 -top-3 h-24 w-24 opacity-10',
                      isTech ? 'text-tech' : 'text-ai',
                    )}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-warn text-warn" />
                      ))}
                    </div>
                    <p className="mt-4 text-slate-700 leading-relaxed">
                      “{item.text[locale]}”
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                      <img
                        src={item.photoUrl}
                        alt={item.studentName}
                        loading="lazy"
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white shadow-soft"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-900 truncate">{item.studentName}</div>
                        <div className="text-xs text-slate-500 truncate">
                          {item.city} · {item.courseTitle[locale]}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === activeIdx ? 'w-8 bg-slate-900' : 'w-1.5 bg-slate-300',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
