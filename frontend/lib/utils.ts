import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number, locale: 'pt' | 'es' = 'pt') {
  const fmt = new Intl.NumberFormat(locale === 'pt' ? 'pt-BR' : 'es-PY', {
    style: 'currency',
    currency: locale === 'pt' ? 'BRL' : 'USD',
    maximumFractionDigits: 0,
  });
  return fmt.format(value);
}

export function formatDate(iso: string, locale: 'pt' | 'es' = 'pt') {
  const d = new Date(iso + 'T00:00:00');
  return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'es-PY', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

export function seatsRemaining(total: number, taken: number) {
  return Math.max(0, total - taken);
}
