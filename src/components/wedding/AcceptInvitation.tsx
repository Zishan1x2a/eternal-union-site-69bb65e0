import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Sparkles, Check } from "lucide-react";

const AcceptInvitation = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <section className="wedding-section relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.p
                className="font-body text-xl text-wedding-ivory/80"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Will you join us on our special day?
              </motion.p>
              <motion.button
                onClick={() => setAccepted(true)}
                className="group relative px-14 py-5 rounded-full overflow-hidden cursor-pointer inline-flex items-center gap-3"
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

                <span className="relative z-10 flex items-center gap-3 font-display text-xl tracking-wider font-bold"
                  style={{ color: "hsl(43, 85%, 55%)" }}>
                  <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Heart size={22} className="fill-current" />
                  </motion.div>
                  Accept Invitation
                  <Sparkles size={18} className="text-wedding-gold" />
                </span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="thankyou"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative space-y-8 py-10"
            >
              {/* Divine Golden Backdrop Flash */}
              <motion.div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full z-0 opacity-40 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsla(43, 85%, 55%, 0.6) 0%, transparent 70%)" }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />

              {/* Side Light Sweeps (Left & Right) */}
              <motion.div 
                className="absolute left-[-20%] top-1/2 -translate-y-1/2 w-1/2 h-full blur-[100px] z-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg, hsla(43, 85%, 55%, 0.4), transparent)" }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: [0, 100, 200], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-1/2 h-full blur-[100px] z-0 pointer-events-none"
                style={{ background: "linear-gradient(270deg, hsla(43, 85%, 55%, 0.4), transparent)" }}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: [0, -100, -200], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Rich Confetti Shower (50 Particles) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                {Array.from({ length: 50 }).map((_, i) => {
                  const angle = Math.random() * Math.PI * 2;
                  const distance = 100 + Math.random() * 300;
                  const size = 6 + Math.random() * 10;
                  const color = ["#FFD700", "#E0115F", "#800000", "#50C878", "#FFFFFF"][i % 5];
                  const isHeart = i % 8 === 0;
                  const isStar = i % 8 === 4;
                  
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0, 1.2, 1, 0.5],
                        x: `calc(-50% + ${Math.cos(angle) * distance}px)`,
                        y: `calc(-50% + ${Math.sin(angle) * distance}px)`,
                        rotate: Math.random() * 720
                      }}
                      transition={{ 
                        duration: 1.5 + Math.random(), 
                        delay: (i % 10) * 0.05, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                      className="absolute"
                      style={{ color }}
                    >
                      {isHeart ? <Heart fill="currentColor" size={size} /> : 
                       isStar ? <Sparkles size={size} /> : 
                       <div className="w-2 h-2 rotate-45" style={{ background: color }} />}
                    </motion.div>
                  );
                })}
              </div>

              {/* Centered Check Icon with Pop */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-28 h-28 mx-auto rounded-full flex items-center justify-center relative z-10"
                style={{
                  border: "3px solid hsl(43, 85%, 55%)",
                  background: "linear-gradient(135deg, hsla(43, 85%, 55%, 0.3), hsla(348, 70%, 28%, 0.2))",
                  boxShadow: "0 0 50px hsla(43, 85%, 55%, 0.4)",
                }}
              >
                <Check size={48} className="text-wedding-gold" strokeWidth={3} />
              </motion.div>

              <div className="relative z-10 space-y-2">
                <div className="relative inline-block mx-auto mb-2">
                  {/* Under-Text Light Effect */}
                  <motion.div 
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[140%] h-8 blur-2xl z-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, hsla(43, 85%, 60%, 0.5), transparent)" }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 1, 0.8], scale: [0.5, 1] }}
                    transition={{ delay: 0.6, duration: 1 }}
                  />
                  
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.8, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring", bounce: 0.3 }}
                    className="relative z-10 font-script text-4xl md:text-5xl text-wedding-gold drop-shadow-xl"
                  >
                    Thank You!
                  </motion.h3>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <p className="font-display text-lg md:text-xl text-wedding-gold font-bold tracking-wide italic">
                    We are delighted to have you!
                  </p>
                  <p className="font-body text-base md:text-lg text-wedding-ivory/80">
                    आपकी उपस्थिति हमारे लिए सबसे बड़ा आशीर्वाद है 🙏
                  </p>
                </motion.div>
              </div>

              {/* Final floating hearts for persistence */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`heart-pulse-${i}`}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      y: [-20, -150 - i * 30],
                      x: (i % 2 === 0 ? 1 : -1) * (30 + i * 40),
                      scale: [0.5, 1.2, 0.8]
                    }}
                    transition={{ duration: 3, delay: 1 + i * 0.4, repeat: Infinity, repeatDelay: 1 }}
                    className="absolute left-1/2 bottom-1/4"
                  >
                    <Heart size={20 + i * 4} className="text-wedding-deep-red fill-current opacity-40 shadow-lg" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AcceptInvitation;
