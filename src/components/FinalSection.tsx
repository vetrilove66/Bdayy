import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

const FinalSection = () => {
  const [showImage, setShowImage] = useState(false);

  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10"
        >
          <div className="w-64 h-80 md:w-80 md:h-96 mx-auto rounded-3xl overflow-hidden relative border-2 border-primary/30 glow-warm cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowImage(true); }}>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary/10 z-10" />
            <img src="/Aba.jpeg" alt="Brother" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-2xl md:text-3xl text-primary mb-4"
        >
          With all my love💛
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed"
        >
          Wishes You Many More Happy returns of the day Abinash Anney.
            Epavum Happppy Ah irunga💕
          Epavumee idhey mari irunaga anney😻
          Returns Happy Birthday 
          Abinash Anney💛
        </motion.p>
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
              className="relative rounded-2xl overflow-hidden glow-gold"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '85vh' }}
            >
              <img
                src="/Aba.jpeg"
                alt="Brother Full"
                className="rounded-2xl"
                style={{ maxWidth: '90vw', maxHeight: '85vh', width: 'auto', height: 'auto', objectFit: 'contain' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-amber-500/10 pointer-events-none" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FinalSection;
