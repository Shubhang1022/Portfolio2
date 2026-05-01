"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center overflow-hidden px-6">
      <div className="comic-bg" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#E11D2E]/15 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-44 h-44 md:w-56 md:h-56"
        >
          <div className="absolute inset-0 rounded-full bg-[#E11D2E]/40 blur-3xl" />
          <img src={LOGO_URL} alt="" className="relative w-full h-full object-cover rounded-full ring-1 ring-red-600/50" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent to-white/70" />
        </motion.div>

        <div className="mt-10 text-xs tracking-[0.4em] uppercase text-[#E11D2E]">// Lost in the multiverse</div>
        <h1 className="font-display text-6xl md:text-8xl mt-4 text-glow-red">404</h1>
        <p className="mt-4 text-white/70 text-lg">
          This web hasn&apos;t been spun yet. The page you&apos;re looking for slipped through the dimensions.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white font-medium transition red-glow">
            <Home size={16} /> Go Home
          </Link>
          <button onClick={() => history.back()} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white/10 text-white font-medium transition">
            <RefreshCcw size={16} /> Go Back
          </button>
        </div>
      </motion.div>
    </main>
  );
}
