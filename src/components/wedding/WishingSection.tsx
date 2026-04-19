import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Heart, Sparkles } from "lucide-react";
import divider from "@/assets/divider-gold.png";

const sampleWishes = [
  { name: "Amit Uncle", message: "May your life together be filled with love and laughter. Bahut bahut badhai!" },
  { name: "Sunita Aunty", message: "Wishing you both a lifetime of happiness. God bless the lovely couple! 🙏" },
  { name: "Rohan Bhai", message: "So happy for you both! May your bond grow stronger with each passing day." },
  { name: "Meena Didi", message: "Beautiful couple! Wishing you endless joy and togetherness. 💕" },
  { name: "Rajesh Uncle", message: "May God shower you with blessings. A very happy married life ahead!" },
];

const WishingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [wishes, setWishes] = useState(sampleWishes);
  const [message, setMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setWishes([{ name: "Guest", message }, ...wishes]);
      setMessage("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <section ref={ref} className="wedding-section relative">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="wedding-subheading mb-2">Blessings</h2>
          <motion.h3 className="text-3xl md:text-6xl font-bold tracking-wide text-wedding-gold"
            style={{ fontFamily: "var(--font-display)" }}>
            {"Send Your Wishes".split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.03 }} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>
          <p className="font-body text-lg text-wedding-ivory/60 mt-2">शुभकामनाएं दें • Share your blessings</p>
          <img src={divider} alt="" className="section-divider mt-4" loading="lazy" width={1200} height={512} />
        </motion.div>

        {/* Wish form */}
        <motion.form initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mb-10">
          <motion.div className="relative p-[2px] rounded-2xl overflow-hidden"
            animate={{
              boxShadow: [
                "0 0 20px hsla(43,85%,55%,0.1)",
                "0 0 50px hsla(43,85%,55%,0.25)",
                "0 0 20px hsla(43,85%,55%,0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}>
            
            {/* Rotating conic gradient border */}
            <motion.div className="absolute -inset-[100%] z-0"
              style={{ background: "conic-gradient(from 0deg, hsla(43,85%,55%,0) 0%, hsla(43,85%,55%,0.5) 15%, hsla(43,85%,55%,0.9) 25%, hsla(43,85%,55%,0) 50%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />

            {/* Inner glass background */}
            <div className="absolute inset-[2px] rounded-[14px] glass-card z-0"
              style={{ background: "linear-gradient(135deg, hsla(348, 70%, 15%, 0.95), hsla(348, 70%, 10%, 0.95))" }} />
              
            {/* Shimmer sweep */}
            <motion.div className="absolute inset-0 rounded-2xl pointer-events-none z-0"
              style={{ background: "linear-gradient(105deg, transparent 35%, hsla(43,85%,55%,0.1) 50%, transparent 65%)" }}
              animate={{ x: ["-200%", "200%"] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }} />

            {/* Dancing sparkles for the card background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div key={`sparkle-${i}`} className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`, 
                    top: `${Math.random() * 100}%`,
                    background: "hsl(43, 85%, 75%)",
                    boxShadow: "0 0 4px hsla(43, 85%, 55%, 0.8)",
                  }}
                  animate={{ y: [-20, 20, -20], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }} />
              ))}
            </div>

            <div className="relative z-10 p-6 md:p-8 space-y-5">
              <motion.textarea value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessings here... ✨" rows={6}
                className="w-full p-6 rounded-xl bg-wedding-maroon/20 border border-wedding-gold/30 font-body text-xl text-wedding-ivory placeholder:text-wedding-ivory/40 focus:outline-none focus:ring-2 focus:ring-wedding-gold/50 resize-none transition-all duration-300"
                whileFocus={{ scale: 1.01, boxShadow: "0 0 30px hsla(43, 85%, 55%, 0.15)" }} />
              <motion.button type="submit"
                className="w-full group relative py-4 rounded-full overflow-hidden cursor-pointer inline-flex items-center justify-center gap-3"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                  boxShadow: [
                    "0 0 15px hsla(43,85%,55%,0.15)",
                    "0 0 30px hsla(43,85%,55%,0.3), 0 0 50px hsla(43,85%,55%,0.1)",
                    "0 0 15px hsla(43,85%,55%,0.15)",
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

                <span className="relative z-10 flex items-center justify-center gap-3 font-display text-lg tracking-wider font-bold"
                  style={{ color: "hsl(43, 85%, 55%)" }}>
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <Send size={18} className="fill-current" />
                  </motion.div>
                  Send Blessings
                  <Sparkles size={16} className="text-wedding-gold" />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </motion.form>

        {/* Success */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }} className="text-center mb-6">
              <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-wedding-gold/20 border border-wedding-gold/40">
                <Sparkles size={20} className="text-wedding-gold" />
                <span className="font-display text-wedding-maroon font-semibold">Blessings sent! 🙏</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sliding wishes marquee */}
        <div className="relative overflow-hidden rounded-2xl py-4" style={{ maskImage: "linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...wishes, ...wishes].map((wish, i) => (
              <motion.div key={`wish-${i}`}
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                animate={{ y: [0, -5, 0] }}
                transition={{ y: { duration: 4, repeat: Infinity, delay: i * 0.3 } }}
                className="glass-card p-5 rounded-xl flex-shrink-0 w-72 relative group overflow-hidden">
                
                {/* Animated Glowing Border Runner */}
                <motion.div className="absolute inset-0 pointer-events-none rounded-xl"
                  animate={{ 
                    boxShadow: [
                      `inset 0 0 0px hsla(43, 85%, 55%, 0)`,
                      `inset 0 0 15px hsla(43, 85%, 55%, 0.5)`,
                      `inset 0 0 0px hsla(43, 85%, 55%, 0)`
                    ],
                    border: [
                      `1px solid hsla(43, 85%, 55%, 0.1)`,
                      `1px solid hsla(43, 85%, 55%, 0.9)`,
                      `1px solid hsla(43, 85%, 55%, 0.1)`
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                      <Heart size={14} className="text-wedding-deep-red fill-current drop-shadow-[0_0_8px_currentColor]" />
                    </motion.div>
                    <span className="font-display text-wedding-gold font-semibold">{wish.name}</span>
                  </div>
                  <p className="font-body text-wedding-ivory/70 leading-relaxed text-sm">{wish.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WishingSection;
