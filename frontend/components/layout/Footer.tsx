'use client';

import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { useI18n } from '@/lib/i18n';
import { company, whatsapp, waLink } from '@/lib/config';

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
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {company.address.street}, {company.address.city}, {company.address.country}
              </span>
            </div>

            <a
              href={waLink(whatsapp.defaultMessage.pt)}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition group"
              aria-label={`WhatsApp ${whatsapp.display}`}
            >
              <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">{whatsapp.display}</span>
            </a>

            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener"
              className="mt-3 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition group"
              aria-label={`Instagram ${company.social.instagramHandle}`}
            >
              <Instagram className="h-4 w-4 text-pink-400 shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{company.social.instagramHandle}</span>
            </a>
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
