import { motion } from "framer-motion";
import {
  Video,
  FileText,
  Calendar,
  Bell,
  MessageCircle,
  Trophy,
  Smartphone,
  Shield,
  Zap,
  BookOpen,
  Clock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Video,
    title: "محاضرات مرئية HD",
    description: "محاضرات مصورة بجودة عالية مع إمكانية التشغيل على جميع الأجهزة والتحكم في السرعة.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-400",
  },
  {
    icon: FileText,
    title: "ملخصات وملفات PDF",
    description: "ملخصات شاملة لكل مادة بصيغة PDF قابلة للتحميل، مرتبة ومنظمة لتسهيل المراجعة.",
    color: "from-amber-500/20 to-orange-500/5",
    iconColor: "text-amber-400",
  },
  {
    icon: Calendar,
    title: "جداول دراسية",
    description: "جداول محاضرات تفاعلية محدثة باستمرار مع تذكيرات تلقائية بالمواعيد المهمة.",
    color: "from-cyan-500/20 to-blue-500/5",
    iconColor: "text-cyan-400",
  },
  {
    icon: Bell,
    title: "إشعارات فورية",
    description: "تنبيهات فورية عند نشر محاضرات جديدة، امتحانات، أو إعلانات مهمة من الكلية.",
    color: "from-red-500/20 to-rose-500/5",
    iconColor: "text-red-400",
  },
  {
    icon: MessageCircle,
    title: "منتدى نقاش",
    description: "مساحة تفاعلية للطلاب لطرح الأسئلة وتبادل الخبرات مع الزملاء والأساتذة.",
    color: "from-purple-500/20 to-pink-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: Trophy,
    title: "تتبع التقدم",
    description: "نظام تتبع متطور لمراقبة تقدمك في كل مادة مع إحصائيات تفصيلية وتقارير دورية.",
    color: "from-yellow-500/20 to-amber-500/5",
    iconColor: "text-yellow-400",
  },
  {
    icon: Smartphone,
    title: "تطبيق موبايل",
    description: "تجربة استخدام مثالية على جميع الأجهزة مع تطبيق مخصص للهواتف الذكية.",
    color: "from-green-500/20 to-emerald-500/5",
    iconColor: "text-green-400",
  },
  {
    icon: Shield,
    title: "محتوى موثوق",
    description: "جميع المواد التعليمية مراجعة ومعتمدة من قبل نخبة من أساتذة كلية الهندسة.",
    color: "from-indigo-500/20 to-blue-500/5",
    iconColor: "text-indigo-400",
  },
  {
    icon: Zap,
    title: "وصول سريع",
    description: "منصة سريعة وفعالة مع تحميل فوري للمحتوى وتجربة استخدام سلسة دون تأخير.",
    color: "from-teal-500/20 to-cyan-500/5",
    iconColor: "text-teal-400",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-body text-emerald-400 mb-4">
            مميزات المنصة
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">لماذا</span>
            <span className="text-gradient-gold"> الإمام الأكبر؟</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            منصة تعليمية متكاملة مصممة بأحدث التقنيات لتوفير تجربة تعلم استثنائية لطلاب الفرقة
            الإعدادية بكلية الهندسة.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className="group relative glass-card rounded-2xl p-6 border border-border/50 hover:border-border transition-all duration-300 overflow-hidden"
            >
              {/* Hover background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative corner */}
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
