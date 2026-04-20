'use client';

import { createContext, useContext } from 'react';
import pt from '@/locales/pt.json';
import es from '@/locales/es.json';

export type Locale = 'pt' | 'es';
export type Dictionary = typeof pt;

export const dictionaries: Record<Locale, Dictionary> = {
  pt,
  es: es as unknown as Dictionary,
};

export const I18nContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dictionary;
}>({
  locale: 'pt',
  setLocale: () => {},
  t: pt,
});

export const useI18n = () => useContext(I18nContext);

// Helper para interpolação `{var}` em strings
export function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
