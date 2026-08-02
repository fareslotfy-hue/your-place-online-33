import { motion } from "framer-motion";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = {
    sm: { box: "w-8 h-8", text: "text-base", sub: "text-[9px]" },
    md: { box: "w-10 h-10", text: "text-lg", sub: "text-[10px]" },
    lg: { box: "w-14 h-14", text: "text-2xl", sub: "text-xs" },
  }[size];

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <motion.div
        whileHover={{ rotate: 360, scale: 1.05 }}
        transition={{ duration: 0.8 }}
        className={`${dimensions.box} relative flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#D4A574" />
            </linearGradient>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8B557" />
              <stop offset="100%" stopColor="#D4A574" />
            </linearGradient>
          </defs>
          <path
            d="M24 2 L42 12 L42 36 L24 46 L6 36 L6 12 Z"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            fill="rgba(16, 185, 129, 0.05)"
          />
          <path
            d="M24 10 L30 18 L24 26 L18 18 Z M24 22 L30 30 L24 38 L18 30 Z"
            fill="url(#logoGold)"
            opacity="0.9"
          />
          <circle cx="24" cy="24" r="3" fill="#10B981" />
        </svg>
      </motion.div>
      <div className="flex flex-col">
        <span
          className={`font-display font-bold ${dimensions.text} text-gradient-gold leading-none`}
        >
          الإمام الأكبر
        </span>
        <span className={`${dimensions.sub} text-muted-foreground font-body leading-none mt-1`}>
          منصة الهندسة
        </span>
      </div>
    </div>
  );
}
