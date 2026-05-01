"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getNote, notes } from "@/lib/notes";
import { formatDate } from "@/lib/date";
import CustomCursor from "@/components/CustomCursor";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

const App = () => {
  const params = useParams();
  const n = getNote(params?.slug);
  if (!n) return notFound();

  const idx = notes.findIndex((x) => x.slug === n.slug);
  const next = notes[(idx + 1) % notes.length];

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="comic-bg" />

      <div className="relative z-20 mx-auto max-w-3xl px-6 md:px-10 pt-10 flex items-center justify-between">
        <Link href="/notes" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white glass-soft rounded-full px-4 py-2 transition">
          <ArrowLeft size={16} /> All notes
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-red-600/40">
            <img src={LOGO_URL} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-sm tracking-wide">SHUBHANG</span>
        </Link>
      </div>

      <article className="relative z-10 mx-auto max-w-3xl px-6 md:px-10 pt-14 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/50">
            <span className="text-[#00F0FF]">{n.tag}</span>
            <span>·</span>
            <span>{formatDate(n.date, true)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1"><Clock size={11} /> {n.readTime}</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl mt-4 leading-[1.08]">{n.title}</h1>
          <p className="mt-4 text-white/60 text-lg">{n.excerpt}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          className="prose prose-invert mt-12 text-white/85 leading-[1.85] text-[17px] whitespace-pre-wrap"
        >
          {n.body}
        </motion.div>

        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="text-xs tracking-[0.3em] uppercase text-white/40 mb-3">// Up next</div>
          <Link href={`/notes/${next.slug}`} className="group block glass rounded-2xl p-6 card-glow">
            <div className="text-[#00F0FF] text-[11px] tracking-[0.3em] uppercase">{next.tag}</div>
            <div className="mt-1 font-display text-xl group-hover:text-[#E11D2E] transition">{next.title}</div>
            <div className="mt-1 text-sm text-white/60">{next.excerpt}</div>
          </Link>
        </div>
      </article>

      <CustomCursor />
    </main>
  );
};

export default App;
