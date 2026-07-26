import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, FileText, Sigma, GraduationCap, PencilRuler, ClipboardList, NotebookPen, X, RotateCcw, ZoomIn, ZoomOut, Lock, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PdfCanvasViewer } from "@/components/site/english-books";
import { useAccessLevel, FREE_PREVIEW_PAGES } from "@/lib/use-access-level";
import asasAsset from "@/assets/math-asas.pdf.asset.json";
import shorohatAsset from "@/assets/math-shorohat.pdf.asset.json";
import tadribatAsset from "@/assets/math-tadribat.pdf.asset.json";
import bankExamsAsset from "@/assets/math-bank-exams.pdf.asset.json";
import sheetsAsset from "@/assets/math-sheets.pdf.asset.json";

const books = [
  {
    title: "كتاب الإمام الأكبر (الأساس)",
    subtitle: "الرياضة الهندسية — الترمين الأول والثاني",
    description:
      "الكتاب الأساسي في مادة الرياضيات للفرقة الإعدادية: 16 درس مع خرائط ذهنية وأمثلة محلولة تغطّي منهج الترمين بأسلوب مبسّط ومنظّم.",
    pages: 8,
    file: asasAsset,
    isExam: false,
    accent: "from-indigo-500/25 to-blue-500/10",
    ring: "border-indigo-400/30 hover:border-indigo-400/60",
    icon: Sigma,
    iconColor: "text-indigo-300",
    tag: "الكتاب الأساسي",
  },
  {
    title: "كتاب شروحات الدكاترة",
    subtitle: "خلاصة شرح كبار الأساتذة في مادة واحدة",
    description:
      "مرجع متكامل يجمع شروحات م. فايز و م. نضال و م. إهداء في كتاب واحد منظّم، ليعطيك أفضل تفسير لكل جزئية في المنهج.",
    pages: 8,
    file: shorohatAsset,
    isExam: false,
    accent: "from-emerald-500/25 to-teal-500/10",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    icon: GraduationCap,
    iconColor: "text-emerald-300",
    tag: "شروحات الدكاترة",
  },
  {
    title: "كتاب التدريبات والمسائل",
    subtitle: "8 فصول من التمارين المتدرّجة",
    description:
      "كتاب تدريبات كامل مقسّم على 8 فصول متدرّجة الصعوبة، لتثبيت كل درس بالحل والتطبيق العملي على أنماط الأسئلة المتوقّعة.",
    pages: 120,
    file: tadribatAsset,
    isExam: false,
    accent: "from-amber-500/25 to-orange-500/10",
    ring: "border-amber-400/30 hover:border-amber-400/60",
    icon: PencilRuler,
    iconColor: "text-amber-300",
    tag: "8 فصول",
  },
  {
    title: "بنك الامتحانات — الترمين",
    subtitle: "مذكرة موحّدة لامتحانات الترمين بحلول نموذجية",
    description:
      "بنك امتحانات شامل لامتحانات الترم الأول والثاني (Final + Model) مع حلول نموذجية كاملة — إصدار موحّد 2026.",
    pages: 235,
    file: bankExamsAsset,
    isExam: true,
    accent: "from-rose-500/25 to-red-500/10",
    ring: "border-rose-400/30 hover:border-rose-400/60",
    icon: ClipboardList,
    iconColor: "text-rose-300",
    tag: "امتحانات محلولة",
  },
  {
    title: "مذكرة الشيتات",
    subtitle: "شيتات الرياضة — بالحلول والشرح",
    description:
      "مذكرة تجمع شيتات الرياضة للترمين (تفاضل وتكامل وباقي الأبواب) مع الحلول الكاملة والشرح المبسّط لكل مسألة.",
    pages: 130,
    file: sheetsAsset,
    isExam: false,
    accent: "from-cyan-500/25 to-sky-500/10",
    ring: "border-cyan-400/30 hover:border-cyan-400/60",
    icon: NotebookPen,
    iconColor: "text-cyan-300",
    tag: "شيتات محلولة",
  },
];

export function MathBooks() {
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
    <section id="math-books" className="relative py-24 md:py-32 overflow-hidden">
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
          <Badge variant="outline" className="mb-4 border-indigo-400/30 text-indigo-300 bg-indigo-400/5">
            مادة الرياضيات
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient-gold">كتب</span>
            <span className="text-foreground"> الإمام الأكبر — الرياضيات</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            خمس مراجع مرتّبة لمادة الرياضة الهندسية للفرقة الإعدادية: تبدأ بالكتاب الأساسي وشروحات الدكاترة،
            ثم التدريبات والمسائل، وتنتهي ببنك الامتحانات ومذكرة الشيتات — كلها إعداد وتنسيق منصة الإمام الأكبر.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {books.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className={`group relative glass-card rounded-2xl p-6 border ${book.ring} transition-all duration-300 flex flex-col`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${book.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${book.accent} border ${book.ring} flex items-center justify-center`}>
                    <book.icon className={`w-7 h-7 ${book.iconColor}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
                      الكتاب {i + 1}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full ${book.iconColor} bg-white/5 border border-white/10`}>
                      {book.tag}
                    </span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-1">{book.title}</h3>
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
                        <span>اشترك لفتح بنك الامتحانات</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-4 h-4" />
                        <span>{level === "subscribed" ? "قراءة الكتاب" : `معاينة أول ${FREE_PREVIEW_PAGES} صفحات`}</span>
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
        <DialogContent
          className="max-w-none w-screen h-screen sm:max-w-none p-0 gap-0 overflow-hidden bg-background border-0 rounded-none [&>button.absolute]:hidden"
        >
          <DialogTitle className="sr-only">{previewBook?.title ?? "معاينة الكتاب"}</DialogTitle>

          {previewBook && (
            <PdfCanvasViewer
              key={`${previewBook.file.url}-${level}`}
              fileUrl={previewBook.file.url}
              title={previewBook.title}
              zoom={zoom}
              rotation={rotation}
              maxPages={isLimited ? FREE_PREVIEW_PAGES : undefined}
              lockedNotice={isLimited ? `شاهدت أول ${FREE_PREVIEW_PAGES} صفحات من الكتاب — اشترك لفتح باقي الصفحات` : undefined}
            />
          )}

          <div className="pointer-events-none absolute top-3 right-3 left-3 z-50 flex items-center justify-between gap-2">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg px-3 py-1.5 min-w-0">
              {previewBook && <previewBook.icon className={`w-4 h-4 shrink-0 ${previewBook.iconColor}`} />}
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
                    onClick={() => setZoom((value) => Math.max(0.75, Number((value - 0.15).toFixed(2))))}
                    className="inline-flex items-center justify-center rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg w-9 h-9 text-foreground/80 hover:text-foreground hover:bg-background"
                    aria-label="تصغير"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoom((value) => Math.min(2, Number((value + 0.15).toFixed(2))))}
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
              لازم تسجّل حساب في منصة الإمام الأكبر عشان تقدر تعاين الكتب.
              التسجيل مجاني ويفتح لك أول {FREE_PREVIEW_PAGES} صفحات من كل كتاب.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setAuthPromptOpen(false)}>لاحقاً</Button>
            <Button onClick={() => { setAuthPromptOpen(false); navigate({ to: "/auth" }); }}>
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
              بنك الامتحانات للمشتركين فقط
            </DialogTitle>
            <DialogDescription className="text-right leading-relaxed">
              بنك الامتحانات متاح فقط للطلاب المشتركين. اشترك في الباقة وارفع إيصال الدفع
              ليتم تفعيل اشتراكك من إدارة المنصة.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setSubscribePromptOpen(false)}>لاحقاً</Button>
            <Button onClick={() => { setSubscribePromptOpen(false); navigate({ to: "/", hash: "pricing" }); }}>
              عرض الباقات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
