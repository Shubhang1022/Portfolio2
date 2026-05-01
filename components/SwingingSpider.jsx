"use client";
import { useEffect, useRef, useState } from "react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

export default function SwingingSpider() {
  const ropeRef = useRef(null);
  const spiderRef = useRef(null);
  const wrapRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    setVisible(true);

    let ticking = false;
    const SWAY_MAP = [0, 60, -40, 50, -60, 30];
    const ROT_MAP  = [0,  8,  -6,  7,  -8,  4];

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const p = Math.min(1, Math.max(0, progress));

        // rope height 120 → 520
        const rope = 120 + p * 400;
        // sway interpolation across 6 keypoints
        const idx = p * (SWAY_MAP.length - 1);
        const lo = Math.floor(idx), hi = Math.min(lo + 1, SWAY_MAP.length - 1);
        const t = idx - lo;
        const sway = SWAY_MAP[lo] + (SWAY_MAP[hi] - SWAY_MAP[lo]) * t;
        const rot  = ROT_MAP[lo]  + (ROT_MAP[hi]  - ROT_MAP[lo])  * t;
        const opacity = p < 0.02 ? p / 0.02 : p > 0.9 ? (1 - p) / 0.1 : 1;

        if (wrapRef.current)  wrapRef.current.style.opacity = opacity;
        if (ropeRef.current)  ropeRef.current.style.height  = rope + "px";
        if (ropeRef.current)  ropeRef.current.style.transform = `translateX(${sway}px)`;
        if (spiderRef.current) spiderRef.current.style.transform = `translateX(${sway}px) rotate(${rot}deg)`;

        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed top-0 right-[6%] z-20 select-none"
      style={{ opacity: 0 }}
      aria-hidden
    >
      {/* Rope */}
      <div
        ref={ropeRef}
        className="relative w-[2px] mx-auto"
        style={{ height: 120, willChange: "transform, height" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/70 to-white/90" />
      </div>
      {/* Spider */}
      <div
        ref={spiderRef}
        className="relative -mt-2 w-14 h-14 flex items-center justify-center"
        style={{ willChange: "transform" }}
      >
        <div className="absolute inset-0 rounded-full bg-[#E11D2E]/30 blur-xl" />
        <img
          src={LOGO_URL}
          alt=""
          className="relative w-full h-full object-cover rounded-full ring-1 ring-red-600/50"
        />
      </div>
    </div>
  );
}
