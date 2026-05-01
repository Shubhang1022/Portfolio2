"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notes } from "@/lib/notes";
import { formatDate } from "@/lib/date";
import CustomCursor from "@/components/CustomCursor";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

const App = () => {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="comic-bg" />

      <div className="relative z-20 mx-auto max-w-5xl px-6 md:px-10 pt-10 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white glass-soft rounded-full px-4 py-2 transition">
          <ArrowLeft size={16} /> Home
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-red-600/40">
            <img src={LOGO_URL} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-sm tracking-wide">SHUBHANG</span>
        </Link>
      </div>

      <section className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-3">// Notes</div>
          <h1 className="font-display text-5xl md:text-6xl">
            Thoughts, <span className="text-[#E11D2E] text-glow-red">in the margins</span>.
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl">Field notes on engineering craft, AI, motion, and product design — written while shipping.</p>
        </motion.div>

        <div className="mt-14 grid gap-5">
          {notes.map((n, i) => (
            <motion.div
              key={n.slug}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <Link
                href={`/notes/${n.slug}`}
                className="group block glass rounded-2xl p-6 md:p-8 card-glow relative overflow-hidden"
              >
                <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/50">
                  <span className="text-[#00F0FF]">{n.tag}</span>
                  <span>·</span>
                  <span>{formatDate(n.date)}</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1"><Clock size={11} /> {n.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl md:text-3xl group-hover:text-[#E11D2E] transition-colors">{n.title}</h2>
                <p className="mt-3 text-white/65 max-w-3xl">{n.excerpt}</p>
                <div className="mt-5 text-xs text-[#E11D2E] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  Read note →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 mb-16 text-center text-white/40 text-xs tracking-wider">
          More notes soon. Follow along.
        </div>
      </section>

      <CustomCursor />
    </main>
  );
};

export default App;
