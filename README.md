# ecologistica — reformulado

SPA estática de logística regenerativa: React 18 + TypeScript strict + Tailwind CSS 3.4 + Framer Motion 11, com componentes no padrão shadcn/ui (Radix UI + CVA) e conteúdo centralizado em `src/config/site.ts`.

## Rodar localmente

Requisitos: Node.js 22+ e npm.

```bash
npm install
cp .env.example .env.local   # já contém as chaves públicas do Supabase
npm run dev
```

Abra `http://localhost:5173`.

Outros comandos:

```bash
npm run typecheck   # checagem TypeScript
npm run build       # gera dist/
npm run preview     # serve dist/ localmente
```

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy.yml` publica automaticamente a cada push em `main`/`master`.

1. Crie um repositório GitHub (pode ser vazio) e faça o push deste projeto:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: ecologistica reformulado"
   git remote add origin https://github.com/<SEU-USUARIO>/<SEU-REPO>.git
   git branch -M main
   git push -u origin main
   ```

2. No repositório, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como *Source*.

3. Acompanhe a aba **Actions**. Ao concluir, a URL do site aparece em **Settings → Pages** (normalmente `https://<SEU-USUARIO>.github.io/<SEU-REPO>/`).

O build já calcula automaticamente o `base` do Vite: usa `/` para repositórios `<usuario>.github.io` e `/<nome-do-repo>/` para os demais. Não é preciso configurar nada manualmente.

Para o formulário funcionar depois do deploy, cadastre em **Settings → Secrets and variables → Actions** as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` (os valores estão em `.env.example`).

## Contato e área interna (Supabase)

- Formulário público: seção **Contato**, gravando em `public.service_requests`.
- Área restrita de atendimento: `#admin` (ex.: `https://<seu-site>/#admin`).
- Página de dados salvos: `#dados` — tabela completa, busca, filtros por status, ordenação, detalhes de cada registro e exportação CSV.
- Banco: projeto Supabase `ecolog-contato` (`libnqiayymrelyjemrkp`, região `sa-east-1`), schema em `supabase/migrations/`.
- RLS: visitantes **só inserem**; apenas a conta `daviferraztop@gmail.com` pode ler, atualizar status/notas e registrar o histórico de contato em `public.service_request_messages`.
- Nenhuma senha fica no código. No Supabase Dashboard, use **Authentication → Invite user** com `daviferraztop@gmail.com` e defina uma senha forte. Se precisar trocar a conta autorizada, altere o e-mail em `public.is_ecolog_admin()` via migration.

## Estrutura

```
src/
  config/site.ts            # todo o conteúdo (textos, métricas, rotas, FAQ)
  components/
    ui/                     # Button, Badge, Card, Accordion (shadcn/ui)
    shared/                 # Reveal, SectionHeading, Icon
    visuals/route-map.tsx   # mapa animado da malha logística
    sections/               # 10 seções da página (inclui Contato)
    admin/admin-gate.tsx    # login e controle de acesso compartilhado
    admin/admin-page.tsx    # atendimento protegido (#admin)
    admin/data-page.tsx     # visualização dos dados salvos (#dados)
    layout/                 # header, footer, progresso e tour guiado
  hooks/                    # useTour, useActiveSection
  lib/utils.ts              # cn() com clsx + tailwind-merge
  lib/supabase.ts           # cliente Supabase e tipos das tabelas
supabase/migrations/        # schema, RLS e políticas
```

## Tour guiado

O controlador percorre as 10 seções automaticamente a cada 8 segundos. Botões de anterior/próximo, pausa e índices clicáveis ficam no HUD inferior. Atalhos: `←` / `→` navegam e `Esc` encerra. O movimento respeita `prefers-reduced-motion`.

## Privacidade e segurança

- O front é estático no GitHub Pages (HTTPS); dados e autenticação ficam no Supabase.
- Não há analytics, cookies de terceiros nem rastreadores. A sessão do dev é mantida apenas pelo Supabase Auth no navegador dele.
- Fontes são auto-hospedadas (`@fontsource-variable`): nenhuma requisição sai para Google/CDNs.
- CSP via `<meta>` permite conexões somente ao próprio domínio e a `*.supabase.co`.
- O formulário exige consentimento explícito (LGPD), valida os campos e usa um campo armadilha contra bots. Dados pessoais **não** são versionados no GitHub — apenas o código.
- Somente a conta `daviferraztop@gmail.com` consegue ler as solicitações; as políticas RLS são aplicadas no banco, não apenas na interface.
- Não existem segredos no código-fonte: as chaves do Supabase são *publishable* e o acesso é controlado por RLS.

## Conteúdo

Todos os textos, números e rotas são fictícios e servem para demonstração. Edite apenas `src/config/site.ts` para personalizar.
