'use client';

import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useI18n } from '@/lib/i18n';
import { waLink, whatsapp } from '@/lib/config';
import { cn } from '@/lib/utils';

export function Header() {
  const { t, locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { href: '#cursos-tecnica', label: t.nav.tech },
    { href: '#cursos-ia', label: t.nav.ai },
    { href: '#depoimentos', label: t.nav.testimonials },
    { href: '#contato', label: t.nav.contact },
  ];

  const handleNav = (href: string) => {
    setOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-soft'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-x flex h-16 sm:h-18 items-center justify-between gap-4">
        <button onClick={() => handleNav('#top')} aria-label="Status home" className="shrink-0">
          <Logo />
        </button>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900 group"
            >
              {l.label}
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-ai to-tech transition-all duration-300 group-hover:w-6" />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:flex" />
          <a
            href={waLink(whatsapp.defaultMessage[locale])}
            target="_blank"
            rel="noopener"
            className="btn btn-md btn-wa hidden sm:inline-flex"
            data-event="click_whatsapp_header"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{t.nav.whatsapp}</span>
          </a>
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:border-slate-400"
            onClick={() => setOpen((v) => !v)}
            aria-label={t.nav.menu}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-16 sm:top-18 bottom-0 origin-top transition-all duration-400',
          open
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-2',
        )}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
        <div className="relative h-full overflow-y-auto p-6">
          <nav className="flex flex-col gap-1">
            {links.map((l, i) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-4 text-left text-lg font-bold text-slate-900 shadow-soft transition hover:border-slate-300 hover:shadow-lifted"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {l.label}
                <span className="text-slate-400" aria-hidden>
                  →
                </span>
              </button>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LanguageToggle />
          </div>
          <a
            href={waLink(whatsapp.defaultMessage[locale])}
            target="_blank"
            rel="noopener"
            className="btn btn-lg btn-wa mt-6 w-full"
            data-event="click_whatsapp_header_mobile"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{t.nav.whatsapp}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
