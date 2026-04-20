'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  HandMetal,
  GraduationCap,
  Users2,
  Briefcase,
  Layers,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const icons = [ShieldCheck, HandMetal, GraduationCap, Users2, Briefcase, Layers];

export function Benefits() {
  const { t } = useI18n();

  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-grid-dark opacity-[0.04]" />
      <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-100/40 blur-3xl" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="section-eyebrow">{t.benefits.eyebrow}</span>
          <h2 className="mt-3 text-display-lg text-slate-900">{t.benefits.title}</h2>
          <p className="mt-4 text-slate-600">{t.benefits.subtitle}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.benefits.items.map((item, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            const color = i % 3 === 0 ? 'tech' : i % 3 === 1 ? 'ai' : 'brand';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-lifted hover:-translate-y-1 transition-all duration-500"
              >
                <div
                  className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125 ${
                    color === 'tech' ? 'bg-tech/10' : color === 'ai' ? 'bg-ai/10' : 'bg-brand-100/80'
                  }`}
                />
                <div className="relative">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-soft ${
                      color === 'tech' ? 'bg-tech' : color === 'ai' ? 'bg-ai' : 'bg-brand-700'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-slate-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
