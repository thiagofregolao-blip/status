'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { waLink, whatsapp } from '@/lib/config';

export function FinalCTA() {
  const { t, locale } = useI18n();

  const displayPhone = whatsapp.number.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '+$1 $2 $3 $4');

  return (
    <section id="contato" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900 via-brand-800 to-slate-900" />
      <div className="absolute inset-0 bg-grid-dark opacity-20" />
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-ai/30 via-tech/20 to-transparent blur-3xl" />

      <div className="container-x relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center text-white"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white/80 border border-white/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-ai animate-pulse-ring" />
              <span className="relative rounded-full bg-ai h-2 w-2" />
            </span>
            {t.finalCta.scarcity}
          </div>

          <h2 className="mt-6 text-display-xl text-white text-balance">
            {t.finalCta.title}
          </h2>
          <p className="mt-5 text-lg text-white/80 text-balance">{t.finalCta.subtitle}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={waLink(whatsapp.defaultMessage[locale])}
              target="_blank"
              rel="noopener"
              className="btn btn-lg btn-wa w-full sm:w-auto group"
              data-event="click_whatsapp_footer"
            >
              <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-[-6deg]" />
              {t.finalCta.cta}
            </a>
            <a
              href={`tel:+${whatsapp.number}`}
              className="btn btn-lg w-full sm:w-auto bg-white/10 text-white border border-white/20 backdrop-blur hover:bg-white/20 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="h-5 w-5" />
              <span>
                {t.finalCta.altPhone} <span className="font-bold">{displayPhone}</span>
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
