import { site } from "@/config/site";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(
    new Date(value),
  );
}

export function serviceLabel(value: string) {
  return site.contact.services.find((item) => item.value === value)?.label ?? value;
}

export const STATUS_LABEL: Record<string, string> = {
  novo: "Novo",
  em_contato: "Em contato",
  respondido: "Respondido",
  arquivado: "Arquivado",
};
