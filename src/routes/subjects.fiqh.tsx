import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FiqhBooks } from "@/components/site/fiqh-books";

export const Route = createFileRoute("/subjects/fiqh")({
  head: () => ({
    meta: [
      { title: "الفقه — كتب الإمام الأكبر" },
      { name: "description", content: "سبع مراجع لمادة الفقه للفرقة الأولى هندسة الأزهر: الشرح، المذكرة، الملخّص، بنك الأسئلة، الخرائط الذهنية، كارت المراجعة، ودرس الخطبة." },
      { property: "og:title", content: "الفقه — كتب الإمام الأكبر" },
      { property: "og:description", content: "مراجع مادة الفقه المقرّرة على الفرقة الأولى — كلية الهندسة، جامعة الأزهر." },
    ],
  }),
  component: FiqhSubjectPage,
});

function FiqhSubjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-4 pt-6">
          <Link
            to="/"
            hash="subjects"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>الرجوع إلى المواد</span>
          </Link>
        </div>
        <FiqhBooks />
      </main>
      <Footer />
    </div>
  );
}
