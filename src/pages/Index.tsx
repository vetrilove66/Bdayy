import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Images, Mail, Sparkles, Clock, Heart, X } from "lucide-react";
import { useState } from "react";
import Particles from "@/components/Particles";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

const navItems = [
  { label: "Photos", icon: Images, path: "/gallery", delay: 0.8 },
  { label: "Letter", icon: Mail, path: "/letter", delay: 0.9 },
  { label: "Surprise", icon: Sparkles, path: "/surprise", delay: 1.0 },
  { label: "Countdown", icon: Clock, path: "/countdown", delay: 1.1 },
  { label: "For You", icon: Heart, path: "/final", delay: 1.2 },
];

const Index = () => {
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(false);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClickHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2500);
  };

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden flex items-center justify-center" onClick={handleBgClick}>
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

      <div className="container mx-auto px-4 text-center relative z-10 py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <div className="w-44 h-44 md:w-56 md:h-56 mx-auto rounded-2xl overflow-hidden border-2 border-primary/30 glow-warm relative cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowImage(true); }}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-primary/10 z-10" />
            <img src="/Ab1.jpeg" alt="Birthday Brother" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-script text-2xl md:text-3xl text-primary mb-4"
        >
          A celebration of you
        </motion.p>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground text-glow mb-6 leading-tight"
        >
          Happiest Birthday
          <span className="block text-primary text-3xl md:text-5xl lg:text-6xl mt-2">Abinash Anney 💕</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="line-accent mx-auto mb-6"
        />

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto tracking-wide mb-14"
        >
          A special website made with love, just for you
        </motion.p>

        {/* Navigation cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-3xl mx-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay, duration: 0.6 }}
              whileHover={{ scale: 1.07, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.stopPropagation(); navigate(item.path); }}
              className="glass-card rounded-xl p-5 flex flex-col items-center gap-3 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors group cursor-pointer"
            >
              <item.icon size={24} className="group-hover:text-primary transition-colors" />
              <span className="text-xs uppercase tracking-widest font-body">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
            onClick={() => setShowImage(false)}
          >
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors z-10"
              onClick={() => setShowImage(false)}
            >
              <X size={20} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden glow-gold"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="/Ab1.jpeg"
                alt="Birthday Brother Full"
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-500/10 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
