"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const opacityMap: Record<string, number> = {
  "/" : 0.10,
};

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  const opacity = opacityMap[pathname] ?? 0.06;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
    const fontSize = 18;

    let columns: number;
    let drops: number[];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      columns = Math.floor(canvas!.width / fontSize);
      drops = Array(columns).fill(1);
    }

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const frameInterval = 40; // ~25 FPS

    let animId: number;
    function draw(time: number) {
      animId = requestAnimationFrame(draw);
      if (!ctx) return;
      if (time - lastTime < frameInterval) return;
      lastTime = time;

      ctx.fillStyle = "rgba(10,10,10,0.05)";
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef} 
      style={{ opacity, transition: "opacity 0.5s ease"}}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
