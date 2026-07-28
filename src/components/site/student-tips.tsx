import { motion } from "framer-motion";
import { 
  Trophy, Lightbulb, TrendingUp, AlertTriangle, 
  CheckCircle2, Star, BookOpen, Target, Clock, 
  Flame, Award, Brain, Zap, PlayCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tips = [
  {
    icon: Target,
    title: "ابدأ بالأصعب عندما يكون عقلك في قمة نشاطه",
    description: "مواد زي الهندسة الوصفية والفيزياء والكيمياء محتاجة تركيز عالي. خليها أول النهار لما يكون عقلك فريش. الصباح هو الوقت الذهبي للمواد الصعبة.",
    color: "text-red-400",
    bg: "from-red-500/20 to-rose-500/5",
  },
  {
    icon: Clock,
    title: "قاعدة 25-5 للمذاكرة الفعالة",
    description: "ذاكر 25 دقيقة بتركيز كامل، ثم خد راحة 5 دقائق. كل 4 جلسات خد راحة 15-20 دقيقة. ده بيخلي عقلك يستوعب أكتر بدون ما يجيلك إرهاق.",
    color: "text-amber-400",
    bg: "from-amber-500/20 to-orange-500/5",
  },
  {
    icon: BookOpen,
    title: "المواد المتصلة محتاجة استمرارية",
    description: "الكيمياء وهندسة الإنتاج مواد متصلة على الترمين. ماتسيبش محاضراتها تتراكم. ذاكر كل أسبوع اللي خدته عشان ماتلاقيش نفسك قبل الفاينل محتاج تذاكر سنة كاملة.",
    color: "text-emerald-400",
    bg: "from-emerald-500/20 to-teal-500/5",
  },
  {
    icon: Brain,
    title: "الفهم قبل الحفظ",
    description: "في مواد زي الفيزياء والهندسة الوصفية، الفهم هو الأساس. لو فهمت الفكرة الأساسية، هتقدر تحل أي مسألة. الحفظalone مش كافي وبيهرب بسرعة.",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-pink-500/5",
  },
  {
    icon: Flame,
    title: "حل تمارين كتير قبل الامتحان",
    description: "المواد الهندسية مش بس مذاكرة نظرية. حل تمارين متنوعة من مصادر مختلفة. كل ما تحل أكثر، كل ما تكتشف أنماط جديدة وتزيد سرعتك في الامتحان.",
    color: "text-orange-400",
    bg: "from-orange-500/20 to-red-500/5",
  },
  {
    icon: Zap,
    title: "المراجعة الدورية سر النجاح",
    description: "بعد كل محاضرة، راجعها في نفس اليوم. بعد أسبوع، راجعها تاني. قبل الامتحان هتلاقي إنك حافظها وفاهمها. المراجعة بتثبت المعلومة في الذاكرة طويلة المدى.",
    color: "text-blue-400",
    bg: "from-blue-500/20 to-cyan-500/5",
  },
];

const subjectPriority = [
  {
    name: "الهندسة الوصفية",
    priority: "صعبة جداً",
    hoursPerWeek: "8-10 ساعات",
    advice: "دي أصعب مادة في الفرقة الإعدادية. ماتسيبش أي محاضرة بدون ما تفهمها كويس. ارسم كتير على ورق مسطر وتمرن على الإسقاطات. لو حسيت إنك ضعت، اسأل فوراً.",
    color: "text-red-400",
    icon: AlertTriangle,
  },
  {
    name: "الفيزياء",
    priority: "محتاجة مجهود",
    hoursPerWeek: "6-8 ساعات",
    advice: "الفهم أهم من الحفظ. ركز على الميكانيكا والكهرباء. حل مسائل كتير وافهم القوانين بدل ما تحفظها. اعتبرها استثمار للمواد القادمة.",
    color: "text-amber-400",
    icon: TrendingUp,
  },
  {
    name: "الكيمياء",
    priority: "متصلة - محتاجة مجهود",
    hoursPerWeek: "6-8 ساعات",
    advice: "مادة متصلة على الترمين، يبقى ماتسيبش حاجة تتراكم. ذاكر كل أسبوع. ركز على التفاعلات والمعادلات. اعمل ملخص خاص بيك للمفاهيم الأساسية.",
    color: "text-amber-400",
    icon: TrendingUp,
  },
  {
    name: "هندسة الإنتاج",
    priority: "متصلة - محتاجة مجهود",
    hoursPerWeek: "5-7 ساعات",
    advice: "مادة متصلة زي الكيمياء. افهم عمليات التصنيع والإنتاج. اربط بين المفاهيم النظرية والتطبيقات العملية. اعمل مخططات لكل عملية.",
    color: "text-amber-400",
    icon: TrendingUp,
  },
  {
    name: "الرسم الهندسي",
    priority: "محتاجة فهم ومجهود",
    hoursPerWeek: "4-6 ساعات",
    advice: "مادة عملية محتاجة تمرين مستمر. ارسم كتير. تعلم الأدوات والرموز الهندسية. التزم بالمعايير القياسية. الفاينل في الترم التاني فمتقطعش.",
    color: "text-blue-400",
    icon: BookOpen,
  },
  {
    name: "القرآن الكريم",
    priority: "مهم جداً",
    hoursPerWeek: "3-4 ساعات",
    advice: "خليك على ورد يومي ولو نصف صفحة. التكرار هو سر الحفظ. اربط الحفظ بالتلاوة في الصلوات. ده أحسن استثمار لوقتك وأعظم أجر.",
    color: "text-emerald-400",
    icon: Star,
  },
  {
    name: "مواد سهلة (إنجليزي، فقه، حاسب، عقيدة، تطور)",
    priority: "لا تستهن بها",
    hoursPerWeek: "2-3 ساعات لكل مادة",
    advice: "مواد سهلة بس متستهنش بيها. دي درجات مضمونة. ذاكرها في الأوقات اللي عقل بيكون فيها أقل تركيز. خد عليها فل مارك.",
    color: "text-emerald-400",
    icon: CheckCircle2,
  },
];

export function StudentTips() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4 border-amber-400/30 text-amber-400 bg-amber-400/5">
          <Trophy className="w-3 h-3 ml-1" />
          من طالب متفوق
        </Badge>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
          <span className="text-foreground">نصائح الطالب</span>
          <span className="text-gradient-gold"> المتفوق</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          نصائح عملية وخطة تعليمية من طالب حصل على تقدير امتياذ وكان الأول على الدفعة.
          اتبعها وستحقق تفوقاً بإذن الله.
        </p>
      </div>

      {/* Achievement card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-emerald-500/10"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
            <Award className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground mb-1">
              رسالة من طالب الأول على الدفعة
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              &quot;السر مش في المذاكرة لساعات طويلة، لكن في المذاكرة الذكية. ركز في المواد الصعبة،
              ماتسيبش حاجة تتراكم، وحل تمارين كتير. وفايدك ربنا بقراءة القرآن والدعاء.
              التوفيق من ربنا قبل أي حاجة.&quot;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Featured Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl overflow-hidden border border-emerald-400/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5"
      >
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-foreground">
                فيديو حصري: نصائح للنجاح
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                شاهد فيديو مفيد من طالب متفوق يشاركك تجربته وأسرار النجاح
              </p>
            </div>
          </div>
        </div>
        
        {/* YouTube Video Embed */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src="https://www.youtube.com/embed/rCx_Om1kZfk?rel=0"
            title="نصائح للنجاح - فيديو حصري"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
        
        <div className="p-4 pt-3">
          <p className="text-xs text-muted-foreground font-body text-center">
            💡 شاهد الفيديو كامل واستفد من النصائح العملية للتفوق في الفرقة الإعدادية
          </p>
        </div>
      </motion.div>

      {/* Tips grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-2xl p-5 border border-border/50 bg-gradient-to-br ${tip.bg}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center flex-shrink-0">
                <tip.icon className={`w-5 h-5 ${tip.color}`} />
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground mb-1 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  {tip.title}
                </h4>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Study plan */}
      <div className="mt-10">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-3 border-emerald-400/30 text-emerald-400 bg-emerald-400/5">
            <Target className="w-3 h-3 ml-1" />
            خطة تعليمية
          </Badge>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            خطة المذاكرة حسب أولوية المواد
          </h3>
        </div>

        <div className="space-y-3">
          {subjectPriority.map((subject, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 border border-border/50 hover:border-border transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0`}>
                  <subject.icon className={`w-5 h-5 ${subject.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h4 className="font-display font-bold text-foreground">{subject.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${subject.color.includes("red") ? "border-red-500/30 text-red-400" : subject.color.includes("amber") ? "border-amber-500/30 text-amber-400" : "border-emerald-500/30 text-emerald-400"}`}>
                        {subject.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-body flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {subject.hoursPerWeek}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {subject.advice}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 text-center"
      >
        <Star className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl text-foreground mb-2">
          تذكر دائماً
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
          التفوق مش هدف، دي رحلة. كل يوم بتتعلم فيه حاجة جديدة، أنت بتقرب من هدفك.
          &quot;وَقُل رَّبِّ زِدْنِي عِلْمًا&quot; - خليك متواضع، واسأل ربنا التوفيق، واعمل بجهد.
          النجاح هيجي بإذن الله. 💚
        </p>
      </motion.div>
    </div>
  );
}
