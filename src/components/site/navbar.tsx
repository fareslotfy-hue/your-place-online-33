import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LayoutDashboard, LogIn, User } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/use-session";

const navLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "المواد", href: "#subjects" },
  { label: "المحاضرات", href: "#lectures" },
  { label: "الفيديوهات", to: "/videos" as const },
  { label: "عن المنصة", href: "#about" },
  { label: "المميزات", href: "#features" },
  { label: "الباقات", href: "#pricing" },
  { label: "آراء الطلبة", href: "#testimonials" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToAuth = () => {
    setMobileOpen(false);
    navigate({ to: "/auth" });
  };
  const goToDashboard = () => {
    setMobileOpen(false);
    navigate({ to: "/dashboard" });
  };

  const displayName = (user?.user_metadata?.full_name as string | undefined) || user?.email?.split("@")[0];

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setMobileOpen(false)} className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="lg:hidden fixed top-20 right-4 left-4 rounded-2xl overflow-hidden border border-border shadow-2xl bg-background z-50">
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                link.to ? (
                  <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-right text-foreground hover:text-amber-400 hover:bg-muted rounded-lg transition-colors font-body flex items-center justify-between group">
                    <span>{link.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 group-hover:bg-amber-400 group-hover:scale-150 transition-all" />
                  </Link>
                ) : (
                  <button key={link.href} onClick={() => handleNavClick(link.href!)} className="px-4 py-3 text-right text-foreground hover:text-amber-400 hover:bg-muted rounded-lg transition-colors font-body flex items-center justify-between group">
                    <span>{link.label}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/40 group-hover:bg-amber-400 group-hover:scale-150 transition-all" />
                  </button>
                )
              ))}
              <div className="h-px bg-border/50 my-2" />

              {user ? (
                <Button className="mt-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white" onClick={goToDashboard}>
                  <LayoutDashboard className="w-4 h-4 ml-2" />
                  لوحة التحكم
                </Button>
              ) : (
                <Button className="mt-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white" onClick={goToAuth}>
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${scrolled ? "glass shadow-lg" : "bg-transparent"}`}>
            <Link to="/"><Logo size="md" /></Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                link.to ? (
                  <Link key={link.to} to={link.to} className="px-3 py-2 text-sm font-body text-foreground/80 hover:text-foreground transition-colors relative group rounded-lg hover:bg-muted/50">
                    {link.label}
                    <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 group-hover:w-6 transition-all duration-300" />
                  </Link>
                ) : (
                  <button key={link.href} onClick={() => handleNavClick(link.href!)} className="px-3 py-2 text-sm font-body text-foreground/80 hover:text-foreground transition-colors relative group rounded-lg hover:bg-muted/50">
                    {link.label}
                    <span className="absolute bottom-1 right-1/2 translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-400 group-hover:w-6 transition-all duration-300" />
                  </button>
                )
              ))}
            </nav>


            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <>
                  <Button className="hidden md:flex bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-glow" size="sm" onClick={goToDashboard}>
                    <LayoutDashboard className="w-4 h-4 ml-2" />
                    لوحة التحكم
                  </Button>
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-500 to-emerald-500 flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-body text-foreground">{displayName}</span>
                  </div>
                </>
              ) : (
                <Button className="hidden md:flex bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-glow" size="sm" onClick={goToAuth}>
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </Button>
              )}
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-muted/50 border border-border" aria-label="القائمة">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
