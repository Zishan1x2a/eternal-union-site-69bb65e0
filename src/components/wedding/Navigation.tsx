import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Family", href: "#family" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contacts", href: "#contacts" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    // Add small delay to let mobile menu closing animation begin
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        // Calculate position with offset for fixed header
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 350);
  };

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[150] transition-all duration-500 ${scrolled ? "bg-wedding-dark-maroon/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <button onClick={() => scrollTo("#home")} className="font-script text-2xl text-wedding-gold">शुभ विवाह</button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.href} onClick={() => scrollTo(item.href)}
              className="font-body text-lg text-wedding-ivory/90 hover:text-wedding-gold transition-colors duration-300 tracking-wide">
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-wedding-gold">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden bg-wedding-dark-maroon/98 backdrop-blur-md border-t border-wedding-gold/20">
            <div className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item) => (
                <button key={item.href} onClick={() => scrollTo(item.href)}
                  className="font-body text-xl text-wedding-ivory/90 hover:text-wedding-gold transition-colors">
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
