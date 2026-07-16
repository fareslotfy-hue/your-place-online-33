import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { StatsSection } from "@/components/site/stats-section";
import { Subjects } from "@/components/site/subjects";
import { EnglishBooks } from "@/components/site/english-books";
import { Lectures } from "@/components/site/lectures";
import { About } from "@/components/site/about";
import { Features } from "@/components/site/features";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { News } from "@/components/site/news";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <Subjects />
        <EnglishBooks />
        <Lectures />
        <About />
        <Features />
        <Pricing />
        <Testimonials />
        <News />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
