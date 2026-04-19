import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import ganeshJi from "@/assets/ganesh-ji.png";
import divider from "@/assets/divider-gold.png";

const OpeningSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="wedding-section bg-wedding-ivory relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Ganesh Ji */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <img src={ganeshJi} alt="Shri Ganesh Ji" className="w-28 md:w-36 mx-auto animate-float" loading="lazy" width={600} height={600} />
        </motion.div>

        <motion.img
          src={divider} alt="" className="section-divider" loading="lazy" width={1200} height={512}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <p className="wedding-body text-wedding-warm-brown leading-relaxed max-w-2xl mx-auto">
            With the blessings of the Almighty and our beloved elders, we are delighted to announce
            the auspicious union of our beloved children.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }} className="glass-card p-6 rounded-xl">
              <p className="font-script text-2xl text-wedding-gold mb-2">Bride's Family</p>
              <p className="font-display text-lg text-wedding-maroon font-semibold">{"{Bride's Father Name}"}</p>
              <p className="font-body text-wedding-warm-brown">&</p>
              <p className="font-display text-lg text-wedding-maroon font-semibold">{"{Bride's Mother Name}"}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Cordially invite you for the wedding of their daughter</p>
              <p className="font-script text-3xl text-wedding-maroon mt-2">Priya</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }} className="glass-card p-6 rounded-xl">
              <p className="font-script text-2xl text-wedding-gold mb-2">Groom's Family</p>
              <p className="font-display text-lg text-wedding-maroon font-semibold">{"{Groom's Father Name}"}</p>
              <p className="font-body text-wedding-warm-brown">&</p>
              <p className="font-display text-lg text-wedding-maroon font-semibold">{"{Groom's Mother Name}"}</p>
              <p className="font-body text-sm text-muted-foreground mt-1">Cordially invite you for the wedding of their son</p>
              <p className="font-script text-3xl text-wedding-maroon mt-2">Rahul</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OpeningSection;
