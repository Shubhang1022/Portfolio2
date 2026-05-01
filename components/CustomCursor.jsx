"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    let tx = 0, ty = 0, rx = 0, ry = 0;
    let raf;
    let scheduled = false;

    // Dot: update directly in event — zero latency
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      }
    };

    // Ring: lerp in rAF — smooth trail
    const loop = () => {
      rx += (tx - rx) * 0.5;
      ry += (ty - ry) * 0.5;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hover — delegate to document, no MutationObserver needed
    const onEnter = (e) => {
      if (e.target.closest("a, button, input, textarea, [data-cursor='hover']")) {
        ringRef.current?.classList.add("cursor-hover");
      }
    };
    const onLeave = (e) => {
      if (e.target.closest("a, button, input, textarea, [data-cursor='hover']")) {
        ringRef.current?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter, { passive: true });
    document.addEventListener("mouseout", onLeave, { passive: true });
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-[#E11D2E]"
        style={{ willChange: "transform", transform: "translate3d(-100px,-100px,0)", marginLeft: "-16px", marginTop: "-16px" }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-[6px] h-[6px] rounded-full bg-[#E11D2E]"
        style={{ willChange: "transform", transform: "translate3d(-100px,-100px,0)", marginLeft: "-3px", marginTop: "-3px" }}
      />
      <style jsx global>{`
        * { cursor: none !important; }
        .cursor-ring {
          transition: width 0.12s ease, height 0.12s ease, background 0.12s ease, border-color 0.12s ease;
        }
        .cursor-ring.cursor-hover {
          width: 48px; height: 48px;
          background: rgba(225,29,46,0.1);
          border-color: #00F0FF;
          margin-left: -24px; margin-top: -24px;
        }
      `}</style>
    </>
  );
}
