"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Sparkles } from "lucide-react";

const events = [
  {
    year: "2022",
    title: "The Origin",
    subtitle: "B.Tech begins",
    desc: "Fell into code like a radioactive bite. Started with Java, discovered the web and never looked back.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "Full Stack Era",
    subtitle: "React · Node · Mongo",
    desc: "Shipped first end-to-end products. Built dashboards, auth systems, and fell in love with clean APIs.",
    icon: Briefcase,
  },
  {
    year: "2025",
    title: "Now(AI LEARNING)",
    subtitle: "RAG , LANGCHAIN",
    desc: "ENTHUSIAM OF LEARNING MORE AND MORE. NOW THE TURN IS OF AI-ML.",
    icon: Rocket,
  },
];

export default function Journey() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-4">// Journey</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            The <span className="text-[#E11D2E] text-glow-red">origin story</span>.
          </h2>
          <p className="mt-4 text-white/60">
            Every hero has a beginning. Here&apos;s mine — a timeline of late nights, breakthroughs and the craft coming together.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* vertical web-rope */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E11D2E]/60 to-transparent md:-translate-x-1/2" />

          <div className="space-y-12">
            {events.map((e, i) => {
              const left = i % 2 === 0;
              const Icon = e.icon;
              return (
                <motion.div
                  key={e.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: 0.05 * i }}
                  className={`relative grid grid-cols-[64px_1fr] md:grid-cols-2 md:gap-16 items-center ${
                    left ? "" : "md:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Icon node */}
                  <div className="md:col-span-2 md:absolute md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full glass border border-[#E11D2E]/50 text-[#E11D2E] flex items-center justify-center red-glow-sm">
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`col-start-2 md:col-start-auto ${left ? "md:pr-16 md:text-right" : "md:pl-16 md:col-start-2"}`}>
                    <div className="glass rounded-2xl p-6 card-glow">
                      <div className={`flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-white/50 ${left ? "md:justify-end" : ""}`}>
                        <span className="text-[#00F0FF] font-mono-cyber">{e.year}</span>
                        <span>·</span>
                        <span>{e.subtitle}</span>
                      </div>
                      <h3 className="mt-2 font-display text-2xl">{e.title}</h3>
                      <p className="mt-2 text-white/65 text-sm leading-relaxed">{e.desc}</p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
