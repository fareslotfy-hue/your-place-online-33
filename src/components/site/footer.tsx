import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Mail, Phone, MapPin, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/lib/use-session";

export function Footer() {
  const { user } = useSession();
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* CTA Section */}
      <section id="login" className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-background to-amber-950/20" />
        <div className="absolute inset-0 pattern-islamic opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-body text-foreground/80">
                انضم إلى آلاف الطلاب
              </span>
            </div>
            
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="text-foreground">ابدأ رحلتك نحو</span>
              <br />
              <span className="text-gradient-gold">التفوق الهندسي</span>
            </h2>
            
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              سجل الآن في منصة الإمام الأكبر واحصل على وصول كامل لجميع المحاضرات، الملخصات،
              والموارد التعليمية للفرقة الإعدادية بكلية الهندسة.
            </p>

            {/* Email signup */}
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-6">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="glass-card h-12 text-foreground"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-emerald-glow h-12 px-6 w-full sm:w-auto"
              >
                ابدأ الآن
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground font-body">
              بالتسجيل، أنت توافق على شروط الاستخدام وسياسة الخصوصية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="relative border-t border-border/50">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <Logo size="lg" />
              <p className="text-sm text-muted-foreground font-body leading-relaxed mt-4 mb-6">
                منصة "الإمام الأكبر" التعليمية المتخصصة في تقديم المحتوى التعليمي
                لطلاب الفرقة الإعدادية بكلية الهندسة، نهدف لتقديم تعليم هندسي عالي الجودة.
              </p>
              {/* Social */}
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: "فيسبوك" },
                  { icon: Twitter, label: "تويتر" },
                  { icon: Youtube, label: "يوتيوب" },
                  { icon: Instagram, label: "انستجرام" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-amber-400 hover:border-amber-400/30 transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">روابط سريعة</h4>
              <ul className="space-y-3">
                {[
                  { label: "الرئيسية", href: "#home" },
                  { label: "المواد الدراسية", href: "#subjects" },
                  { label: "المحاضرات", href: "#lectures" },
                  { label: "عن المنصة", href: "#about" },
                  { label: "المميزات", href: "#features" },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-amber-400 font-body transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-amber-400/50 group-hover:w-2 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">الموارد</h4>
              <ul className="space-y-3">
                {[
                  "المكتبة الرقمية",
                  "جداول الامتحانات",
                  "الأسئلة الشائعة",
                  "دليل الطالب",
                  "مركز المساعدة",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-amber-400 font-body transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-emerald-400/50 group-hover:w-2 transition-all" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">تواصل معنا</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-body leading-relaxed">
                    القاهرة، جمهورية مصر العربية
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span dir="ltr" className="text-sm text-muted-foreground font-body">
                    01070205859
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground font-body">
                    info@al-imam.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="geometric-divider my-10" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-body text-center md:text-right">
              © 2025 منصة الإمام الأكبر التعليمية. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-amber-400 font-body transition-colors">
                سياسة الخصوصية
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-amber-400 font-body transition-colors">
                شروط الاستخدام
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
