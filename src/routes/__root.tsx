import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";
import { usePageViewTracking } from "@/hooks/use-page-view-tracking";

function NotFoundComponent() {
  return (
    <div
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-emerald-950 via-background to-background px-4"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(212,175,55,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(6,78,59,0.4), transparent 45%)",
        }}
      />
      <div className="relative z-10 max-w-lg text-center">
        <img src="/logo.svg" alt="الإمام الأكبر" className="mx-auto h-16 w-16 opacity-90" />
        <p className="mt-6 font-display text-[9rem] leading-none font-bold text-gradient-gold">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground">الصفحة غير موجودة</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          يبدو أنّ الطريق الذي سلكته لا يؤدي إلى شيء.
          <br />
          عُد إلى الصفحة الرئيسية وابدأ من جديد بإذن الله.
        </p>
        <blockquote className="mt-6 border-r-2 border-primary/50 pr-4 text-sm italic text-muted-foreground/80">
          «ومَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ»
        </blockquote>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40"
          >
            العودة للرئيسية
          </Link>
          <Link
            to="/"
            hash="subjects"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background/60 px-6 py-2.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-accent"
          >
            تصفّح المواد
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          حصلت مشكلة في تحميل الصفحة
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">حاول تحدث الصفحة أو ترجع للرئيسية.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            حاول تاني
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            الرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "الإمام الأكبر | منصة الفرقة الإعدادية - كلية الهندسة" },
      {
        name: "description",
        content:
          "منصة الإمام الأكبر التعليمية للفرقة الإعدادية بكلية الهندسة جامعة الأزهر. محاضرات، كتب، ملخصات، امتحانات، وموارد دراسية شاملة.",
      },
      { name: "author", content: "منصة الإمام الأكبر" },
      { name: "theme-color", content: "#064e3b" },
      { property: "og:site_name", content: "منصة الإمام الأكبر" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "ar_EG" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800;900&family=Amiri:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  usePageViewTracking();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <Outlet />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
