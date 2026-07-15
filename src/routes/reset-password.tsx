import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/site/logo";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "إعادة تعيين كلمة المرور | الإمام الأكبر" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase places recovery params in hash — presence of type=recovery means user landed from email
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      setReady(hash.includes("type=recovery") || hash.includes("access_token"));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("تم تحديث كلمة المرور بنجاح");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error("فشل تحديث كلمة المرور", { description: err instanceof Error ? err.message : "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background pattern-islamic">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6"><Logo size="lg" /></div>
        <div className="glass-card rounded-2xl p-6 border border-border/50">
          <h1 className="font-display font-bold text-2xl text-center flex items-center justify-center gap-2 mb-6">
            <KeyRound className="w-6 h-6 text-amber-400" />
            كلمة مرور جديدة
          </h1>
          {!ready ? (
            <p className="text-sm text-muted-foreground text-center font-body">
              افتح هذه الصفحة من خلال الرابط الموجود في رسالة إعادة تعيين كلمة المرور.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-body">كلمة المرور الجديدة</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pr-10 bg-muted/30" required minLength={6} />
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-500 text-white">
                {loading ? <><Loader2 className="w-4 h-4 ml-2 animate-spin" />جاري التحديث...</> : "تحديث كلمة المرور"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
