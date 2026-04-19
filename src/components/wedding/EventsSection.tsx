import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, MapPin, Navigation as NavIcon } from "lucide-react";
import divider from "@/assets/divider-gold.png";

const events = [
  { name: "Haldi", hindi: "हल्दी", date: "13 Feb 2026", time: "10:00 AM", venue: "Sharma Niwas, Jaipur", description: "Join us for the auspicious Haldi ceremony.", icon: "🌼", accent: "45 90% 50%", mapLink: "https://maps.google.com" },
  { name: "Mehndi", hindi: "मेहंदी", date: "13 Feb 2026", time: "4:00 PM", venue: "Sharma Niwas, Jaipur", description: "An evening of beautiful henna art, music, and dance.", icon: "🌿", accent: "145 50% 40%", mapLink: "https://maps.google.com" },
  { name: "Sangeet", hindi: "संगीत", date: "14 Feb 2026", time: "7:00 PM", venue: "Royal Palace Banquet, Jaipur", description: "A night filled with music, dance, and joyous celebrations.", icon: "🎵", accent: "280 60% 45%", mapLink: "https://maps.google.com" },
  { name: "Wedding", hindi: "विवाह", date: "15 Feb 2026", time: "8:00 PM (Shubh Muhurat)", venue: "Grand Mahal Resort, Jaipur", description: "The sacred wedding ceremony with pheras around the holy fire.", icon: "🔥", accent: "348 70% 35%", mapLink: "https://maps.google.com" },
  { name: "Reception", hindi: "स्वागत समारोह", date: "16 Feb 2026", time: "7:00 PM", venue: "Grand Mahal Resort, Jaipur", description: "Join us for a grand reception dinner.", icon: "🎉", accent: "43 85% 50%", mapLink: "https://maps.google.com" },
];

const AnimatedCorner = ({ position, accent }: { position: string; accent: string }) => {
  const posClasses: Record<string, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };
  return (
    <motion.div className={`absolute w-12 h-12 pointer-events-none ${posClasses[position]}`}>
      <motion.svg viewBox="0 0 50 50" className="w-full h-full"
        initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, type: "spring" }}>
        <motion.path d="M2 2 L20 2 C10 2 2 10 2 20" stroke={`hsl(${accent})`} strokeWidth="2" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.5 }} />
        <motion.circle cx="2" cy="2" r="2.5" fill={`hsl(${accent})`}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }} />
        <motion.path d="M6 6 L14 6 C10 6 6 10 6 14" stroke={`hsla(${accent}, 0.4)`} strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
      </motion.svg>
    </motion.div>
  );
};

const EventCard = ({ event, index }: { event: typeof events[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative pl-12 md:pl-0">
      {/* Timeline dot */}
      <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute left-[27px] md:left-1/2 top-8 -translate-x-1/2 z-10">
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
          className="absolute inset-0 rounded-full -m-3" style={{ background: `hsla(${event.accent}, 0.3)` }} />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-[18px] h-[18px] rounded-full border-[3px] border-wedding-ivory"
          style={{ background: `hsl(${event.accent})`, boxShadow: `0 0 15px hsla(${event.accent}, 0.6)` }} />
      </motion.div>

      {/* Connector */}
      {index < events.length - 1 && (
        <div className="absolute left-[27px] md:left-1/2 top-full w-[2px] h-12 md:h-16 -translate-x-1/2 z-0">
          <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="w-full h-full origin-top"
            style={{ background: `linear-gradient(180deg, hsl(${event.accent}) 0%, transparent 100%)` }} />
        </div>
      )}

      <div className={`md:w-[calc(50%-40px)] ${isEven ? "md:mr-auto" : "md:ml-auto"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -15 : 15 }}
          animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -15, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
          onClick={() => setIsSelected(!isSelected)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group cursor-pointer"
          style={{ perspective: "1000px" }}>

          {/* Glow */}
          <motion.div animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }} className="absolute -inset-3 rounded-3xl blur-2xl"
            style={{ background: `hsla(${event.accent}, 0.3)` }} />

          <div className="relative overflow-hidden rounded-2xl backdrop-blur-md transition-all duration-500"
            style={{
              background: isSelected ? "hsla(345, 60%, 15%, 0.8)" : "hsla(345, 60%, 12%, 0.5)",
              boxShadow: isHovered ? `0 25px 60px -15px hsla(${event.accent}, 0.3)` : "var(--shadow-elegant)",
            }}>

            {/* Star Field Background Animation */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                >
                  {/* Floating Twinkling Stars */}
                  {Array.from({ length: 35 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? "hsl(43, 85%, 55%)" : "#FFFFFF",
                        boxShadow: i % 2 === 0 ? "0 0 6px hsla(43, 85%, 55%, 0.9)" : "0 0 4px #FFF",
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.6, 1.4, 0.6],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  {/* Slow global rotation shine */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-50%] opacity-20 pointer-events-none"
                    style={{ background: "radial-gradient(circle, hsla(43, 85%, 55%, 0.1) 0%, transparent 60%)" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {/* Border */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ border: `2px solid hsla(${event.accent}, ${isHovered ? 0.5 : 0.2})`, transition: "border-color 0.3s" }} />

            {/* Glowing Border Sweep Effect on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                  style={{ border: `2px solid transparent` }}
                >
                  <motion.div
                    className="absolute inset-[-2px] rounded-2xl"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, hsla(${event.accent}, 0.8) 20%, transparent 40%)`,
                      maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      maskComposite: "exclude",
                      WebkitMaskComposite: "destination-out",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated corners */}
            <AnimatedCorner position="top-left" accent={event.accent} />
            <AnimatedCorner position="top-right" accent={event.accent} />
            <AnimatedCorner position="bottom-left" accent={event.accent} />
            <AnimatedCorner position="bottom-right" accent={event.accent} />

            {/* Top shimmer */}
            <motion.div className="h-1.5 w-full relative overflow-hidden" style={{ background: `hsla(${event.accent}, 0.15)` }}>
              <motion.div animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                className="absolute inset-0 w-1/2"
                style={{ background: `linear-gradient(90deg, transparent, hsl(${event.accent}), transparent)` }} />
            </motion.div>

            <div className="p-5 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <motion.div animate={isHovered ? { scale: [1, 1.2, 1.1], rotate: [0, -15, 15, 0] } : { scale: 1 }}
                  transition={{ duration: 0.6 }} className="text-4xl md:text-5xl flex-shrink-0 drop-shadow-lg">
                  {event.icon}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 flex-wrap">
                    <motion.h3 className="font-display text-xl md:text-3xl font-bold text-wedding-gold"
                      animate={isHovered ? { letterSpacing: "0.05em" } : { letterSpacing: "0em" }}>
                      {event.name}
                    </motion.h3>
                    <motion.span className="font-script text-xl md:text-2xl text-wedding-gold"
                      animate={isHovered ? { scale: 1.1 } : { scale: 1 }}>
                      {event.hindi}
                    </motion.span>
                  </div>
                  <p className="font-body text-base md:text-lg text-wedding-ivory/80 mt-1 leading-relaxed">{event.description}</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { icon: Calendar, label: event.date },
                  { icon: Clock, label: event.time },
                  { icon: MapPin, label: event.venue },
                ].map((item, i) => (
                    <motion.div key={i}
                    initial={{ opacity: 0, y: 15, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 px-2 py-2 md:px-3 md:py-2.5 rounded-xl"
                    style={{ background: `hsla(${event.accent}, 0.08)`, border: `1px solid hsla(${event.accent}, 0.15)` }}>
                    <item.icon size={16} className="flex-shrink-0" style={{ color: `hsl(${event.accent})` }} />
                    <span className="font-body text-sm md:text-base text-wedding-ivory/80 truncate">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Get Direction button */}
              <motion.a
                href={event.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all"
                style={{
                  background: `hsla(${event.accent}, 0.12)`,
                  border: `1.5px solid hsla(${event.accent}, 0.3)`,
                  color: `hsl(${event.accent})`,
                }}
                whileHover={{ scale: 1.05, boxShadow: `0 8px 25px hsla(${event.accent}, 0.2)` }}
                whileTap={{ scale: 0.95 }}
              >
                <NavIcon size={15} />
                Get Direction
              </motion.a>
            </div>

            {/* Bottom shimmer */}
            <motion.div className="h-1 w-full"
              animate={isHovered ? {
                background: [`linear-gradient(90deg, transparent, hsl(${event.accent}), transparent)`,
                  `linear-gradient(90deg, hsl(${event.accent}), transparent, hsl(${event.accent}))`,
                  `linear-gradient(90deg, transparent, hsl(${event.accent}), transparent)`]
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: `linear-gradient(90deg, transparent, hsla(${event.accent}, 0.3), transparent)` }} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" ref={ref} className="wedding-section relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.h2 className="wedding-subheading mb-2"
            initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>Celebrations</motion.h2>
          <motion.h3 className="text-3xl md:text-6xl font-bold tracking-wide text-wedding-gold"
            style={{ fontFamily: "var(--font-display)" }}
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}>
            {"Wedding Events".split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>
          <motion.img src={divider} alt="" className="section-divider mt-4" loading="lazy" width={1200} height={512}
            initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }} />
        </motion.div>

        <div className="relative space-y-12 md:space-y-16">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2">
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.5 }} className="w-full h-full origin-top"
              style={{ background: "linear-gradient(180deg, transparent 0%, hsl(var(--wedding-gold)) 10%, hsl(var(--wedding-gold)) 90%, transparent 100%)" }} />
          </div>
          <div className="md:hidden absolute left-[27px] top-0 bottom-0 w-[2px] -translate-x-1/2">
            <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.5 }} className="w-full h-full origin-top"
              style={{ background: "linear-gradient(180deg, transparent 0%, hsl(var(--wedding-gold)) 10%, hsl(var(--wedding-gold)) 90%, transparent 100%)" }} />
          </div>
          {events.map((event, i) => <EventCard key={event.name} event={event} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
