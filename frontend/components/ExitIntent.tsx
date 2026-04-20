'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MessageCircle, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { waLink, whatsapp } from '@/lib/config';

const STORAGE_KEY = 'status:exit-intent-shown';
const DAY_MS = 24 * 60 * 60 * 1000;

export function ExitIntent() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const last = Number(localStorage.getItem(STORAGE_KEY) || '0');
    if (Date.now() - last < DAY_MS) return;

    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !open) {
        setOpen(true);
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      }
    };

    // Mobile fallback: trigger on scroll up past a threshold after long session
    let lastScrollY = window.scrollY;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastScrollY - 40 && y > 800) {
        if (!open) {
          setOpen(true);
          localStorage.setItem(STORAGE_KEY, String(Date.now()));
        }
      }
      lastScrollY = y;
    };

    const start = setTimeout(() => {
      document.addEventListener('mouseleave', onLeave);
      window.addEventListener('scroll', onScroll, { passive: true });
    }, 12_000);

    return () => {
      clearTimeout(start);
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-lifted"
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="h-2 bg-gradient-to-r from-tech via-brand-700 to-ai" />
            <div className="p-6 sm:p-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-ai-soft text-ai px-3 py-1 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-3.5 w-3.5" />
                {locale === 'pt' ? 'Oferta exclusiva' : 'Oferta exclusiva'}
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.exitIntent.title}
              </h3>
              <p className="mt-3 text-slate-600">{t.exitIntent.subtitle}</p>

              <a
                href={waLink(
                  locale === 'pt'
                    ? 'Olá! Quero receber o calendário das próximas turmas.'
                    : '¡Hola! Quiero recibir el calendario de las próximas clases.',
                )}
                target="_blank"
                rel="noopener"
                data-event="click_whatsapp_exit_intent"
                className="btn btn-lg btn-wa mt-6 w-full"
                onClick={() => setOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                {t.exitIntent.cta}
              </a>
              <button
                className="mt-3 text-sm text-slate-500 hover:text-slate-700 font-medium"
                onClick={() => setOpen(false)}
              >
                {t.exitIntent.dismiss}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
