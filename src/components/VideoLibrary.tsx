import { useMemo, useState } from "react";
import videosData from "@/data/videos.json";

/**
 * VideoLibrary — مكتبة فيديوهات المنهج
 * - يستخدم semantic tokens (bg-card, text-foreground, bg-primary...) عشان يورث ألوان موقعك تلقائي
 * - Route المقترح: /videos
 * - Data source: src/data/videos.json
 */

type Video = {
  channel_id: string;
  title: string;
  type: "video" | "playlist";
  youtube_id?: string;
  playlist_id?: string;
  url: string;
};

type Topic = {
  id: string;
  term: 1 | 2;
  order: number;
  title: string;
  subtitle?: string;
  recommended: string;
  recommendation_reason: string;
  videos: Video[];
};

type Channel = {
  id: string;
  name: string;
  url: string;
  language: string;
  style: string;
  badge?: string;
};

const data = videosData as { channels: Channel[]; topics: Topic[] };

function getEmbedUrl(v: Video) {
  if (v.type === "playlist" && v.playlist_id) {
    return `https://www.youtube.com/embed/videoseries?list=${v.playlist_id}`;
  }
  if (v.youtube_id) return `https://www.youtube.com/embed/${v.youtube_id}`;
  return v.url;
}

function getThumb(v: Video) {
  if (v.youtube_id) return `https://i.ytimg.com/vi/${v.youtube_id}/hqdefault.jpg`;
  return null;
}

export default function VideoLibrary() {
  const [term, setTerm] = useState<0 | 1 | 2>(0);
  const [topicId, setTopicId] = useState<string>("all");
  const [channelId, setChannelId] = useState<string>("all");
  const [playing, setPlaying] = useState<Video | null>(null);

  const channelsById = useMemo(
    () => Object.fromEntries(data.channels.map((c) => [c.id, c])),
    [],
  );

  const filteredTopics = useMemo(() => {
    return data.topics
      .filter((t) => (term === 0 ? true : t.term === term))
      .filter((t) => (topicId === "all" ? true : t.id === topicId))
      .map((t) => ({
        ...t,
        videos: t.videos.filter((v) =>
          channelId === "all" ? true : v.channel_id === channelId,
        ),
      }))
      .filter((t) => t.videos.length > 0);
  }, [term, topicId, channelId]);

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">مكتبة فيديوهات المنهج</h1>
          <p className="mt-3 text-muted-foreground">
            رياضة إعدادي هندسة · شرح دكاترة عرب · مع ترشيح الأنسب لكل جزئية
          </p>
        </header>

        {/* Filters */}
        <div className="mb-8 grid gap-4 rounded-2xl border bg-card p-4 shadow-sm md:grid-cols-3">
          {/* Term */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              الترم
            </label>
            <div className="flex gap-2">
              {[
                { v: 0, l: "الكل" },
                { v: 1, l: "ترم أول" },
                { v: 2, l: "ترم تاني" },
              ].map((o) => (
                <button
                  key={o.v}
                  onClick={() => setTerm(o.v as 0 | 1 | 2)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    term === o.v
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              الموضوع
            </label>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="all">كل المواضيع</option>
              {data.topics
                .filter((t) => (term === 0 ? true : t.term === term))
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
            </select>
          </div>

          {/* Channel */}
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">
              الدكتور / القناة
            </label>
            <select
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
            >
              <option value="all">كل الدكاترة</option>
              {data.channels.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Topics list */}
        <div className="space-y-10">
          {filteredTopics.map((topic) => (
            <section key={topic.id}>
              <div className="mb-4 flex items-baseline justify-between border-b pb-2">
                <div>
                  <h2 className="text-2xl font-bold">
                    <span className="text-primary">#{topic.order}</span> {topic.title}
                  </h2>
                  {topic.subtitle && (
                    <p className="mt-1 text-sm text-muted-foreground">{topic.subtitle}</p>
                  )}
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  ترم {topic.term === 1 ? "أول" : "تاني"}
                </span>
              </div>

              {/* Recommendation banner */}
              <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-lg">⭐</span>
                  <div>
                    <p className="text-sm">
                      <span className="font-semibold text-primary">الأنسب ليك: </span>
                      <span className="font-medium">
                        {channelsById[topic.recommended]?.name}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {topic.recommendation_reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Video cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topic.videos.map((v, i) => {
                  const ch = channelsById[v.channel_id];
                  const isRec = v.channel_id === topic.recommended;
                  const thumb = getThumb(v);
                  return (
                    <button
                      key={i}
                      onClick={() => setPlaying(v)}
                      className={`group overflow-hidden rounded-xl border bg-card text-right shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                        isRec ? "ring-2 ring-primary/40" : ""
                      }`}
                    >
                      {/* Thumb */}
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        {thumb ? (
                          <img
                            src={thumb}
                            alt={v.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl">
                            🎬
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors group-hover:bg-background/30">
                          <span className="rounded-full bg-primary p-3 text-primary-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                            ▶
                          </span>
                        </div>
                        {v.type === "playlist" && (
                          <span className="absolute bottom-2 left-2 rounded bg-background/80 px-2 py-0.5 text-xs font-medium">
                            📺 بلاي ليست
                          </span>
                        )}
                        {isRec && (
                          <span className="absolute top-2 right-2 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                            ⭐ الترشيح
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="line-clamp-2 text-sm font-semibold">{v.title}</h3>
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{ch?.name}</span>
                          {ch?.badge && (
                            <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">
                              {ch.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          {filteredTopics.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              مفيش فيديوهات بالفلاتر دي — جرّب تغيّر الاختيارات.
            </p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setPlaying(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-sm font-semibold">{playing.title}</h3>
              <button
                onClick={() => setPlaying(null)}
                className="rounded-full bg-secondary p-2 text-secondary-foreground hover:bg-secondary/80"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={getEmbedUrl(playing)}
                title={playing.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between p-4 text-sm">
              <span className="text-muted-foreground">
                {channelsById[playing.channel_id]?.name}
              </span>
              <a
                href={playing.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
              >
                فتح في يوتيوب ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
