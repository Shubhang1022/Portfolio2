"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";

const SPIDER_URL = "https://customer-assets.emergentagent.com/job_web-shooter-dev/artifacts/wi716ebm_gemini-2.5-flash-image_make_the_full_body_version_of_the_reference_image_in_8k_including_his_entire_leg-0-removebg-preview.png";
const VIDEO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/umg0bo2n_Untitled%20%281%29.mp4";

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const tx = useTransform(sx, [-1, 1], [-8, 8]);
  const ty = useTransform(sy, [-1, 1], [-6, 6]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* Subtle video background */}
      <div className="absolute inset-0 z-0">
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Red ambient glow — static, no mouse tracking */}
      <div className="absolute right-[5%] top-[20%] w-[500px] h-[500px] rounded-full bg-[#E11D2E]/15 blur-[120px] z-0 pointer-events-none" />
      <div className="absolute left-[-5%] bottom-[10%] w-[400px] h-[400px] rounded-full bg-[#00F0FF]/8 blur-[120px] z-0 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-28 md:pt-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="order-2 md:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs tracking-wider uppercase text-white/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
            Available for opportunities
          </div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight">
            Hi, I&apos;m <span className="text-[#E11D2E] text-glow-red">Shubhang</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 font-mono-cyber tracking-wide">
            Full Stack Developer <span className="text-[#E11D2E]">/</span> AI Engineer Enthusiast <span className="text-[#E11D2E]">/</span> UI/UX Designer
          </p>
          <p className="mt-6 text-white/60 max-w-xl leading-relaxed">
            I build cinematic digital experiences that blend engineering precision with design soul —
            from intelligent AI systems to pixel-perfect interfaces that feel alive.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white font-medium transition red-glow"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:bg-white/10 text-white font-medium transition"
            >
              <Mail size={18} />
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              download="ShubhangMishra-Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 hover:border-[#00F0FF]/60 hover:text-[#00F0FF] text-white/80 font-medium transition"
            >
              <Download size={18} />
              Resume
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              { k: "20+", v: "Projects" },
              { k: "3+", v: "Years Coding" },
              { k: "∞", v: "Curiosity" },
            ].map((s) => (
              <div key={s.v} className="glass-soft rounded-xl px-4 py-3">
                <div className="font-display text-2xl text-white">{s.k}</div>
                <div className="text-xs text-white/60 tracking-wider uppercase">{s.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT - Spider-Man */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="relative order-1 md:order-2 flex justify-center items-center h-[60vh] md:h-[85vh]"
        >
          {/* Giant SPIDEY text slab */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="font-display text-[22vw] md:text-[16vw] leading-none tracking-[-0.04em] select-none"
              style={{
                WebkitTextStroke: "2px rgba(225,29,46,0.55)",
                color: "transparent",
              }}
            >
              SPIDEY
            </span>
          </div>
          {/* Soft shadow */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[60%] h-8 rounded-[50%] bg-black/70 blur-2xl" />
          {/* Glow behind */}
          <div className="absolute w-[70%] h-[70%] rounded-full bg-[#E11D2E]/25 blur-[110px]" />
          <div className="absolute w-[50%] h-[50%] rounded-full bg-[#00F0FF]/15 blur-[120px] translate-x-10 translate-y-10" />

          <motion.div
            style={{ x: tx, y: ty }}
            className="relative w-full h-full flex items-end justify-center"
          >
            <motion.img
              src={SPIDER_URL}
              alt="Spider-Man"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
              className="relative h-full w-auto object-contain select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 text-xs tracking-[0.3em] uppercase"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#E11D2E] to-transparent"
        />
      </motion.div>
    </section>
  );
}
