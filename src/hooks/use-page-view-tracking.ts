import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

/**
 * Lightweight, privacy-friendly pageview tracking.
 * Inserts one row into public.page_views per client-side navigation.
 * Ignores auth/dashboard routes and swallows any errors silently.
 */
export function usePageViewTracking() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!pathname) return;
    // Don't track private/auth routes
    if (
      pathname.startsWith("/auth") ||
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/reset-password") ||
      pathname.startsWith("/api/")
    ) {
      return;
    }

    const timer = window.setTimeout(async () => {
      try {
        const { data } = await supabase.auth.getUser();
        await supabase.from("page_views").insert({
          path: pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent.slice(0, 500),
          user_id: data.user?.id ?? null,
        });
      } catch {
        // silent
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [pathname]);
}
