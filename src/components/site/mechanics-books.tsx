import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  Atom,
  GraduationCap,
  PencilRuler,
  ClipboardList,
  NotebookPen,
  X,
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
import { PdfCanvasViewer } from "@/components/site/english-books";
import { useAccessLevel, FREE_PREVIEW_PAGES } from "@/lib/use-access-level";

// Statics Books (الاستاتيكا)
import staticsExamsAsset from "@/assets/statics-exams-book.pdf.asset.json";
import staticsExercisesAsset from "@/assets/statics-exercises-book.pdf.asset.json";
import staticsSummaryAsset from "@/assets/statics-summary-book.pdf.asset.json";
import imamStaticsAsset from "@/assets/imam-statics-book.pdf.asset.json";

// Dynamics Books (الديناميكا)
import dynamicsExamsAsset from "@/assets/dynamics-exams-book.pdf.asset.json";
import dynamicsExercisesAsset from "@/assets/dynamics-exercises-book.pdf.asset.json";
import dynamicsSummaryAsset from "@/assets/dynamics-summary-book.pdf.asset.json";
import dynamicsSheetsAsset from "@/assets/dynamics-exams-sheets.pdf.asset.json";
import imamMechanicsAsset from "@/assets/imam-mechanics-book.pdf.asset.json";

const books = [
  // === كتاب الإمام الأكبر - الميكانيكا (الشامل) ===
  {
    title: "كتاب الإمام الأكبر في الميكانيكا",
    subtitle: "شامل للديناميكا والاستاتيكا — الترمين الأول والثاني",
    description:
      "الكتاب المرجعي الشامل من إعداد منصة الإمام الأكبر: يغطي الديناميكا والاستاتيكا بأسلوب مبسّط ومنظّم مع أمثلة محلولة وخرائط ذهنية لتسهيل فهم القوانين الأساسية.",
    pages: 180,
    file: imamMechanicsAsset,
    isExam: false,
    accent: "from-violet-500/25 to-purple-500/10",
    ring: "border-violet-400/30 hover:border-violet-400/60",
    icon: Atom,
    iconColor: "text-violet-300",
    tag: "الكتاب الشامل",
  },

  // ========== الديناميكا (الترم الأول) ==========
  {
    title: "ملخص الديناميكا",
    subtitle: "مراجعة سريعة ومركّزة للديناميكا — الترم الأول",
    description:
      "ملخص شامل لمادة الديناميكا (الترم الأول) يغطي الحركة، السرعة، التسارع، قوانين نيوتن في الحركة، الشغل والطاقة، والكمية الحركة بصيغة مركّزة وسهلة الحفظ.",
    pages: 52,
    file: dynamicsSummaryAsset,
    isExam: false,
    accent: "from-orange-500/25 to-amber-500/10",
    ring: "border-orange-400/30 hover:border-orange-400/60",
    icon: NotebookPen,
    iconColor: "text-orange-300",
    tag: "🔶 الديناميكا - ملخص",
  },
  {
    title: "تدريبات الديناميكا",
    subtitle: "تمارين متدرّجة مع الحلول — الترم الأول",
    description:
      "مجموعة شاملة من التدريبات على الديناميكا (الترم الأول) تغطي جميع أبواب المنهج مع حلول نموذجية مفصّلة، من الأساسية إلى المتقدمة.",
    pages: 85,
    file: dynamicsExercisesAsset,
    isExam: false,
    accent: "from-yellow-500/25 to-lime-500/10",
    ring: "border-yellow-400/30 hover:border-yellow-400/60",
    icon: PencilRuler,
    iconColor: "text-yellow-300",
    tag: "🔶 الديناميكا - تدريبات",
  },
  {
    title: "امتحانات الديناميكا",
    subtitle: "بنك امتحانات سابق محلولة — الترم الأول",
    description:
      "جمع شامل لامتحانات الديناميكا (الترم الأول) من السنوات السابقة مع الحلول النموذجية الكاملة، يشمل جميع أنواع الأسئلة.",
    pages: 70,
    file: dynamicsExamsAsset,
    isExam: true,
    accent: "from-red-500/25 to-pink-500/10",
    ring: "border-red-400/30 hover:border-red-400/60",
    icon: ClipboardList,
    iconColor: "text-red-300",
    tag: "🔶 الديناميكا - امتحانات",
  },
  {
    title: "امتحانات وشيتات الديناميكا",
    subtitle: "شيتات وامتحانات إضافية مع الحلول — الترم الأول",
    description:
      "مجموعة إضافية من الشيتات والامتحانات للديناميكا (الترم الأول) مع الحلول الشاملة — مثالية للتدريب المكثّف قبل الامتحان.",
    pages: 110,
    file: dynamicsSheetsAsset,
    isExam: true,
    accent: "from-fuchsia-500/25 to-pink-500/10",
    ring: "border-fuchsia-400/30 hover:border-fuchsia-400/60",
    icon: FileText,
    iconColor: "text-fuchsia-300",
    tag: "🔶 الديناميكا - شيتات",
  },

  // ========== الاستاتيكا (الترم الثاني) ==========
  {
    title: "كتاب الإمام الأكبر في الاستاتيكا",
    subtitle: "قوانين الاستاتيكا والتوازن — أسلوب الإمام الأكبر — الترم الثاني",
    description:
      "كتاب متخصص في الاستاتيكا (الترم الثاني) من إعداد المنصة: يتناول قوانين نيوتن في التوازن، عزم القوى، مراكز الثقل، والاحتكاك بطريقة مبسّرة مع تمارين متنوعة.",
    pages: 95,
    file: imamStaticsAsset,
    isExam: false,
    accent: "from-blue-500/25 to-cyan-500/10",
    ring: "border-blue-400/30 hover:border-blue-400/60",
    icon: GraduationCap,
    iconColor: "text-blue-300",
    tag: "🔵 الاستاتيكا - كتاب",
  },
  {
    title: "ملخص الاستاتيكا",
    subtitle: "مراجعة سريعة ومركّزة للاستاتيكا — الترم الثاني",
    description:
      "ملخص شامل لمادة الاستاتيكا (الترم الثاني) يغطي جميع القوانين والنظريات المهمة بصيغة مركّزة وسهلة الحفظ، مناسب للمراجعة النهائية قبل الامتحان.",
    pages: 45,
    file: staticsSummaryAsset,
    isExam: false,
    accent: "from-cyan-500/25 to-teal-500/10",
    ring: "border-cyan-400/30 hover:border-cyan-400/60",
    icon: NotebookPen,
    iconColor: "text-cyan-300",
    tag: "🔵 الاستاتيكا - ملخص",
  },
  {
    title: "تدريبات الاستاتيكا",
    subtitle: "تمارين متدرّجة مع الحلول — الترم الثاني",
    description:
      "مجموعة شاملة من التدريبات على الاستاتيكا (الترم الثاني) مقسّمة حسب المستوى: من السهل إلى الصعب، مع حلول نموذجية مفصّلة لكل تمرين.",
    pages: 78,
    file: staticsExercisesAsset,
    isExam: false,
    accent: "from-emerald-500/25 to-green-500/10",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    icon: PencilRuler,
    iconColor: "text-emerald-300",
    tag: "🔵 الاستاتيكا - تدريبات",
  },
  {
    title: "امتحانات الاستاتيكا",
    subtitle: "بنك امتحانات سابق محلولة — الترم الثاني",
    description:
      "جمع شامل لامتحانات الاستاتيكا (الترم الثاني) من السنوات السابقة مع الحلول النموذجية، يشمل امتحانات الترم ونماذج الامتحانات.",
    pages: 62,
    file: staticsExamsAsset,
    isExam: true,
    accent: "from-rose-500/25 to-red-500/10",
    ring: "border-rose-400/30 hover:border-rose-400/60",
    icon: ClipboardList,
    iconColor: "text-rose-300",
    tag: "🔵 الاستاتيكا - امتحانات",
  },
];

export function MechanicsBooks() {
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
    <section id="mechanics-books" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.03] to-transparent" />

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
            className="mb-4 border-violet-400/30 text-violet-300 bg-violet-400/5"
          >
            مادة الميكانيكا
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient-gold">كتب</span>
            <span className="text-foreground"> الإمام الأكبر — الميكانيكا</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            تسع مراجع مرتّبة لمادة الميكانيكا للفرقة الإعدادية: تبدأ بالكتاب الشامل، ثم كتب{" "}
            <span className="text-orange-400 font-semibold">الديناميكا (الترم الأول)</span>، وبعدها
            كتب <span className="text-blue-400 font-semibold">الاستاتيكا (الترم الثاني)</span> —
            كلها إعداد وتنسيق منصة الإمام الأكبر.
          </p>
        </motion.div>

        {/* Section divider for Dynamics then Statics */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-orange-400/40" />
          <Badge
            variant="outline"
            className="border-orange-400/30 text-orange-300 bg-orange-400/5 text-xs px-3 py-1"
          >
            🔶 الديناميكا (الترم الأول)
          </Badge>
          <div className="mx-2 text-muted-foreground">→</div>
          <Badge
            variant="outline"
            className="border-blue-400/30 text-blue-300 bg-blue-400/5 text-xs px-3 py-1"
          >
            🔵 الاستاتيكا (الترم الثاني)
          </Badge>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-blue-400/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {books.map((book, i) => (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
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
                        <span>اشترك لفتح بنك الامتحانات</span>
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
              بنك الامتحانات للمشتركين فقط
            </DialogTitle>
            <DialogDescription className="text-right leading-relaxed">
              بنك الامتحانات متاح فقط للطلاب المشتركين. اشترك في الباقة وارفع إيصال الدفع ليتم تفعيل
              اشتراكك من إدارة المنصة.
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
