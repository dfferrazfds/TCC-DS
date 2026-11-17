-- Formulário de contato do site + área restrita da equipe ecologistica.
-- O PostgreSQL roda com RLS: visitantes apenas INSEREM; apenas o e-mail do dev lê/responde.

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(btrim(full_name)) between 2 and 120),
  email text not null check (
    char_length(email) <= 254
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[[:alpha:]]{2,}$'
  ),
  phone text not null check (phone ~ '^[0-9+() .-]{8,30}$'),
  service text not null check (
    service in ('diagnostico', 'otimizacao', 'frota', 'consultoria', 'outro')
  ),
  message text check (message is null or char_length(message) <= 5000),
  -- LGPD: o visitante precisa autorizar expressamente o contato.
  consent boolean not null default false check (consent),
  -- Honeypot: bots preenchem; pessoas nunca veem este campo.
  website text not null default '' check (btrim(website) = ''),
  status text not null default 'novo' check (
    status in ('novo', 'em_contato', 'respondido', 'arquivado')
  ),
  notes text,
  contacted_at timestamptz
);

create index if not exists service_requests_created_at_idx
  on public.service_requests (created_at desc);
create index if not exists service_requests_status_idx
  on public.service_requests (status);

create table if not exists public.service_request_messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.service_requests (id) on delete cascade,
  created_at timestamptz not null default now(),
  author_id uuid not null references auth.users (id) on delete cascade,
  direction text not null check (direction in ('enviada', 'recebida')),
  body text not null check (char_length(btrim(body)) between 1 and 5000)
);

create index if not exists service_request_messages_request_id_idx
  on public.service_request_messages (request_id, created_at);

-- Helper: lê apenas o e-mail do JWT (SECURITY INVOKER é suficiente e evita
-- expor uma função SECURITY DEFINER pela API).
create or replace function public.is_ecolog_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'daviferraztop@gmail.com';
$$;

revoke all on function public.is_ecolog_admin() from public, anon, authenticated;
grant execute on function public.is_ecolog_admin() to anon, authenticated, service_role;

alter table public.service_requests enable row level security;
alter table public.service_request_messages enable row level security;

revoke all on public.service_requests from anon, authenticated;
grant insert (full_name, email, phone, service, message, consent, website)
  on public.service_requests to anon, authenticated;
grant select, update on public.service_requests to authenticated;

revoke all on public.service_request_messages from anon, authenticated;
grant select, insert, update on public.service_request_messages to authenticated;

drop policy if exists "visitante envia solicitacao" on public.service_requests;
create policy "visitante envia solicitacao"
  on public.service_requests for insert to anon, authenticated
  with check (consent and btrim(website) = '');

drop policy if exists "admin le solicitacoes" on public.service_requests;
create policy "admin le solicitacoes"
  on public.service_requests for select to authenticated
  using (public.is_ecolog_admin());

drop policy if exists "admin atualiza solicitacoes" on public.service_requests;
create policy "admin atualiza solicitacoes"
  on public.service_requests for update to authenticated
  using (public.is_ecolog_admin())
  with check (public.is_ecolog_admin());

drop policy if exists "admin le mensagens" on public.service_request_messages;
create policy "admin le mensagens"
  on public.service_request_messages for select to authenticated
  using (public.is_ecolog_admin());

drop policy if exists "admin registra mensagens" on public.service_request_messages;
create policy "admin registra mensagens"
  on public.service_request_messages for insert to authenticated
  with check (public.is_ecolog_admin() and author_id = auth.uid());

drop policy if exists "admin edita mensagens" on public.service_request_messages;
create policy "admin edita mensagens"
  on public.service_request_messages for update to authenticated
  using (public.is_ecolog_admin())
  with check (public.is_ecolog_admin() and author_id = auth.uid());
