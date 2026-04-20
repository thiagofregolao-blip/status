import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { I18nProvider } from '@/components/I18nProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://evoluaacademy.com'),
  title: {
    default: 'Evolua Academy — Capacitação Profissional no PY e BR',
    template: '%s · Evolua Academy',
  },
  description:
    'Cursos profissionalizantes com certificado reconhecido no Brasil e Paraguai. Trilhas técnica (máquinas, climatização, drones, pecuária) e IA & Tecnologia. Turmas abertas todo mês.',
  keywords: [
    'cursos profissionalizantes Paraguai',
    'operador máquinas agrícolas',
    'curso ar condicionado split',
    'prompt engineering',
    'automação IA',
    'capacitação Katueté',
  ],
  openGraph: {
    title: 'Evolua Academy — Capacitação que abre portas',
    description: 'Do campo à inteligência artificial — cursos presenciais e online no PY e BR.',
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['es_PY'],
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Evolua Academy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evolua Academy — Capacitação que abre portas',
    description: 'Cursos profissionalizantes no PY e BR pela Evolua Academy.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1E40AF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
