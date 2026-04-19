import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import divider from "@/assets/divider-gold.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const photos = [
  { src: gallery1, alt: "Couple portrait" },
  { src: gallery2, alt: "Mehndi ceremony" },
  { src: gallery3, alt: "Sangeet celebration" },
  { src: gallery4, alt: "Wedding ceremony" },
  { src: gallery5, alt: "Reception portrait" },
  { src: gallery6, alt: "Haldi ceremony" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 8000); // Increased slightly for more "premium" feel
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Proactive Image Preloading
  useEffect(() => {
    const preloadImages = () => {
      // Preload next 2 images
      const nextIndex = (currentSlide + 1) % photos.length;
      const followingIndex = (currentSlide + 2) % photos.length;
      
      [nextIndex, followingIndex].forEach(index => {
        const img = new Image();
        img.src = photos[index].src;
      });
    };

    preloadImages();
  }, [currentSlide]);

  return (
    <section id="gallery" ref={ref} className="wedding-section relative">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="wedding-subheading mb-2">Memories</h2>
          <motion.h3 className="text-3xl md:text-6xl font-bold tracking-wide text-wedding-gold"
            style={{ fontFamily: "var(--font-display)" }}>
            {"Our Moments".split("").map((char, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 25, rotateX: 90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04 }} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h3>
          <img src={divider} alt="" className="section-divider mt-4" loading="lazy" width={1200} height={512} />
        </motion.div>

        {/* Main Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden mb-6"
          style={{ boxShadow: "0 25px 50px -12px hsla(348, 70%, 15%, 0.4)" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Gold border frame */}
          <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
            style={{ border: "3px solid hsla(43, 85%, 55%, 0.4)" }} />

          {/* Auto-slide Progress Bar */}
          {isAutoPlaying && (
            <div className="absolute top-0 left-0 right-0 h-1 z-30 overflow-hidden bg-black/10">
              <motion.div 
                key={currentSlide}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
                className="h-full bg-wedding-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              />
            </div>
          )}

          {/* Corner decorations */}
          {["top-2 left-2", "top-2 right-2 -scale-x-100", "bottom-2 left-2 -scale-y-100", "bottom-2 right-2 -scale-x-100 -scale-y-100"].map((pos, i) => (
            <motion.svg key={i} className={`absolute w-8 h-8 pointer-events-none z-20 ${pos}`} viewBox="0 0 30 30"
              animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}>
              <path d="M0 0 L12 0 C5 0 0 5 0 12" stroke="hsl(43, 85%, 55%)" strokeWidth="2" fill="none" />
              <circle cx="2" cy="2" r="2" fill="hsl(43, 85%, 55%)" />
            </motion.svg>
          ))}

          <div className="aspect-[16/9] relative bg-wedding-dark-maroon overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSlide}
                src={photos[currentSlide].src}
                alt={photos[currentSlide].alt}
                className="w-full h-full object-cover absolute inset-0 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                loading="eager"
                decoding="async"
                transition={{ duration: 0.4 }}
                onClick={() => setLightbox(currentSlide)}
              />
            </AnimatePresence>

            {/* Gradient Overlay for Cinematic Depth */}
            <div className="absolute inset-0 pointer-events-none z-10" 
              style={{ background: "radial-gradient(circle at center, transparent 30%, hsla(348, 70%, 5%, 0.4) 100%)" }} />

            {/* Navigation arrows */}
            <button onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              style={{ background: "hsla(348, 70%, 28%, 0.5)", border: "1px solid hsla(43, 85%, 55%, 0.3)" }}>
              <ChevronLeft size={24} className="text-wedding-gold" />
            </button>
            <button onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-110"
              style={{ background: "hsla(348, 70%, 28%, 0.5)", border: "1px solid hsla(43, 85%, 55%, 0.3)" }}>
              <ChevronRight size={24} className="text-wedding-gold" />
            </button>

            {/* Caption */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-4 z-10"
              style={{ background: "linear-gradient(transparent, hsla(348, 80%, 10%, 0.7))" }}>
              <p className="font-display text-lg text-wedding-ivory text-center">{photos[currentSlide].alt}</p>
            </motion.div>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-2 py-3" style={{ background: "hsla(348, 70%, 15%, 0.8)" }}>
            {photos.map((_, i) => (
              <motion.button key={i} onClick={() => setCurrentSlide(i)}
                className="rounded-full transition-all"
                animate={{
                  width: currentSlide === i ? 24 : 8,
                  height: 8,
                  background: currentSlide === i ? "hsl(43, 85%, 55%)" : "hsla(43, 85%, 55%, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {photos.map((photo, i) => (
            <div key={i}
              onClick={() => setCurrentSlide(i)}
              className={`flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${currentSlide === i ? 'border-wedding-gold shadow-lg ring-2 ring-wedding-gold/20' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "hsla(348, 80%, 10%, 0.95)" }}
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><X size={32} /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + photos.length) % photos.length); }}
              className="absolute left-4 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><ChevronLeft size={40} /></button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % photos.length); }}
              className="absolute right-4 text-wedding-gold hover:text-wedding-ivory transition-colors z-10"><ChevronRight size={40} /></button>
            <motion.img key={lightbox}
              initial={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              src={photos[lightbox].src} alt={photos[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              style={{ boxShadow: "0 0 60px hsla(43, 85%, 55%, 0.2)" }}
              onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
