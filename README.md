# ecologistica — reformulado

SPA estática de logística regenerativa: React 18 + TypeScript strict + Tailwind CSS 3.4 + Framer Motion 11, com componentes no padrão shadcn/ui (Radix UI + CVA) e conteúdo centralizado em `src/config/site.ts`.

## Rodar localmente

Requisitos: Node.js 20+ e npm.

```bash
npm install
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

## Estrutura

```
src/
  config/site.ts            # todo o conteúdo (textos, métricas, rotas, FAQ)
  components/
    ui/                     # Button, Badge, Card, Accordion (shadcn/ui)
    shared/                 # Reveal, SectionHeading, Icon
    visuals/route-map.tsx   # mapa animado da malha logística
    sections/               # 9 seções da página
    layout/                 # header, footer, progresso e tour guiado
  hooks/                    # useTour, useActiveSection
  lib/utils.ts              # cn() com clsx + tailwind-merge
```

## Tour guiado

O controlador percorre as 9 seções automaticamente a cada 8 segundos. Botões de anterior/próximo, pausa e índices clicáveis ficam no HUD inferior. Atalhos: `←` / `→` navegam e `Esc` encerra. O movimento respeita `prefers-reduced-motion`.

## Privacidade e segurança

- O site é 100% estático: não há backend, banco de dados nem servidor próprio. O GitHub Pages força HTTPS.
- Não há analytics, cookies, rastreadores, `localStorage` ou `sessionStorage`.
- Fontes são auto-hospedadas (`@fontsource-variable`): nenhuma requisição sai para Google/CDNs.
- Há uma CSP via `<meta>` limitando scripts, estilos, fontes e conexões ao próprio domínio.
- Não há formulário nem coleta de dados: os botões de contato abrem o cliente de e-mail do visitante (`mailto:`). Nenhuma informação é armazenada pelo site.
- Não existem segredos (chaves de API, tokens) no código-fonte, que é público por definição.

## Conteúdo

Todos os textos, números e rotas são fictícios e servem para demonstração. Edite apenas `src/config/site.ts` para personalizar.
