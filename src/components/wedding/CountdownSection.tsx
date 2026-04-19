import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import mandala from "@/assets/mandala-decoration.png";

const WEDDING_DATE = new Date("2026-02-15T20:00:00+05:30");

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", hindi: "दिन", value: timeLeft.days, accent: "43 85% 55%" },
    { label: "Hours", hindi: "घंटे", value: timeLeft.hours, accent: "348 70% 40%" },
    { label: "Minutes", hindi: "मिनट", value: timeLeft.minutes, accent: "145 50% 40%" },
    { label: "Seconds", hindi: "सेकंड", value: timeLeft.seconds, accent: "280 60% 50%" },
  ];

  return (
    <section ref={ref} className="wedding-section relative overflow-hidden">

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <h2 className="font-script text-3xl md:text-5xl text-wedding-gold mb-2">शुभ मुहूर्त</h2>
          <p className="font-display text-xl text-wedding-ivory/80 mb-10">Counting Down to the Big Day</p>
        </motion.div>

        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
          {units.map((unit, i) => (
            <motion.div key={unit.label}
              initial={{ opacity: 0, y: 50, scale: 0.7, rotateX: 45 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, type: "spring", stiffness: 100 }}
              className="text-center group"
              style={{ perspective: "600px" }}>
              <motion.div
                whileHover={{ y: -8, rotateY: 10, scale: 1.05 }}
                className="relative rounded-2xl p-4 md:p-6 border backdrop-blur-sm overflow-hidden"
                style={{
                  background: 'hsla(348, 80%, 18%, 0.6)',
                  borderColor: `hsla(${unit.accent}, 0.4)`,
                }}>
                {/* High Animation Corner Elements */}
                {[
                  { pos: "-top-2.5 -left-2.5", rotate: 0 },
                  { pos: "-top-2.5 -right-2.5", rotate: 90 },
                  { pos: "-bottom-2.5 -left-2.5", rotate: -90 },
                  { pos: "-bottom-2.5 -right-2.5", rotate: 180 }
                ].map((corner, j) => (
                  <motion.div key={j} className={`absolute w-6 h-6 z-20 ${corner.pos}`}
                    style={{ color: `hsl(${unit.accent})`, rotate: corner.rotate }}
                    animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: j * 0.2 }}>
                    
                    {/* Rotating Star/Mandala Core */}
                    <motion.svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-[0_0_8px_currentColor]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                       <path d="M 20,0 L 23,17 L 40,20 L 23,23 L 20,40 L 17,23 L 0,20 L 17,17 Z" fill="currentColor" opacity="0.9" />
                       <path d="M 20,6 L 22,18 L 34,20 L 22,22 L 20,34 L 18,22 L 6,20 L 18,18 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </motion.svg>
                    
                    {/* Pulsing Outer Rings */}
                    <motion.svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full"
                       animate={{ rotate: -360, scale: [0.9, 1.3, 0.9] }}
                       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                       <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                       <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                    </motion.svg>

                  </motion.div>
                ))}

                {/* Animated Glowing Border Runner */}
                <motion.div className="absolute inset-0 pointer-events-none rounded-2xl z-20"
                  style={{ border: `1px solid hsla(${unit.accent}, 0)` }}
                  animate={{ 
                    boxShadow: [
                      `inset 0 0 0px hsla(${unit.accent}, 0)`,
                      `inset 0 0 20px hsla(${unit.accent}, 0.5)`,
                      `inset 0 0 0px hsla(${unit.accent}, 0)`
                    ],
                    borderColor: [
                      `hsla(${unit.accent}, 0.2)`,
                      `hsla(${unit.accent}, 0.9)`,
                      `hsla(${unit.accent}, 0.2)`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />

                {/* Shimmer */}
                <motion.div className="absolute inset-0"
                  animate={{ background: [
                    `linear-gradient(135deg, transparent 40%, hsla(${unit.accent}, 0.1) 50%, transparent 60%)`,
                    `linear-gradient(135deg, transparent 60%, hsla(${unit.accent}, 0.1) 70%, transparent 80%)`,
                    `linear-gradient(135deg, transparent 40%, hsla(${unit.accent}, 0.1) 50%, transparent 60%)`,
                  ]}}
                  transition={{ duration: 3, repeat: Infinity }} />

                {/* Number with flip animation */}
                <motion.span
                  key={unit.value}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="font-display text-3xl md:text-6xl font-bold block relative z-10"
                  style={{ color: `hsl(${unit.accent})` }}>
                  {String(unit.value).padStart(2, '0')}
                </motion.span>

                {/* Glow ring */}
                <motion.div className="absolute inset-0 rounded-2xl"
                  animate={{ boxShadow: [
                    `inset 0 0 20px hsla(${unit.accent}, 0)`,
                    `inset 0 0 20px hsla(${unit.accent}, 0.15)`,
                    `inset 0 0 20px hsla(${unit.accent}, 0)`,
                  ]}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
              </motion.div>
              <p className="font-body text-sm md:text-base text-wedding-ivory/80 mt-2">{unit.label}</p>
              <p className="font-body text-xs text-wedding-gold/60">{unit.hindi}</p>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-10 font-body text-lg text-wedding-ivory/70">
          15th February, 2026 • Jaipur, Rajasthan
        </motion.p>
      </div>
    </section>
  );
};

export default CountdownSection;
