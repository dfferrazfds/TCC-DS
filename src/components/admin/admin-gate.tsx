import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { ArrowLeft, Database, LockKeyhole, MessagesSquare, ShieldAlert } from "lucide-react";

import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

export const ADMIN_EMAIL = "daviferraztop@gmail.com";

const inputClass =
  "w-full rounded-xl border border-forest-800/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-mint-200/70";

interface AdminGateProps {
  active: "admin" | "dados";
  children: (user: User) => ReactNode;
}

export function AdminGate({ active, children }: AdminGateProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      if (mounted) setSession(next);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setSigningIn(true);
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword(credentials);
    setSigningIn(false);
    if (error) setLoginError("E-mail ou senha inválidos.");
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setCredentials({ email: "", password: "" });
  }

  const user = session?.user ?? null;
  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL;
  const title = active === "dados" ? "Dados salvos" : "Atendimento";

  if (loading) {
    return <AdminLayout active={active}><p className="text-mint-100/70">Carregando...</p></AdminLayout>;
  }

  if (!supabase || !isSupabaseConfigured) {
    return (
      <AdminLayout active={active}>
        <p className="rounded-xl bg-amber-100 p-4 text-sm text-amber-900">
          Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY para habilitar esta área.
        </p>
      </AdminLayout>
    );
  }

  if (!user) {
    return (
      <AdminLayout active={active}>
        <div className="mx-auto w-full max-w-md rounded-3xl border border-mint-100/10 bg-forest-900/60 p-8">
          <div className="grid size-12 place-items-center rounded-2xl bg-lime-300/15 text-lime-300">
            <LockKeyhole className="size-6" aria-hidden="true" />
          </div>
          <h2 className="mt-5 font-editorial text-2xl text-cream">Acesso da equipe</h2>
          <p className="mt-2 text-sm text-mint-100/70">
            Área restrita aos desenvolvedores da ecologistica.
          </p>
          <form onSubmit={handleSignIn} className="mt-7 space-y-5">
            <div>
              <label className={labelClass} htmlFor="gate-email">E-mail</label>
              <input
                id="gate-email"
                type="email"
                className={inputClass}
                autoComplete="username"
                value={credentials.email}
                onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="gate-password">Senha</label>
              <input
                id="gate-password"
                type="password"
                className={inputClass}
                autoComplete="current-password"
                value={credentials.password}
                onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
                required
              />
            </div>
            {loginError ? <p role="alert" className="text-sm text-red-300">{loginError}</p> : null}
            <Button type="submit" size="lg" className="w-full" disabled={signingIn}>
              <LockKeyhole aria-hidden="true" />
              {signingIn ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return (
      <AdminLayout active={active} user={user} onSignOut={handleSignOut}>
        <div className="mx-auto w-full max-w-lg rounded-3xl border border-red-400/20 bg-red-950/30 p-8">
          <ShieldAlert className="size-8 text-red-300" aria-hidden="true" />
          <h2 className="mt-4 font-editorial text-2xl text-cream">Sem permissão</h2>
          <p className="mt-2 text-sm text-mint-100/70">A conta {user.email} não tem acesso a esta área.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout active={active} user={user} onSignOut={handleSignOut} subtitle={title}>
      {children(user)}
    </AdminLayout>
  );
}

interface AdminLayoutProps {
  active: "admin" | "dados";
  children: ReactNode;
  user?: User | null;
  onSignOut?: () => void;
  subtitle?: string;
}

export function AdminLayout({ active, children, user, onSignOut, subtitle }: AdminLayoutProps) {
  return (
    <main className="min-h-screen bg-forest-950 px-5 py-10 text-cream sm:px-8">
      <div className="container">
        <a
          href="#inicio"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-lime-300 hover:text-lime-200"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar ao site
        </a>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-editorial text-3xl font-medium text-cream sm:text-4xl">
              ecologistica <span className="text-lime-300">/ área interna</span>
            </h1>
            {subtitle ? <p className="mt-1 text-sm text-mint-100/60">{subtitle}</p> : null}
          </div>
          {user && onSignOut ? (
            <div className="flex flex-wrap items-center gap-2">
              <a
                href="#admin"
                aria-current={active === "admin" ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active === "admin"
                    ? "bg-lime-300 text-forest-950"
                    : "border border-mint-100/20 text-mint-100 hover:border-lime-300/50"
                }`}
              >
                <MessagesSquare className="size-3.5" aria-hidden="true" />
                Atendimento
              </a>
              <a
                href="#dados"
                aria-current={active === "dados" ? "page" : undefined}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active === "dados"
                    ? "bg-lime-300 text-forest-950"
                    : "border border-mint-100/20 text-mint-100 hover:border-lime-300/50"
                }`}
              >
                <Database className="size-3.5" aria-hidden="true" />
                Dados salvos
              </a>
              <button
                type="button"
                onClick={onSignOut}
                className="rounded-full px-3 py-2 text-xs font-semibold text-mint-100/70 hover:text-cream"
              >
                Sair ({user.email})
              </button>
            </div>
          ) : null}
        </div>

        <div className="mt-9">{children}</div>
      </div>
    </main>
  );
}
