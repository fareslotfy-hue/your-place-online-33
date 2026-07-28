import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, FileText, Download, Clock, Eye, Search, Filter, BookOpen, ClipboardCheck, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// بيانات حقيقية ومحدثة لكل نوع
const allContent = [
  // محاضرات مرئية
  {
    id: 1,
    title: "التفاضل وقواعد الاشتقاق - الجزء الأول",
    subject: "الرياضيات",
    type: "محاضرة مرئية",
    category: "محاضرات مرئية",
    duration: "45 دقيقة",
    date: "15 يوليو 2025",
    views: 1240,
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    badge: "جديد",
    description: "شرح مفصل لقواعد الاشتقاق الأساسية والتطبيقات"
  },
  {
    id: 2,
    title: "حركة المقذوفات وتطبيقاتها الهندسية",
    subject: "الفيزياء",
    type: "محاضرة مرئية",
    category: "محاضرات مرئية",
    duration: "38 دقيقة",
    date: "14 يوليو 2025",
    views: 980,
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
    badge: "مميز",
    description: "تطبيقات عملية على حركة المقذوفات في الهندسة"
  },
  {
    id: 3,
    title: "الإسقاطات الهندسية - المساقط الأساسية",
    subject: "الهندسة الوصفية",
    type: "محاضرة مرئية",
    category: "محاضرات مرئية",
    duration: "52 دقيقة",
    date: "13 يوليو 2025",
    views: 720,
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    badge: null,
    description: "شرح المساقط الأفقية والرأسية والجانبية"
  },
  {
    id: 4,
    title: "تحليل القوى في الأنظمة الساكنة",
    subject: "الميكانيكا",
    type: "محاضرة مرئية",
    category: "محاضرات مرئية",
    duration: "41 دقيقة",
    date: "12 يوليو 2025",
    views: 890,
    color: "from-red-500/20 to-rose-500/10",
    iconColor: "text-red-400",
    badge: null,
    description: "تحليل القوى وعزومها في التوازن الساكن"
  },
  
  // ملخصات دروس
  {
    id: 5,
    title: "ملخص شامل للتفاضل والتكامل",
    subject: "الرياضيات",
    type: "ملخص",
    category: "ملخصات",
    duration: "18 صفحة",
    date: "15 يوليو 2025",
    views: 2150,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    badge: "الأكثر تحميلاً",
    description: "ملخص كامل يشمل جميع قوانين التفاضل والتكامل مع أمثلة محلولة"
  },
  {
    id: 6,
    title: "ملخص القوانين الفيزيائية الأساسية",
    subject: "الفيزياء",
    type: "ملخص",
    category: "ملخصات",
    duration: "12 صفحة",
    date: "14 يوليو 2025",
    views: 1680,
    color: "from-blue-500/20 to-indigo-500/10",
    iconColor: "text-blue-400",
    badge: "جديد",
    description: "جميع القوانين والمعادلات الأساسية في الفيزياء"
  },
  {
    id: 7,
    title: "خريطة ذهنية للتفاعلات الكيميائية",
    subject: "الكيمياء",
    type: "ملخص",
    category: "ملخصات",
    duration: "8 صفحات",
    date: "13 يوليو 2025",
    views: 1340,
    color: "from-green-500/20 to-teal-500/10",
    iconColor: "text-green-400",
    badge: null,
    description: "خريطة ذهانية تفاعلية لأنواع التفاعلات الكيميائية"
  },
  {
    id: 8,
    title: "ملخص قواعد اللغة الإنجليزية",
    subject: "الإنجليزي",
    type: "ملخص",
    category: "ملخصات",
    duration: "22 صفحة",
    date: "12 يوليو 2025",
    views: 1890,
    color: "from-pink-500/20 to-rose-500/10",
    iconColor: "text-pink-400",
    badge: "مميز",
    description: "قواعد النحو والصرف مع أمثلة وتمارين"
  },

  // ملفات PDF
  {
    id: 9,
    title: "كتاب الشروحات الرياضيات - الترم الأول",
    subject: "الرياضيات",
    type: "ملف PDF",
    category: "ملفات PDF",
    duration: "145 صفحة",
    date: "15 يوليو 2025",
    views: 3200,
    color: "from-emerald-600/20 to-green-500/10",
    iconColor: "text-emerald-500",
    badge: "حصري",
    description: "شروحات مفصلة لجميع دروس الرياضيات مع حل أمثلة"
  },
  {
    id: 10,
    title: "كتاب التدريبات الإنجليزية",
    subject: "الإنجليزي",
    type: "ملف PDF",
    category: "ملفات PDF",
    duration: "98 صفحة",
    date: "14 يوليو 2025",
    views: 2450,
    color: "from-indigo-500/20 to-purple-500/10",
    iconColor: "text-indigo-400",
    badge: null,
    description: "تدريبات شاملة على جميع أجزاء المنهج"
  },
  {
    id: 11,
    title: "كتاب الفقه - الملخص المتكامل",
    subject: "الفقه",
    type: "ملف PDF",
    category: "ملفات PDF",
    duration: "200 صفحة",
    date: "13 يوليو 2025",
    views: 2800,
    color: "from-amber-600/20 to-yellow-500/10",
    iconColor: "text-amber-500",
    badge: "جديد",
    description: "ملخص فقهي شامل لأبواب العبادات والمعاملات"
  },

  // امتحانات
  {
    id: 12,
    title: "امتحان الرياضيات - نموذج 2025",
    subject: "الرياضيات",
    type: "امتحان",
    category: "امتحانات",
    duration: "8 أسئلة",
    date: "15 يوليو 2025",
    views: 4500,
    color: "from-red-500/20 to-orange-500/10",
    iconColor: "text-red-400",
    badge: "أحدث",
    description: "نموذج امتحان كامل مع الحل النموذجي"
  },
  {
    id: 13,
    title: "بنك امتحانات الإنجليزي (5 سنوات)",
    subject: "الإنجليزي",
    type: "امتحان",
    category: "امتحانات",
    duration: "25 امتحان",
    date: "14 يوليو 2025",
    views: 3800,
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    badge: "شامل",
    description: "جميع امتحانات السنوات الخمس الماضية مع الحلول"
  },
  {
    id: 14,
    title: "امتحان الفقه - نموذج تنبؤي",
    subject: "الفقه",
    type: "امتحان",
    category: "امتحانات",
    duration: "10 أسئلة",
    date: "13 يوليو 2025",
    views: 2900,
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    badge: null,
    description: "نموذج تنبؤي بناءً على اتجاهات السنوات السابقة"
  },
  {
    id: 15,
    title: "اختبارات سريعة - جميع المواد",
    subject: "شامل",
    type: "امتحان",
    category: "امتحانات",
    duration: "50 اختبار",
    date: "12 يوليو 2025",
    views: 5200,
    color: "from-purple-500/20 to-violet-500/10",
    iconColor: "text-purple-400",
    badge: "الأكثر طلباً",
    description: "اختبارات سريعة لمراجعة سريعة قبل الامتحان"
  }
];

const filters = [
  { id: "all", label: "الكل", icon: null },
  { id: "ملخصات", label: "ملخصات دروس", icon: BookOpen },
  { id: "ملفات PDF", label: "ملفات PDF", icon: FileText },
  { id: "امتحانات", label: "امتحانات", icon: ClipboardCheck },
  { id: "محاضرات مرئية", label: "استعراض", icon: PlayCircle },
];

export function Lectures() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  
  // عدد العناصر المعروضة في البداية
  const INITIAL_DISPLAY_COUNT = 4;

  // تصفية المحتوى بناءً على الفلتر والبحث
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // تطبيق فلتر النوع
    if (activeFilter !== "all") {
      filtered = filtered.filter(item => item.category === activeFilter);
    }

    // تطبيق البحث
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.subject.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    // ترتيب حسب التاريخ (الأحدث أولاً)
    return [...filtered].sort((a, b) => {
      // بسيط: نرتب حسب الـ ID مؤقتاً (الأكبر = أحدث)
      return b.id - a.id;
    });
  }, [activeFilter, searchQuery]);

  // إحصائيات لكل فئة
  const getCount = (categoryId: string) => {
    if (categoryId === "all") return allContent.length;
    return allContent.filter(item => item.category === categoryId).length;
  };

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
            القابلة للتحميل، محدثة يومياً بواسطة نخبة من الأساتذة.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-center gap-4 mb-10 max-w-5xl mx-auto"
        >
          {/* Search Input */}
          <div className="relative flex-1 w-full order-2 lg:order-1">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن محاضرة، ملخص، أو مادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-12 glass-card border-border/50 text-foreground"
            />
          </div>
          
          {/* Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 order-1 lg:order-2">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setShowAll(false); // إعادة تعيين عند تغيير الفلتر
                }}
                className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-all relative ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-emerald-glow"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  {filter.icon && <filter.icon className="w-4 h-4" />}
                  {filter.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeFilter === filter.id 
                      ? "bg-white/20" 
                      : "bg-muted"
                  }`}>
                    {getCount(filter.id)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center"
        >
          <p className="text-sm text-muted-foreground font-body">
            عرض <span className="text-foreground font-semibold">{filteredContent.length}</span> عنصر
            {activeFilter !== "all" && (
              <span> في <span className="text-emerald-400">{filters.find(f => f.id === activeFilter)?.label}</span></span>
            )}
            {searchQuery && (
              <span> مطابق لـ "<span className="text-amber-400">{searchQuery}</span>"</span>
            )}
          </p>
        </motion.div>

        {/* Content Grid */}
        <AnimatePresence mode="wait">
          {filteredContent.length > 0 ? (
            <motion.div
              key={activeFilter + searchQuery + (showAll ? 'all' : 'limited')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {(showAll ? filteredContent : filteredContent.slice(0, INITIAL_DISPLAY_COUNT)).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-border transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className={`relative aspect-video bg-gradient-to-br ${item.color} flex items-center justify-center overflow-hidden`}>
                    {/* Pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />
                    
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10"
                    >
                      {item.category === "محاضرات مرئية" ? (
                        <PlayCircle className={`w-16 h-16 ${item.iconColor} drop-shadow-lg`} />
                      ) : item.category === "امتحانات" ? (
                        <ClipboardCheck className={`w-16 h-16 ${item.iconColor} drop-shadow-lg`} />
                      ) : item.category === "ملخصات" ? (
                        <BookOpen className={`w-16 h-16 ${item.iconColor} drop-shadow-lg`} />
                      ) : (
                        <FileText className={`w-16 h-16 ${item.iconColor} drop-shadow-lg`} />
                      )}
                    </motion.div>

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-gradient-to-r from-amber-500 to-amber-400 text-amber-950 border-0 text-xs">
                          {item.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Duration/Size */}
                    <div className="absolute bottom-3 left-3 glass px-2 py-1 rounded-md text-xs text-foreground font-body">
                      {item.duration}
                    </div>

                    {/* Category indicator */}
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="text-[10px] backdrop-blur-sm bg-background/50">
                        {item.type}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.subject}
                      </Badge>
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-gradient-gold transition-all">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 font-body">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {item.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {item.date}
                        </span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 group-hover:bg-muted/50">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <GraduationCap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-muted-foreground font-body">
                {searchQuery 
                  ? "جرب تغيير كلمات البحث أو اختر فلتر آخر"
                  : "لا توجد عناصر في هذه الفئة حالياً"
                }
              </p>
              {(activeFilter !== "all" || searchQuery) && (
                <Button 
                  variant="outline" 
                  className="mt-4 glass"
                  onClick={() => {
                    setActiveFilter("all");
                    setSearchQuery("");
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all / Show less button - يظهر فقط لو فيه أكتر من 4 عناصر */}
        {filteredContent.length > INITIAL_DISPLAY_COUNT && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="glass border-amber-400/30 text-foreground hover:bg-amber-400/10 px-8 transition-all duration-300 hover:scale-105"
            >
              {showAll ? (
                <>
                  <span>عرض أقل</span>
                  <span className="mr-2 text-xs opacity-70">({INITIAL_DISPLAY_COUNT} من {filteredContent.length})</span>
                </>
              ) : (
                <>
                  <span>عرض كل المحاضرات</span>
                  <span className="mr-2 text-xs opacity-70">({filteredContent.length})</span>
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
