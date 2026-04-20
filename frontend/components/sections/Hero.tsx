'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ChevronDown, Sparkles, ShieldCheck, GraduationCap, Users } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { waLink, whatsapp } from '@/lib/config';

export function Hero() {
  const { t, locale } = useI18n();

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      <div className="absolute inset-0 bg-hero-radial opacity-60" />
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      {/* Floating glyphs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="pointer-events-none absolute top-32 -left-10 sm:left-4 lg:left-16 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-gradient-to-br from-tech/20 to-transparent blur-3xl animate-float"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="pointer-events-none absolute top-40 -right-10 sm:right-4 lg:right-20 h-56 w-56 sm:h-80 sm:w-80 rounded-full bg-gradient-to-br from-ai/25 to-transparent blur-3xl animate-float"
        style={{ animationDelay: '1.5s' }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5 text-ai" />
            <span>{t.hero.eyebrow}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-brand-800">{locale === 'pt' ? 'Turmas abertas' : 'Clases abiertas'}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-display-xl text-slate-900 text-balance"
          >
            {t.hero.title}
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-tech via-brand-700 to-ai bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute left-0 right-0 -bottom-2 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 Q 75 2, 150 6 T 298 4"
                  stroke="url(#g)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#15803D" />
                    <stop offset="50%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 mx-auto max-w-2xl text-base sm:text-lg text-slate-600 text-balance leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <a
              href={waLink(whatsapp.defaultMessage[locale])}
              target="_blank"
              rel="noopener"
              className="btn btn-lg btn-wa w-full sm:w-auto group"
              data-event="click_whatsapp_hero"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-[-6deg]" />
              <span>{t.hero.ctaPrimary}</span>
            </a>
            <a
              href="#cursos"
              className="btn btn-lg btn-ghost w-full sm:w-auto group"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#cursos')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{t.hero.ctaSecondary}</span>
              <ChevronDown className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-tech" />
              <strong className="font-semibold text-slate-800">{t.hero.trustCert}</strong>
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-brand-700" />
              <strong className="font-semibold text-slate-800">{t.hero.trustAlumni}</strong>
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-slate-300" />
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-ai" />
              <strong className="font-semibold text-slate-800">{t.hero.trustTeachers}</strong>
            </span>
          </motion.div>
        </div>

        {/* Dual-visual composition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="relative mt-16 sm:mt-20 mx-auto max-w-5xl"
        >
          <div className="relative grid grid-cols-2 gap-3 sm:gap-5">
            <div className="relative aspect-[4/5] sm:aspect-[16/12] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lifted group">
              <div className="absolute inset-0 bg-gradient-to-t from-tech/80 via-tech/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop&q=75"
                alt={locale === 'pt' ? 'Operador em máquina agrícola' : 'Operador en máquina agrícola'}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 z-20">
                <span className="badge badge-tech bg-white/95 backdrop-blur border-0">
                  🚜 {locale === 'pt' ? 'Trilha Técnica' : 'Trayecto Técnico'}
                </span>
              </div>
            </div>
            <div className="relative aspect-[4/5] sm:aspect-[16/12] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lifted group">
              <div className="absolute inset-0 bg-gradient-to-t from-ai/80 via-ai/20 to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format&fit=crop&q=75"
                alt={locale === 'pt' ? 'Aluno trabalhando com IA' : 'Alumno trabajando con IA'}
                loading="eager"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 z-20">
                <span className="badge badge-ai bg-white/95 backdrop-blur border-0">
                  🤖 {locale === 'pt' ? 'Trilha IA & Tech' : 'Trayecto IA & Tech'}
                </span>
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-4 sm:-inset-8 -z-10 rounded-[3rem] bg-gradient-to-tr from-tech/10 via-brand-100/20 to-ai/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
