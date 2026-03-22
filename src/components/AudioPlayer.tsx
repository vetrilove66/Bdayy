import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = true;
    audio.volume = 0.6;

    const tryPlay = () => {
      audio.muted = false;
      audio.play().catch(() => {
        // Browser blocked autoplay, wait for user interaction
        const unlock = () => {
          audio.muted = false;
          audio.play().catch(() => {});
          document.removeEventListener("click", unlock);
          document.removeEventListener("touchstart", unlock);
        };
        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
      });
    };

    tryPlay();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/Final.mp3" preload="auto" />
      <motion.button
        onClick={toggleMute}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-50 rounded-full p-3 shadow-lg transition-colors"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 8% / 0.85), hsl(0 0% 5% / 0.95))",
          border: "1px solid hsl(32 95% 55% / 0.35)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 0 18px hsl(32 95% 55% / 0.2), 0 0 40px hsl(32 95% 55% / 0.08)",
          color: "hsl(32 95% 55%)",
        }}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </motion.button>
    </>
  );
};

export default AudioPlayer;
