import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { 
  Languages, BookOpen, PencilRuler, Compass, 
  Cpu, Code2, Dumbbell, Heart, Atom, FlaskConical,
  Factory, BookMarked, ArrowLeft, Clock, FileText, TrendingUp, Sigma
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TermType = "1" | "2" | "both" | "1-final-2" | "2-final-2";
type Difficulty = "easy" | "medium" | "hard";

const subjects = [
  {
    icon: Languages,
    name: "اللغة الإنجليزية",
    nameEn: "English",
    description: "مادة لغة إنجليزية تُدرس في الترم الأول فقط. مادة سهلة تساعد على فهم المصطلحات الهندسية وتطوير المهارات اللغوية.",
    lessons: 16,
    hours: 32,
    color: "from-indigo-500/20 to-blue-500/10",
    iconColor: "text-indigo-400",
    borderColor: "hover:border-indigo-400/40",
    code: "ENG101",
    term: "1" as TermType,
    difficulty: "easy" as Difficulty,
    connected: false,
  },
  {
    icon: Sigma,
    name: "الرياضيات",
    nameEn: "Engineering Mathematics",
    description: "الرياضة الهندسية تُدرس في الترمين الأول والثاني (غير متصلة). مادة أساسية تشمل التفاضل والتكامل والجبر والهندسة التحليلية.",
    lessons: 16,
    hours: 32,
    color: "from-indigo-500/20 to-blue-500/10",
    iconColor: "text-indigo-400",
    borderColor: "hover:border-indigo-400/40",
    code: "MTH101",
    term: "both" as TermType,
    difficulty: "hard" as Difficulty,
    connected: false,
  },
  {
    icon: BookOpen,
    name: "الفقه",
    nameEn: "Jurisprudence",
    description: "مادة الفقه تُدرس في الترم الأول فقط. مادة سهلة تتناول الأحكام الفقهية والعبادات في الإسلام.",
    lessons: 10,
    hours: 20,
    color: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-400",
    borderColor: "hover:border-emerald-400/40",
    code: "FIQ101",
    term: "1" as TermType,
    difficulty: "easy" as Difficulty,
    connected: false,
  },
  {
    icon: PencilRuler,
    name: "الرسم الهندسي",
    nameEn: "Engineering Drawing",
    description: "تُدرس في الترمين الأول والثاني مع امتحان فاينل في الترم الثاني. مادة سهلة لكنها محتاجة فهم ومجهود عملي مستمر.",
    lessons: 16,
    hours: 32,
    color: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-400/40",
    code: "DRW101",
    term: "1-final-2" as TermType,
    difficulty: "medium" as Difficulty,
    connected: false,
  },
  {
    icon: Compass,
    name: "الهندسة الوصفية",
    nameEn: "Descriptive Geometry",
    description: "تُدرس في الترمين الأول والثاني مع امتحان فاينل في الترم الثاني. مادة صعبة محتاجة مجهود كبير وتركيز عالي في فهم الإسقاطات والمساقط.",
    lessons: 20,
    hours: 40,
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-400/40",
    code: "DGM101",
    term: "1-final-2" as TermType,
    difficulty: "hard" as Difficulty,
    connected: false,
  },
  {
    icon: BookMarked,
    name: "التطور",
    nameEn: "Evolution",
    description: "تُدرس في الترم الثاني فقط مع امتحان فاينل في الترم الثاني. مادة سهلة لكنها محتاجة مجهود وحفظ.",
    lessons: 12,
    hours: 24,
    color: "from-cyan-500/20 to-blue-500/10",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-400/40",
    code: "EVO102",
    term: "2-final-2" as TermType,
    difficulty: "easy" as Difficulty,
    connected: false,
  },
  {
    icon: Cpu,
    name: "الحاسب",
    nameEn: "Computer Science",
    description: "تُدرس في الترم الثاني فقط. مادة سهلة تعرض أساسيات الحاسب الآلي وتطبيقاته في الهندسة.",
    lessons: 12,
    hours: 24,
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    borderColor: "hover:border-green-400/40",
    code: "CSC102",
    term: "2" as TermType,
    difficulty: "easy" as Difficulty,
    connected: false,
  },
  {
    icon: Dumbbell,
    name: "الرياضة",
    nameEn: "Physical Education",
    description: "تُدرس في الترمين الأول والثاني مع امتحان فاينل في كل ترم (غير متصلة). مادة محتاجة مجهود بدني ومشاركة منتظمة.",
    lessons: 14,
    hours: 28,
    color: "from-red-500/20 to-rose-500/10",
    iconColor: "text-red-400",
    borderColor: "hover:border-red-400/40",
    code: "PED101",
    term: "both" as TermType,
    difficulty: "medium" as Difficulty,
    connected: false,
  },
  {
    icon: Heart,
    name: "العقيدة",
    nameEn: "Creed",
    description: "تُدرس في الترم الثاني فقط مع امتحان فاينل في الترم الثاني. مادة سهلة تتناول أركان الإيمان والعقيدة الإسلامية.",
    lessons: 10,
    hours: 20,
    color: "from-teal-500/20 to-cyan-500/10",
    iconColor: "text-teal-400",
    borderColor: "hover:border-teal-400/40",
    code: "AQE102",
    term: "2-final-2" as TermType,
    difficulty: "easy" as Difficulty,
    connected: false,
  },
  {
    icon: Atom,
    name: "الفيزياء",
    nameEn: "Physics",
    description: "تُدرس في الترمين الأول والثاني مع امتحان فاينل في كل ترم (غير متصلة). مادة محتاجة مجهود وتركيز في الميكانيكا والكهرباء والمغناطيسية.",
    lessons: 22,
    hours: 44,
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-400/40",
    code: "PHY101",
    term: "both" as TermType,
    difficulty: "hard" as Difficulty,
    connected: false,
  },
  {
    icon: FlaskConical,
    name: "الكيمياء",
    nameEn: "Chemistry",
    description: "مادة متصلة تُدرس على مدار الترمين الأول والثاني مع امتحان فاينل في الترم الثاني. مادة محتاجة مجهود وفهم عميق للتفاعلات الكيميائية.",
    lessons: 24,
    hours: 48,
    color: "from-yellow-500/20 to-amber-500/10",
    iconColor: "text-yellow-400",
    borderColor: "hover:border-yellow-400/40",
    code: "CHM101",
    term: "1-final-2" as TermType,
    difficulty: "hard" as Difficulty,
    connected: true,
  },
  {
    icon: Factory,
    name: "هندسة الإنتاج",
    nameEn: "Production Engineering",
    description: "مادة متصلة تُدرس على مدار الترمين الأول والثاني مع امتحان فاينل في الترم الثاني. مادة محتاجة مجهود وفهم لعمليات التصنيع والإنتاج.",
    lessons: 20,
    hours: 40,
    color: "from-orange-500/20 to-red-500/10",
    iconColor: "text-orange-400",
    borderColor: "hover:border-orange-400/40",
    code: "PRD101",
    term: "1-final-2" as TermType,
    difficulty: "hard" as Difficulty,
    connected: true,
  },
  {
    icon: BookMarked,
    name: "القرآن الكريم",
    nameEn: "Holy Quran",
    description: "مادة القرآن الكريم تُدرس طوال السنة. مادة عظيمة الأجر تحتاج إلى تلاوة منتظمة وحفظ مستمر وتدبر لآيات الله.",
    lessons: 30,
    hours: 60,
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    borderColor: "hover:border-amber-400/40",
    code: "QUR101",
    term: "both" as TermType,
    difficulty: "medium" as Difficulty,
    connected: false,
  },
];

const termLabels: Record<TermType, { label: string; color: string }> = {
  "1": { label: "ترم أول", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  "2": { label: "ترم ثاني", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  "both": { label: "ترمين (غير متصلة)", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  "1-final-2": { label: "ترمين - فاينل ترم ثاني", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  "2-final-2": { label: "ترم ثاني - فاينل", color: "bg-teal-500/20 text-teal-400 border-teal-500/30" },
};

const difficultyLabels: Record<Difficulty, { label: string; color: string; emoji: string }> = {
  easy: { label: "سهلة", color: "bg-emerald-500/20 text-emerald-400", emoji: "🟢" },
  medium: { label: "متوسطة", color: "bg-amber-500/20 text-amber-400", emoji: "🟡" },
  hard: { label: "صعبة", color: "bg-red-500/20 text-red-400", emoji: "🔴" },
};

export function Subjects() {
  const navigate = useNavigate();
  return (
    <section id="subjects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pattern-islamic opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge variant="outline" className="mb-4 border-amber-400/30 text-amber-400 bg-amber-400/5">
            المواد الدراسية
          </Badge>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="text-gradient-gold">مواد</span>
            <span className="text-foreground"> الفرقة الإعدادية</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            جميع مواد الفرقة الإعدادية موزعة على الترمين الأول والثاني، مع توضيح صعوبة كل مادة
            ومتى تُدرس ومتى يكون امتحانها النهائي.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <span className="text-xs text-muted-foreground font-body">دليل الصعوبة:</span>
          {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
            <div key={diff} className={`px-3 py-1 rounded-full text-xs font-body border ${difficultyLabels[diff].color} border-border/50`}>
              {difficultyLabels[diff].emoji} {difficultyLabels[diff].label}
            </div>
          ))}
        </motion.div>

        {/* Subjects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, i) => (
            <motion.div
              key={subject.code}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => {
                if (subject.code === "ENG101") {
                  navigate({ to: "/subjects/english" });
                } else if (subject.code === "FIQ101") {
                  navigate({ to: "/subjects/fiqh" });
                } else if (subject.code === "MTH101") {
                  navigate({ to: "/subjects/math" });
                }
              }}
              className={`group relative glass-card rounded-2xl p-6 border ${subject.borderColor} cursor-pointer transition-all duration-300`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon + Code + Connected badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center ${subject.borderColor} border`}>
                    <subject.icon className={`w-7 h-7 ${subject.iconColor}`} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-muted-foreground px-2 py-1 rounded-md bg-muted/50">
                      {subject.code}
                    </span>
                    {subject.connected && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        متصلة
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-foreground mb-1">
                  {subject.name}
                </h3>
                <p className="text-xs text-muted-foreground font-body mb-3">
                  {subject.nameEn}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4 line-clamp-3">
                  {subject.description}
                </p>

                {/* Badges: Term + Difficulty */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="outline" className={`text-[10px] ${termLabels[subject.term].color} border`}>
                    {termLabels[subject.term].label}
                  </Badge>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${difficultyLabels[subject.difficulty].color}`}>
                    {difficultyLabels[subject.difficulty].emoji} {difficultyLabels[subject.difficulty].label}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{subject.lessons} درس</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{subject.hours} ساعة</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-sm font-body text-foreground/70 group-hover:text-foreground transition-colors">
                    ابدأ التعلم
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted/50 group-hover:bg-amber-500/20 transition-all`}>
                    <ArrowLeft className={`w-4 h-4 ${subject.iconColor} group-hover:-translate-x-1 transition-transform`} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-2xl p-6 border border-amber-400/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-2">ملاحظة هامة حول المواد المتصلة</h4>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  مواد <span className="text-amber-400 font-semibold">الكيمياء</span> و<span className="text-amber-400 font-semibold">هندسة الإنتاج</span> مواد متصلة، 
                  يعني بتدرسها على مدار الترمين وتمتحن فيها امتحان واحد في آخر السنة (الترم الثاني). 
                  احرص على المذاكرة المستمرة فيها من بداية الترم الأول عشان ماتتراكمش عليك.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
