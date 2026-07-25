import { useRef, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Clock, TrendingUp, Trophy,
  PlayCircle, CheckCircle2, LogOut, User, Award, Flame,
  Target, Zap, Home, Camera, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getMyProfile, getMyProgress, updateMyAvatar } from "@/lib/app.functions";
import { StudentTips } from "@/components/site/student-tips";
import { DuasSection } from "@/components/site/duas-section";
import { Logo } from "@/components/site/logo";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | الإمام الأكبر" },
      { name: "description", content: "لوحة تحكم الطالب: تقدمك الدراسي، نصائح المتفوق، وأدعية المذاكرة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

type Tab = "overview" | "subjects" | "tips" | "duas" | "profile";

function DashboardPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const profileFn = useServerFn(getMyProfile);
  const progressFn = useServerFn(getMyProgress);

  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: () => profileFn() });
  const progressQuery = useQuery({ queryKey: ["progress"], queryFn: () => progressFn() });

  const profile = profileQuery.data;
  const progress = progressQuery.data?.progress ?? [];
  const history = progressQuery.data?.history ?? [];

  const totalLectures = progress.reduce((s, p) => s + p.total_lectures, 0);
  const watchedLectures = progress.reduce((s, p) => s + p.watched_lectures, 0);
  const overallProgress = totalLectures > 0 ? Math.round((watchedLectures / totalLectures) * 100) : 0;
  const completedSubjects = progress.filter((p) => p.watched_lectures === p.total_lectures && p.total_lectures > 0).length;
  const watchHours = Math.floor((watchedLectures * 45) / 60); // rough estimate 45min/lecture

  const displayName = profile?.full_name || "طالب";
  const avatarUrl = profile?.avatar_signed_url ?? null;

  const updateAvatarFn = useServerFn(updateMyAvatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("اختر صورة صالحة");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      toast.error("الصورة كبيرة", { description: "أقصى حجم 3 ميجابايت" });
      return;
    }
    const { data: userRes } = await supabase.auth.getUser();
    const uid = userRes.user?.id;
    if (!uid) {
      toast.error("سجّل الدخول أولاً");
      return;
    }
    setUploadingAvatar(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${uid}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      await updateAvatarFn({ data: { avatar_path: path } });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("تم تحديث الصورة الشخصية");
    } catch (err) {
      toast.error("فشل رفع الصورة", { description: err instanceof Error ? err.message : "حاول تاني" });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate({ to: "/auth", replace: true });
  };

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "نظرة عامة", icon: LayoutDashboard },
    { id: "subjects", label: "موادي", icon: BookOpen },
    { id: "tips", label: "نصائح المتفوق", icon: Trophy },
    { id: "duas", label: "أدعية المذاكرة", icon: Target },
    { id: "profile", label: "حسابي", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-shrink-0 border-b border-border/50 bg-gradient-to-r from-emerald-950/30 via-background to-amber-950/20 sticky top-0 z-30 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <Link to="/" className="hidden md:block"><Logo size="sm" /></Link>
              <div className="hidden md:block h-8 w-px bg-border/50" />
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">لوحة تحكم الطالب</h1>
                <p className="text-xs text-muted-foreground font-body">أهلاً، {displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/admin"><Button variant="ghost" size="sm" className="text-amber-400 hover:text-amber-300"><ShieldCheck className="w-4 h-4 ml-1" />الإدارة</Button></Link>
              <Link to="/"><Button variant="ghost" size="sm"><Home className="w-4 h-4 ml-1" />الرئيسية</Button></Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-red-400">
                <LogOut className="w-4 h-4 ml-1" />خروج
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[220px_1fr] gap-6">
            <aside className="lg:sticky lg:top-24 h-fit">
              <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-body transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-gradient-to-r from-amber-600/20 to-emerald-600/20 text-foreground border border-amber-400/30" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}`}>
                    <tab.icon className="w-4 h-4" />{tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="min-h-[60vh]">
              <AnimatePresence mode="wait">
                {activeTab === "overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 border border-amber-400/20 bg-gradient-to-br from-amber-500/5 to-emerald-500/5">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <h2 className="font-display font-bold text-2xl text-foreground mb-1">مرحباً، {displayName.split(" ")[0]}! 👋</h2>
                          <p className="text-sm text-muted-foreground font-body">استمر في التقدم، أنت على الطريق الصحيح للتفوق</p>
                        </div>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                          <Trophy className="w-3 h-3 ml-1" />طالب مميز
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { icon: TrendingUp, label: "نسبة التقدم", value: `${overallProgress}%`, color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/5" },
                        { icon: PlayCircle, label: "محاضرات مكتملة", value: `${watchedLectures}/${totalLectures}`, color: "text-amber-400", bg: "from-amber-500/20 to-orange-500/5" },
                        { icon: Clock, label: "ساعات المشاهدة", value: `${watchHours}h`, color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/5" },
                        { icon: Award, label: "مواد مكتملة", value: `${completedSubjects}/${progress.length}`, color: "text-purple-400", bg: "from-purple-500/20 to-pink-500/5" },
                      ].map((stat, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`glass-card rounded-2xl p-4 border border-border/50 bg-gradient-to-br ${stat.bg}`}>
                          <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                          <div className="font-display font-bold text-2xl text-foreground">{stat.value}</div>
                          <div className="text-xs text-muted-foreground font-body">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                          <Flame className="w-5 h-5 text-amber-400" />تقدمك العام
                        </h3>
                        <span className="text-2xl font-display font-bold text-gradient-gold">{overallProgress}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-3 bg-muted" />
                      <p className="text-xs text-muted-foreground font-body mt-2">
                        شفت {watchedLectures} محاضرة من أصل {totalLectures} محاضرة. كمل يابطل! 💪
                      </p>
                    </div>

                    <div className="glass-card rounded-2xl p-6 border border-border/50">
                      <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-400" />آخر النشاطات
                      </h3>
                      {history.length === 0 ? (
                        <p className="text-sm text-muted-foreground font-body text-center py-6">لسه مفيش نشاطات. ابدأ بالمذاكرة!</p>
                      ) : (
                        <div className="space-y-3">
                          {history.slice(0, 5).map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <PlayCircle className="w-4 h-4 text-emerald-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground font-body truncate">{item.lecture_title}</p>
                                <p className="text-xs text-muted-foreground font-body">{new Date(item.watched_at).toLocaleDateString("ar-EG")}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "subjects" && (
                  <motion.div key="subjects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
                    <h2 className="font-display font-bold text-2xl text-foreground mb-4">تقدمك في المواد</h2>
                    {progress.map((item, i) => {
                      const percent = item.total_lectures > 0 ? Math.round((item.watched_lectures / item.total_lectures) * 100) : 0;
                      const isComplete = percent === 100;
                      return (
                        <motion.div key={item.subject_code} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="glass-card rounded-2xl p-5 border border-border/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isComplete ? "bg-emerald-500/20" : "bg-amber-500/20"}`}>
                                {isComplete ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <BookOpen className="w-5 h-5 text-amber-400" />}
                              </div>
                              <div>
                                <h3 className="font-display font-bold text-foreground">{item.subject_name}</h3>
                                <p className="text-xs text-muted-foreground font-body">{item.watched_lectures} / {item.total_lectures} محاضرة</p>
                              </div>
                            </div>
                            <span className={`font-display font-bold text-lg ${isComplete ? "text-emerald-400" : "text-amber-400"}`}>{percent}%</span>
                          </div>
                          <Progress value={percent} className={`h-2 ${isComplete ? "bg-emerald-950/50" : "bg-muted"}`} />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === "tips" && (
                  <motion.div key="tips" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <StudentTips />
                  </motion.div>
                )}

                {activeTab === "duas" && (
                  <motion.div key="duas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                    <DuasSection />
                  </motion.div>
                )}

                {activeTab === "profile" && (
                  <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 border border-border/50">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative group">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingAvatar}
                            className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center ring-2 ring-amber-400/30 hover:ring-amber-400/60 transition-all"
                            aria-label="تغيير الصورة الشخصية"
                          >
                            {avatarUrl ? (
                              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-12 h-12 text-white" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              {uploadingAvatar ? (
                                <Loader2 className="w-6 h-6 text-white animate-spin" />
                              ) : (
                                <Camera className="w-6 h-6 text-white" />
                              )}
                            </div>
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </div>
                        <div>
                          <h2 className="font-display font-bold text-xl text-foreground">{displayName}</h2>
                          {profile?.phone && (
                            <p className="text-sm text-muted-foreground font-body" dir="ltr">{profile.phone}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingAvatar}
                            className="mt-2 text-xs text-amber-400 hover:text-amber-300 font-body inline-flex items-center gap-1"
                          >
                            <Camera className="w-3 h-3" />
                            {uploadingAvatar ? "جاري الرفع..." : avatarUrl ? "تغيير الصورة" : "أضف صورة شخصية"}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                        <div className="text-center p-4 rounded-xl bg-muted/30">
                          <Trophy className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                          <div className="font-display font-bold text-lg text-foreground">{completedSubjects}</div>
                          <div className="text-xs text-muted-foreground">مواد مكتملة</div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted/30">
                          <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                          <div className="font-display font-bold text-lg text-foreground">{watchHours}h</div>
                          <div className="text-xs text-muted-foreground">ساعات مذاكرة</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
