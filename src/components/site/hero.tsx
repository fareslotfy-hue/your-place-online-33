import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Play, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 pattern-islamic opacity-60" />
      <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <motion.div animate={{ x: [0, -80, 0], y: [0, 60, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-body text-foreground/80">منصة تعليمية متكاملة للفرقة الإعدادية - كلية الهندسة</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="font-display font-black text-5xl md:text-7xl lg:text-8xl mb-6 text-gradient-gold text-shadow-glow leading-tight">
            الإمام الأكبر
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-4">
            <h2 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-foreground mb-4">
              منصة الفرقة الإعدادية
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              رحلة تعليمية متكاملة تجمع بين الأصالة العلمية وحداثة الهندسة. محاضرات، ملخصات،
              وجداول دراسية مصممة خصيصاً لطلاب الفرقة الإعدادية بكلية الهندسة.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button size="lg" onClick={() => scrollToSection("#pricing")} className="group bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white px-8 h-14 text-base shadow-glow">
              <BookOpen className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              ابدأ رحلتك التعليمية
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("#about")} className="glass border-amber-400/30 text-foreground hover:bg-amber-400/10 px-8 h-14 text-base">
              <Play className="w-4 h-4 ml-2" />
              تعرف على المنصة
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mt-16">
            {[
              { icon: BookOpen, value: "+12", label: "مادة دراسية", color: "text-emerald-400" },
              { icon: Users, value: "+5000", label: "طالب نشط", color: "text-amber-400" },
              { icon: Award, value: "%98", label: "نسبة النجاح", color: "text-emerald-400" },
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="glass-card rounded-2xl p-4 md:p-6">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mx-auto mb-2`} />
                <div className="font-display font-bold text-2xl md:text-3xl text-foreground mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground font-body">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border-2 border-amber-400/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-amber-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
