"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/lib/projects";
import ApkDownloadModal from "@/components/ApkDownloadModal";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

export default function Projects() {
  const [apkProject, setApkProject] = useState(null);

  return (
    <section id="projects" className="relative section-pad">
      <motion.img
        src={LOGO_URL}
        alt=""
        initial={{ opacity: 0, rotate: -8 }}
        whileInView={{ opacity: 0.08, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute -right-40 top-20 w-[560px] h-[560px] object-cover rounded-full pointer-events-none select-none blur-sm"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-4">// Projects</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Things I&apos;ve <span className="text-[#E11D2E] text-glow-red">shipped</span>.
          </h2>
          <p className="mt-4 text-white/60">
            A selection of recent work across AI, product, and craft. More in the lab — always cooking.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 [perspective:1200px]">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              i={i}
              total={projects.length}
              onApkClick={() => setApkProject(p)}
            />
          ))}
        </div>
      </div>

      {apkProject && (
        <ApkDownloadModal project={apkProject} onClose={() => setApkProject(null)} />
      )}
    </section>
  );
}

function ProjectCard({ p, i, total, onApkClick }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 140, damping: 14 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 140, damping: 14 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(420px circle at ${gx} ${gy}, rgba(225,29,46,0.28), transparent 55%)`
  );

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="card-glow group relative rounded-2xl overflow-hidden glass p-6 flex flex-col min-h-[280px] will-change-transform"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-500`} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: glareBg }} />
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full overflow-hidden opacity-20 group-hover:opacity-40 transition">
        <img src={LOGO_URL} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative flex-1" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center justify-between">
          <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">
            0{i + 1} / 0{total}
          </div>
          <div className="flex items-center gap-3 text-white/50">
            {/* GitHub — direct link */}
            {p.repo && p.repo !== "#" ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                title="View source on GitHub"
                className="hover:text-[#E11D2E] transition"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </a>
            ) : null}
            {/* Demo / detail link */}
            {p.apk ? (
              <button onClick={onApkClick} title="Download APK" className="hover:text-white transition">
                <ExternalLink size={16} />
              </button>
            ) : (
              <a href={`/projects/${p.slug}`} className="hover:text-white transition" title="View project">
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
        <h3 className="font-display text-2xl mt-4 group-hover:text-[#E11D2E] transition-colors">
          {p.title}
        </h3>
        <p className="mt-3 text-sm text-white/65 leading-relaxed">{p.desc}</p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
        {p.tech.map((t) => (
          <span key={t} className="text-[11px] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 font-mono-cyber tracking-wider">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
