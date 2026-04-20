'use client';

import { Instagram, Youtube, MapPin } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useI18n } from '@/lib/i18n';
import { company } from '@/lib/config';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container-x py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo variant="light" />
            <p className="mt-5 text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>
                {company.address.street}, {company.address.city}, {company.address.country}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={company.social.tiktok}
                target="_blank"
                rel="noopener"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M19.321 5.562a5.124 5.124 0 01-3.037-1.148 5.124 5.124 0 01-1.69-3.036h-3.31v13.67a3.074 3.074 0 11-2.149-2.934V8.804a6.386 6.386 0 105.458 6.327V8.882a8.435 8.435 0 004.728 1.45V7.024a5.13 5.13 0 01-.0-1.462z" />
                </svg>
              </a>
              <a
                href={company.social.youtube}
                target="_blank"
                rel="noopener"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.footer.explore}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#cursos-tecnica" className="text-slate-300 hover:text-white transition">{t.nav.tech}</a></li>
              <li><a href="#cursos-ia" className="text-slate-300 hover:text-white transition">{t.nav.ai}</a></li>
              <li><a href="#depoimentos" className="text-slate-300 hover:text-white transition">{t.nav.testimonials}</a></li>
              <li><a href="#contato" className="text-slate-300 hover:text-white transition">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.footer.legal}
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              <li><a href="#" className="text-slate-300 hover:text-white transition">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition">{t.footer.terms}</a></li>
            </ul>
            <div className="mt-6 text-xs text-slate-500 space-y-1">
              <div>{company.cnpj}</div>
              <div>{company.ruc}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {year} Evolua Academy. {t.footer.rights}.</div>
          <div>Paraguay · Brasil</div>
        </div>
      </div>
    </footer>
  );
}
