'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="section relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-tech/20 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-ai/20 blur-[100px]" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-ai">
            {t.howItWorks.eyebrow}
          </span>
          <h2 className="mt-3 text-display-lg text-white">{t.howItWorks.title}</h2>
        </motion.div>

        <div className="mt-16 relative">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-1/2 top-12 bottom-12 hidden lg:block w-px -translate-x-1/2 bg-gradient-to-b from-tech via-brand-500 to-ai opacity-50" />

          <ol className="relative grid grid-cols-1 lg:grid-cols-5 gap-6">
            {t.howItWorks.steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-tech to-ai font-display font-extrabold text-sm text-white shadow-lifted">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">{step.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
