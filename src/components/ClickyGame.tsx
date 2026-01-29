"use client";

import { useState } from "react";

export function ClickyGame() {
  const [count, setCount] = useState(0);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("var(--color-lunar-primary)");

  const colors = [
      "var(--color-lunar-primary)", 
      "var(--color-lunar-secondary)", 
      "var(--color-lunar-gold)", 
      "#ef4444", "#3b82f6", "#10b981", "#8b5cf6"
  ];

  const handleClick = () => {
    setCount((prev) => prev + 1);
    setScale(0.95); // Press down effect
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
    
    setTimeout(() => setScale(1), 100);
  };

  const getRank = (c: number) => {
      if (c === 0) return "Start Clicking!";
      if (c < 10) return "Warming Up...";
      if (c < 50) return "Clicking Enthusiast";
      if (c < 100) return "Click Addict";
      if (c < 500) return "Finger Master";
      if (c < 1000) return "LEGENDARY CLICKER";
      return "GOD LIKE";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-in fade-in zoom-in duration-500">
      
      <div 
        onClick={handleClick}
        className="
            relative w-64 h-64 md:w-80 md:h-80 
            rounded-3xl cursor-pointer select-none
            flex flex-col items-center justify-center
            shadow-[0_0_50px_rgba(0,0,0,0.1)]
            hover:shadow-[0_0_80px_var(--color-lunar-gold)]
            active:shadow-[0_0_30px_var(--color-lunar-primary)]
            transition-all duration-100 ease-out
            bg-[var(--color-lunar-card)]
            border-4 border-white/5 hover:border-[var(--color-lunar-gold)]
        "
        style={{ 
            transform: `scale(${scale})`,
            color: color 
        }}
        title="CLICK ME!"
      >
        <span className="text-8xl font-black drop-shadow-xl select-none">{count}</span>
        <span className="text-sm mt-4 uppercase tracking-widest opacity-70 select-none">Clicks</span>
        
        {/* Simple ripple or particle effect could go here, but color change is fun enough for now */}
      </div>

      <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-lunar-primary)] to-[var(--color-lunar-gold)] h-10">
          {getRank(count)}
      </div>

      <button
        onClick={() => { setCount(0); setColor("var(--color-lunar-primary)"); }}
        className="px-8 py-3 rounded-full border border-[var(--color-lunar-muted)] hover:bg-[var(--color-lunar-primary)] hover:border-transparent hover:text-white transition-all text-[var(--color-lunar-muted)] font-bold tracking-wider"
      >
        RESET
      </button>

      <p className="text-sm text-[var(--color-lunar-muted)] max-w-md text-center opacity-70">
        Warning: This might be addictive. Proceed with caution.
      </p>
    </div>
  );
}
