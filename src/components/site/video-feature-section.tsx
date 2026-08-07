import { motion } from "framer-motion";
import {
  PlayCircle,
  GraduationCap,
  Target,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const videoBenefits = [
  {
    icon: Target,
    title: "اختيار القسم المناسب",
    description:
      "تعرف على كيفية اختيار القسم الهندسي الذي يناسب قدراتك واهتماماتك من خلال توجيهات الخبراء",
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-teal-500/5",
  },
  {
    icon: Users,
    title: "نصائح من رؤساء الأقسام",
    description: "استمع لتوجيهات مباشرة من أساتذة ورؤساء أقسام هندسة الأزهر بكل التخصصات",
    color: "text-blue-400",
    bg: "from-blue-500/20 to-indigo-500/5",
  },
  {
    icon: Lightbulb,
    title: "فهم طبيعة كل قسم",
    description: "اعرف مميزات وتحديات كل قسم هندسي (مدني، ميكانيكا، كهرباء، إلخ) قبل اتخاذ قرارك",
    color: "text-amber-400",
    bg: "from-amber-500/20 to-orange-500/5",
  },
  {
    icon: BookOpen,
    title: "خطط للمستقبل",
    description: "تعرف على فرص العمل والدراسات العليا المتاحة لكل تخصص هندسي بعد التخرج",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-pink-500/5",
  },
];

const keyTakeaways = [
  "معايير اختيار القسم الهندسي المناسب",
  "نظرة شاملة على جميع الأقسام الهندسية",
  "نصائح عملية للنجاح في الفرقة الإعدادية",
  "فرص سوق العمل لكل تخصص",
  "كيف تستعد للقسم الذي اخترته",
];

export function VideoFeatureSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      <div className="absolute inset-0 pattern-islamic opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="outline" className="mb-4 border-blue-400/30 text-blue-400 bg-blue-400/5">
            <GraduationCap className="w-3 h-3 ml-1" />
            توجيهات أكاديمية
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">نصائح من</span>
            <span className="text-gradient-gold"> رؤساء الأقسام الهندسية</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">
            فيديو حصري يجمع نصائح وتوجيهات من{" "}
            <strong className="text-foreground">
              عميد ووكلاء كلية الهندسة جامعة الأزهر الشريف
            </strong>{" "}
            لطلاب الفرقة الإعدادية. دليلك الشامل لاختيار القسم الهندسي المناسب وفهم متطلبات كل تخصص.
          </p>
        </motion.div>

        {/* Main Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-blue-400/30 shadow-2xl shadow-black/20 glass-card">
            {/* Video overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none" />

            <iframe
              src="https://www.youtube.com/embed/pyBhUe-5jpE?rel=0"
              title="نصائح رؤساء الأقسام الهندسية - جامعة الأزهر"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full bg-black"
            />

            {/* Video badge */}
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-blue-600/90 text-white border-0 backdrop-blur-sm">
                <PlayCircle className="w-3 h-3 ml-1" />
                فيديو حصري
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* What you'll learn section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-12"
        >
          <div className="glass-card rounded-2xl p-8 border border-border/50 bg-gradient-to-br from-background to-muted/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-foreground">
                  ماذا ستستفيد من هذا الفيديو؟
                </h3>
                <p className="text-sm text-muted-foreground font-body">
                  ملخص لأهم النقاط التي ستتعلمها من توجيهات الأساتذة
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {keyTakeaways.map((takeaway, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-amber-400/40 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-body text-foreground">{takeaway}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {videoBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`glass-card rounded-xl p-5 border border-border/50 bg-gradient-to-br ${benefit.bg} hover:border-border transition-all group`}
            >
              <div
                className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <h4 className="font-display font-bold text-sm text-foreground mb-1">
                {benefit.title}
              </h4>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 max-w-3xl mx-auto"
        >
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            💡 <strong className="text-foreground">نصيحة:</strong> شاهد الفيديو كامل وخذ ملاحظات عن
            الأقسام التي تهمك. اسأل أساتذتك أو طلاب السنين الكبار عن تفاصيل أكثر قبل ما تأخذ قرارك
            النهائي. الاختيار الصح هيبئ مستقبلك الهندسي بالكامل! 🎓
          </p>
        </motion.div>
      </div>
    </section>
  );
}
