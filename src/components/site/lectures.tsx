import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, FileText, Download, Clock, Eye, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const lectures = [
  {
    id: 1,
    title: "التفاضل وقواعد الاشتقاق",
    subject: "الرياضيات",
    type: "محاضرة مرئية",
    duration: "45 دقيقة",
    date: "12 يوليو 2025",
    views: 1240,
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    badge: "جديد",
  },
  {
    id: 2,
    title: "حركة المقذوفات وتطبيقاتها",
    subject: "الفيزياء",
    type: "محاضرة مرئية",
    duration: "38 دقيقة",
    date: "10 يوليو 2025",
    views: 980,
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
    badge: "مميز",
  },
  {
    id: 3,
    title: "ملخص التفاعلات الكيميائية",
    subject: "الكيمياء",
    type: "ملف PDF",
    duration: "24 صفحة",
    date: "8 يوليو 2025",
    views: 2150,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    badge: "الأكثر تحميلاً",
  },
  {
    id: 4,
    title: "الإسقاطات الهندسية - المساقط",
    subject: "الهندسة الوصفية",
    type: "محاضرة مرئية",
    duration: "52 دقيقة",
    date: "5 يوليو 2025",
    views: 720,
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    badge: null,
  },
  {
    id: 5,
    title: "تحليل القوى في الأنظمة",
    subject: "الميكانيكا الهندسية",
    type: "محاضرة مرئية",
    duration: "41 دقيقة",
    date: "3 يوليو 2025",
    views: 890,
    color: "from-red-500/20 to-rose-500/10",
    iconColor: "text-red-400",
    badge: null,
  },
  {
    id: 6,
    title: "أساسيات لغة C++ - المصفوفات",
    subject: "البرمجة",
    type: "محاضرة مرئية",
    duration: "35 دقيقة",
    date: "1 يوليو 2025",
    views: 1560,
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    badge: "جديد",
  },
];

const filters = ["الكل", "محاضرات مرئية", "ملفات PDF", "ملخصات", "امتحانات"];

export function Lectures() {
  const [activeFilter, setActiveFilter] = useState("الكل");

  return (
    <section id="lectures" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="outline" className="mb-4 border-emerald-400/30 text-emerald-400 bg-emerald-400/5">
            المحاضرات والموارد
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-foreground">أحدث</span>
            <span className="text-gradient-emerald"> المحاضرات</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            مكتبة شاملة من المحاضرات المرئية، الملخصات، والملفات التعليمية
            القابلة للتحميل، محدثة أسبوعياً بواسطة نخبة من الأساتذة.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-4 mb-10 max-w-4xl mx-auto"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن محاضرة، ملخص، أو مادة..."
              className="pr-12 h-12 glass-card border-border/50 text-foreground"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-glow"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lectures grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture, i) => (
            <motion.div
              key={lecture.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className={`relative aspect-video bg-gradient-to-br ${lecture.color} flex items-center justify-center overflow-hidden`}>
                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "20px 20px",
                  }}
                />
                
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10"
                >
                  {lecture.type === "محاضرة مرئية" ? (
                    <PlayCircle className={`w-16 h-16 ${lecture.iconColor} drop-shadow-lg`} />
                  ) : (
                    <FileText className={`w-16 h-16 ${lecture.iconColor} drop-shadow-lg`} />
                  )}
                </motion.div>

                {/* Badge */}
                {lecture.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 border-0 text-xs">
                      {lecture.badge}
                    </Badge>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-3 left-3 glass px-2 py-1 rounded-md text-xs text-foreground font-body">
                  {lecture.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {lecture.subject}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{lecture.type}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-gradient-gold transition-all">
                  {lecture.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {lecture.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {lecture.date}
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 group-hover:bg-muted/50">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="glass border-amber-400/30 text-foreground hover:bg-amber-400/10 px-8"
          >
            عرض كل المحاضرات
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
