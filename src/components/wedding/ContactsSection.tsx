import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import kalash from "@/assets/kalash.png";
import contactFather from "@/assets/contact-father.jpg";
import contactMother from "@/assets/contact-mother.jpg";

const contacts = [
  { name: "{Bride's Father}", phone: "+91 98XXX XXXXX", role: "Bride's Father", hindi: "वधू के पिता", photo: contactFather },
  { name: "{Bride's Mother}", phone: "+91 98XXX XXXXX", role: "Bride's Mother", hindi: "वधू की माता", photo: contactMother },
  { name: "{Groom's Father}", phone: "+91 98XXX XXXXX", role: "Groom's Father", hindi: "वर के पिता", photo: contactFather },
  { name: "{Groom's Mother}", phone: "+91 98XXX XXXXX", role: "Groom's Mother", hindi: "वर की माता", photo: contactMother },
];

const ContactsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contacts" ref={ref} className="wedding-section relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <motion.img src={kalash} alt="Kalash" className="w-16 mx-auto mb-4" loading="lazy" width={512} height={512}
            animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} />
          <h2 className="font-script text-3xl md:text-5xl text-wedding-gold mb-2">संपर्क</h2>
          <motion.h3 className="font-display text-2xl md:text-4xl text-wedding-ivory font-bold">
            {"Contact Us".split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>
          <p className="font-body text-lg text-wedding-ivory/70 mt-2">For any queries, feel free to reach out</p>
        </motion.div>

        {/* Contact cards with photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-10">
          {contacts.map((contact, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.3 } }}
              className="relative group">
              <motion.div animate={{ opacity: 0 }} whileHover={{ opacity: 0.5 }}
                className="absolute -inset-1 rounded-2xl blur-xl" style={{ background: "hsla(43, 85%, 55%, 0.15)" }} />
              <div className="relative p-6 rounded-2xl border backdrop-blur-md overflow-hidden"
                style={{ background: "hsla(345, 60%, 12%, 0.5)", borderColor: "hsla(43, 85%, 55%, 0.25)", boxShadow: "var(--shadow-elegant)" }}>
                {/* Shimmer strip */}
                <motion.div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
                  <motion.div animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    className="absolute inset-0 w-1/2"
                    style={{ background: "linear-gradient(90deg, transparent, hsl(43, 85%, 55%), transparent)" }} />
                </motion.div>

                <div className="flex items-center gap-4">
                  {/* Photo */}
                  <motion.div className="flex-shrink-0"
                    animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}>
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2"
                      style={{ borderColor: "hsla(43, 85%, 55%, 0.5)", boxShadow: "0 0 15px hsla(43, 85%, 55%, 0.15)" }}>
                      <img src={contact.photo} alt={contact.role} className="w-full h-full object-cover" loading="lazy" width={512} height={512} />
                    </div>
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg text-wedding-gold font-semibold">{contact.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-body text-sm text-muted-foreground">{contact.role}</p>
                      <span className="text-wedding-gold text-xs">•</span>
                      <p className="font-body text-sm text-wedding-gold">{contact.hindi}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone size={14} className="text-wedding-gold" />
                      <a href={`tel:${contact.phone}`} className="font-body text-wedding-ivory hover:text-wedding-gold transition-colors">
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ContactsSection;
