import { useEffect, useRef } from "react";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const drawHeart = (cx: number, cy: number, size: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.fillStyle = `hsla(32, 90%, 65%, ${opacity})`;
      ctx.beginPath();
      const s = size;
      ctx.moveTo(cx, cy + s * 0.3);
      ctx.bezierCurveTo(cx, cy - s * 0.2, cx - s * 0.6, cy - s * 0.5, cx - s * 0.6, cy - s * 0.1);
      ctx.bezierCurveTo(cx - s * 0.6, cy + s * 0.2, cx, cy + s * 0.5, cx, cy + s * 0.7);
      ctx.bezierCurveTo(cx, cy + s * 0.5, cx + s * 0.6, cy + s * 0.2, cx + s * 0.6, cy - s * 0.1);
      ctx.bezierCurveTo(cx + s * 0.6, cy - s * 0.5, cx, cy - s * 0.2, cx, cy + s * 0.3);
      ctx.fill();
      ctx.restore();
    };

    const particles: {
      x: number; y: number; size: number; opacity: number;
      speed: number; angle: number; drift: number; isHeart: boolean;
    }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.002 - 0.001,
        isHeart: false,
      });
    }

    // Add small floating hearts
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 6 + 4,
        opacity: Math.random() * 0.25 + 0.05,
        speed: Math.random() * 0.4 + 0.15,
        angle: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.003 - 0.0015,
        isHeart: true,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.angle += p.drift;
        p.x += Math.cos(p.angle) * p.speed;
        p.y -= p.speed * 0.5;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.size, p.opacity);
        } else {
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, `hsla(32, 80%, 60%, ${p.opacity})`);
          gradient.addColorStop(1, `hsla(32, 80%, 60%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(32, 90%, 70%, ${p.opacity * 1.5})`;
          ctx.fill();
        }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default Particles;
