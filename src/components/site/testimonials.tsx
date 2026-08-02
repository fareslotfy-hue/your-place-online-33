import { motion } from "framer-motion";
import { Star, Quote, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "طالب فرقة إعدادية - دفعة 2024",
    rating: 5,
    text: "المنصة سهلت عليا المذاكرة جداً. المحاضرات مرتبة والملخصات بتوفر وقت كبير. كنت بتوه في الهندسة الوصفية، بس الفيديوهات وضحتلي مفاهيم كنت فاكرها صعبة. أنصح بيها كل طالب.",
    avatar: "أ",
    color: "from-emerald-500/20 to-teal-500/5",
    avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
  {
    name: "مريم عبدالله",
    role: "طالبة فرقة إعدادية - دفعة 2024",
    rating: 5,
    text: "أحسن حاجة في المنصة إنها بترتب المواد حسب الترم والصعوبة. عرفت أدي وقت لمين أكتر. الكيمياء وهندسة الإنتاج مواد متصلة، والمنصة فكرتني أذاكرهم على مدار الترمين. شكراً الإمام الأكبر!",
    avatar: "م",
    color: "from-amber-500/20 to-orange-500/5",
    avatarColor: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
  {
    name: "خالد إبراهيم",
    role: "طالب فرقة إعدادية - دفعة 2023",
    rating: 5,
    text: "نصائح الطالب المتفوق غيّرت طريقة مذاكرتي. بقيت بذاكر بذكاء مش بجهد بس. قاعدة 25-5 شغالة معايا جداً. جبت تقدير امتياز والحمد لله. المنصة جزء من نجاحي.",
    avatar: "خ",
    color: "from-purple-500/20 to-pink-500/5",
    avatarColor: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
  {
    name: "سارة أحمد",
    role: "طالبة فرقة إعدادية - دفعة 2024",
    rating: 5,
    text: "الأدعية والتوجيهات الدينية في المنصة بتدي طاقة إيجابية. بحس إن المذاكرة عبادة مش مجرد واجب. المحاضرات بجودة عالية والشرح مبسط. الباقة بـ 500 ج للترمين تستاهل جداً.",
    avatar: "س",
    color: "from-blue-500/20 to-cyan-500/5",
    avatarColor: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    name: "عمر حسن",
    role: "طالب فرقة إعدادية - دفعة 2023",
    rating: 5,
    text: "الفيزياء كانت كابوس بالنسبالي، بس المحاضرات هنا فهمتني الأساسيات. الدعم عبر واتساب سريع، بيردوا على أي سؤال. المنصة دي استثمار فعلاً في مستقبل الطالب.",
    avatar: "ع",
    color: "from-red-500/20 to-rose-500/5",
    avatarColor: "bg-gradient-to-br from-red-500 to-rose-500",
  },
  {
    name: "فاطمة الزهراء",
    role: "طالبة فرقة إعدادية - دفعة 2024",
    rating: 5,
    text: "ماكنتش متخيلة إن فيه منصة بكل ده للفرقة الإعدادية. كل حاجة منظمة، الجداول محدثة، والمحاضرات الجديدة بتوصلك إشعار. ولما رفعت إيصال الدفع، فعّلوا اشتراكي في نفس اليوم.",
    avatar: "ف",
    color: "from-teal-500/20 to-emerald-500/5",
    avatarColor: "bg-gradient-to-br from-teal-500 to-emerald-500",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-amber-400/30 text-amber-400 bg-amber-400/5"
          >
            آراء الطلبة
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">قالوا عن</span>
            <span className="text-gradient-gold"> الإمام الأكبر</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            تجارب حقيقية من طلاب الفرقة الإعدادية اللي استفادوا من المنصة وحققوا نتائج ممتازة.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`group glass-card rounded-2xl p-6 border border-border/50 bg-gradient-to-br ${t.color} relative overflow-hidden`}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 left-4 w-10 h-10 text-foreground/5 group-hover:text-foreground/10 transition-colors" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6 min-h-[100px]">
                  &quot;{t.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <div
                    className={`w-12 h-12 rounded-full ${t.avatarColor} flex items-center justify-center font-display font-bold text-white text-lg`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-foreground">{t.name}</h4>
                    <p className="text-xs text-muted-foreground font-body">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card border border-emerald-400/20">
            <GraduationCap className="w-6 h-6 text-emerald-400" />
            <p className="text-sm md:text-base font-body text-foreground">
              انضم لـ <span className="font-bold text-amber-400">+5000</span> طالب بيذاكروا بذكاء
              على منصة الإمام الأكبر
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
