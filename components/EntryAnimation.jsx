"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOGO_URL = "/spider-logo.jpg";
const VIDEO_URL = "/intro.mp4";

export default function EntryAnimation({ onComplete }) {
  const [phase, setPhase] = useState("logo"); // logo → video → done
  const videoRef = useRef(null);
  const timersRef = useRef([]);

  const clear = () => timersRef.current.forEach(clearTimeout);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    const video = videoRef.current;
    if (!video) return;

    // Start loading immediately in background
    video.load();

    let videoReady = false;
    let logoTimerDone = false;

    // Try to switch to video phase — only when BOTH logo timer fired AND video can play
    const tryShowVideo = () => {
      if (videoReady && logoTimerDone) {
        setPhase("video");
        video.currentTime = 0;
        video.play().catch(() => {});

        // End animation after 2.4s of video
        const t2 = setTimeout(() => setPhase("done"), 2400);
        const t3 = setTimeout(() => {
          document.documentElement.classList.remove("no-scroll");
          document.body.classList.remove("no-scroll");
          onComplete?.();
        }, 2400 + 700);
        timersRef.current.push(t2, t3);
      }
    };

    // Video is ready to play
    const onCanPlay = () => {
      videoReady = true;
      tryShowVideo();
    };

    // Logo phase minimum 1.1s
    const t1 = setTimeout(() => {
      logoTimerDone = true;
      tryShowVideo();

      // Fallback: if video never loads after 3s total, skip it and complete
      const fallback = setTimeout(() => {
        if (phase === "logo") {
          setPhase("done");
          document.documentElement.classList.remove("no-scroll");
          document.body.classList.remove("no-scroll");
          onComplete?.();
        }
      }, 3000);
      timersRef.current.push(fallback);
    }, 1100);

    timersRef.current.push(t1);
    video.addEventListener("canplaythrough", onCanPlay);

    return () => {
      clear();
      video.removeEventListener("canplaythrough", onCanPlay);
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="entry"
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Video — always in DOM, hidden until phase=video so it preloads */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: phase === "video" ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <video
              ref={videoRef}
              src={VIDEO_URL}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          </motion.div>

          {/* Spider Logo */}
          <AnimatePresence>
            {phase === "logo" && (
              <motion.div
                key="logo"
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-3xl bg-[#E11D2E]/40 scale-110" />
                  <img
                    src={LOGO_URL}
                    alt="Spider Logo"
                    className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-cover rounded-full ring-1 ring-red-600/40"
                    style={{ objectPosition: "center" }}
                  />
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: "inset 0 0 80px rgba(0,0,0,0.7)" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
