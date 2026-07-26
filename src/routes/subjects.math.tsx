import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { MathBooks } from "@/components/site/math-books";
import VideoLibrary from "@/components/VideoLibrary";
import ogImage from "@/assets/og-image.jpg.asset.json";

const URL_ = "https://your-place-online-33.lovable.app/subjects/math";
const OG = `https://your-place-online-33.lovable.app${ogImage.url}`;
const TITLE = "الرياضيات — كتب الإمام الأكبر";
const DESC = "خمس مراجع لمادة الرياضة الهندسية للفرقة الإعدادية هندسة الأزهر: الكتاب الأساسي، شروحات الدكاترة، التدريبات والمسائل، بنك الامتحانات، ومذكرة الشيتات.";

export const Route = createFileRoute("/subjects/math")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL_ },
      { property: "og:image", content: OG },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG },
    ],
    links: [{ rel: "canonical", href: URL_ }],
  }),
  component: MathSubjectPage,
});

function MathSubjectPage() {
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
        <MathBooks />
        <VideoLibrary />
      </main>
      <Footer />
    </div>
  );
}
