import { useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send, ShieldCheck } from "lucide-react";

import { site } from "@/config/site";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/shared/section-shell";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

type SubmitState = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-forest-800/15 bg-cream/70 px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-forest-700 focus:ring-2 focus:ring-forest-700/20";
const labelClass = "mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-forest-800/75";

export function ContactSection() {
  const { contact, brand } = site;
  const [state, setState] = useState<SubmitState>("idle");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    consent: false,
    website: "",
  });

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || state === "sending") return;

    setState("sending");
    const { error } = await supabase.from("service_requests").insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service: form.service,
      message: form.message.trim() || null,
      consent: form.consent,
      website: form.website,
    });

    if (error) {
      console.error("Falha ao enviar solicitação:", error.message);
      setState("error");
      return;
    }

    setState("success");
  }

  return (
    <SectionShell id="contato" light>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow={contact.eyebrow}
            title={contact.title}
            description={contact.description}
            titleId="contato-title"
            light
          />

          <Reveal delay={0.2}>
            <div className="mt-9 space-y-4 rounded-2xl border border-forest-800/10 bg-white/60 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-forest-700" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-ink/75">
                  Seus dados ficam no Supabase, com acesso restrito à equipe da ecologistica. Não
                  compartilhamos com terceiros.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-forest-700" aria-hidden="true" />
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm font-semibold text-forest-800 underline-offset-4 hover:underline"
                >
                  {brand.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-forest-800/10 bg-white/80 p-6 shadow-[0_30px_70px_-40px_rgba(8,40,26,0.45)] sm:p-9">
            {state === "success" ? (
              <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                <span className="grid size-16 place-items-center rounded-full bg-forest-800 text-lime-300">
                  <CheckCircle2 className="size-8" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-editorial text-2xl font-medium text-ink">
                  {contact.successTitle}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/70">
                  {contact.successDescription}
                </p>
                <Button
                  variant="outline"
                  className="mt-8 border-forest-800/30 text-ink"
                  onClick={() => {
                    setState("idle");
                    setForm({
                      full_name: "",
                      email: "",
                      phone: "",
                      service: "",
                      message: "",
                      consent: false,
                      website: "",
                    });
                  }}
                >
                  Enviar outra solicitação
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {!isSupabaseConfigured ? (
                  <p role="alert" className="rounded-xl bg-amber-100 p-4 text-sm text-amber-900">
                    {contact.notConfigured}
                  </p>
                ) : null}

                {state === "error" ? (
                  <p
                    role="alert"
                    className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-900"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <span>
                      <strong className="block font-semibold">{contact.errorTitle}</strong>
                      {contact.errorDescription}
                    </span>
                  </p>
                ) : null}

                <div>
                  <label className={labelClass} htmlFor="contact-name">
                    {contact.labels.name}
                  </label>
                  <input
                    id="contact-name"
                    name="full_name"
                    className={fieldClass}
                    value={form.full_name}
                    onChange={(event) => update("full_name", event.target.value)}
                    placeholder={contact.placeholders.name}
                    autoComplete="name"
                    minLength={2}
                    maxLength={120}
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="contact-email">
                      {contact.labels.email}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={fieldClass}
                      value={form.email}
                      onChange={(event) => update("email", event.target.value)}
                      placeholder={contact.placeholders.email}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="contact-phone">
                      {contact.labels.phone}
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className={fieldClass}
                      value={form.phone}
                      onChange={(event) => update("phone", event.target.value)}
                      placeholder={contact.placeholders.phone}
                      autoComplete="tel"
                      pattern="[0-9+() .\\-]{8,30}"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="contact-service">
                    {contact.labels.service}
                  </label>
                  <select
                    id="contact-service"
                    name="service"
                    className={fieldClass}
                    value={form.service}
                    onChange={(event) => update("service", event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>
                    {contact.services.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="contact-message">
                    {contact.labels.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={`${fieldClass} min-h-32 resize-y`}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    placeholder={contact.placeholders.message}
                    maxLength={5000}
                  />
                </div>

                {/* Honeypot: invisível para pessoas, usado para descartar bots. */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label htmlFor="contact-website">Deixe este campo em branco</label>
                  <input
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update("website", event.target.value)}
                  />
                </div>

                <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/75">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-0.5 size-4 shrink-0 accent-forest-800"
                    checked={form.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    required
                  />
                  {contact.labels.consent}
                </label>

                <Button type="submit" size="lg" className="w-full" disabled={state === "sending" || !isSupabaseConfigured}>
                  {state === "sending" ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />
                      {contact.labels.submitting}
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" />
                      {contact.labels.submit}
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
