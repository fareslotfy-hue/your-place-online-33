import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, GraduationCap, Loader2, UserPlus, LogIn, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Logo } from "@/components/site/logo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | الإمام الأكبر" },
      { name: "description", content: "سجّل الدخول أو أنشئ حساباً جديداً في منصة الإمام الأكبر التعليمية." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        toast.success("أهلاً بعودتك!");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: formData.name, phone: formData.phone },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء حسابك بنجاح!", { description: "برجاء تفعيل حسابك من رسالة البريد إن طُلب ذلك." });
        // If email confirmations are off, session is set — go dashboard
        const { data } = await supabase.auth.getSession();
        if (data.session) navigate({ to: "/dashboard" });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حصل خطأ غير متوقع";
      toast.error("فشل العملية", { description: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("فشل تسجيل الدخول بـ Google", { description: result.error.message });
        return;
      }
      if (result.redirected) return;
      const { data } = await supabase.auth.getSession();
      if (data.session) navigate({ to: "/dashboard" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حصل خطأ غير متوقع";
      toast.error("فشل تسجيل الدخول بـ Google", { description: msg });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-background">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 pattern-islamic opacity-40" />
      <motion.div animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>

        <div className="glass-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-glow">
          <h1 className="font-display font-bold text-2xl text-center flex items-center justify-center gap-2 mb-6">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            {mode === "login" ? "تسجيل الدخول" : "حساب جديد"}
          </h1>

          <div className="flex gap-2 p-1 rounded-xl bg-muted/30 mb-4">
            <button type="button" onClick={() => setMode("login")} className={`flex-1 py-2 rounded-lg text-sm font-body transition-all flex items-center justify-center gap-2 ${mode === "login" ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow" : "text-muted-foreground"}`}>
              <LogIn className="w-4 h-4" />
              دخول
            </button>
            <button type="button" onClick={() => setMode("register")} className={`flex-1 py-2 rounded-lg text-sm font-body transition-all flex items-center justify-center gap-2 ${mode === "register" ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow" : "text-muted-foreground"}`}>
              <UserPlus className="w-4 h-4" />
              تسجيل
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-body">الاسم بالكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="اكتب اسمك بالكامل" className="pr-10 bg-muted/30" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-body">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="01xxxxxxxxx" className="pr-10 bg-muted/30" dir="ltr" />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-body">البريد الإلكتروني</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="example@email.com" className="pr-10 bg-muted/30" dir="ltr" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-body">كلمة المرور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" className="pr-10 pl-10 bg-muted/30" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className={`w-full h-12 text-white ${mode === "login" ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400" : "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400"}`}>
              {loading ? (<><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري المعالجة...</>) : mode === "login" ? (<><LogIn className="w-4 h-4 ml-2" />تسجيل الدخول</>) : (<><UserPlus className="w-4 h-4 ml-2" />إنشاء الحساب</>)}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border/50" />
            <span className="text-xs text-muted-foreground font-body">أو</span>
            <div className="h-px flex-1 bg-border/50" />
          </div>

          <Button type="button" variant="outline" onClick={handleGoogle} className="w-full glass border-border/50 h-11">
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            المتابعة بحساب Google
          </Button>

          <p className="text-xs text-center text-muted-foreground font-body mt-4">
            {mode === "login" ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button type="button" onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-amber-400 hover:underline">
              {mode === "login" ? "سجل الآن" : "سجل دخول"}
            </button>
          </p>
        </div>

        <Link to="/" className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground font-body w-full justify-center">
          <ArrowRight className="w-4 h-4" />
          الرجوع للرئيسية
        </Link>
      </motion.div>
    </div>
  );
}
