import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Download, FileText, Languages, X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import sharhAsset from "@/assets/english-sharh.pdf.asset.json";
import yellowAsset from "@/assets/english-yellow-exams.pdf.asset.json";
import tadribatAsset from "@/assets/english-tadribat.pdf.asset.json";


const books = [
  {
    title: "كتاب الشرح",
    subtitle: "دليل الطالب الشامل — إعداد، شرح، تدريب، مراجعة",
    description:
      "الكتاب الرئيسي في اللغة الإنجليزية للفرقة الإعدادية: شرح كامل للقواعد، القراءات الإسلامية والعلمية، الشيت الأصفر محلولاً، وامتحانات نهاية الترم بالحل.",
    pages: 141,
    file: sharhAsset,
    downloadName: "كتاب_الإمام_الأكبر_في_اللغة_الإنجليزية.pdf",
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
    downloadName: "كتاب_الإمام_الأكبر_للتدريبات_والامتحانات.pdf",
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
    downloadName: "كتاب_الإمام_الأكبر_للتدريبات_والمراجعة.pdf",
    accent: "from-emerald-500/25 to-teal-500/10",
    ring: "border-emerald-400/30 hover:border-emerald-400/60",
    icon: Languages,
    iconColor: "text-emerald-300",
    tag: "مراجعة سريعة",
  },
];

export function EnglishBooks() {
  const [previewBook, setPreviewBook] = useState<(typeof books)[number] | null>(null);
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
          <Badge variant="outline" className="mb-4 border-indigo-400/30 text-indigo-300 bg-indigo-400/5">
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
                    onClick={() => setPreviewBook(book)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-body text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>معاينة</span>
                  </button>
                  <a

                    href={book.file.url}
                    download={book.downloadName}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-gradient-to-br ${book.accent} border ${book.ring} text-sm font-body text-foreground hover:brightness-110 transition-all`}
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </a>
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
            <iframe
              src={`${previewBook.file.url}#view=FitH`}
              title={previewBook.title}
              className="absolute inset-0 w-full h-full bg-neutral-900"
            />
          )}

          {/* Floating toolbar — stays visible while scrolling the PDF */}
          <div className="pointer-events-none absolute top-3 right-3 left-3 z-50 flex items-center justify-between gap-2">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg px-3 py-1.5 min-w-0">
              {previewBook && <previewBook.icon className={`w-4 h-4 shrink-0 ${previewBook.iconColor}`} />}
              <span className="font-display font-bold text-xs md:text-sm text-foreground truncate max-w-[40vw]">
                {previewBook?.title}
              </span>
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              {previewBook && (
                <>
                  <a
                    href={previewBook.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-background/85 backdrop-blur-md border border-border/60 shadow-lg text-xs text-foreground/80 hover:text-foreground hover:bg-background"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>فتح في تاب</span>
                  </a>
                  <a
                    href={previewBook.file.url}
                    download={previewBook.downloadName}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground border border-primary/40 shadow-lg text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل</span>
                  </a>
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

    </section>
  );
}

