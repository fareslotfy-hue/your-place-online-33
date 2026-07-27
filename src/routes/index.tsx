import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { StatsSection } from "@/components/site/stats-section";
import { Subjects } from "@/components/site/subjects";

import { Lectures } from "@/components/site/lectures";
import { About } from "@/components/site/about";
import { VideoFeatureSection } from "@/components/site/video-feature-section";
import { Pricing } from "@/components/site/pricing";
import { Testimonials } from "@/components/site/testimonials";
import { News } from "@/components/site/news";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import ogImage from "@/assets/og-image.jpg.asset.json";

const SITE_URL = "https://your-place-online-33.lovable.app";
const OG_IMAGE = `${SITE_URL}${ogImage.url}`;
const TITLE = "الإمام الأكبر | منصة الفرقة الإعدادية - كلية الهندسة الأزهر";
const DESC = "منصة تعليمية متكاملة لطلاب الفرقة الإعدادية بكلية الهندسة جامعة الأزهر: محاضرات، كتب، شروحات، ملخصات، وامتحانات السنين السابقة بحلولها.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "الإمام الأكبر, هندسة الأزهر, الفرقة الإعدادية, ملخصات, امتحانات, محاضرات, اللغة الإنجليزية, الفقه" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "منصة الإمام الأكبر",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.svg`,
          image: OG_IMAGE,
          description: DESC,
          inLanguage: "ar",
        }),
      },
    ],
  }),
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
        <Lectures />
        <About />
        <VideoFeatureSection />
        <Pricing />
        <Testimonials />
        <News />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
