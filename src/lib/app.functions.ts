import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// ---------- PROFILE ----------
export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("profiles")
      .select("id, full_name, phone, avatar_url")
      .eq("id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ full_name: z.string().min(1).max(120), phone: z.string().max(30).optional() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ full_name: data.full_name, phone: data.phone ?? null })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- PROGRESS ----------
export const getMyProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: progress, error: pErr } = await context.supabase
      .from("subject_progress")
      .select("subject_code, subject_name, total_lectures, watched_lectures, last_watched")
      .eq("user_id", context.userId)
      .order("subject_code");
    if (pErr) throw new Error(pErr.message);

    const { data: history, error: hErr } = await context.supabase
      .from("watch_history")
      .select("subject_code, lecture_title, watched_at")
      .eq("user_id", context.userId)
      .order("watched_at", { ascending: false })
      .limit(10);
    if (hErr) throw new Error(hErr.message);

    return { progress: progress ?? [], history: history ?? [] };
  });

// ---------- ENROLLMENTS ----------
export const createEnrollment = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        full_name: z.string().min(1).max(120),
        phone: z.string().min(6).max(30),
        email: z.string().email().max(120).optional().or(z.literal("")),
        package_name: z.string().min(1).max(120),
        package_price: z.number().int().positive(),
        payment_method: z.enum(["instapay", "vodafone"]),
        receipt_path: z.string().max(500).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let receiptUrl: string | null = null;
    if (data.receipt_path) {
      const { data: signed, error: sErr } = await supabaseAdmin.storage
        .from("receipts")
        .createSignedUrl(data.receipt_path, 60 * 60 * 24 * 365);
      if (sErr) console.error("[enrollment] signed url error", sErr.message);
      receiptUrl = signed?.signedUrl ?? data.receipt_path;
    }

    // Server-side detect current user (optional; fallback to null for anon)
    let userId: string | null = null;
    try {
      const { getRequest } = await import("@tanstack/react-start/server");
      const req = getRequest();
      const auth = req?.headers.get("authorization");
      if (auth?.startsWith("Bearer ")) {
        const token = auth.slice(7);
        const { data: claims } = await supabaseAdmin.auth.getUser(token);
        userId = claims.user?.id ?? null;
      }
    } catch {
      userId = null;
    }

    const { error } = await supabaseAdmin.from("enrollments").insert({
      user_id: userId,
      full_name: data.full_name,
      phone: data.phone,
      email: data.email || null,
      package_name: data.package_name,
      package_price: data.package_price,
      payment_method: data.payment_method,
      receipt_url: receiptUrl,
      status: "pending",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
