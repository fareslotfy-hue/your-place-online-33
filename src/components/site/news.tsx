import { motion } from "framer-motion";
import { CalendarDays, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const news = [
  {
    id: 1,
    category: "إعلان هام",
    title: "بدء التسجيل في امتحانات منتصف الفصل الدراسي الأول",
    excerpt:
      "يعلن قطاع الكلية عن فتح باب التسجيل لامتحانات منتصف الفصل الدراسي الأول للفرقة الإعدادية اعتباراً من الأسبوع القادم. يرجى من جميع الطلاب مراجعة الجداول والتسجيل في الموعد المحدد.",
    date: "10 يوليو 2025",
    readTime: "3 دقائق",
    color: "from-red-500/20 to-rose-500/5",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  {
    id: 2,
    category: "محاضرات جديدة",
    title: "إضافة سلسلة محاضرات جديدة في مادة الرياضيات",
    excerpt:
      "تمت إضافة سلسلة جديدة من المحاضرات المرئية في مادة الرياضيات تغطي التفاضل والتكامل المتقدم، ويقدمها نخبة من أساتذة القسم. المحاضرات متاحة الآن في قسم المحاضرات.",
    date: "8 يوليو 2025",
    readTime: "2 دقائق",
    color: "from-emerald-500/20 to-teal-500/5",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    id: 3,
    category: "نشاط طلابي",
    title: "انطلاق فعاليات الأسبوع الهندسي السنوي",
    excerpt:
      "تنطلق فعاليات الأسبوع الهندسي السنوي، ويشمل معارض طلابية، ومسابقات تقنية، وندوات علمية. ندعو جميع الطلاب للمشاركة والحضور.",
    date: "5 يوليو 2025",
    readTime: "4 دقائق",
    color: "from-amber-500/20 to-orange-500/5",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
];

export function News() {
  return (
    <section id="news" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full glass text-sm font-body text-amber-400 mb-4">
              الأخبار والإعلانات
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              <span className="text-foreground">آخر</span>
              <span className="text-gradient-gold"> المستجدات</span>
            </h2>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
              تابع آخر الأخبار والإعلانات الخاصة بالكلية والفرقة الإعدادية.
            </p>
          </div>
        </motion.div>

        {/* News grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300"
            >
              {/* Image placeholder with gradient */}
              <div
                className={`relative aspect-[16/10] bg-gradient-to-br ${item.color} overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.5) 51%, transparent 52%),
                      linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.5) 49%, rgba(255,255,255,0.5) 51%, transparent 52%)
                    `,
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className={`${item.badgeColor} border`}>
                    <Tag className="w-3 h-3 ml-1" />
                    {item.category}
                  </Badge>
                </div>
                {/* Date badge */}
                <div className="absolute bottom-4 right-4 glass px-3 py-1.5 rounded-lg text-xs font-body text-foreground flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {item.date}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
                <div className="pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground font-body">
                    {item.readTime} للقراءة
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
