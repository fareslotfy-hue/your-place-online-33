import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Languages,
  X,
  Loader2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Lock,
  LogIn,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAccessLevel, FREE_PREVIEW_PAGES } from "@/lib/use-access-level";
import sharhAsset from "@/assets/english-sharh.pdf.asset.json";
import yellowAsset from "@/assets/english-yellow-exams.pdf.asset.json";
import tadribatAsset from "@/assets/english-tadribat.pdf.asset.json";

type PdfPageProxyLike = {
  rotate?: number;
  getViewport: (options: { scale: number; rotation?: number }) => { width: number; height: number };
  render: (options: {
    canvasContext: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    viewport: { width: number; height: number };
    transform?: number[];
  }) => {
    promise: Promise<void>;
  };
};

type PdfDocumentProxyLike = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPageProxyLike>;
  destroy?: () => Promise<void>;
};

type PdfViewerProps = {
  fileUrl: string;
  title: string;
  zoom: number;
  rotation: number;
  maxPages?: number;
  lockedNotice?: string;
};

export function PdfCanvasViewer({
  fileUrl,
  title,
  zoom,
  rotation,
  maxPages,
  lockedNotice,
}: PdfViewerProps) {
  const navigateViewer = useNavigate();
  const [pdf, setPdf] = useState<PdfDocumentProxyLike | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [visiblePages, setVisiblePages] = useState(() => new Set<number>());
  const renderedPagesRef = useRef(new Set<string>());
  const renderingPagesRef = useRef(new Set<string>());
  const canvasesRef = useRef(new Map<number, HTMLCanvasElement>());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let loadedPdf: PdfDocumentProxyLike | null = null;

    setPdf(null);
    setPageCount(0);
    setError(null);
    setVisiblePages(new Set([1, 2]));
    renderedPagesRef.current.clear();
    renderingPagesRef.current.clear();
    canvasesRef.current.clear();

    async function loadPdf() {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.mjs",
          import.meta.url,
        ).toString();

        const response = await fetch(fileUrl, { cache: "no-store" });
        if (!response.ok) throw new Error("PDF file request failed");
        const pdfData = new Uint8Array(await response.arrayBuffer());
        const loadingTask = pdfjs.getDocument({ data: pdfData });

        loadedPdf = (await loadingTask.promise) as unknown as PdfDocumentProxyLike;
        if (cancelled) {
          await loadedPdf.destroy?.();
          return;
        }

        setPdf(loadedPdf);
        setPageCount(loadedPdf.numPages);
      } catch (loadError) {
        console.error("PDF preview load failed", loadError);
        if (!cancelled) {
          setError("تعذر فتح الكتاب داخل الموقع. جرّب تحميله على جهازك من زر التحميل.");
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      observerRef.current?.disconnect();
      if (loadedPdf) void loadedPdf.destroy?.();
    };
  }, [fileUrl]);

  const renderPage = useCallback(
    async (pageNumber: number, canvas: HTMLCanvasElement) => {
      if (!pdf) return;
      const renderKey = `${pageNumber}-${zoom}-${rotation}`;
      if (renderingPagesRef.current.has(renderKey) || renderedPagesRef.current.has(renderKey))
        return;

      renderingPagesRef.current.add(renderKey);
      try {
        const page = await pdf.getPage(pageNumber);
        // Preserve the PDF's own orientation and apply only the user's manual
        // rotation. Cover pages do not need a special rotation.
        const intrinsicRotation = page.rotate ?? 0;
        const effectiveRotation = (intrinsicRotation + rotation) % 360;
        const viewport = page.getViewport({ scale: zoom, rotation: effectiveRotation });
        const context = canvas.getContext("2d");
        if (!context) return;

        const ratio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * ratio);
        canvas.height = Math.floor(viewport.height * ratio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        const outputTransform = ratio === 1 ? undefined : [ratio, 0, 0, ratio, 0, 0];
        await page.render({
          canvasContext: context,
          canvas,
          viewport,
          transform: outputTransform,
        }).promise;
        renderedPagesRef.current.add(renderKey);
      } catch (renderError) {
        console.error(`PDF page ${pageNumber} render failed`, renderError);
        renderedPagesRef.current.delete(renderKey);
      } finally {
        renderingPagesRef.current.delete(renderKey);
      }
    },
    [pdf, rotation, zoom],
  );

  // Clear the render cache only when zoom/rotation change — clearing on every
  // visiblePages update caused a re-render storm while scrolling (the "hang").
  useEffect(() => {
    renderedPagesRef.current.clear();
    canvasesRef.current.forEach((canvas, pageNumber) => {
      if (visiblePages.has(pageNumber)) void renderPage(pageNumber, canvas);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, rotation, renderPage]);

  // When new pages scroll into view, render just those.
  useEffect(() => {
    visiblePages.forEach((pageNumber) => {
      const canvas = canvasesRef.current.get(pageNumber);
      if (canvas) void renderPage(pageNumber, canvas);
    });
  }, [visiblePages, renderPage]);

  useEffect(() => {
    if (!pdf || !containerRef.current) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        setVisiblePages((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            const pageNumber = Number((entry.target as HTMLElement).dataset.pageNumber);
            if (entry.isIntersecting && pageNumber) {
              next.add(pageNumber);
              if (pageNumber + 1 <= pdf.numPages) next.add(pageNumber + 1);
            }
          });
          return next;
        });
      },
      { root: containerRef.current, rootMargin: "900px 0px", threshold: 0.01 },
    );

    canvasesRef.current.forEach((canvas) => observerRef.current?.observe(canvas));

    return () => observerRef.current?.disconnect();
  }, [pdf, pageCount]);

  const registerCanvas = useCallback(
    (pageNumber: number) => (canvas: HTMLCanvasElement | null) => {
      if (!canvas) {
        canvasesRef.current.delete(pageNumber);
        return;
      }
      canvasesRef.current.set(pageNumber, canvas);
      canvas.dataset.pageNumber = String(pageNumber);
      observerRef.current?.observe(canvas);
      if (visiblePages.has(pageNumber)) void renderPage(pageNumber, canvas);
    },
    [renderPage, visiblePages],
  );

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-neutral-900 px-6 text-center">
        <FileText className="w-10 h-10 text-muted-foreground" />
        <p className="max-w-md text-sm md:text-base text-foreground/80 font-body leading-relaxed">
          {error}
        </p>
      </div>
    );
  }

  if (!pdf) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-900 text-foreground">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm font-body text-foreground/80">جاري فتح الكتاب...</p>
      </div>
    );
  }

  const effectivePageCount = maxPages ? Math.min(pageCount, maxPages) : pageCount;
  const isLimited = !!maxPages && pageCount > effectivePageCount;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-auto bg-neutral-900 px-3 pb-10 pt-24 md:px-6"
      dir="ltr"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5">
        {Array.from({ length: effectivePageCount }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <figure key={pageNumber} className="w-full max-w-full text-center">
              <canvas
                ref={registerCanvas(pageNumber)}
                aria-label={`${title} — صفحة ${pageNumber}`}
                className="mx-auto block max-w-full rounded-md bg-white shadow-2xl shadow-black/40"
              />
              <figcaption className="mt-2 text-xs text-white/50" dir="rtl">
                صفحة {pageNumber} من {pageCount}
              </figcaption>
            </figure>
          );
        })}
        {isLimited && (
          <div
            className="w-full max-w-2xl rounded-2xl border border-amber-400/40 bg-amber-500/10 p-6 text-center text-amber-100"
            dir="rtl"
          >
            <p className="font-display font-bold text-lg mb-2">
              {lockedNotice ?? `عرضت أول ${effectivePageCount} صفحات من أصل ${pageCount}`}
            </p>
            <p className="text-sm text-amber-100/80 leading-relaxed mb-4">
              اشترك في المنصة لفتح الكتاب كاملاً — تواصل معنا لرفع إيصال الدفع وتفعيل اشتراكك.
            </p>
            <Button
              onClick={() => navigateViewer({ to: "/", hash: "pricing" })}
              className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-emerald-950 font-bold shadow-lg"
            >
              عرض الباقات والاشتراكات
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const books = [
  {
    title: "كتاب الشرح",
    subtitle: "دليل الطالب الشامل — إعداد، شرح، تدريب، مراجعة",
    description:
      "الكتاب الرئيسي في اللغة الإنجليزية للفرقة الإعدادية: شرح كامل للقواعد، القراءات الإسلامية والعلمية، الشيت الأصفر محلولاً، وامتحانات نهاية الترم بالحل.",
    pages: 141,
    file: sharhAsset,
    isExam: false,
    accent: "from-indigo-500/25 to-blue-500/10",
    ring: "border-indigo-400/30 hover:border-indigo-400/60",
    icon: BookOpen,
    iconColor: "text-indigo-300",
    tag: "الكتاب الرئيسي",
  },
  {
    title: "كتاب الشيت الأصفر والامتحانات",
    subtitle: "الشيت الأصفر 2019 + امتحانات 2017 و 2018",
    description:
      "كل تدريبات الشيت الأصفر وامتحانات يناير 2017 و 2018 بالحل النموذجي، مع شرح مبسّط لكل سؤال وترجمات كاملة ومراجعة شاملة قبل الامتحان.",
    pages: 52,
    file: yellowAsset,
    isExam: true,
    accent: "from-amber-500/25 to-orange-500/10",
    ring: "border-amber-400/30 hover:border-amber-400/60",
    icon: FileText,
    iconColor: "text-amber-300",
    tag: "امتحانات محلولة",
  },
  {
    title: "كتاب التدريبات",
    subtitle: "المراجعة الشاملة والخرائط الذهنية",
    description:
      "خرائط ذهنية للقواعد (الأزمنة، الضمائر، حروف الجر، الجمع...) مع تدريبات محلولة، تصحيح أخطاء، تكوين أسئلة، وقطع ترجمة ثنائية اللغة لمراجعة سريعة قبل الامتحان.",
    pages: 26,
    file: tadribatAsset,
    isExam: false,
    accent: "from-emerald-500/25 to-teal-500/10",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    icon: Languages,
    iconColor: "text-emerald-300",
    tag: "مراجعة سريعة",
  },
];

export function EnglishBooks() {
  const navigate = useNavigate();
  const { level } = useAccessLevel();
  const [previewBook, setPreviewBook] = useState<(typeof books)[number] | null>(null);
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [subscribePromptOpen, setSubscribePromptOpen] = useState(false);
  const [zoom, setZoom] = useState(1.15);
  const [rotation, setRotation] = useState(0);

  const openPreview = (book: (typeof books)[number]) => {
    if (level === "guest") {
      setAuthPromptOpen(true);
      return;
    }
    if (level === "free" && book.isExam) {
      setSubscribePromptOpen(true);
      return;
    }
    setZoom(1.15);
    setRotation(0);
    setPreviewBook(book);
  };

  const isLimited = previewBook ? level === "free" && !previewBook.isExam : false;

  return (
    <section id="english-books" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/[0.03] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <Badge
            variant="outline"
            className="mb-4 border-indigo-400/30 text-indigo-300 bg-indigo-400/5"
          >
            مادة اللغة الإنجليزية
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient-gold">كتب</span>
            <span className="text-foreground"> الإمام الأكبر — الإنجليزية</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            ثلاث كتب مرتّبة تمشّيك خطوة بخطوة: تبدأ بالشرح، ثم الشيت الأصفر والامتحانات المحلولة،
            وتنهي بالمراجعة والتدريبات السريعة. كلها إعداد وتنسيق منصة الإمام الأكبر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {books.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative glass-card rounded-2xl p-6 border ${book.ring} transition-all duration-300 flex flex-col`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${book.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
              />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${book.accent} border ${book.ring} flex items-center justify-center`}
                  >
                    <book.icon className={`w-7 h-7 ${book.iconColor}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
                      الكتاب {i + 1}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full ${book.iconColor} bg-white/5 border border-white/10`}
                    >
                      {book.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {book.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body mb-3">{book.subtitle}</p>

                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 flex-1">
                  {book.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{book.pages} صفحة</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>PDF عربي</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => openPreview(book)}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-br ${book.accent} border ${book.ring} text-sm font-body text-foreground hover:brightness-110 transition-all`}
                  >
                    {level === "guest" ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>سجّل الدخول للمعاينة</span>
                      </>
                    ) : level === "free" && book.isExam ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>اشترك لفتح الامتحانات</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {level === "subscribed"
                            ? "قراءة الكتاب"
                            : `معاينة أول ${FREE_PREVIEW_PAGES} صفحات`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!previewBook} onOpenChange={(o) => !o && setPreviewBook(null)}>
        <DialogContent className="max-w-none w-screen h-screen sm:max-w-none p-0 gap-0 overflow-hidden bg-background border-0 rounded-none [&>button.absolute]:hidden">
          <DialogTitle className="sr-only">{previewBook?.title ?? "معاينة الكتاب"}</DialogTitle>

          {previewBook && (
            <PdfCanvasViewer
              key={`${previewBook.file.url}-${level}`}
              fileUrl={previewBook.file.url}
              title={previewBook.title}
              zoom={zoom}
              rotation={rotation}
              maxPages={isLimited ? FREE_PREVIEW_PAGES : undefined}
              lockedNotice={
                isLimited
                  ? `شاهدت أول ${FREE_PREVIEW_PAGES} صفحات من الكتاب — اشترك لفتح باقي الصفحات`
                  : undefined
              }
            />
          )}

          <div className="pointer-events-none absolute top-3 right-3 left-3 z-50 flex items-center justify-between gap-2">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg px-3 py-1.5 min-w-0">
              {previewBook && (
                <previewBook.icon className={`w-4 h-4 shrink-0 ${previewBook.iconColor}`} />
              )}
              <span className="font-display font-bold text-xs md:text-sm text-foreground truncate max-w-[40vw]">
                {previewBook?.title}
              </span>
              {isLimited && (
                <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 text-[10px]">
                  <Lock className="w-3 h-3" />
                  معاينة محدودة
                </span>
              )}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {previewBook && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((value) => Math.max(0.75, Number((value - 0.15).toFixed(2))))
                    }
                    className="inline-flex items-center justify-center rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg w-9 h-9 text-foreground/80 hover:text-foreground hover:bg-background"
                    aria-label="تصغير"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setZoom((value) => Math.min(2, Number((value + 0.15).toFixed(2))))
                    }
                    className="inline-flex items-center justify-center rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg w-9 h-9 text-foreground/80 hover:text-foreground hover:bg-background"
                    aria-label="تكبير"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotation((value) => (value + 90) % 360)}
                    className="hidden sm:inline-flex items-center justify-center rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg w-9 h-9 text-foreground/80 hover:text-foreground hover:bg-background"
                    aria-label="تدوير"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setPreviewBook(null)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground border border-destructive/40 shadow-lg text-xs font-semibold"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={authPromptOpen} onOpenChange={setAuthPromptOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display">
              <LogIn className="w-5 h-5 text-primary" />
              سجّل دخولك أولاً
            </DialogTitle>
            <DialogDescription className="text-right leading-relaxed">
              لازم تسجّل حساب في منصة الإمام الأكبر عشان تقدر تعاين الكتب. التسجيل مجاني ويفتح لك
              أول {FREE_PREVIEW_PAGES} صفحات من كل كتاب.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setAuthPromptOpen(false)}>
              لاحقاً
            </Button>
            <Button
              onClick={() => {
                setAuthPromptOpen(false);
                navigate({ to: "/auth" });
              }}
            >
              <LogIn className="w-4 h-4 ml-1" />
              تسجيل / إنشاء حساب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={subscribePromptOpen} onOpenChange={setSubscribePromptOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display">
              <Lock className="w-5 h-5 text-amber-500" />
              محتوى الامتحانات للمشتركين فقط
            </DialogTitle>
            <DialogDescription className="text-right leading-relaxed">
              كتب الامتحانات والحلول متاحة فقط للطلاب المشتركين. اشترك في الباقة وارفع إيصال الدفع
              ليتم تفعيل اشتراكك من إدارة المنصة.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setSubscribePromptOpen(false)}>
              لاحقاً
            </Button>
            <Button
              onClick={() => {
                setSubscribePromptOpen(false);
                navigate({ to: "/", hash: "pricing" });
              }}
            >
              عرض الباقات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
