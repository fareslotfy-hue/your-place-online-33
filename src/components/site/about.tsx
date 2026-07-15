import { motion } from "framer-motion";
import { Target, Eye, Award, BookMarked, Users, GraduationCap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "رسالتنا",
    description: "تقديم تعليم هندسي عالي الجودة يجمع بين الأصالة العلمية والابتكار التقني، وإعداد طلاب متميزين قادرين على مواكبة التطورات العلمية الحديثة في مجالات الهندسة المختلفة.",
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-teal-500/5",
  },
  {
    icon: Eye,
    title: "رؤيتنا",
    description: "أن نكون المنصة التعليمية الرائدة في المنطقة العربية للتعليم الهندسي، ومرجعاً موثوقاً لطلاب الفرقة الإعدادية بكلية الهندسة.",
    color: "text-amber-400",
    bg: "from-amber-500/20 to-orange-500/5",
  },
];

const highlights = [
  { icon: GraduationCap, value: "+25", label: "سنة خبرة", color: "text-emerald-400" },
  { icon: BookMarked, value: "+500", label: "محاضرة", color: "text-amber-400" },
  { icon: Users, value: "+5000", label: "طالب", color: "text-emerald-400" },
  { icon: Award, value: "%98", label: "نسبة نجاح", color: "text-amber-400" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-islamic opacity-40" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-body text-amber-400 mb-6">
              عن المنصة
            </motion.span>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              <span className="text-foreground">إرث علمي</span>
              <br />
              <span className="text-gradient-gold">يلتقي بالابتكار</span>
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">
              منصة "الإمام الأكبر" التعليمية هي منصة متخصصة في تقديم المحتوى التعليمي
              لطلاب الفرقة الإعدادية بكلية الهندسة، تهدف إلى تطوير تجربة التعلم من خلال دمج
              التراث العلمي العريق مع أحدث الأساليب التعليمية والتقنيات الرقمية الحديثة.
            </p>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8">
              نؤمن بأن التعليم الهندسي يجب أن يكون متاحاً للجميع، وأن يجمع بين الأصالة
              والمعاصرة، لذا نوفر محتوى تعليمياً شاملاً ومتنوعاً يلبي احتياجات الطلاب
              في عصر التحول الرقمي ويساعدهم على التفوق والتميز الأكاديمي.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
                  <div className="font-display font-bold text-xl text-foreground">
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Values cards */}
          <div className="space-y-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                className={`relative glass-card rounded-2xl p-8 bg-gradient-to-br ${value.bg} border-border/50 hover:border-border transition-all duration-300 overflow-hidden group`}
              >
                {/* Decorative element */}
                <div className="absolute -left-4 -top-4 w-24 h-24 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl glass flex items-center justify-center">
                      <value.icon className={`w-7 h-7 ${value.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-2xl text-foreground">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
