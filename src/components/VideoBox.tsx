import { useState } from "react";
import videosData from "@/data/videos.json";

/**
 * VideoBox — بوكس "شاهد الفيديو" داخل صفحات الدروس
 *
 * الاستخدام:
 *   <VideoBox topicId="differentiation" />
 *
 * بيقرأ من videos.json ويعرض ترشيح الدكتور الأنسب + بقية الاختيارات
 */

type Video = {
  channel_id: string;
  title: string;
  type: "video" | "playlist";
  youtube_id?: string;
  playlist_id?: string;
  thumb_id?: string;
  url: string;
};

type Topic = {
  id: string;
  title: string;
  recommended: string;
  recommendation_reason: string;
  videos: Video[];
};

type Channel = { id: string; name: string; badge?: string };

const data = videosData as { channels: Channel[]; topics: Topic[] };

function getEmbedUrl(v: Video) {
  if (v.type === "playlist" && v.playlist_id) {
    return `https://www.youtube.com/embed/videoseries?list=${v.playlist_id}`;
  }
  if (v.youtube_id) return `https://www.youtube.com/embed/${v.youtube_id}`;
  return v.url;
}

function getThumb(v: Video) {
  const thumbId = v.youtube_id || v.thumb_id;
  if (thumbId) return `/video-thumbnails/${thumbId}.jpg`;
  return null;
}

export default function VideoBox({ topicId }: { topicId: string }) {
  const [open, setOpen] = useState<Video | null>(null);
  const topic = data.topics.find((t) => t.id === topicId);
  if (!topic) return null;

  const channelsById = Object.fromEntries(data.channels.map((c) => [c.id, c]));
  const rec = topic.videos.find((v) => v.channel_id === topic.recommended);
  const others = topic.videos.filter((v) => v !== rec);

  return (
    <div
      dir="rtl"
      className="my-6 overflow-hidden rounded-2xl border-2 border-primary/30 bg-card shadow-sm"
    >
      <div className="border-b bg-primary/5 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎥</span>
          <h4 className="font-semibold text-foreground">شاهد الفيديو — {topic.title}</h4>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Recommended */}
        {rec && (
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                ⭐ الترشيح
              </span>
              <span className="text-xs text-muted-foreground">{topic.recommendation_reason}</span>
            </div>
            <button
              onClick={() => setOpen(rec)}
              className="group relative aspect-video w-full overflow-hidden rounded-xl border text-right shadow-sm"
            >
              {getThumb(rec) ? (
                <img
                  src={getThumb(rec) ?? undefined}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
              <span className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                ▶
              </span>
              <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                <p className="line-clamp-2 text-sm font-semibold drop-shadow">{rec.title}</p>
                <p className="mt-1 text-xs text-white/80">{channelsById[rec.channel_id]?.name}</p>
              </div>
            </button>
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">اختيارات تانية:</p>
            <div className="grid gap-2">
              {others.map((v, i) => (
                <button
                  key={i}
                  onClick={() => setOpen(v)}
                  className="group relative aspect-video overflow-hidden rounded-lg border text-right text-sm shadow-sm"
                >
                  {getThumb(v) ? (
                    <img
                      src={getThumb(v) ?? undefined}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                    ▶
                  </span>
                  <div className="absolute bottom-0 right-0 left-0 p-3 text-white">
                    <p className="line-clamp-2 font-medium drop-shadow">{v.title}</p>
                    <p className="mt-1 text-xs text-white/80">{channelsById[v.channel_id]?.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-sm font-semibold">{open.title}</h3>
              <button
                onClick={() => setOpen(null)}
                className="rounded-full bg-secondary p-2 hover:bg-secondary/80"
                aria-label="إغلاق"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={getEmbedUrl(open)}
                title={open.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
