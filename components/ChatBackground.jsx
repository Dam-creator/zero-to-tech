"use client";

import { useEffect, useRef } from "react";

// Shared dark background for the site:
//  - toggles .chat-dark + variant class on <body> while mounted
//  - renders grid + drifting orbs (pure CSS) and a soft glow that
//    follows the pointer (single rAF lerp, paused when idle)
export default function ChatBackground({ variant = "home" }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const body = document.body;
    body.classList.add("chat-dark", variant);
    return () => body.classList.remove("chat-dark", variant);
  }, [variant]);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let x = -700;
    let y = -700;
    let tx = x;
    let ty = y;

    const tick = () => {
      raf = 0;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      glow.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      if (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="chat-bg" aria-hidden="true">
      <div className="chat-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div ref={glowRef} className="cursor-glow" />
    </div>
  );
}
