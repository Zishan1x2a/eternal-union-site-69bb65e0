import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroBg from "@/assets/wedding-hero-bg.jpg";
import ganeshJi from "@/assets/ganesh-ji.png";

interface WelcomeGateProps {
  onOpen: () => void;
}

// Floating gold dust particles
const GoldDust = ({ delay, x, size }: { delay: number; x: string; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: x, bottom: "-5%", width: size, height: size,
      background: "radial-gradient(circle, hsla(43, 85%, 70%, 0.9), hsla(43, 85%, 55%, 0))",
    }}
    initial={{ opacity: 0, y: 0 }}
    animate={{ opacity: [0, 1, 0.8, 0], y: [0, -300, -600, -900], x: [0, 15, -10, 20] }}
    transition={{ delay, duration: 6, repeat: Infinity, repeatDelay: Math.random() * 3, ease: "easeOut" }}
  />
);

// Mandala ring component with orbital motion
const MandalaRing = ({ radius, duration, direction, strokeWidth, dashArray, delay, orbitRadius = 0, orbitDuration = 10 }: {
  radius: number; duration: number; direction: 1 | -1; strokeWidth: number; dashArray: string; delay: number;
  orbitRadius?: number; orbitDuration?: number;
}) => (
  <motion.div
    className="absolute top-1/2 left-1/2"
    style={{ width: radius * 2, height: radius * 2 }}
    initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
    animate={{ 
      opacity: [1, 0.7, 1], 
      scale: [1, 1.1, 1, 0.9, 1], 
      rotate: direction * 360,
      x: orbitRadius > 0 ? ["-50%", `calc(-50% + ${orbitRadius}px)`, "-50%", `calc(-50% - ${orbitRadius}px)`, "-50%"] : "-50%",
      y: orbitRadius > 0 ? [`calc(-50% - ${orbitRadius/2}px)`, "-50%", `calc(-50% + ${orbitRadius/2}px)`, "-50%", `calc(-50% - ${orbitRadius/2}px)`] : "-50%",
    }}
    transition={{ 
      opacity: { duration: orbitDuration, repeat: Infinity, ease: "easeInOut" }, 
      scale: { duration: orbitDuration, repeat: Infinity, ease: "easeInOut" }, 
      rotate: { duration, repeat: Infinity, ease: "linear" },
      x: { duration: orbitDuration, repeat: Infinity, ease: "easeInOut" },
      y: { duration: orbitDuration, repeat: Infinity, ease: "easeInOut" },
      // Initial entrance transitions
      default: { delay, duration: 2, type: "spring" }
    }}
  >
    <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className="w-full h-full overflow-visible">
      <defs>
        <filter id={`glow-${radius}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx={radius} cy={radius} r={radius - 2} fill="none"
        stroke="hsla(43, 85%, 55%, 0.4)" strokeWidth={strokeWidth} strokeDasharray={dashArray}
        filter={`url(#glow-${radius})`} />
    </svg>
  </motion.div>
);

// Corner ornament with intricate design
const CornerOrnament = ({ position, delay }: { position: string; delay: number }) => {
  const rotations: Record<string, number> = {
    "top-0 left-0": 0, "top-0 right-0": 90,
    "bottom-0 right-0": 180, "bottom-0 left-0": 270,
  };
  const origins: Record<string, string> = {
    "top-0 left-0": "top left", "top-0 right-0": "top right",
    "bottom-0 right-0": "bottom right", "bottom-0 left-0": "bottom left",
  };
  const rotation = rotations[position] || 0;
  return (
    <motion.div className={`absolute ${position} w-24 h-24 md:w-36 md:h-36`}
      style={{ transformOrigin: origins[position] || "center" }}
      initial={{ opacity: 0, scale: 0, rotate: rotation }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      transition={{ duration: 1.2, delay, type: "spring", bounce: 0.3 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <motion.path d="M0 50 C0 22 22 0 50 0" stroke="hsla(43, 85%, 55%, 0.7)" strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: delay + 0.3 }} />
        <motion.path d="M0 35 C0 15 15 0 35 0" stroke="hsla(43, 85%, 55%, 0.5)" strokeWidth="1" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: delay + 0.5 }} />
        <motion.path d="M0 65 C0 30 30 0 65 0" stroke="hsla(43, 85%, 55%, 0.3)" strokeWidth="0.8" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, delay: delay + 0.4 }} />
        <motion.circle cx="5" cy="5" r="3" fill="hsla(43, 85%, 55%, 0.8)"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: delay }} />
        <motion.circle cx="25" cy="2" r="1.5" fill="hsla(43, 85%, 55%, 0.6)"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.5 }} />
        <motion.circle cx="2" cy="25" r="1.5" fill="hsla(43, 85%, 55%, 0.6)"
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: delay + 0.8 }} />
        <motion.path d="M10 10 Q20 5 15 15 Q10 25 20 20" stroke="hsla(43, 85%, 55%, 0.4)" strokeWidth="0.8" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: delay + 0.7 }} />
      </svg>
    </motion.div>
  );
};

const dustParticles = Array.from({ length: 20 }, (_, i) => ({
  delay: i * 0.4, x: `${5 + Math.random() * 90}%`, size: 2 + Math.random() * 4,
}));

const WelcomeGate = ({ onOpen }: WelcomeGateProps) => {
  const [isOpening, setIsOpening] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showGanesh, setShowGanesh] = useState(false);
  const [showText, setShowText] = useState(false);
  const guestName = new URLSearchParams(window.location.search).get("guest") || "Dear Guest";

  useEffect(() => {
    const t1 = setTimeout(() => setShowGanesh(true), 500);
    const t2 = setTimeout(() => setShowContent(true), 800);
    const t3 = setTimeout(() => setShowText(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(onOpen, 2500);
  };

  return (
    <AnimatePresence>
      {!isOpening ? (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background */}
          <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: "easeOut" }}>
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsla(345, 60%, 10%, 0.88) 0%, hsla(345, 60%, 6%, 0.92) 100%)" }} />
          </motion.div>

          {/* Floating gold dust */}
          {dustParticles.map((p, i) => <GoldDust key={i} {...p} />)}

          {/* Animated border frame */}
          <motion.div className="absolute inset-4 md:inset-8 pointer-events-none z-20"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            
            {/* Animated border lines with glow */}
            {["top", "bottom", "left", "right"].map((side, i) => {
              const isHorizontal = side === "top" || side === "bottom";
              return (
                <motion.div key={side}
                  className={`absolute ${side === "top" ? "top-0 left-0 right-0 h-[2px]" : side === "bottom" ? "bottom-0 left-0 right-0 h-[2px]" : side === "left" ? "left-0 top-0 bottom-0 w-[2px]" : "right-0 top-0 bottom-0 w-[2px]"}`}
                  initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
                  animate={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 + i * 0.15, ease: "easeOut" }}
                  style={{
                    background: isHorizontal
                      ? "linear-gradient(90deg, transparent, hsla(43, 85%, 55%, 0.5), hsla(43, 85%, 55%, 0.9), hsla(43, 85%, 55%, 0.5), transparent)"
                      : "linear-gradient(180deg, transparent, hsla(43, 85%, 55%, 0.5), hsla(43, 85%, 55%, 0.9), hsla(43, 85%, 55%, 0.5), transparent)",
                    boxShadow: "0 0 10px hsla(43, 85%, 55%, 0.3)",
                  }} />
              );
            })}

            {/* Inner border (double border effect) */}
            {["top", "bottom", "left", "right"].map((side, i) => {
              const isHorizontal = side === "top" || side === "bottom";
              return (
                <motion.div key={`inner-${side}`}
                  className={`absolute ${side === "top" ? "top-2 left-2 right-2 h-px" : side === "bottom" ? "bottom-2 left-2 right-2 h-px" : side === "left" ? "left-2 top-2 bottom-2 w-px" : "right-2 top-2 bottom-2 w-px"}`}
                  initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
                  animate={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 + i * 0.15, ease: "easeOut" }}
                  style={{
                    background: isHorizontal
                      ? "linear-gradient(90deg, transparent, hsla(43, 85%, 55%, 0.3), transparent)"
                      : "linear-gradient(180deg, transparent, hsla(43, 85%, 55%, 0.3), transparent)",
                  }} />
              );
            })}

            {/* Corner ornaments */}
            <CornerOrnament position="top-0 left-0" delay={1.0} />
            <CornerOrnament position="top-0 right-0" delay={1.2} />
            <CornerOrnament position="bottom-0 right-0" delay={1.4} />
            <CornerOrnament position="bottom-0 left-0" delay={1.6} />

            {/* Shimmer running along border */}
            <motion.div className="absolute w-8 h-8 rounded-full"
              style={{ background: "radial-gradient(circle, hsla(43, 85%, 65%, 0.5), transparent)", filter: "blur(4px)" }}
              animate={{
                left: ["0%", "100%", "100%", "0%", "0%"],
                top: ["0%", "0%", "100%", "100%", "0%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
            
            {/* Second shimmer (opposite direction) */}
            <motion.div className="absolute w-6 h-6 rounded-full"
              style={{ background: "radial-gradient(circle, hsla(43, 85%, 55%, 0.4), transparent)", filter: "blur(3px)" }}
              animate={{
                left: ["100%", "0%", "0%", "100%", "100%"],
                top: ["100%", "100%", "0%", "0%", "100%"],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
          </motion.div>

          {/* Main content */}
          <div className="relative z-10 text-center px-6 md:px-16 max-w-xl mx-auto">
            
            {/* ===== GANESH JI with ultra-high animation ===== */}
            {showGanesh && (
              <motion.div className="relative w-32 md:w-44 mx-auto mb-5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2, type: "spring", bounce: 0.2 }}>
                
                {/* Outer divine glow */}
                <motion.div className="absolute -inset-12 rounded-full"
                  style={{ background: "radial-gradient(circle, hsla(43, 85%, 55%, 0.15) 0%, hsla(43, 85%, 55%, 0.05) 50%, transparent 70%)" }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
                
                {/* Mandala rings with orbital paths */}
                <MandalaRing radius={145} duration={25} direction={1} strokeWidth={0.6} dashArray="2 6" delay={0.5} orbitRadius={10} orbitDuration={12} />
                <MandalaRing radius={125} duration={20} direction={-1} strokeWidth={0.8} dashArray="4 4" delay={0.7} orbitRadius={12} orbitDuration={15} />
                <MandalaRing radius={105} duration={30} direction={1} strokeWidth={0.5} dashArray="8 3" delay={0.9} orbitRadius={8} orbitDuration={18} />
                
                {/* Orbiting particles */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((startAngle, i) => (
                  <motion.div key={`orbit-${i}`}
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{ transformOrigin: "center" }}
                    animate={{ rotate: [startAngle, startAngle + 360] }}
                    transition={{ duration: 8 + i * 0.5, repeat: Infinity, ease: "linear" }}>
                    <motion.div className="absolute rounded-full"
                      style={{
                        top: 0, left: "50%", width: 3 + (i % 3), height: 3 + (i % 3),
                        background: "hsl(43, 85%, 65%)",
                        boxShadow: "0 0 8px hsla(43, 85%, 55%, 0.8), 0 0 15px hsla(43, 85%, 55%, 0.4)",
                      }}
                      animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }} />
                  </motion.div>
                ))}

                {/* Sacred geometry pattern */}
                <motion.div className="absolute -inset-6"
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 0.3, rotate: 0 }}
                  transition={{ duration: 3, delay: 1 }}>
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Lotus petals */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                      <motion.ellipse key={i}
                        cx="100" cy="100" rx="8" ry="30"
                        fill="none" stroke="hsla(43, 85%, 55%, 0.15)" strokeWidth="0.5"
                        transform={`rotate(${angle} 100 100)`}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 1 + i * 0.1 }} />
                    ))}
                  </svg>
                </motion.div>

                {/* Ganesh image with divine float */}
                <motion.div className="relative"
                  animate={{ y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                  {/* Golden halo behind */}
                  <motion.div className="absolute -inset-4 rounded-full"
                    style={{ background: "radial-gradient(circle, hsla(43, 85%, 55%, 0.25) 0%, transparent 70%)" }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }} />
                  <motion.img src={ganeshJi} alt="Shri Ganesh Ji"
                    className="w-full relative z-10"
                    style={{ filter: "drop-shadow(0 0 20px hsla(43, 85%, 55%, 0.4))" }}
                    initial={{ scale: 0, rotate: -720, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 2.5, type: "spring", bounce: 0.15, delay: 0.3 }} />
                </motion.div>
              </motion.div>
            )}

            {/* Shloka */}
            {showContent && (
              <motion.div className="mb-4"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.3, duration: 1.2 }}>
                <motion.p className="font-display text-xs md:text-sm leading-relaxed tracking-wide"
                  style={{ color: "hsla(43, 70%, 75%, 0.85)" }}
                  animate={{
                    textShadow: [
                      "0 0 5px hsla(43,85%,55%,0)",
                      "0 0 20px hsla(43,85%,55%,0.4)",
                      "0 0 5px hsla(43,85%,55%,0)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}>
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
                </motion.p>
                <motion.p className="text-[10px] md:text-xs mt-1.5 italic"
                  style={{ color: "hsla(40, 30%, 96%, 0.4)" }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
                  O Lord Ganesha, remover of all obstacles, bless this auspicious occasion
                </motion.p>
              </motion.div>
            )}

            {/* Animated divider */}
            {showText && (
              <>
                <motion.div className="flex items-center justify-center gap-3 mb-4"
                  initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}>
                  <motion.div className="w-20 md:w-28 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, hsla(43, 85%, 55%, 0.6))" }}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                  <motion.div className="w-3 h-3 rotate-45 border"
                    style={{ borderColor: "hsla(43, 85%, 55%, 0.6)" }}
                    animate={{ rotate: [45, 225, 405], scale: [1, 1.3, 1], borderColor: ["hsla(43,85%,55%,0.4)", "hsla(43,85%,55%,0.9)", "hsla(43,85%,55%,0.4)"] }}
                    transition={{ duration: 4, repeat: Infinity }} />
                  <motion.div className="w-20 md:w-28 h-px"
                    style={{ background: "linear-gradient(270deg, transparent, hsla(43, 85%, 55%, 0.6))" }}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                </motion.div>

                {/* Wedding Invitation text */}
                <motion.p className="text-xs md:text-sm tracking-[0.5em] uppercase mb-3"
                  style={{ color: "hsla(43, 70%, 75%, 0.6)" }}
                  initial={{ opacity: 0, letterSpacing: "0em" }}
                  animate={{ opacity: 1, letterSpacing: "0.5em" }}
                  transition={{ duration: 1.5 }}>
                  Wedding Invitation
                </motion.p>

                {/* ===== COUPLE NAMES with letter-by-letter 3D animation ===== */}
                <motion.div className="mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  <div className="font-script text-5xl md:text-7xl flex items-center justify-center flex-wrap"
                    style={{ color: "hsl(43, 85%, 55%)", perspective: "800px" }}>
                    {"Priya".split("").map((letter, i) => (
                      <motion.span key={`b-${i}`} className="inline-block"
                        initial={{ opacity: 0, y: 80, rotateX: -90, rotateY: 30 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                        transition={{ delay: 0.1 + i * 0.15, duration: 1, type: "spring", stiffness: 80, damping: 10 }}>
                        <motion.span className="inline-block"
                          animate={{
                            textShadow: [
                              "0 0 5px hsla(43,85%,55%,0.2)",
                              "0 0 20px hsla(43,85%,55%,0.6), 0 0 40px hsla(43,85%,55%,0.3)",
                              "0 0 5px hsla(43,85%,55%,0.2)"
                            ],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}>
                          {letter}
                        </motion.span>
                      </motion.span>
                    ))}
                    <motion.span className="mx-2 md:mx-4 inline-block"
                      initial={{ opacity: 0, scale: 0, rotate: -180 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 1, duration: 1, type: "spring" }}>
                      <motion.span className="inline-block text-4xl md:text-5xl"
                        animate={{
                          textShadow: [
                            "0 0 10px hsla(43,85%,55%,0)",
                            "0 0 30px hsla(43,85%,55%,0.6)",
                            "0 0 10px hsla(43,85%,55%,0)"
                          ],
                          scale: [1, 1.15, 1],
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}>&amp;</motion.span>
                    </motion.span>
                    {"Rahul".split("").map((letter, i) => (
                      <motion.span key={`g-${i}`} className="inline-block"
                        initial={{ opacity: 0, y: 80, rotateX: -90, rotateY: -30 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
                        transition={{ delay: 1.2 + i * 0.15, duration: 1, type: "spring", stiffness: 80, damping: 10 }}>
                        <motion.span className="inline-block"
                          animate={{
                            textShadow: [
                              "0 0 5px hsla(43,85%,55%,0.2)",
                              "0 0 20px hsla(43,85%,55%,0.6), 0 0 40px hsla(43,85%,55%,0.3)",
                              "0 0 5px hsla(43,85%,55%,0.2)"
                            ],
                            y: [0, -3, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 + 0.5 }}>
                          {letter}
                        </motion.span>
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Date with cascading reveal */}
                <motion.div className="mb-5">
                  <div className="flex items-center justify-center gap-0.5 text-base md:text-lg tracking-widest"
                    style={{ color: "hsla(40, 30%, 96%, 0.5)" }}>
                    {"15 • 02 • 2026".split("").map((char, i) => (
                      <motion.span key={`d-${i}`}
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 2 + i * 0.06, duration: 0.5, type: "spring" }}>
                        {char === " " ? "\u00A0" : char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Guest Name with glow animation */}
                <motion.div className="mb-8"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5, duration: 1 }}>
                  <motion.p className="text-lg md:text-xl mb-2 tracking-wide"
                    style={{ color: "hsla(40, 30%, 96%, 0.6)" }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}>
                    You are cordially invited
                  </motion.p>
                  <motion.div className="relative inline-block">
                    <motion.p className="font-display text-2xl md:text-3xl font-semibold"
                      style={{ color: "hsl(43, 85%, 55%)" }}
                      animate={{
                        textShadow: [
                          "0 0 8px hsla(43,85%,55%,0)",
                          "0 0 30px hsla(43,85%,55%,0.6), 0 0 60px hsla(43,85%,55%,0.3)",
                          "0 0 8px hsla(43,85%,55%,0)"
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}>
                      {guestName.split("").map((char, i) => (
                        <motion.span key={`gn-${i}`} className="inline-block"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.8 + i * 0.05, duration: 0.5 }}>
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </motion.p>
                    {/* Underline glow */}
                    <motion.div className="h-px mt-1 mx-auto"
                      style={{ background: "linear-gradient(90deg, transparent, hsl(43, 85%, 55%), transparent)" }}
                      initial={{ scaleX: 0, width: "100%" }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 3.2, duration: 1 }} />
                    {/* Sparkle dots on underline */}
                    <motion.div className="absolute -bottom-1 left-0 w-2 h-2 rounded-full"
                      style={{ background: "hsl(43, 85%, 65%)", boxShadow: "0 0 8px hsla(43,85%,55%,0.8)" }}
                      animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                      transition={{ delay: 3.5, duration: 2, repeat: Infinity, repeatDelay: 1 }} />
                  </motion.div>
                </motion.div>

                {/* ===== OPEN INVITATION BUTTON ===== */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 1 }}>
                  <motion.button onClick={handleOpen} aria-label="Open wedding invitation"
                    className="group relative px-14 py-5 rounded-full overflow-hidden cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px hsla(43,85%,55%,0.15)",
                        "0 0 50px hsla(43,85%,55%,0.4), 0 0 80px hsla(43,85%,55%,0.15)",
                        "0 0 20px hsla(43,85%,55%,0.15)",
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}>
                    {/* Rotating conic gradient border */}
                    <motion.div className="absolute -inset-[2px] rounded-full"
                      style={{ background: "conic-gradient(from 0deg, hsla(43,85%,55%,0), hsla(43,85%,55%,0.9), hsla(43,85%,55%,0.3), hsla(43,85%,55%,0))" }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                    {/* Inner background */}
                    <div className="absolute inset-[2px] rounded-full"
                      style={{ background: "linear-gradient(135deg, hsla(348, 70%, 12%, 0.98), hsla(348, 70%, 18%, 0.98))" }} />
                    {/* Shimmer sweep */}
                    <motion.div className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(105deg, transparent 35%, hsla(43,85%,55%,0.15) 50%, transparent 65%)" }}
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }} />
                    {/* Dancing sparkles */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <motion.div key={i} className="absolute w-1 h-1 rounded-full"
                        style={{
                          left: `${10 + i * 11}%`, top: "50%",
                          background: "hsl(43, 85%, 75%)",
                          boxShadow: "0 0 4px hsla(43, 85%, 55%, 0.9)",
                        }}
                        animate={{ y: [-10, 10, -10], opacity: [0, 1, 0], scale: [0.3, 1.5, 0.3] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }} />
                    ))}
                    <span className="relative z-10 font-display text-lg md:text-xl tracking-wider"
                      style={{ color: "hsl(43, 85%, 55%)" }}>
                      ✨ Open Invitation ✨
                    </span>
                  </motion.button>
                  <motion.p className="text-xs mt-3 tracking-wide"
                    style={{ color: "hsla(40, 30%, 96%, 0.3)" }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    Tap to open
                  </motion.p>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      ) : (
        /* ===== OPENING TRANSITION ===== */
        <motion.div key="opening" className="fixed inset-0 z-[110] pointer-events-none">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "hsla(345, 60%, 8%, 0.9)" }} />
          </div>

          {/* Left Curtain Panel */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 w-1/2 z-20 overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              background: "linear-gradient(90deg, hsla(345, 60%, 10%, 1), hsla(345, 60%, 7%, 1))",
              borderRight: "3px solid hsla(43, 85%, 55%, 0.5)",
              boxShadow: "10px 0 50px hsla(0, 0%, 0%, 0.5)"
            }}
          >
            {/* Edge Pattern */}
            <div className="absolute top-0 right-0 bottom-0 w-8 flex flex-col items-center justify-center gap-12 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rotate-45 border border-wedding-gold" />
              ))}
            </div>
          </motion.div>

          {/* Right Curtain Panel */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 w-1/2 z-20 overflow-hidden"
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 2.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ 
              background: "linear-gradient(270deg, hsla(345, 60%, 10%, 1), hsla(345, 60%, 7%, 1))",
              borderLeft: "3px solid hsla(43, 85%, 55%, 0.5)",
              boxShadow: "-10px 0 50px hsla(0, 0%, 0%, 0.5)"
            }}
          >
            {/* Edge Pattern */}
            <div className="absolute top-0 left-0 bottom-0 w-8 flex flex-col items-center justify-center gap-12 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rotate-45 border border-wedding-gold" />
              ))}
            </div>
          </motion.div>

          {/* Ganesh Ji blessing zoom-out */}
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: [1, 1.8, 12], opacity: [1, 0.7, 0] }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, ease: "easeInOut" }}>
              <img src={ganeshJi} alt="" className="w-36 md:w-52" style={{ filter: "drop-shadow(0 0 30px hsla(43,85%,55%,0.6))" }} />
            </motion.div>
          </motion.div>

          {/* Expanding golden rings */}
          {[0, 0.15, 0.3].map((delay, i) => (
            <motion.div key={i} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <motion.svg width="400" height="400" viewBox="0 0 400 400"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.1, opacity: 0 }}
                animate={{ scale: [0.1, 1.5, 5], opacity: [0, 0.7, 0], rotate: [0, (i % 2 ? -1 : 1) * 360] }}
                transition={{ duration: 2.5, delay, ease: [0.22, 1, 0.36, 1] }}>
                <circle cx="200" cy="200" r="190" fill="none"
                  stroke={`hsla(43, 85%, 55%, ${0.5 - i * 0.1})`}
                  strokeWidth={2 - i * 0.5} strokeDasharray={i === 0 ? "none" : "10 8"} />
              </motion.svg>
            </motion.div>
          ))}

          {/* Golden burst */}
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full z-30"
            style={{ background: "hsl(43, 85%, 55%)" }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 3, 80], opacity: [1, 0.7, 0] }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />

          {/* Radial sparks */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i * 360) / 20;
            const rad = (angle * Math.PI) / 180;
            return (
              <motion.div key={`spark-${i}`} className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full z-30"
                style={{ background: "hsl(43, 85%, 60%)", boxShadow: "0 0 6px hsla(43,85%,55%,0.8)" }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(rad) * 400, y: Math.sin(rad) * 400, opacity: 0, scale: 0 }}
                transition={{ duration: 1.5, delay: 0.05 + i * 0.03, ease: "easeOut" }} />
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeGate;
