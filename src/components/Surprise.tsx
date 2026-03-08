import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, X } from "lucide-react";

const Surprise = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSurprise = () => {
    setShowPopup(true);
    // Elegant gold confetti
    const fire = (opts: confetti.Options) =>
      confetti({
        ...opts,
        colors: ["#D97706", "#F59E0B", "#FBBF24", "#FDE68A", "#92400E"],
        disableForReducedMotion: true,
      });

    fire({ particleCount: 80, spread: 70, origin: { y: 0.65 } });
    setTimeout(() => {
      fire({ particleCount: 50, angle: 60, spread: 45, origin: { x: 0, y: 0.65 } });
      fire({ particleCount: 50, angle: 120, spread: 45, origin: { x: 1, y: 0.65 } });
    }, 250);
  };

  return (
    <section id="surprise" className="py-24 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-script text-xl text-primary mb-2">Something special</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            A Surprise Awaits
          </h2>
          <div className="line-accent mx-auto mt-4" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSurprise}
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-primary/30 bg-primary/10 text-primary font-heading font-semibold text-lg hover:bg-primary/20 transition-all glow-warm"
        >
          <Sparkles size={22} />
          Unwrap Your Surprise
        </motion.button>

        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4"
              onClick={() => setShowPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-3xl p-10 md:p-16 max-w-md glow-warm text-center relative"
              >
                <button
                  onClick={() => setShowPopup(false)}
                  className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>
                <p className="font-script text-3xl md:text-4xl text-primary mb-6">
                  Happy Birthday Abinash Anneyyy!
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Having you in my life is one of my greatest blessings😇.
                  You are not my temp or passing cloud person Anney🫂 <br />
                  Cheers to many more amazing years ahead✨
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Surprise;
