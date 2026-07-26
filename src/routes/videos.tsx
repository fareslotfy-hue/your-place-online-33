import { createFileRoute } from "@tanstack/react-router";
import VideoLibrary from "@/components/VideoLibrary";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "مكتبة فيديوهات المنهج — منصة الإمام الأكبر" },
      { name: "description", content: "شرح كل جزئيات المنهج من أفضل الدكاترة العرب مع ترشيح الأنسب لكل موضوع." },
      { property: "og:title", content: "مكتبة فيديوهات المنهج — منصة الإمام الأكبر" },
      { property: "og:description", content: "11 موضوع × 6 قنوات موثوقة — ترم أول وترم تاني." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoLibrary,
});
