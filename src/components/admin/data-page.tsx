import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpDown,
  DatabaseZap,
  Mail,
  Phone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import { supabase, type ServiceRequest, type ServiceRequestMessage } from "@/lib/supabase";
import { formatDate, serviceLabel, STATUS_LABEL } from "@/lib/admin-format";
import { Button } from "@/components/ui/button";
import { AdminGate } from "@/components/admin/admin-gate";

type Filter = "todos" | ServiceRequest["status"];
type Sort = "recentes" | "antigos" | "nome";

const FILTERS: ReadonlyArray<{ value: Filter; label: string }> = [
  { value: "todos", label: "Todos" },
  { value: "novo", label: "Novos" },
  { value: "em_contato", label: "Em contato" },
  { value: "respondido", label: "Respondidos" },
  { value: "arquivado", label: "Arquivados" },
];

function exportCsv(rows: ServiceRequest[]) {
  const headers = [
    "Data",
    "Nome",
    "E-mail",
    "Telefone",
    "Serviço",
    "Mensagem",
    "Status",
    "Notas internas",
    "Último contato",
  ];
  const escape = (value: string | null) => `"${(value ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((row) =>
    [
      formatDate(row.created_at),
      row.full_name,
      row.email,
      row.phone,
      serviceLabel(row.service),
      row.message,
      STATUS_LABEL[row.status] ?? row.status,
      row.notes,
      row.contacted_at ? formatDate(row.contacted_at) : "",
    ]
      .map(escape)
      .join(";"),
  );
  const csv = `\uFEFF${headers.map(escape).join(";")}\r\n${lines.join("\r\n")}`;
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `ecologistica-contatos-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function DataPage() {
  return (
    <AdminGate active="dados">
      {() => <DataContent />}
    </AdminGate>
  );
}

function DataContent() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [filter, setFilter] = useState<Filter>("todos");
  const [sort, setSort] = useState<Sort>("recentes");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ServiceRequest | null>(null);
  const [messages, setMessages] = useState<ServiceRequestMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setBusy(false);
    if (queryError) {
      setError(queryError.message);
      return;
    }
    setRequests((data ?? []) as ServiceRequest[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    setSelected((current) =>
      current ? (requests.find((item) => item.id === current.id) ?? null) : null,
    );
  }, [requests]);

  useEffect(() => {
    if (!supabase || !selected) {
      setMessages([]);
      return;
    }
    let active = true;
    supabase
      .from("service_request_messages")
      .select("*")
      .eq("request_id", selected.id)
      .order("created_at", { ascending: true })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) setError(queryError.message);
        else setMessages((data ?? []) as ServiceRequestMessage[]);
      });
    return () => {
      active = false;
    };
  }, [selected]);

  const counts = useMemo(
    () => ({
      total: requests.length,
      novo: requests.filter((item) => item.status === "novo").length,
      em_contato: requests.filter((item) => item.status === "em_contato").length,
      respondido: requests.filter((item) => item.status === "respondido").length,
    }),
    [requests],
  );

  const visible = useMemo(() => {
    const term = search.trim().toLocaleLowerCase("pt-BR");
    const filtered = requests.filter((item) => {
      if (filter !== "todos" && item.status !== filter) return false;
      if (!term) return true;
      return [
        item.full_name,
        item.email,
        item.phone,
        item.service,
        serviceLabel(item.service),
        item.message,
        item.notes,
      ]
        .filter(Boolean)
        .some((value) => (value as string).toLocaleLowerCase("pt-BR").includes(term));
    });
    return [...filtered].sort((a, b) => {
      if (sort === "nome") return a.full_name.localeCompare(b.full_name, "pt-BR");
      const diff = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return sort === "recentes" ? -diff : diff;
    });
  }, [requests, filter, search, sort]);

  const stats = [
    { label: "Total de solicitações", value: counts.total, tone: "text-cream" },
    { label: "Aguardando contato", value: counts.novo, tone: "text-lime-300" },
    { label: "Em contato", value: counts.em_contato, tone: "text-mint-200" },
    { label: "Respondidos", value: counts.respondido, tone: "text-cream" },
  ];

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-mint-100/10 bg-forest-900/50 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-mint-200/60">{stat.label}</p>
            <p className={`mt-2 font-editorial text-3xl font-medium ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl text-cream">Todas as solicitações</h2>
          <p className="mt-1 text-sm text-mint-100/65">
            {visible.length} de {requests.length} registros exibidos
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-mint-100/20 text-mint-100"
            onClick={() => void load()}
            disabled={busy}
          >
            <RefreshCw className={busy ? "animate-spin" : ""} aria-hidden="true" />
            Atualizar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-lime-300/40 text-lime-200"
            onClick={() => exportCsv(visible)}
            disabled={visible.length === 0}
          >
            <ArrowDownToLine aria-hidden="true" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-xl bg-red-950/40 p-4 text-sm text-red-200">{error}</p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-mint-200/50" aria-hidden="true" />
          <input
            type="search"
            aria-label="Buscar nos dados salvos"
            placeholder="Buscar por nome, e-mail, telefone ou mensagem..."
            className="w-full rounded-xl border border-mint-100/15 bg-forest-900/60 py-2.5 pl-10 pr-4 text-sm text-cream outline-none placeholder:text-mint-100/40 focus:border-lime-300/50"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <label className="flex items-center gap-2 text-xs text-mint-100/65">
          <ArrowUpDown className="size-4" aria-hidden="true" />
          Ordenar:
          <select
            aria-label="Ordenar registros"
            className="rounded-xl border border-mint-100/15 bg-forest-900/60 px-3 py-2 text-xs text-cream outline-none"
            value={sort}
            onChange={(event) => setSort(event.target.value as Sort)}
          >
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
            <option value="nome">Nome (A–Z)</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              filter === item.value
                ? "bg-lime-300 text-forest-950"
                : "border border-mint-100/20 text-mint-100/80 hover:border-lime-300/50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-mint-100/10 bg-forest-900/40">
        <table className="w-full min-w-[880px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-mint-100/10 text-[10px] uppercase tracking-[0.12em] text-mint-200/60">
              <th className="px-5 py-4 font-semibold">Data</th>
              <th className="px-5 py-4 font-semibold">Nome</th>
              <th className="px-5 py-4 font-semibold">Contato</th>
              <th className="px-5 py-4 font-semibold">Serviço</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Mensagem</th>
              <th className="px-5 py-4 font-semibold"><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer border-b border-mint-100/5 transition-colors last:border-0 hover:bg-lime-300/5"
                onClick={() => setSelected(item)}
              >
                <td className="whitespace-nowrap px-5 py-4 text-xs text-mint-100/65">{formatDate(item.created_at)}</td>
                <td className="px-5 py-4 font-medium text-cream">{item.full_name}</td>
                <td className="px-5 py-4">
                  <a
                    href={`mailto:${item.email}`}
                    onClick={(event) => event.stopPropagation()}
                    className="block text-xs text-lime-300 hover:underline"
                  >
                    {item.email}
                  </a>
                  <a
                    href={`tel:${item.phone.replace(/[^0-9+]/g, "")}`}
                    onClick={(event) => event.stopPropagation()}
                    className="mt-0.5 block text-xs text-mint-100/60 hover:text-lime-200"
                  >
                    {item.phone}
                  </a>
                </td>
                <td className="px-5 py-4 text-xs text-mint-100/80">{serviceLabel(item.service)}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-forest-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime-200">
                    {STATUS_LABEL[item.status] ?? item.status}
                  </span>
                </td>
                <td className="max-w-xs truncate px-5 py-4 text-xs text-mint-100/60">
                  {item.message || "—"}
                </td>
                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(item);
                    }}
                    className="rounded-full border border-mint-100/20 px-3 py-1 text-[11px] font-semibold text-mint-100 hover:border-lime-300/50 hover:text-lime-200"
                  >
                    Ver tudo
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 ? (
          <p className="p-10 text-center text-sm text-mint-100/60">
            Nenhum registro encontrado com esses filtros.
          </p>
        ) : null}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-forest-950/80 p-4 backdrop-blur-sm sm:p-8">
          <div className="my-auto w-full max-w-3xl rounded-3xl border border-mint-100/15 bg-forest-900 p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-lime-300">Registro completo</p>
                <h3 className="mt-1 font-editorial text-2xl text-cream">{selected.full_name}</h3>
                <p className="mt-1 text-xs text-mint-100/60">Enviado em {formatDate(selected.created_at)}</p>
              </div>
              <button
                type="button"
                aria-label="Fechar detalhes"
                onClick={() => setSelected(null)}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-mint-100/20 text-mint-100 hover:border-lime-300/50 hover:text-lime-200"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Detail label="E-mail" value={selected.email} href={`mailto:${selected.email}`} />
              <Detail label="Telefone" value={selected.phone} href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`} />
              <Detail label="Serviço" value={serviceLabel(selected.service)} />
              <Detail label="Status" value={STATUS_LABEL[selected.status] ?? selected.status} />
              <Detail label="Consentimento LGPD" value={selected.consent ? "Autorizado" : "Não autorizado"} />
              <Detail
                label="Último contato"
                value={selected.contacted_at ? formatDate(selected.contacted_at) : "Não registrado"}
              />
            </div>

            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint-200/60">Mensagem</p>
              <p className="whitespace-pre-wrap rounded-xl bg-forest-950/60 p-4 text-sm leading-relaxed text-mint-100/80">
                {selected.message || "Sem mensagem."}
              </p>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-mint-200/60">Notas internas</p>
              <p className="whitespace-pre-wrap rounded-xl bg-forest-950/60 p-4 text-sm leading-relaxed text-mint-100/80">
                {selected.notes || "Sem notas."}
              </p>
            </div>

            <div className="mt-6 border-t border-mint-100/10 pt-6">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-cream">
                <DatabaseZap className="size-4 text-lime-300" aria-hidden="true" />
                Histórico de contato
              </h4>
              {messages.length === 0 ? (
                <p className="mt-3 text-xs text-mint-100/55">Nenhuma interação registrada.</p>
              ) : (
                <ul className="mt-3 space-y-2">
                  {messages.map((message) => (
                    <li key={message.id} className="rounded-xl bg-forest-950/50 p-3 text-xs text-mint-100/80">
                      <span className="font-semibold uppercase tracking-wider text-lime-200">
                        {message.direction} · {formatDate(message.created_at)}
                      </span>
                      <p className="mt-1 whitespace-pre-wrap">{message.body}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <Button asChild variant="forest" size="sm">
                <a href={`mailto:${selected.email}`}>
                  <Mail aria-hidden="true" />
                  Responder e-mail
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="border-mint-100/20 text-mint-100">
                <a href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`}>
                  <Phone aria-hidden="true" />
                  Ligar
                </a>
              </Button>
              <a
                href="#admin"
                className="inline-flex h-9 items-center rounded-full px-4 text-xs font-semibold text-lime-300 hover:text-lime-200"
              >
                Abrir no atendimento →
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-xl bg-forest-950/50 p-4">
      <p className="text-[10px] uppercase tracking-[0.12em] text-mint-200/55">{label}</p>
      {href ? (
        <a href={href} className="mt-1 block break-all text-sm text-lime-300 hover:underline">{value}</a>
      ) : (
        <p className="mt-1 break-words text-sm text-cream">{value}</p>
      )}
    </div>
  );
}
