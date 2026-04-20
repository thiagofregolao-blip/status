'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { waLink, whatsapp } from '@/lib/config';

export function WhatsAppFloat() {
  const { t, locale } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={waLink(whatsapp.defaultMessage[locale])}
      target="_blank"
      rel="noopener"
      data-event="click_whatsapp_float"
      aria-label={t.whatsappFloat}
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-30 flex items-center gap-3 rounded-full bg-wa text-white shadow-glow-wa transition-all duration-500 pl-4 pr-5 py-3.5 group ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring" />
        <MessageCircle className="h-6 w-6 relative" />
      </span>
      <span className="hidden sm:inline text-sm font-bold">{t.whatsappFloat}</span>
    </a>
  );
}
