# Status — Capacitação Profissional

Landing page + painel admin da plataforma Status: captação via WhatsApp e gerenciamento de cursos, depoimentos e FAQ.

## Estrutura

```
status/
├── frontend/        # Next.js 14 App Router + TS + Tailwind + Prisma + NextAuth
│   ├── app/
│   │   ├── admin/   # Painel /admin (login + CRUD)
│   │   └── api/     # Routes protegidas
│   ├── prisma/      # Schema + seed
│   └── components/
└── package.json     # Workspaces
```

## Rodar local

1. Copie `frontend/.env.example` para `frontend/.env.local` e preencha `DATABASE_URL` + `AUTH_SECRET`.
2. Suba o banco:
   ```bash
   npm install
   npx prisma db push --schema=frontend/prisma/schema.prisma
   npm run --workspace=frontend db:seed
   ```
3. Suba o dev server:
   ```bash
   npm run dev
   # site: http://localhost:3000
   # admin: http://localhost:3000/admin
   ```

## Painel admin

- Acesse `/admin` — será redirecionado para login
- **Email:** `thiago.fregolao@gmail.com` (padrão, mude em `ADMIN_EMAIL`)
- **Senha:** `1571jn` (padrão, mude em `ADMIN_PASSWORD` e rode o seed de novo)

O painel permite CRUD completo de **Cursos**, **Depoimentos** e **FAQ**, com upload de imagem direto (armazenada no Postgres) ou via URL externa.

## Deploy no Railway

1. **Adicione o plugin PostgreSQL** na service (ou reutilize um existente).
2. **Variáveis de ambiente** (Settings → Variables):
   ```
   APP_DATABASE_URL=${{Postgres.DATABASE_URL}}?schema=status
   AUTH_SECRET=<gere com: openssl rand -base64 32>
   NEXTAUTH_URL=https://<seu-dominio>.up.railway.app
   ADMIN_EMAIL=thiago.fregolao@gmail.com
   ADMIN_PASSWORD=1571jn
   NEXT_PUBLIC_WHATSAPP_NUMBER=595000000000
   ```
   ⚠️  **Importante:** o `?schema=status` coloca todas as tabelas do Status em um schema isolado. Isso permite compartilhar o mesmo Postgres com outros projetos **sem risco de conflito ou perda de dados**.
3. **Root Directory** (Settings → Build): `frontend`
4. **Build & Start:** deixe o padrão — o build só compila, e o `start` roda `prisma db push` antes do `next start` para sincronizar o schema quando a aplicação sobe.
5. **Primeiro deploy:** após o deploy concluir, rode o seed via Railway shell:
   ```bash
   npm run db:seed --workspace=frontend
   ```
   (Semeia o admin + os 6 cursos + FAQ + depoimentos iniciais.)

## Build produção

```bash
npm run build
npm run start
```

## Variáveis de ambiente

| Variável                      | Obrigatória | Descrição |
|-------------------------------|-------------|-----------|
| `APP_DATABASE_URL`            | ✅          | Postgres connection string **com `?schema=status`** para isolar dados |
| `AUTH_SECRET`                 | ✅          | Segredo para JWT do NextAuth (`openssl rand -base64 32`) |
| `NEXTAUTH_URL`                | produção    | URL pública do site (ex: `https://status.up.railway.app`) |
| `ADMIN_EMAIL`                 | ✅          | Email do admin (usado no seed) |
| `ADMIN_PASSWORD`              | ✅ primeiro deploy | Senha temporária — o seed faz hash bcrypt |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ✅          | Número do WhatsApp para CTAs |
| `NEXT_PUBLIC_GA_ID`           | opcional    | Google Analytics |
| `NEXT_PUBLIC_META_PIXEL_ID`   | opcional    | Meta Pixel |
| `NEXT_PUBLIC_GTM_ID`          | opcional    | GTM |
