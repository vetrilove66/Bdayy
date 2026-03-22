import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Surprise from "@/components/Surprise";
import Particles from "@/components/Particles";
import Footer from "@/components/Footer";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

const SurprisePage = () => {
  const navigate = useNavigate();
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
        <div className="flex-1 flex items-center justify-center">
          <Surprise />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SurprisePage;
