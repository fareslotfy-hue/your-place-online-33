import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Crown, Sparkles, Copy, CheckCheck, Phone, 
  CreditCard, Wallet, ShieldCheck, Clock, BookOpen, 
  Video, FileText, MessageCircle, ArrowLeft, Star 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReceiptUpload } from "./receipt-upload";

const packages = [
  {
    id: "single",
    name: "باقة الترم الواحد",
    period: "ترم دراسي واحد",
    price: 300,
    currency: "ج.م",
    oldPrice: null,
    description: "اشتراك كامل لترم دراسي واحد يشمل جميع المواد والمحاضرات",
    icon: BookOpen,
    color: "from-emerald-500/20 to-teal-500/5",
    borderColor: "border-emerald-400/30",
    glowColor: "shadow-emerald-glow",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    buttonColor: "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white",
    badge: null,
    features: [
      "وصول كامل لجميع مواد الترم",
      "أكثر من 200 محاضرة مرئية HD",
      "ملخصات وملفات PDF قابلة للتحميل",
      "جداول محاضرات تفاعلية محدثة",
      "منتدى نقاش للطلاب",
      "تتبع تقدمك في كل مادة",
      "إشعارات فورية بالجديد",
      "دعم فني خلال الترم",
    ],
  },
  {
    id: "double",
    name: "باقة الترمين الكاملة",
    period: "الترم الأول + الترم الثاني",
    price: 500,
    currency: "ج.م",
    oldPrice: 600,
    description: "اشتراك كامل للسنة الدراسية باقة موفرة تشمل الترمين الأول والثاني",
    icon: Crown,
    color: "from-amber-500/20 to-orange-500/5",
    borderColor: "border-amber-400/40",
    glowColor: "shadow-glow",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    buttonColor: "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white",
    badge: "الأكثر طلباً",
    features: [
      "كل مزايا باقة الترم الواحد",
      "وصول لترمين دراسيين كاملين",
      "أكثر من 400 محاضرة مرئية HD",
      "توفير 100 ج.م مقارنة بالباقة المنفردة",
      "ملخصات امتحانات نهاية الترم",
      "نماذج امتحانات سابقة محلولة",
      "جلسات مراجعة نهائية مجانية",
      "أولوية في الدعم الفني",
      "شهادة إتمام إلكترونية",
    ],
  },
];

const paymentMethods = [
  {
    name: "إنستا باي",
    nameEn: "InstaPay",
    icon: Wallet,
    color: "from-purple-500/20 to-indigo-500/5",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-400/40",
  },
  {
    name: "فودافون كاش",
    nameEn: "Vodafone Cash",
    icon: CreditCard,
    color: "from-red-500/20 to-rose-500/5",
    iconColor: "text-red-400",
    borderColor: "hover:border-red-400/40",
  },
];

export function Pricing() {
  const [copied, setCopied] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<{ name: string; price: number } | null>(null);
  const phoneNumber = "01070205859";

  const copyNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openReceiptForm = (pkgName: string, pkgPrice: number) => {
    setSelectedPkg({ name: pkgName, price: pkgPrice });
    setReceiptOpen(true);
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      <div className="absolute inset-0 pattern-islamic opacity-40" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-body text-amber-400 mb-4">
            باقات الاشتراك
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">اختر باقتك</span>
            <br />
            <span className="text-gradient-gold">وابدأ التفوق</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            باقات مرنة تناسب احتياجاتك. اشترك في باقة الترم الواحد أو وفّر مع باقة الترمين الكاملة
            واحصل على وصول كامل لجميع الموارد التعليمية.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative glass-card rounded-3xl p-8 border-2 ${pkg.borderColor} ${pkg.glowColor} overflow-hidden group transition-all duration-300`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-b-xl bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    {pkg.badge}
                  </div>
                </div>
              )}

              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-50`} />
              
              {/* Decorative element */}
              <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-3xl group-hover:scale-150 transition-transform duration-700" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 mt-2">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} flex items-center justify-center border ${pkg.borderColor}`}>
                    <pkg.icon className={`w-8 h-8 ${pkg.accentColor}`} />
                  </div>
                  <Badge variant="outline" className={`${pkg.badgeColor} border`}>
                    <Clock className="w-3 h-3 ml-1" />
                    {pkg.period}
                  </Badge>
                </div>

                {/* Package name */}
                <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Price */}
                <div className="flex items-end gap-3 mb-1">
                  <span className={`font-display font-black text-5xl md:text-6xl ${pkg.accentColor}`}>
                    {pkg.price}
                  </span>
                  <span className="text-xl text-muted-foreground font-body mb-2">
                    {pkg.currency}
                  </span>
                  {pkg.oldPrice && (
                    <span className="text-lg text-muted-foreground/60 font-body mb-2 line-through">
                      {pkg.oldPrice} {pkg.currency}
                    </span>
                  )}
                </div>
                {pkg.oldPrice && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-body mb-6">
                    <Sparkles className="w-3 h-3" />
                    توفير {pkg.oldPrice - pkg.price} ج.م
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  size="lg"
                  className={`w-full h-14 text-base mb-6 ${pkg.buttonColor}`}
                  onClick={() => openReceiptForm(pkg.name, pkg.price)}
                >
                  اشترك الآن
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>

                {/* Features */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-sm font-body text-foreground/80 mb-4 font-semibold">
                    ماذا تشمل الباقة؟
                  </p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fi) => (
                      <motion.li
                        key={fi}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.05 }}
                        className="flex items-start gap-3 text-sm font-body text-muted-foreground"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center flex-shrink-0 mt-0.5 border ${pkg.borderColor}`}>
                          <Check className={`w-3 h-3 ${pkg.accentColor}`} />
                        </div>
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment methods section */}
        <motion.div
          id="payment"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-border/50 overflow-hidden relative">
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-body text-foreground/80">
                    طرق دفع آمنة وسهلة
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl md:text-4xl mb-3">
                  <span className="text-foreground">كيف</span>
                  <span className="text-gradient-gold"> تدفع؟</span>
                </h3>
                <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  اختر إحدى طرق الدفع التالية، قم بتحويل المبلغ على الرقم الموضح،
                  ثم أرسل إيصال التحويل عبر واتساب ليتم تفعيل اشتراكك خلال 24 ساعة.
                </p>
              </div>

              {/* Payment methods grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map((method, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative glass-card rounded-2xl p-6 border ${method.borderColor} bg-gradient-to-br ${method.color} transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl glass flex items-center justify-center flex-shrink-0">
                        <method.icon className={`w-7 h-7 ${method.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display font-bold text-lg text-foreground">
                          {method.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-body">
                          {method.nameEn}
                        </p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Phone number display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-emerald-950/40 via-background to-amber-950/20 rounded-2xl p-6 border border-amber-400/20"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/5 flex items-center justify-center border border-amber-400/30">
                      <Phone className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-body mb-1">
                        رقم الدفع (إنستا باي / فودافون كاش)
                      </p>
                      <p dir="ltr" className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-wider text-center sm:text-right">
                        {phoneNumber}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyNumber}
                    className="glass border-amber-400/30 text-foreground hover:bg-amber-400/10"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.span
                          key="copied"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCheck className="w-4 h-4 text-emerald-400" />
                          تم النسخ
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <Copy className="w-4 h-4" />
                          نسخ الرقم
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </div>
              </motion.div>

              {/* Steps */}
              <div className="grid sm:grid-cols-3 gap-4 mt-8">
                {[
                  { step: "1", title: "اختر الباقة", desc: "حدد الباقة المناسبة لك", icon: BookOpen },
                  { step: "2", title: "حوّل المبلغ", desc: "ادفع عبر إنستا باي أو فودافون كاش", icon: Wallet },
                  { step: "3", title: "أرسل الإيصال", desc: "أرسل إيصال التحويل لتفعيل الاشتراك", icon: MessageCircle },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/5 border border-amber-400/30 mb-3">
                      <step.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-400/30">
                      {step.step}
                    </div>
                    <h5 className="font-display font-bold text-sm text-foreground mb-1">
                      {step.title}
                    </h5>
                    <p className="text-xs text-muted-foreground font-body leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-8 p-4 rounded-xl bg-emerald-500/5 border border-emerald-400/20 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  <span className="text-emerald-400 font-semibold">ملاحظة:</span> يتم تفعيل اشتراكك خلال 24 ساعة من إرسال إيصال التحويل. 
                  للاستفسار أو الدعم، تواصل معنا عبر واتساب على نفس الرقم. جميع المعاملات آمنة ومشفرة بالكامل.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Receipt Upload Dialog */}
      <ReceiptUpload
        open={receiptOpen}
        onOpenChange={setReceiptOpen}
        selectedPackage={selectedPkg?.name}
        packagePrice={selectedPkg?.price}
      />
    </section>
  );
}
