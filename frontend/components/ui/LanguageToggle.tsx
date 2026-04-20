'use client';

import { useI18n } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function LanguageToggle({ className, variant = 'light' }: { className?: string; variant?: 'light' | 'dark' }) {
  const { locale, setLocale } = useI18n();

  const isLight = variant === 'light';
  const track = isLight
    ? 'bg-slate-100 border-slate-200'
    : 'bg-white/10 border-white/15 backdrop-blur';
  const activeBg = isLight ? 'bg-white text-slate-900 shadow-soft' : 'bg-white text-slate-900';
  const inactive = isLight ? 'text-slate-500 hover:text-slate-900' : 'text-white/70 hover:text-white';

  return (
    <div
      className={cn(
        'relative flex items-center gap-1 rounded-full border p-1 text-xs font-semibold',
        track,
        className,
      )}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        aria-pressed={locale === 'pt'}
        onClick={() => setLocale('pt')}
        className={cn(
          'relative flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all',
          locale === 'pt' ? activeBg : inactive,
        )}
      >
        <span aria-hidden>🇧🇷</span>
        <span>PT</span>
      </button>
      <button
        type="button"
        aria-pressed={locale === 'es'}
        onClick={() => setLocale('es')}
        className={cn(
          'relative flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all',
          locale === 'es' ? activeBg : inactive,
        )}
      >
        <span aria-hidden>🇵🇾</span>
        <span>ES</span>
      </button>
    </div>
  );
}
