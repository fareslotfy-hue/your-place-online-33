import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  BarChart3, Users, Eye, TrendingUp, ShieldCheck, ArrowRight,
  Globe, FileText, Clock, Package, Loader2, Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getMyRoles, getAdminStats, claimFirstAdmin } from "@/lib/app.functions";
import { Logo } from "@/components/site/logo";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "لوحة الإدارة | الإمام الأكبر" },
      { name: "description", content: "لوحة تحكم الإدارة: إحصائيات الزوار والاشتراكات." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const rolesFn = useServerFn(getMyRoles);
  const statsFn = useServerFn(getAdminStats);
  const claimFn = useServerFn(claimFirstAdmin);
  const qc = useQueryClient();

  const rolesQ = useQuery({ queryKey: ["my-roles"], queryFn: () => rolesFn() });
  const isAdmin = !!rolesQ.data?.roles.includes("admin");

  const statsQ = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => statsFn(),
    enabled: isAdmin,
  });

  const claim = useMutation({
    mutationFn: () => claimFn(),
    onSuccess: (res) => {
      if (res.granted) {
        toast.success("تم منحك صلاحية الأدمن");
        qc.invalidateQueries({ queryKey: ["my-roles"] });
      } else {
        toast.error("فيه أدمن بالفعل — تواصل معاه");
      }
    },
    onError: (e) => toast.error("فشل الطلب", { description: e instanceof Error ? e.message : "" }),
  });

  if (rolesQ.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="max-w-md w-full glass-card rounded-2xl p-8 border border-border/50 text-center">
          <ShieldCheck className="w-14 h-14 mx-auto text-amber-400 mb-4" />
          <h1 className="font-display font-bold text-2xl text-foreground mb-2">
            صفحة الإدارة
          </h1>
          <p className="text-sm text-muted-foreground font-body mb-6">
            دي صفحة للمشرفين فقط. لو إنت أول مستخدم في الموقع، تقدر تطلب صلاحية الأدمن دلوقتي.
          </p>
          <Button
            onClick={() => claim.mutate()}
            disabled={claim.isPending}
            className="w-full bg-gradient-to-r from-amber-500 to-emerald-500 hover:opacity-90"
          >
            {claim.isPending ? <Loader2 className="w-4 h-4 animate-spin ml-2" /> : <ShieldCheck className="w-4 h-4 ml-2" />}
            اطلب صلاحية أدمن (أول مستخدم فقط)
          </Button>
          <Link to="/dashboard" className="block mt-4 text-xs text-muted-foreground hover:text-foreground">
            رجوع للوحة الطالب
          </Link>
        </div>
      </div>
    );
  }

  return <AdminView statsQ={statsQ} />;
}

function AdminView({ statsQ }: { statsQ: ReturnType<typeof useQuery<Awaited<ReturnType<typeof getAdminStats>>>> }) {
  const data = statsQ.data;
  const loading = statsQ.isLoading;

  const maxDaily = useMemo(
    () => Math.max(1, ...(data?.daily ?? []).map((d) => d.count)),
    [data],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-gradient-to-r from-emerald-950/30 via-background to-amber-950/20 sticky top-0 z-30 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Link to="/" className="hidden md:block"><Logo size="sm" /></Link>
            <div className="hidden md:block h-8 w-px bg-border/50" />
            <div>
              <h1 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                لوحة الإدارة
              </h1>
              <p className="text-xs text-muted-foreground font-body">تحليلات الزوار والاشتراكات</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard"><Button variant="ghost" size="sm"><ArrowRight className="w-4 h-4 ml-1" />لوحة الطالب</Button></Link>
            <Link to="/"><Button variant="ghost" size="sm"><Home className="w-4 h-4 ml-1" />الرئيسية</Button></Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {loading || !data ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Eye, label: "زيارات (30 يوم)", value: data.totals.views, color: "text-emerald-400", bg: "from-emerald-500/20 to-teal-500/5" },
                { icon: Clock, label: "زيارات آخر 24س", value: data.totals.viewsLast24h, color: "text-amber-400", bg: "from-amber-500/20 to-orange-500/5" },
                { icon: Users, label: "طلاب مسجلين", value: data.totals.totalUsers, color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/5" },
                { icon: TrendingUp, label: "زوار مميزين", value: data.totals.uniqueSignedInVisitors, color: "text-purple-400", bg: "from-purple-500/20 to-pink-500/5" },
                { icon: Package, label: "اشتراكات", value: data.totals.enrollments, color: "text-rose-400", bg: "from-rose-500/20 to-red-500/5" },
                { icon: FileText, label: "بانتظار المراجعة", value: data.totals.pendingEnrollments, color: "text-yellow-400", bg: "from-yellow-500/20 to-amber-500/5" },
              ].map((s, i) => (
                <div key={i} className={`glass-card rounded-2xl p-4 border border-border/50 bg-gradient-to-br ${s.bg}`}>
                  <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                  <div className="font-display font-bold text-2xl text-foreground">{s.value.toLocaleString("ar-EG")}</div>
                  <div className="text-xs text-muted-foreground font-body">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Daily chart */}
            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" /> الزيارات اليومية (آخر 30 يوم)
              </h2>
              {data.daily.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">لا توجد بيانات بعد</p>
              ) : (
                <div className="flex items-end gap-1 h-48" dir="ltr">
                  {data.daily.map((d) => (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition">
                        {d.count}
                      </div>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-amber-400 hover:opacity-80 transition min-h-[2px]"
                        style={{ height: `${(d.count / maxDaily) * 100}%` }}
                        title={`${d.date}: ${d.count}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top paths */}
              <div className="glass-card rounded-2xl p-6 border border-border/50">
                <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" /> أكثر الصفحات زيارة
                </h2>
                {data.topPaths.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">لا توجد بيانات</p>
                ) : (
                  <div className="space-y-2">
                    {data.topPaths.map((p) => (
                      <div key={p.path} className="flex items-center justify-between gap-2 p-2 rounded bg-muted/30">
                        <span className="text-sm font-body text-foreground truncate" dir="ltr">{p.path}</span>
                        <Badge variant="secondary">{p.count}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Top referrers */}
              <div className="glass-card rounded-2xl p-6 border border-border/50">
                <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400" /> مصادر الزيارات
                </h2>
                {data.topReferrers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">لا توجد بيانات</p>
                ) : (
                  <div className="space-y-2">
                    {data.topReferrers.map((r) => (
                      <div key={r.source} className="flex items-center justify-between gap-2 p-2 rounded bg-muted/30">
                        <span className="text-sm font-body text-foreground truncate" dir="ltr">{r.source}</span>
                        <Badge variant="secondary">{r.count}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Recent enrollments */}
            <div className="glass-card rounded-2xl p-6 border border-border/50">
              <h2 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-rose-400" /> آخر الاشتراكات
              </h2>
              {data.recentEnrollments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">لا توجد اشتراكات بعد</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-right text-xs text-muted-foreground border-b border-border/50">
                        <th className="p-2">الاسم</th>
                        <th className="p-2">الهاتف</th>
                        <th className="p-2">الباقة</th>
                        <th className="p-2">السعر</th>
                        <th className="p-2">الدفع</th>
                        <th className="p-2">الحالة</th>
                        <th className="p-2">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentEnrollments.map((e) => (
                        <tr key={e.id} className="border-b border-border/30 hover:bg-muted/20">
                          <td className="p-2 text-foreground">{e.full_name}</td>
                          <td className="p-2 text-muted-foreground" dir="ltr">{e.phone}</td>
                          <td className="p-2 text-foreground">{e.package_name}</td>
                          <td className="p-2 text-emerald-400 font-semibold">{e.package_price} ج</td>
                          <td className="p-2 text-muted-foreground">{e.payment_method}</td>
                          <td className="p-2">
                            <Badge
                              className={
                                e.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                  : e.status === "approved"
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                  : "bg-muted"
                              }
                            >
                              {e.status === "pending" ? "قيد المراجعة" : e.status === "approved" ? "مقبول" : e.status}
                            </Badge>
                          </td>
                          <td className="p-2 text-xs text-muted-foreground">
                            {new Date(e.created_at).toLocaleDateString("ar-EG")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
