// Configs da empresa. Na Fase 2, estes valores virão do endpoint de configurações do painel.

export const company = {
  name: 'Status',
  tagline: {
    pt: 'Capacitação que abre portas',
    es: 'Capacitación que abre puertas',
  },
  address: {
    street: 'Av. Principal, 1234',
    city: 'Katueté',
    country: 'Paraguay',
  },
  ruc: 'RUC 00000000-0',
  cnpj: 'CNPJ 00.000.000/0001-00',
  social: {
    instagram: 'https://instagram.com/status',
    tiktok: 'https://tiktok.com/@status',
    youtube: 'https://youtube.com/@status',
  },
} as const;

export const whatsapp = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '595000000000',
  defaultMessage: {
    pt: 'Olá! Quero mais informações sobre os cursos da Status.',
    es: '¡Hola! Quiero más información sobre los cursos de Status.',
  },
};

export function waLink(message: string) {
  const url = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
  return url;
}

export function waCourseLink(courseName: string, startDate: string, locale: 'pt' | 'es' = 'pt') {
  const msg =
    locale === 'pt'
      ? `Olá! Quero informações sobre o curso de ${courseName} com início em ${startDate}.`
      : `¡Hola! Quiero información sobre el curso de ${courseName} que comienza el ${startDate}.`;
  return waLink(msg);
}
