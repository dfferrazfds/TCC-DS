import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import {
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
} from "lucide-react";

import { supabase, type ServiceRequest, type ServiceRequestMessage } from "@/lib/supabase";
import { formatDate, serviceLabel } from "@/lib/admin-format";
import { Button } from "@/components/ui/button";
import { AdminGate } from "@/components/admin/admin-gate";

const STATUS_OPTIONS: ReadonlyArray<ServiceRequest["status"]> = [
  "novo",
  "em_contato",
  "respondido",
  "arquivado",
];

const inputClass =
  "w-full rounded-xl border border-forest-800/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-forest-800/75";

export function AdminPage() {
  return (
    <AdminGate active="admin">
      {(user) => <AdminContent user={user} />}
    </AdminGate>
  );
}

function AdminContent({ user }: { user: User }) {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ServiceRequestMessage[]>([]);
  const [notes, setNotes] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [direction, setDirection] = useState<ServiceRequestMessage["direction"]>("enviada");
  const [busy, setBusy] = useState(false);
  const [dataError, setDataError] = useState("");

  const loadRequests = useCallback(async () => {
    if (!supabase) return;
    setBusy(true);
    setDataError("");
    const { data, error } = await supabase
      .from("service_requests")
      .select("*")
      .order("created_at", { ascending: false });
    setBusy(false);
    if (error) {
      setDataError(error.message);
      return;
    }
    const list = (data ?? []) as ServiceRequest[];
    setRequests(list);
    setSelectedId((current) => current ?? list[0]?.id ?? null);
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  const loadMessages = useCallback(async () => {
    if (!supabase || !selectedId) return;
    const { data, error } = await supabase
      .from("service_request_messages")
      .select("*")
      .eq("request_id", selectedId)
      .order("created_at", { ascending: true });
    if (error) {
      setDataError(error.message);
      return;
    }
    setMessages((data ?? []) as ServiceRequestMessage[]);
  }, [selectedId]);

  useEffect(() => {
    void loadMessages();
  }, [loadMessages]);

  const selected = requests.find((request) => request.id === selectedId) ?? null;

  useEffect(() => {
    setNotes(selected?.notes ?? "");
    setNewMessage("");
  }, [selected?.id, selected?.notes]);

  async function updateRequest(id: string, changes: Partial<ServiceRequest>) {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("service_requests").update(changes).eq("id", id);
    setBusy(false);
    if (error) {
      setDataError(error.message);
      return;
    }
    await loadRequests();
  }

  async function handleAddMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || !selectedId || !newMessage.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("service_request_messages").insert({
      request_id: selectedId,
      author_id: user.id,
      direction,
      body: newMessage.trim(),
    });
    setBusy(false);
    if (error) {
      setDataError(error.message);
      return;
    }
    setNewMessage("");
    if (direction === "enviada") {
      await updateRequest(selectedId, {
        status: "em_contato",
        contacted_at: new Date().toISOString(),
      });
    }
    await loadMessages();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-editorial text-2xl text-cream">Solicitações recebidas</h2>
          <p className="mt-1 text-sm text-mint-100/65">
            {requests.length} {requests.length === 1 ? "solicitação" : "solicitações"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-mint-100/20 text-mint-100"
          onClick={() => void loadRequests()}
          disabled={busy}
        >
          <RefreshCw className={busy ? "animate-spin" : ""} aria-hidden="true" />
          Atualizar
        </Button>
      </div>

      {dataError ? (
        <p role="alert" className="mt-5 rounded-xl bg-red-950/40 p-4 text-sm text-red-200">
          {dataError}
        </p>
      ) : null}

      {requests.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-mint-100/10 bg-forest-900/50 p-8 text-center text-sm text-mint-100/70">
          Nenhuma solicitação ainda.
        </p>
      ) : (
        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(260px,0.8fr)_1.2fr]">
          <ul className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
            {requests.map((request) => (
              <li key={request.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(request.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    request.id === selectedId
                      ? "border-lime-300/60 bg-lime-300/10"
                      : "border-mint-100/10 bg-forest-900/40 hover:border-mint-100/25"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <strong className="truncate text-sm text-cream">{request.full_name}</strong>
                    <span className="shrink-0 text-[10px] uppercase tracking-wider text-mint-200/60">
                      {formatDate(request.created_at)}
                    </span>
                  </span>
                  <span className="mt-1 block truncate text-xs text-mint-100/60">{request.email}</span>
                  <span className="mt-2 inline-block rounded-full bg-forest-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime-200">
                    {request.status}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {selected ? (
            <div className="rounded-2xl border border-mint-100/10 bg-forest-900/50 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <span className={labelClass}>Nome</span>
                  <p className="text-sm text-cream">{selected.full_name}</p>
                </div>
                <div>
                  <span className={labelClass}>Status</span>
                  <select
                    aria-label="Status da solicitação"
                    className={inputClass}
                    value={selected.status}
                    onChange={(event) =>
                      void updateRequest(selected.id, {
                        status: event.target.value as ServiceRequest["status"],
                      })
                    }
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className={labelClass}>E-mail</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="inline-flex items-center gap-2 text-sm text-lime-300 hover:underline"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {selected.email}
                  </a>
                </div>
                <div>
                  <span className={labelClass}>Telefone</span>
                  <a
                    href={`tel:${selected.phone.replace(/[^0-9+]/g, "")}`}
                    className="inline-flex items-center gap-2 text-sm text-lime-300 hover:underline"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {selected.phone}
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <span className={labelClass}>Serviço solicitado</span>
                <p className="text-sm text-cream">{serviceLabel(selected.service)}</p>
              </div>

              {selected.message ? (
                <div className="mt-6">
                  <span className={labelClass}>Mensagem</span>
                  <p className="whitespace-pre-wrap rounded-xl bg-forest-950/60 p-4 text-sm leading-relaxed text-mint-100/80">
                    {selected.message}
                  </p>
                </div>
              ) : null}

              <div className="mt-6">
                <label className={labelClass} htmlFor="admin-notes">Notas internas</label>
                <textarea
                  id="admin-notes"
                  className={`${inputClass} min-h-24 resize-y`}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  onBlur={() => {
                    if (notes !== (selected.notes ?? "")) {
                      void updateRequest(selected.id, { notes });
                    }
                  }}
                />
              </div>

              <div className="mt-7 border-t border-mint-100/10 pt-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-cream">
                  <MessageCircle className="size-4 text-lime-300" aria-hidden="true" />
                  Registro de contato
                </h3>
                <ul className="mt-4 max-h-52 space-y-2 overflow-y-auto">
                  {messages.length === 0 ? (
                    <li className="text-xs text-mint-100/55">Nenhuma interação registrada.</li>
                  ) : (
                    messages.map((message) => (
                      <li key={message.id} className="rounded-xl bg-forest-950/50 p-3 text-xs text-mint-100/80">
                        <span className="font-semibold uppercase tracking-wider text-lime-200">
                          {message.direction} · {formatDate(message.created_at)}
                        </span>
                        <p className="mt-1 whitespace-pre-wrap">{message.body}</p>
                      </li>
                    ))
                  )}
                </ul>

                <form onSubmit={handleAddMessage} className="mt-4 space-y-3">
                  <div className="flex gap-4 text-xs text-mint-100/75">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="direction"
                        className="accent-lime-300"
                        checked={direction === "enviada"}
                        onChange={() => setDirection("enviada")}
                      />
                      Contato enviado
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="direction"
                        className="accent-lime-300"
                        checked={direction === "recebida"}
                        onChange={() => setDirection("recebida")}
                      />
                      Resposta recebida
                    </label>
                  </div>
                  <textarea
                    aria-label="Registrar interação"
                    className={`${inputClass} min-h-20 resize-y`}
                    placeholder="Ex.: enviei e-mail apresentando o diagnóstico..."
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    maxLength={5000}
                    required
                  />
                  <Button type="submit" size="sm" disabled={busy || !newMessage.trim()}>
                    <Send aria-hidden="true" />
                    Registrar
                  </Button>
                </form>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
