import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import divider from "@/assets/divider-gold.png";
import grandfatherImg from "@/assets/family-grandfather.png";
import grandmotherImg from "@/assets/family-grandmother.png";
import fatherImg from "@/assets/family-father.png";
import motherImg from "@/assets/family-mother.png";
import brotherImg from "@/assets/family-brother.png";
import sisterImg from "@/assets/family-sister.png";

const brideFamily = [
  { name: "{Grandfather Name}", relation: "Grandfather", hindi: "दादा जी", photo: grandfatherImg },
  { name: "{Grandmother Name}", relation: "Grandmother", hindi: "दादी जी", photo: grandmotherImg },
  { name: "{Father Name}", relation: "Father", hindi: "पिता जी", photo: fatherImg },
  { name: "{Mother Name}", relation: "Mother", hindi: "माता जी", photo: motherImg },
  { name: "{Brother Name}", relation: "Brother", hindi: "भाई", photo: brotherImg },
  { name: "{Sister Name}", relation: "Sister", hindi: "बहन", photo: sisterImg },
];

const groomFamily = [
  { name: "{Grandfather Name}", relation: "Grandfather", hindi: "दादा जी", photo: grandfatherImg },
  { name: "{Grandmother Name}", relation: "Grandmother", hindi: "दादी जी", photo: grandmotherImg },
  { name: "{Father Name}", relation: "Father", hindi: "पिता जी", photo: fatherImg },
  { name: "{Mother Name}", relation: "Mother", hindi: "माता जी", photo: motherImg },
  { name: "{Brother Name}", relation: "Brother", hindi: "भाई", photo: brotherImg },
  { name: "{Sister Name}", relation: "Sister", hindi: "बहन", photo: sisterImg },
];

type Member = typeof brideFamily[0];

const MemberModal = ({ member, onClose, onPrev, onNext }: { member: Member; onClose: () => void; onPrev: () => void; onNext: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    style={{ background: "hsla(348, 80%, 10%, 0.9)" }}
    onClick={onClose}
  >
    <button onClick={onClose} className="absolute top-6 right-6 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><X size={32} /></button>
    <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><ChevronLeft size={40} /></button>
    <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><ChevronRight size={40} /></button>

    <motion.div
      key={member.name + member.relation}
      initial={{ scale: 0.5, opacity: 0, rotateY: 30 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 mb-6"
        style={{ borderColor: "hsla(43, 85%, 55%, 0.6)", boxShadow: "0 0 60px hsla(43, 85%, 55%, 0.3)" }}
        animate={{ boxShadow: ["0 0 40px hsla(43,85%,55%,0.2)", "0 0 80px hsla(43,85%,55%,0.4)", "0 0 40px hsla(43,85%,55%,0.2)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <img src={member.photo} alt={member.relation} className="w-full h-full object-cover" loading="lazy" decoding="async" />
      </motion.div>
      <motion.h3 className="font-display text-2xl md:text-3xl text-wedding-gold font-bold"
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        {member.name}
      </motion.h3>
      <motion.p className="font-body text-lg text-wedding-ivory/80 mt-1"
        initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        {member.relation} • {member.hindi}
      </motion.p>
    </motion.div>
  </motion.div>
);

const FamilyMemberCard = ({ member, index, accent, onClick }: { member: Member; index: number; accent: string; onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative group cursor-pointer text-center h-full flex flex-col"
      style={{ perspective: "800px" }}>
      <motion.div animate={{ opacity: isHovered ? 0.6 : 0 }} transition={{ duration: 0.3 }}
        className="absolute -inset-2 rounded-2xl blur-xl" style={{ background: `hsla(${accent}, 0.15)` }} />
      <div className="relative p-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 h-full flex flex-col flex-1"
        style={{
          background: isHovered ? `hsla(${accent}, 0.06)` : "hsla(345, 60%, 12%, 0.5)",
          borderColor: isHovered ? `hsla(${accent}, 0.4)` : "hsla(43, 85%, 55%, 0.15)",
          boxShadow: isHovered ? `0 15px 40px hsla(${accent}, 0.15)` : "var(--shadow-elegant)",
        }}>
        <motion.div className="relative mx-auto mb-4 shrink-0" animate={isHovered ? { scale: 1.08 } : { scale: 1 }}>
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden relative"
            style={{ borderWidth: "3px", borderStyle: "solid", borderColor: `hsla(${accent}, 0.5)`,
              boxShadow: isHovered ? `0 0 25px hsla(${accent}, 0.3)` : `0 0 10px hsla(${accent}, 0.1)` }}>
            <img src={member.photo} alt={member.relation} className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
            <motion.div animate={isHovered ? { x: ["100%", "-100%"] } : {}} transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full"
              style={{ background: "linear-gradient(90deg, transparent, hsla(43, 85%, 55%, 0.3), transparent)" }} />
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div initial={{ scale: 0.8, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute inset-0 mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full border-2"
                style={{ borderColor: `hsla(${accent}, 0.4)` }} />
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex flex-col flex-1">
          <p className="font-display text-base md:text-lg font-semibold text-wedding-gold empty:hidden min-h-[1.5rem] flex items-start justify-center text-balance">{member.name}</p>
          
          <div className="mt-auto pt-3">
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="font-body text-sm text-muted-foreground whitespace-nowrap">{member.relation}</span>
              <span className="text-wedding-gold text-xs">•</span>
              <span className="font-body text-sm text-wedding-gold whitespace-nowrap">{member.hindi}</span>
            </div>
            <motion.p className="font-body text-xs text-wedding-gold/60 mt-2"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
              Tap to view
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FamilySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openSide, setOpenSide] = useState<'bride' | 'groom' | null>(null);
  const [hoveredSide, setHoveredSide] = useState<'bride' | 'groom' | null>(null);
  const [selectedMember, setSelectedMember] = useState<{ member: Member; familyIndex: number; memberIndex: number } | null>(null);

  const allMembers = [...brideFamily.map((m, i) => ({ ...m, familyIndex: 0, memberIndex: i })),
    ...groomFamily.map((m, i) => ({ ...m, familyIndex: 1, memberIndex: i }))];

  const navigateMember = (dir: number) => {
    if (!selectedMember) return;
    const currentGlobal = selectedMember.familyIndex * brideFamily.length + selectedMember.memberIndex;
    const next = (currentGlobal + dir + allMembers.length) % allMembers.length;
    const m = allMembers[next];
    setSelectedMember({ member: m, familyIndex: m.familyIndex, memberIndex: m.memberIndex });
  };

  return (
    <section id="family" ref={ref} className="wedding-section relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-16">
          <motion.h2 className="wedding-subheading mb-2">Our Families</motion.h2>
          <motion.h3 className="wedding-heading text-wedding-gold">The Two Families</motion.h3>
          <motion.img src={divider} alt="" className="section-divider mt-4" loading="lazy" width={1200} height={512}
            initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }} />
        </motion.div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Bride's Side Card */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={() => setOpenSide(openSide === 'bride' ? null : 'bride')}
            onMouseEnter={() => setHoveredSide('bride')}
            onMouseLeave={() => setHoveredSide(null)}
            className="relative group p-6 md:p-8 rounded-[2.5rem] border-2 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-500"
            style={{ 
              background: "linear-gradient(135deg, hsla(348, 70%, 15%, 0.6), hsla(348, 70%, 5%, 0.4))",
              borderColor: hoveredSide === 'bride' ? "hsla(348, 70%, 45%, 0.5)" : "hsla(348, 70%, 35%, 0.3)",
              boxShadow: hoveredSide === 'bride' ? "0 30px 60px -15px hsla(348, 70%, 10%, 0.7)" : "0 20px 50px -20px hsla(348, 70%, 10%, 0.5)"
            }}
          >
            {/* Star Field Background Animation */}
            <AnimatePresence>
              {hoveredSide === 'bride' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                >
                  {Array.from({ length: 40 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        background: i % 2 === 0 ? "hsl(348, 70%, 55%)" : "#FFFFFF",
                        boxShadow: i % 2 === 0 ? "0 0 6px hsla(348, 70%, 55%, 0.9)" : "0 0 4px #FFF",
                      }}
                      animate={{
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.6, 1.3, 0.6],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>


            {/* Decorative Corner */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-wedding-gold/30 rounded-tl-[2.5rem] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-wedding-gold/30 rounded-br-[2.5rem] pointer-events-none" />

            {/* Side Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2"
                style={{ 
                  background: "linear-gradient(135deg, hsla(348, 70%, 35%, 0.2), hsla(348, 70%, 35%, 0.05))", 
                  borderColor: "hsla(348, 70%, 35%, 0.4)" 
                }}
              >
                <Heart size={24} style={{ color: "hsl(348, 70%, 35%)" }} fill="hsla(348, 70%, 35%, 0.3)" />
              </motion.div>
              <h4 className="font-script text-4xl md:text-5xl" style={{ color: "hsl(348, 70%, 35%)" }}>Bride's Side</h4>
              <p className="font-display text-2xl text-wedding-gold mt-1 font-bold tracking-widest uppercase opacity-80">वधू पक्ष</p>
              
              {!openSide && (
                <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 text-wedding-gold font-body text-sm font-semibold flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-wedding-gold" />
                  Tap to view members
                  <span className="w-1.5 h-1.5 rounded-full bg-wedding-gold" />
                </motion.div>
              )}
            </div>

            {/* Grid of members (Collapsible) */}
            <AnimatePresence>
              {openSide === 'bride' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {brideFamily.map((member, i) => (
                      <FamilyMemberCard 
                        key={member.relation} 
                        member={member} 
                        index={i} 
                        accent="348 70% 35%"
                        onClick={() => setSelectedMember({ member, familyIndex: 0, memberIndex: i })} 
                      />
                    ))}
                  </div>
                  <div className="text-center mt-6 text-wedding-gold/60 font-body text-xs italic">
                    Tap to close
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Groom's Side Card */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            onClick={() => setOpenSide(openSide === 'groom' ? null : 'groom')}
            onMouseEnter={() => setHoveredSide('groom')}
            onMouseLeave={() => setHoveredSide(null)}
            className="relative group p-6 md:p-8 rounded-[2.5rem] border-2 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-500"
            style={{ 
              background: "linear-gradient(135deg, hsla(43, 85%, 15%, 0.6), hsla(43, 85%, 5%, 0.4))",
              borderColor: hoveredSide === 'groom' ? "hsla(43, 85%, 65%, 0.5)" : "hsla(43, 85%, 55%, 0.2)",
              boxShadow: hoveredSide === 'groom' ? "0 30px 60px -15px hsla(43, 85%, 10%, 0.7)" : "0 20px 50px -20px hsla(43, 85%, 10%, 0.5)"
            }}
          >
            {/* Star Field Background Animation */}
            <AnimatePresence>
              {hoveredSide === 'groom' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
                >
                  {Array.from({ length: 40 }).map((_, i) => (
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
                        opacity: [0.2, 0.8, 0.2],
                        scale: [0.6, 1.3, 0.6],
                      }}
                      transition={{
                        duration: 1.5 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>


            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-wedding-gold/30 rounded-tr-[2.5rem] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-wedding-gold/30 rounded-bl-[2.5rem] pointer-events-none" />

            {/* Side Header */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.7, delay: 0.6, type: "spring" }}
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border-2"
                style={{ 
                  background: "linear-gradient(135deg, hsla(43, 85%, 50%, 0.2), hsla(43, 85%, 50%, 0.05))", 
                  borderColor: "hsla(43, 85%, 50%, 0.4)" 
                }}
              >
                <Heart size={24} style={{ color: "hsl(43, 85%, 50%)" }} fill="hsla(43, 85%, 50%, 0.3)" />
              </motion.div>
              <h4 className="font-script text-4xl md:text-5xl" style={{ color: "hsl(43, 85%, 50%)" }}>Groom's Side</h4>
              <p className="font-display text-2xl text-wedding-gold mt-1 font-bold tracking-widest uppercase opacity-80">वर पक्ष</p>
              
              {!openSide && (
                <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 text-wedding-gold font-body text-sm font-semibold flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-wedding-gold" />
                  Tap to view members
                  <span className="w-1.5 h-1.5 rounded-full bg-wedding-gold" />
                </motion.div>
              )}
            </div>

            {/* Grid of members (Collapsible) */}
            <AnimatePresence>
              {openSide === 'groom' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {groomFamily.map((member, i) => (
                      <FamilyMemberCard 
                        key={member.relation} 
                        member={member} 
                        index={i} 
                        accent="43 85% 50%"
                        onClick={() => setSelectedMember({ member, familyIndex: 1, memberIndex: i })} 
                      />
                    ))}
                  </div>
                  <div className="text-center mt-6 text-wedding-gold/60 font-body text-xs italic">
                    Tap to close
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal
            member={selectedMember.member}
            onClose={() => setSelectedMember(null)}
            onPrev={() => navigateMember(-1)}
            onNext={() => navigateMember(1)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default FamilySection;
