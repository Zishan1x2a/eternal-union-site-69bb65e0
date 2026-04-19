import { motion } from "framer-motion";
import heroBg from "@/assets/wedding-hero-bg.jpg";
import mandala from "@/assets/mandala-decoration.png";
import couplePoster from "@/assets/couple-video-poster.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[85vh] md:min-h-screen flex items-center md:items-center justify-center overflow-hidden py-12 md:py-0">

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Couple in curved circle with rotating border */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 relative mx-auto"
          style={{ width: "clamp(200px, 40vw, 280px)", height: "clamp(260px, 52vw, 360px)" }}
        >
          {/* Rotating golden ring 1 */}
          <motion.div
            className="absolute -inset-3"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 300 380" className="w-full h-full">
              <ellipse cx="150" cy="190" rx="145" ry="185" fill="none" stroke="hsla(43, 85%, 55%, 0.3)" strokeWidth="1.5" strokeDasharray="8 6" />
              {[0, 60, 120, 180, 240, 300].map((angle) => {
                const rad = (angle * Math.PI) / 180;
                return <circle key={angle} cx={150 + 145 * Math.cos(rad)} cy={190 + 185 * Math.sin(rad)} r="3" fill="hsla(43, 85%, 55%, 0.6)" />;
              })}
            </svg>
          </motion.div>

          {/* Rotating golden ring 2 - opposite */}
          <motion.div
            className="absolute -inset-6"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 320 400" className="w-full h-full">
              <ellipse cx="160" cy="200" rx="155" ry="195" fill="none" stroke="hsla(43, 85%, 55%, 0.15)" strokeWidth="1" strokeDasharray="4 10" />
            </svg>
          </motion.div>

          {/* Glow behind */}
          <motion.div
            className="absolute -inset-4 rounded-full"
            animate={{
              boxShadow: [
                "0 0 40px hsla(43, 85%, 55%, 0.15)",
                "0 0 80px hsla(43, 85%, 55%, 0.3)",
                "0 0 40px hsla(43, 85%, 55%, 0.15)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Curved circle frame */}
          <div
            className="w-full h-full overflow-hidden relative"
            style={{
              borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
              border: "3px solid hsla(43, 85%, 55%, 0.6)",
            }}
          >
            <img
              src={couplePoster}
              alt="Priya & Rahul"
              className="w-full h-full object-cover"
              width={512}
              height={640}
            />
            {/* Shimmer overlay */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              className="absolute inset-0 w-1/2"
              style={{ background: "linear-gradient(90deg, transparent, hsla(43, 85%, 55%, 0.2), transparent)" }}
            />
          </div>
        </motion.div>

        {/* Couple names with high animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-2"
          >
            <span className="font-body text-lg md:text-xl tracking-[0.3em] uppercase text-wedding-light-gold">
              Wedding Invitation
            </span>
          </motion.div>

          <div className="font-script text-5xl md:text-8xl text-wedding-gold mb-2 drop-shadow-lg flex items-center justify-center flex-wrap" style={{ perspective: "600px" }}>
            {"Priya".split("").map((letter, i) => (
              <motion.span key={`b-${i}`} className="inline-block"
                initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.8, type: "spring", stiffness: 100, damping: 12 }}>
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.6, duration: 0.7, type: "spring", bounce: 0.4 }}
              className="mx-2 md:mx-4 inline-block"
            >
              <motion.span className="inline-block"
                animate={{ textShadow: ["0 0 10px hsla(43,85%,55%,0)", "0 0 30px hsla(43,85%,55%,0.6)", "0 0 10px hsla(43,85%,55%,0)"] }}
                transition={{ duration: 2, repeat: Infinity }}>&amp;</motion.span>
            </motion.span>
            {"Rahul".split("").map((letter, i) => (
              <motion.span key={`g-${i}`} className="inline-block"
                initial={{ opacity: 0, y: 80, rotateX: -90, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, duration: 0.8, type: "spring", stiffness: 100, damping: 12 }}>
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Bride & Groom labels */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            className="flex items-center justify-center gap-4 mt-1">
            <motion.span className="font-display text-lg md:text-xl text-wedding-ivory/80"
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }}>Bride</motion.span>
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-wedding-gold">❤</motion.div>
            <motion.span className="font-display text-lg md:text-xl text-wedding-ivory/80"
              animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}>Groom</motion.span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.8 }} className="mt-6 space-y-3">
          <p className="font-display text-xl md:text-2xl text-wedding-ivory/90 tracking-wide">Are Getting Married</p>
          <div className="flex items-center justify-center gap-4 text-wedding-light-gold">
            <div className="w-16 h-px bg-wedding-gold/50" />
            <span className="font-body text-lg md:text-xl tracking-widest">15 • 02 • 2026</span>
            <div className="w-16 h-px bg-wedding-gold/50" />
          </div>
          <p className="font-body text-lg text-wedding-ivory/70 mt-2">Jaipur, Rajasthan</p>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
