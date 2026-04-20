'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, Globe2, FileBadge } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const icons = [FileBadge, Award, Globe2, CheckCircle2];

export function Certification() {
  const { t } = useI18n();

  return (
    <section className="section relative overflow-hidden">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-tech/20 via-brand-100/50 to-ai/20 blur-2xl" />
              <div className="relative aspect-[3/4] rounded-[2rem] bg-white border border-slate-200 shadow-lifted overflow-hidden rotate-[-3deg]">
                <div className="h-2 bg-gradient-to-r from-tech via-brand-700 to-ai" />
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <Award className="h-10 w-10 text-brand-800" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Evolua Academy · 2026
                    </span>
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Certificado de Conclusão
                    </div>
                    <div className="mt-4 font-display text-xl font-extrabold text-slate-900">
                      Operador de Máquinas Agrícolas
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      40 horas · Certificação bilíngue
                    </div>
                  </div>
                  <div className="mt-10 border-t border-dashed border-slate-200 pt-4">
                    <div className="flex items-end justify-between text-[10px] text-slate-500">
                      <div>
                        <div className="h-0.5 w-20 bg-slate-300 mb-1" />
                        Diretor técnico
                      </div>
                      <div className="text-right">
                        <div className="h-0.5 w-20 bg-slate-300 mb-1 ml-auto" />
                        Técnico de segurança
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <span className="section-eyebrow">{t.certification.eyebrow}</span>
            <h2 className="mt-3 text-display-lg text-slate-900">{t.certification.title}</h2>
            <p className="mt-4 text-slate-600">{t.certification.subtitle}</p>

            <ul className="mt-8 space-y-3">
              {t.certification.items.map((text, i) => {
                const Icon = icons[i] ?? CheckCircle2;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-slate-700 leading-relaxed">{text}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
