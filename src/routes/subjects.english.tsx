import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { EnglishBooks } from "@/components/site/english-books";

export const Route = createFileRoute("/subjects/english")({
  head: () => ({
    meta: [
      { title: "اللغة الإنجليزية — كتب الإمام الأكبر" },
      { name: "description", content: "كتب مادة اللغة الإنجليزية للفرقة الإعدادية: الشرح، الشيت الأصفر والامتحانات، والتدريبات." },
      { property: "og:title", content: "اللغة الإنجليزية — كتب الإمام الأكبر" },
      { property: "og:description", content: "ثلاث كتب مرتبة لمادة اللغة الإنجليزية بالفرقة الإعدادية — كلية الهندسة، جامعة الأزهر." },
    ],
  }),
  component: EnglishSubjectPage,
});

function EnglishSubjectPage() {
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
        <EnglishBooks />
      </main>
      <Footer />
    </div>
  );
}
