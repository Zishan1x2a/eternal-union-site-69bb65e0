import { Heart } from "lucide-react";
import mandala from "@/assets/mandala-decoration.png";

const Footer = () => {
  return (
    <footer className="relative py-12 overflow-hidden">
      <div className="relative z-10 text-center space-y-4">
        <p className="font-script text-4xl text-wedding-gold">Priya & Rahul</p>
        <p className="font-body text-wedding-ivory/60 text-lg">15 February 2026 • Jaipur</p>
        <div className="flex items-center justify-center gap-2 text-wedding-ivory/40">
          <span className="font-body text-sm">Made with</span>
          <Heart size={14} className="text-wedding-deep-red fill-current" />
          <span className="font-body text-sm">for our special day</span>
        </div>
        <p className="font-body text-xs text-wedding-ivory/30 mt-4">
          #PriyaWedsRahul
        </p>
      </div>
    </footer>
  );
};

export default Footer;
