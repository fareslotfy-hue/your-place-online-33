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

    let avatarSignedUrl: string | null = null;
    if (data?.avatar_url) {
      const { data: signed } = await context.supabase.storage
        .from("avatars")
        .createSignedUrl(data.avatar_url, 60 * 60 * 24 * 7);
      avatarSignedUrl = signed?.signedUrl ?? null;
    }
    return data ? { ...data, avatar_signed_url: avatarSignedUrl } : null;
  });

export const updateMyAvatar = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ avatar_path: z.string().min(1).max(500) }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("profiles")
      .update({ avatar_url: data.avatar_path })
      .eq("id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
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

// ---------- ACCESS LEVEL ----------
export const getMyAccessLevel = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (isAdmin) return { subscribed: true };
    const { data, error } = await context.supabase
      .from("enrollments")
      .select("id")
      .eq("user_id", context.userId)
      .eq("status", "approved")
      .limit(1);
    if (error) throw new Error(error.message);
    return { subscribed: (data?.length ?? 0) > 0 };
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

// ---------- ADMIN ----------
export const getMyRoles = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { roles: (data ?? []).map((r) => r.role as string) };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_first_admin");
    if (error) throw new Error(error.message);
    return { granted: !!data };
  });

export const updateEnrollmentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["approved", "pending", "rejected"]),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { data: isAdmin, error: rErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (rErr) throw new Error(rErr.message);
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("enrollments")
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: rErr } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (rErr) throw new Error(rErr.message);
    if (!isAdmin) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [viewsRes, enrollRes, usersRes] = await Promise.all([
      supabaseAdmin
        .from("page_views")
        .select("path, referrer, created_at, user_id")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
      supabaseAdmin
        .from("enrollments")
        .select("id, full_name, phone, email, package_name, package_price, payment_method, status, receipt_url, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      supabaseAdmin.from("profiles").select("id", { count: "exact", head: true }),
    ]);
    if (viewsRes.error) throw new Error(viewsRes.error.message);
    if (enrollRes.error) throw new Error(enrollRes.error.message);

    const views = viewsRes.data ?? [];
    const enrollments = enrollRes.data ?? [];

    // Aggregations
    const dayMap = new Map<string, number>();
    const pathMap = new Map<string, number>();
    const refMap = new Map<string, number>();
    const uniqueUsers = new Set<string>();
    let viewsLast24h = 0;
    const now = Date.now();
    for (const v of views) {
      const d = new Date(v.created_at);
      const key = d.toISOString().slice(0, 10);
      dayMap.set(key, (dayMap.get(key) ?? 0) + 1);
      pathMap.set(v.path, (pathMap.get(v.path) ?? 0) + 1);
      const host = (() => {
        if (!v.referrer) return "مباشر";
        try {
          const u = new URL(v.referrer);
          if (!u.hostname) return "مباشر";
          return u.hostname.replace(/^www\./, "");
        } catch {
          return "مباشر";
        }
      })();
      refMap.set(host, (refMap.get(host) ?? 0) + 1);
      if (v.user_id) uniqueUsers.add(v.user_id);
      if (now - d.getTime() <= 24 * 60 * 60 * 1000) viewsLast24h++;
    }

    const daily = Array.from(dayMap.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .slice(-30)
      .map(([date, count]) => ({ date, count }));

    const topPaths = Array.from(pathMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }));

    const topReferrers = Array.from(refMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([source, count]) => ({ source, count }));

    return {
      totals: {
        views: views.length,
        viewsLast24h,
        uniqueSignedInVisitors: uniqueUsers.size,
        totalUsers: usersRes.count ?? 0,
        enrollments: enrollments.length,
        pendingEnrollments: enrollments.filter((e) => e.status === "pending").length,
      },
      daily,
      topPaths,
      topReferrers,
      recentEnrollments: enrollments.slice(0, 20),
    };
  });
