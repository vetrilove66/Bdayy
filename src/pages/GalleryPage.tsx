import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Particles from "@/components/Particles";

interface ClickHeart {
  id: number;
  x: number;
  y: number;
}

const photos = [
  { src: "/Ab2.jpeg", span: "md:col-span-2 md:row-span-2", position: "center 30%" },
  { src: "/Ab6.jpeg", span: "", position: "center 30%" },
  { src: "/Ab7.jpeg", span: "", position: "center 30%" },
  { src: "/Ab12.jpeg", span: "", position: "center 25%" },
  { src: "/Ab11.jpeg", span: "md:col-span-2", position: "center 20%" },
  { src: "/Ab9.jpeg", span: "", position: "center 25%" },
  { src: "/Ab4.jpeg", span: "md:col-span-2", position: "center 7%" },
  { src: "/Ab13.jpeg", span: "", position: "center 25%" },
  { src: "/Ab3.jpeg", span: "", position: "center 30%" },
  { src: "/Ab16.jpeg", span: "md:row-span-2", position: "center center" },
  { src: "/Ab15.jpeg", span: "", position: "center center" },
  { src: "/Ab18.jpeg", span: "", position: "center 30%" },
  { src: "/Ab20.jpeg", span: "md:col-span-2", position: "center 29%" },
  { src: "/Ab5.jpeg", span: "", position: "center 30%" },
  { src: "/Ab10.jpeg", span: "", position: "center 30%" },
  { src: "/Ab8.jpeg", span: "", position: "center 30%" },
  { src: "/Ab14.jpeg", span: "md:col-span-2 md:row-span-2", position: "center center" },
];

const GalleryPage = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);
  const navigate = useNavigate();

  const handleBgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newHeart = { id: Date.now(), x: e.clientX, y: e.clientY };
    setClickHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2500);
  };

  const goNext = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % photos.length);
  };
  const goPrev = () => {
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
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

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={(e) => { e.stopPropagation(); navigate("/"); }}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-body text-sm uppercase tracking-widest">Back</span>
        </motion.button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[280px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_25px_hsl(32_95%_55%/0.3),0_0_60px_hsl(32_95%_55%/0.15)] ${photo.span}`}
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
            >
              <img
                src={photo.src}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                style={{ objectPosition: photo.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-primary/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Attractive lightbox with layout animation */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Floating Hearts */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "100vh", x: `${20 + i * 15}%`, opacity: 0 }}
                animate={{ 
                  y: "-20vh", 
                  x: `${20 + i * 15 + Math.sin(i) * 10}%`,
                  opacity: [0, 0.6, 0]
                }}
                transition={{ 
                  duration: 4 + i * 0.5, 
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "linear"
                }}
                className="absolute text-4xl pointer-events-none"
              >
                💛
              </motion.div>
            ))}
            {/* Close */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <X size={20} />
            </motion.button>

            {/* Prev */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-muted/40 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ChevronLeft size={24} />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="relative max-w-4xl max-h-[85vh] w-full rounded-2xl overflow-hidden glow-gold"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  src={photos[selectedIndex].src}
                  alt="Full view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background/60 backdrop-blur-sm text-xs font-body text-muted-foreground tracking-widest">
                {selectedIndex + 1} / {photos.length}
              </div>
            </motion.div>

            {/* Next */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-muted/40 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ChevronRight size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
