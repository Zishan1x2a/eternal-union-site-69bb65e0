import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeGate from "@/components/wedding/WelcomeGate";
import Navigation from "@/components/wedding/Navigation";
import HeroSection from "@/components/wedding/HeroSection";
// Essential UI elements loaded synchronously
import FloatingPetals from "@/components/wedding/FloatingPetals";
import heroBg from "@/assets/wedding-hero-bg.jpg";
import mandala from "@/assets/mandala-decoration.png";

// Lazy loaded sections
const EventsSection = lazy(() => import("@/components/wedding/EventsSection"));
const FamilySection = lazy(() => import("@/components/wedding/FamilySection"));
const GallerySection = lazy(() => import("@/components/wedding/GallerySection"));
const CountdownSection = lazy(() => import("@/components/wedding/CountdownSection"));
const AcceptInvitation = lazy(() => import("@/components/wedding/AcceptInvitation"));
const WishingSection = lazy(() => import("@/components/wedding/WishingSection"));
const ContactsSection = lazy(() => import("@/components/wedding/ContactsSection"));
const Footer = lazy(() => import("@/components/wedding/Footer"));

const SectionLoader = () => (
  <div className="w-full flex items-center justify-center min-h-[300px]">
    <div className="w-10 h-10 border-4 border-wedding-gold/20 border-t-wedding-gold rounded-full animate-spin"></div>
  </div>
);

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isOpen && <WelcomeGate onOpen={() => setIsOpen(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen overflow-x-hidden relative ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
        {/* Unified background - Image + Maroon Gradient Overlay */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, hsla(345, 60%, 10%, 0.88) 0%, hsla(345, 60%, 6%, 0.92) 100%)" }} />
          
          {/* Global Background Mandalas (Fixed) */}
          <div className="absolute inset-0 z-0">
            <img src={mandala} alt="" className="absolute -top-40 -left-40 w-[600px] md:w-[800px] opacity-[0.07] animate-spin-slow" />
            <img src={mandala} alt="" className="absolute -bottom-40 -right-40 w-[600px] md:w-[800px] opacity-[0.07] animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>

        <div className="relative z-10">
          <FloatingPetals />
          <Navigation />
          <HeroSection />
          
          {/* Suspense boundary for lazy loaded chunks */}
          <Suspense fallback={<SectionLoader />}>
            <div className="-mt-8 md:mt-0">
              <AcceptInvitation />
            </div>
            <EventsSection />
            <FamilySection />
            <GallerySection />
            <CountdownSection />
            <WishingSection />
            <ContactsSection />
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Index;
