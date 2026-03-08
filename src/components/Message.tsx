import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

const Message = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="message" className="py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-script text-xl text-primary mb-2">From the heart</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            A Letter For You
          </h2>
          <div className="line-accent mx-auto mt-4" />
        </motion.div>

        {/* Envelope button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(true)}
              className="glass-card glow-warm rounded-2xl px-10 py-8 flex flex-col items-center gap-4 cursor-pointer group"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail size={48} className="text-primary" />
              </motion.div>
              <span className="font-script text-2xl text-primary">Tap to open</span>
            </motion.button>
          )}
        </motion.div>

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl p-8 md:p-14 glow-warm cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <p className="font-script text-3xl text-primary mb-8">Dear Brother,</p>
              <div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed font-light tracking-wide">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  You are not just my brother — you are my best friend 
                  and my biggest support.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for all the memories, the laughter, 
                  and the guidance you've given me.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  May your life be filled with happiness, success, 
                  and endless adventures.
                </motion.p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-10 font-heading text-xl md:text-2xl text-primary text-glow text-center"
              >
                Happy Birthday 🥂
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Message;
