import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileCheck,
  CheckCircle2,
  User,
  Phone,
  Mail,
  CreditCard,
  Loader2,
  Send,
  AlertCircle,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { createEnrollment } from "@/lib/app.functions";
import { useSession } from "@/lib/use-session";
import { SUBSCRIPTION_PACKAGES, type SubscriptionPackageId } from "@/lib/packages";

interface ReceiptUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageId?: SubscriptionPackageId;
}

export function ReceiptUpload({ open, onOpenChange, packageId }: ReceiptUploadProps) {
  const { user } = useSession();
  const submitEnrollment = useServerFn(createEnrollment);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", paymentMethod: "" });
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(selected.type)) {
      toast.error("صيغة الملف غير مدعومة", { description: "استخدم PNG أو JPG أو WebP أو PDF" });
      e.target.value = "";
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      toast.error("الملف كبير جداً", { description: "أقصى حجم للملف 5 ميجابايت" });
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.paymentMethod || !packageId) {
      toast.error("بيانات ناقصة", { description: "من فضلك أكمل كل البيانات المطلوبة" });
      return;
    }
    if (!file) {
      toast.error("إيصال الدفع مطلوب", { description: "من فضلك ارفع صورة إيصال التحويل" });
      return;
    }
    if (!user) {
      toast.error("تسجيل الدخول مطلوب", {
        description: "سجّل الدخول أولاً حتى نرفع الإيصال ونربطه بحسابك بأمان",
      });
      return;
    }
    setSubmitting(true);
    try {
      // 1) Upload receipt (requires signed-in user - RLS scoped by folder)
      const extensionByType: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/webp": "webp",
        "application/pdf": "pdf",
      };
      const ext = extensionByType[file.type];
      const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("receipts")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      // 2) Create enrollment record
      await submitEnrollment({
        data: {
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          package_id: packageId,
          payment_method: formData.paymentMethod as "instapay" | "vodafone",
          receipt_path: path,
        },
      });

      setSubmitted(true);
      toast.success("تم الإرسال بنجاح", { description: "سيتم تفعيل اشتراكك خلال 24 ساعة" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حصل خطأ غير متوقع";
      toast.error("فشل الإرسال", { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setFile(null);
      setFormData({ name: "", phone: "", email: "", paymentMethod: "" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-background border-border/50">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-center">
            {submitted ? "تم الاستلام" : "رفع إيصال الدفع"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-4"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                تم استلام طلبك بنجاح!
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
                تم حفظ بياناتك وإيصال الدفع. هيتم مراجعة طلبك وتفعيل اشتراكك خلال
                <span className="text-emerald-400 font-semibold"> 24 ساعة</span>.
              </p>
              <Button
                onClick={handleClose}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white"
              >
                تمام، شكراً
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {packageId && (
                <div className="glass-card rounded-xl p-4 border border-amber-400/20 bg-amber-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-body">الباقة المختارة</p>
                      <p className="font-display font-bold text-foreground">
                        {SUBSCRIPTION_PACKAGES[packageId].name}
                      </p>
                    </div>
                    {packageId && (
                      <div className="text-left">
                        <p className="text-xs text-muted-foreground font-body">السعر</p>
                        <p className="font-display font-bold text-amber-400">
                          {SUBSCRIPTION_PACKAGES[packageId].price} ج.م
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="rname" className="text-sm font-body">
                  الاسم بالكامل *
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rname"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اكتب اسمك بالكامل"
                    className="pr-10 bg-muted/30"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rphone" className="text-sm font-body">
                  رقم الهاتف *
                </Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rphone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    className="pr-10 bg-muted/30"
                    dir="ltr"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remail" className="text-sm font-body">
                  البريد الإلكتروني (اختياري)
                </Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="remail"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                    className="pr-10 bg-muted/30"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-body">طريقة الدفع *</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "instapay", label: "إنستا باي" },
                    { value: "vodafone", label: "فودافون كاش" },
                  ].map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: method.value })}
                      className={`px-3 py-2.5 rounded-lg text-sm font-body transition-all border ${formData.paymentMethod === method.value ? "bg-amber-500/20 text-amber-400 border-amber-400/40" : "bg-muted/30 text-muted-foreground border-border/50 hover:border-border"}`}
                    >
                      <CreditCard className="w-4 h-4 inline ml-1" />
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-body">صورة إيصال الدفع *</Label>
                <label
                  htmlFor="receipt"
                  className={`block cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${file ? "border-emerald-400/40 bg-emerald-500/5" : "border-border/50 bg-muted/20 hover:border-amber-400/40 hover:bg-amber-500/5"}`}
                >
                  <input
                    id="receipt"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileCheck className="w-8 h-8 text-emerald-400" />
                      <p className="text-sm text-foreground font-body">{file.name}</p>
                      <p className="text-xs text-muted-foreground font-body">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground font-body">
                        اضغط لرفع صورة الإيصال
                      </p>
                      <p className="text-xs text-muted-foreground/60 font-body">
                        PNG, JPG, PDF - أقصى حجم 5 ميجا
                      </p>
                    </div>
                  )}
                </label>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/5 border border-amber-400/20">
                <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {user
                    ? "سيتم رفع الإيصال بشكل آمن وربطه بحسابك، ثم يتم تفعيل اشتراكك خلال 24 ساعة."
                    : "لإرسال الطلب ورفع الإيصال، سجّل الدخول أولاً."}
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white h-12"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 ml-2" />
                    إرسال الطلب
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
