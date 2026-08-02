import { useEffect, useState, useCallback } from "react";
import { Bell, Check, CheckCheck, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/use-session";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  link: string | null;
  read: boolean;
  created_at: string;
};

function timeAgo(iso: string) {
  const d = (Date.now() - new Date(iso).getTime()) / 1000;
  if (d < 60) return "الآن";
  if (d < 3600) return `منذ ${Math.floor(d / 60)} د`;
  if (d < 86400) return `منذ ${Math.floor(d / 3600)} س`;
  return `منذ ${Math.floor(d / 86400)} ي`;
}

export function NotificationsBell() {
  const { user } = useSession();
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const load = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) setItems(data as Notification[]);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    load();
    const ch = supabase
      .channel(`notif-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const n = payload.new as Notification;
          setItems((prev) => [n, ...prev].slice(0, 20));
          toast.success(n.title, { description: n.message });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, load]);

  if (!user) return null;

  const unread = items.filter((n) => !n.read).length;

  const markAllRead = async () => {
    await supabase.from("notifications").update({ read: true }).eq("read", false);
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const remove = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  };

  const onClick = async (n: Notification) => {
    if (!n.read) await markRead(n.id);
    if (n.link) {
      setOpen(false);
      navigate({ to: n.link });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 border border-border hover:bg-muted transition-colors"
        aria-label="الإشعارات"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              dir="rtl"
              className="absolute left-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-background shadow-2xl z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="font-display font-bold text-sm">الإشعارات</h3>
                <div className="flex items-center gap-1">
                  {unread > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-xs text-amber-500 hover:text-amber-400 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      علّم الكل
                    </button>
                  )}
                  <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                {items.length === 0 ? (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    مفيش إشعارات لسه
                  </div>
                ) : (
                  items.map((n) => (
                    <div
                      key={n.id}
                      className={`group relative px-4 py-3 border-b border-border/50 last:border-0 cursor-pointer transition-colors ${
                        n.read ? "bg-background" : "bg-amber-500/5"
                      } hover:bg-muted/50`}
                      onClick={() => onClick(n)}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                            n.type === "success"
                              ? "bg-emerald-500"
                              : n.type === "error"
                                ? "bg-red-500"
                                : "bg-amber-500"
                          } ${n.read ? "opacity-30" : ""}`}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-semibold text-sm text-foreground">
                            {n.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                            {n.message}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground/70">
                            {timeAgo(n.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!n.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markRead(n.id);
                              }}
                              className="p-1 rounded hover:bg-background text-muted-foreground hover:text-foreground"
                              aria-label="علّم كمقروء"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              remove(n.id);
                            }}
                            className="p-1 rounded hover:bg-background text-muted-foreground hover:text-red-500"
                            aria-label="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
