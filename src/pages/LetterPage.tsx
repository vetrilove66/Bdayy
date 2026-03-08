import { motion } from "framer-motion";
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Particles from "@/components/Particles";
import Footer from "@/components/Footer";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

const LetterPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClickHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2500);
  };

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden" onClick={handleBgClick}>
      <Particles />
      
      {/* Click Hearts */}
      <AnimatePresence>
        {clickHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, opacity: 1, y: 0, x: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 1], 
              opacity: [1, 1, 0],
              y: [-50, -100, -150],
              x: [0, 20, -10, 30, 0],
              rotate: [0, 10, -10, 5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeOut", times: [0, 0.3, 1] }}
            className="absolute text-4xl pointer-events-none z-50"
            style={{ left: heart.x - 20, top: heart.y - 20 }}
          >
            💛
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-12 relative z-10 min-h-screen flex flex-col">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={(e) => { e.stopPropagation(); navigate("/"); }}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group self-start"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-body text-sm uppercase tracking-widest">Back</span>
        </motion.button>

        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="font-script text-xl text-primary mb-2">From the heart</p>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
              A Letter For You
            </h2>
            <div className="line-accent mx-auto mt-4" />
          </motion.div>

          {!isOpen && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
              className="glass-card glow-warm rounded-2xl px-10 py-8 flex flex-col items-center gap-4 cursor-pointer"
            >
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Mail size={48} className="text-primary" />
              </motion.div>
              <span className="font-script text-2xl text-primary">Tap to open</span>
            </motion.button>
          )}

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-8 md:p-14 glow-warm cursor-pointer w-full"
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              >
                <p className="font-script text-3xl text-primary mb-8">Dear Abinash Anney💛,</p>
                <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed font-light tracking-wide">
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    You are not my blood brother, but you’ve always treated me like one. You will always be my fav person in my heart Anneyyy💕😻.
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    Neenga Epavumeee Nalla happppyaaa nimathiyaaaa Irukanumm Anney💛for my wish....neennag epavume yarium
                    hurt pannatha person so ipdiye Ellaraium hpy ya vachukongaaa annney 🥰👻
                  </motion.p>
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  May your life always shine with happiness, love, and beautiful moments that make every day special😍
                  </motion.p>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-10 font-heading text-xl md:text-2xl text-primary text-glow text-center"
                >
                  Happpppiestttt Birthadyyy Thanagameee💛
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LetterPage;
