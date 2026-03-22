import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const now = new Date();
    let target = new Date(now.getFullYear(), 2, 23); // March 23
    if (target.getTime() < now.getTime()) {
      target = new Date(now.getFullYear() + 1, 2, 23);
    }
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-24 relative z-10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="font-script text-xl text-primary mb-2">The celebration continues</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            Your Special Day
          </h2>
          <div className="line-accent mx-auto mt-4" />
        </motion.div>

        <div className="flex justify-center gap-4 md:gap-6">
          {blocks.map((block, i) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 md:p-8 min-w-[70px] md:min-w-[110px]"
            >
              <div className="text-3xl md:text-5xl font-heading font-bold text-primary text-glow tabular-nums">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-widest font-body">
                {block.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
