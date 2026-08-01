import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { MechanicsBooks } from "@/components/site/mechanics-books";

const URL_ = "https://your-place-online-33.lovable.app/subjects/mechanics";
const TITLE = "الميكانيكا — كتب الإمام الأكبر";
const DESC = "تسع مراجع لمادة الميكانيكا (الاستاتيكا + الديناميكا) للفرقة الإعدادية هندسة الأزهر.";

export const Route = createFileRoute("/subjects/mechanics")({
  component: MechanicsSubjectPage,
});

function MechanicsSubjectPage() {
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
        <MechanicsBooks />
      </main>
      <Footer />
    </div>
  );
}
