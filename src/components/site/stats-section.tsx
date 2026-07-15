import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { BookOpen, Users, Video, Download } from "lucide-react";

const stats = [
  { icon: BookOpen, value: 12, suffix: "+", label: "مادة دراسية", color: "text-emerald-400" },
  { icon: Video, value: 500, suffix: "+", label: "محاضرة مرئية", color: "text-amber-400" },
  { icon: Users, value: 5000, suffix: "+", label: "طالب نشط", color: "text-emerald-400" },
  { icon: Download, value: 50, suffix: "K+", label: "تحميل", color: "text-amber-400" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="font-display font-black text-4xl md:text-5xl lg:text-6xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/30 via-background to-amber-950/20" />
      <div className="absolute inset-0 pattern-islamic opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl glass-card mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`} />
              </div>
              <div className={`mb-2 ${stat.color}`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
