import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import b1 from "@/assets/brother1.jpg";
import b2 from "@/assets/brother2.jpg";
import b3 from "@/assets/brother3.jpg";
import b4 from "@/assets/brother4.jpg";
import b5 from "@/assets/brother5.jpg";
import b6 from "@/assets/brother6.jpg";

const photos = [
  { src: b1, span: "md:col-span-2 md:row-span-2" },
  { src: b2, span: "" },
  { src: b3, span: "" },
  { src: b4, span: "" },
  { src: b5, span: "md:col-span-2" },
  { src: b6, span: "" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-script text-xl text-primary mb-2">Our journey together</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Memories
          </h2>
          <div className="line-accent mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative rounded-xl overflow-hidden cursor-pointer ${photo.span}`}
              onClick={() => setSelected(photo.src)}
            >
              <img
                src={photo.src}
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 text-muted-foreground hover:text-primary transition-colors"
              >
                <X size={28} />
              </button>
              <img src={selected} alt="Full view" className="w-full rounded-xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
