import { motion } from "framer-motion";
import { BookHeart, Moon, Sparkles, Hand } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const duas = [
  {
    text: "رَبِّ زِدْنِي عِلْمًا",
    translation: "اللهم زدني علماً وفهماً",
    source: "سورة طه - آية 114",
    occasion: "قبل المذاكرة",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-400",
  },
  {
    text: "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الحَزْنَ إِذَا شِئْتَ سَهْلاً",
    translation: "اللهم سهّل عليّ كل عسير، ويسّر لي كل صعب",
    source: "حديث شريف - رواه ابن حبان",
    occasion: "عند صعوبة المادة",
    color: "from-amber-500/20 to-orange-500/5",
    iconColor: "text-amber-400",
  },
  {
    text: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي",
    translation: "اللهم افتح لي أبواب الفهم واليسر",
    source: "سورة طه - الآيات 25-28",
    occasion: "قبل الامتحان",
    color: "from-purple-500/20 to-pink-500/5",
    iconColor: "text-purple-400",
  },
  {
    text: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي، وَعَلِّمْنِي مَا يَنْفَعُنِي، وَزِدْنِي عِلْمًا",
    translation: "اللهم اجعل علمي نافعاً لي ولغيري",
    source: "حديث شريف - رواه الترمذي",
    occasion: "بعد المذاكرة",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-400",
  },
  {
    text: "حَسْبِيَ اللّهُ لا إِلَـهَ إِلاَّ هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    translation: "حسبي الله ونعم الوكيل، عليه توكلت",
    source: "سورة التوبة - آية 129",
    occasion: "عند التوتر والقلق",
    color: "from-teal-500/20 to-emerald-500/5",
    iconColor: "text-teal-400",
  },
  {
    text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    translation: "اللهم أعوذ بك من العجز والكسل والهم والحزن",
    source: "حديث شريف - رواه البخاري",
    occasion: "عند الكسل والفتور",
    color: "from-red-500/20 to-rose-500/5",
    iconColor: "text-red-400",
  },
];

const nightlyReminders = [
  {
    title: "قبل النوم",
    description: "اقرأ آية الكرسي وسورة الإخلاص والمعوذتين. نوِّر عقلك بالقرآن قبل النوم.",
    icon: Moon,
  },
  {
    title: "أول النهار",
    description: 'ابدأ يومك بـ "اللهم إني أسألك علماً نافعاً ورزقاً طيباً وعملاً متقبلاً".',
    icon: Sparkles,
  },
  {
    title: "قبل المذاكرة",
    description: 'قل "اللهم افتح لي أبواب رحمتك وانشر عليّ رحمتك ويسّر لي أمري".',
    icon: BookHeart,
  },
  {
    title: "الاستمرارية",
    description: "أكثروا من ذكر الله، فإنه أعظم دواء للقلوب وأقوى سبب للتوفيق.",
    icon: Hand,
  },
];

export function DuasSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge
          variant="outline"
          className="mb-4 border-emerald-400/30 text-emerald-400 bg-emerald-400/5"
        >
          <BookHeart className="w-3 h-3 ml-1" />
          أدعية وتوجيهات
        </Badge>
        <h2 className="font-display font-bold text-3xl md:text-4xl mb-3">
          <span className="text-foreground">أدعية</span>
          <span className="text-gradient-gold"> المذاكرة</span>
        </h2>
        <p className="text-muted-foreground font-body text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          أدعية نبوية وقرآنية لتقوية الهمة على المذاكرة والاستمرارية. ابدأ مذاكرتك بالدعاء، فببركة
          الدعاء يُيسّر الله لك الفهم والحفظ.
        </p>
      </div>

      {/* Daily reminders */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {nightlyReminders.map((reminder, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-4 border border-border/50 text-center"
          >
            <reminder.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h4 className="font-display font-bold text-sm text-foreground mb-1">
              {reminder.title}
            </h4>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              {reminder.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Duas cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {duas.map((dua, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card rounded-2xl p-6 border border-border/50 bg-gradient-to-br ${dua.color} relative overflow-hidden group`}
          >
            {/* Decorative element */}
            <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl group-hover:scale-150 transition-transform duration-700" />

            <div className="relative z-10">
              {/* Occasion badge */}
              <div className="flex items-center justify-between mb-4">
                <Badge
                  variant="outline"
                  className={`text-xs border-border/50 ${dua.iconColor} bg-background/50`}
                >
                  {dua.occasion}
                </Badge>
                <BookHeart className={`w-5 h-5 ${dua.iconColor}`} />
              </div>

              {/* Dua text */}
              <p className="font-serif-ar text-lg md:text-xl text-foreground leading-loose mb-3 text-center">
                {dua.text}
              </p>

              {/* Translation */}
              <p className="text-sm text-muted-foreground font-body leading-relaxed text-center mb-3 pb-3 border-b border-border/30">
                {dua.translation}
              </p>

              {/* Source */}
              <p className="text-xs text-muted-foreground/80 font-body text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                {dua.source}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-6 border border-amber-400/20 bg-gradient-to-br from-amber-500/10 to-emerald-500/10 text-center"
      >
        <BookHeart className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl text-foreground mb-2">التوفيق من عند الله</h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
          اعمل بجهدك، واسأل ربك التوفيق. &quot;مَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ&quot;. المذاكرة عبادة، وطلب العلم فريضة. اجعل نيتك
          خالصة لله، يكن عملك مباركاً.
        </p>
      </motion.div>
    </div>
  );
}
