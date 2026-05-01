"use client";
import { motion } from "framer-motion";

const rowA = [
  "React", "Tailwind", "JavaScript", "Java", "Python", "Node.js", "Flutter", "Figma",
];
const rowB = [
  "AWS", "Vercel", "Git", "RAG", "LangChain", "Dart", "Framer Motion", "Three.js",
];

function Row({ items, reverse = false, duration = 40 }) {
  const all = [...items, ...items];
  return (
    <div className="relative overflow-hidden mask-fade">
      <motion.div
        className="flex gap-4 whitespace-nowrap py-2"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {all.map((t, i) => (
          <span
            key={i}
            className="px-5 py-2.5 rounded-full glass text-sm text-white/85 font-mono-cyber tracking-wider hover:text-[#E11D2E] hover:border-[#E11D2E]/50 transition"
          >
            {t}
          </span>
        ))}
      </motion.div>
      <style jsx>{`
        .mask-fade {
          mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
        }
      `}</style>
    </div>
  );
}

export default function SkillsMarquee() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-3">// Stack</div>
            <h3 className="font-display text-3xl md:text-4xl">
              Tools of the <span className="text-[#E11D2E] text-glow-red">trade</span>
            </h3>
          </div>
          <p className="text-white/50 max-w-md text-sm">
            A living kit of languages, frameworks and platforms I reach for when shipping serious product.
          </p>
        </motion.div>
      </div>
      <div className="space-y-3">
        <Row items={rowA} />
        <Row items={rowB} reverse duration={50} />
      </div>
    </section>
  );
}
