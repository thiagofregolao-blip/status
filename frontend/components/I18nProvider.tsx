'use client';

import { useEffect, useState, useCallback } from 'react';
import { I18nContext, type Locale, dictionaries } from '@/lib/i18n';

const STORAGE_KEY = 'status:locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) as Locale | null) : null;
    if (stored === 'pt' || stored === 'es') {
      setLocaleState(stored);
      document.documentElement.lang = stored === 'pt' ? 'pt-BR' : 'es-PY';
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'es-PY';
    }
  }, []);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}
