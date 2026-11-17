import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && publishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url as string, publishableKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        // O site usa hash (#admin) como rota; não deixar o SDK sobrescrever a URL.
        detectSessionInUrl: false,
      },
    })
  : null;

export type ServiceRequest = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  message: string | null;
  consent: boolean;
  status: "novo" | "em_contato" | "respondido" | "arquivado";
  notes: string | null;
  contacted_at: string | null;
};

export type ServiceRequestMessage = {
  id: string;
  request_id: string;
  created_at: string;
  author_id: string;
  direction: "enviada" | "recebida";
  body: string;
};
