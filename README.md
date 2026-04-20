# Status — Capacitação Profissional

Monorepo da plataforma Status: landing page de captação de leads via WhatsApp e (fase 2) painel admin + API.

## Estrutura

```
status/
├── frontend/        # Next.js 14 App Router + TS + Tailwind + shadcn/ui
├── backend/         # (Fase 2) Node + Express + PostgreSQL
└── package.json     # Workspaces
```

## Fase atual: **Fase 1 — LP estática**

- Landing page mobile-first
- Cursos hard-coded (estrutura espelha o modelo de dados futuro)
- Bilíngue PT-BR (default) / ES com toggle no header
- Deploy Vercel

## Rodar local

```bash
npm install
npm run dev
# abre em http://localhost:3000
```

## Build produção

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Copie `frontend/.env.example` para `frontend/.env.local` e preencha:

```
NEXT_PUBLIC_WHATSAPP_NUMBER=595000000000
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_META_PIXEL_ID=
```

## Próximas fases

- **Fase 2:** API Node/Express + PostgreSQL + painel `/admin`
- **Fase 3:** Captura de leads, Evolution API, tracking avançado, páginas por curso
