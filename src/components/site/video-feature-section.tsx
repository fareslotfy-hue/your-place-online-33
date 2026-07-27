import { motion } from "framer-motion";

export function VideoFeatureSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-body text-emerald-400 mb-4">
            تعرّف على المنصة
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">شاهد</span>
            <span className="text-gradient-gold"> الإمام الأكبر</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            جولة سريعة داخل المنصة توضح لك كيف تستفيد من كل المحتوى والأدوات المتاحة لطلاب الفرقة الإعدادية.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-black/20">
            <iframe
              src="https://www.youtube.com/embed/3z2kxCAZcHI?rel=0"
              title="فيديو تعريفي بمنصة الإمام الأكبر"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full bg-black"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
