"use client";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Sparkles, Palette } from "lucide-react";

const RAIN_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/5bys8t0t_Spider-Man%20Comic%20Art%20With%20Rainy%20Cityscape%20Background.jpg";

const skills = [
  { icon: Code2, title: "Full Stack", desc: "Next.js, React, Node, Python, Mongo, Postgres" },
  { icon: Sparkles, title: "AI Engineering(Enthusiast)", desc: "LLMs, RAG, LangChain, vector stores, agents" },
  { icon: Palette, title: "UI / UX", desc: "Design systems, motion, interaction, Figma" },
  { icon: GraduationCap, title: "B.Tech (Ongoing)", desc: "CS fundamentals, architecture & systems" },
];

export default function About() {
  return (
    <section id="about" className="relative section-pad overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden glass"
        >
          <motion.img
            src={RAIN_URL}
            alt="Spider-Man in the rain"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          <div className="absolute inset-0 ring-1 ring-[#E11D2E]/30 rounded-2xl" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-white/60">Codename</div>
              <div className="font-display text-xl">The Night Shift</div>
            </div>
            <div className="glass-soft rounded-full px-3 py-1 text-xs text-[#00F0FF]">online</div>
          </div>
        </motion.div>

        {/* RIGHT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-4">// About</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Engineering meets <span className="text-[#E11D2E] text-glow-red">storytelling</span>.
          </h2>
          <div className="mt-6 space-y-4 text-white/70 leading-relaxed">
            <p>
              I&apos;m <span className="text-white">Shubhang</span> — a full stack developer with a deep
              obsession for AI and the craft of interface design. I build systems end-to-end: from scalable
              backends and intelligent agents to cinematic, delightful front-ends.
            </p>
            <p>
              Currently pursuing my <span className="text-white">B.Tech</span>, I spend my days shipping
              products, tinkering with LLMs, and obsessing over micro-interactions. I love the quiet tension
              between engineering discipline and creative freedom — that&apos;s where great software lives.
            </p>
            <p>
              Like Spidey, I believe in showing up, staying curious, and doing the work — especially when
              no one&apos;s watching.
            </p>
          </div>

          {/* Skills grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                className="glass rounded-xl p-4 flex gap-3 items-start hover:border-red-600/50 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E11D2E]/15 border border-[#E11D2E]/30 flex items-center justify-center text-[#E11D2E] shrink-0">
                  <s.icon size={18} />
                </div>
                <div>
                  <div className="font-display text-sm tracking-wide">{s.title}</div>
                  <div className="text-xs text-white/60 mt-1">{s.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
