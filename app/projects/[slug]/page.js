"use client";
import { motion } from "framer-motion";
import { notFound, useParams, useRouter } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink, Github, Download } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import CustomCursor from "@/components/CustomCursor";
import ApkDownloadModal from "@/components/ApkDownloadModal";
import { useState } from "react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const p = getProject(params?.slug);
  if (!p) return notFound();

  const [showApk, setShowApk] = useState(false);

  const nextIdx = (projects.findIndex((x) => x.slug === p.slug) + 1) % projects.length;
  const next = projects[nextIdx];

  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <div className="comic-bg" />

      {/* Top bar */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 md:px-10 pt-10 flex items-center justify-between">
        <button
          onClick={() => router.push("/#projects")}
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white glass-soft rounded-full px-4 py-2 transition"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-red-600/40">
            <img src={LOGO_URL} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="font-display text-sm tracking-wide">SHUBHANG</span>
        </a>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 pt-16 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-white/50">
            <span className="text-[#E11D2E]">// Case Study</span>
            <span>·</span>
            <span className="text-[#00F0FF]">{p.year}</span>
            <span>·</span>
            <span>{p.role}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl mt-4 leading-[1.05]">{p.title}</h1>
          <p className="mt-4 text-lg md:text-xl text-white/70 max-w-2xl">{p.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            {/* Live demo / Download APK */}
            {p.apk ? (
              <button
                onClick={() => setShowApk(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white text-sm font-medium transition red-glow-sm"
              >
                <Download size={14} /> Download App
              </button>
            ) : (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white text-sm font-medium transition red-glow-sm"
              >
                Live demo <ExternalLink size={14} />
              </a>
            )}

            {/* GitHub — clean direct link */}
            {p.repo && p.repo !== "#" && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-white/10 text-white text-sm font-medium transition"
              >
                <Github size={14} /> Source Code
              </a>
            )}

            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 text-xs text-white/60 font-mono-cyber tracking-wider">
              ● {p.status}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Hero visual */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="relative aspect-[16/8] rounded-3xl overflow-hidden glass"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-40`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
          <img src={LOGO_URL} alt="" className="absolute -right-20 -top-20 w-[420px] h-[420px] object-cover rounded-full opacity-15 blur-sm" />
          <div className="relative h-full w-full flex items-center justify-center p-10">
            <div className="text-center">
              <div className="font-display text-6xl md:text-8xl tracking-tighter text-glow-red">{p.title}</div>
              <div className="mt-4 text-white/70 font-mono-cyber tracking-[0.3em] uppercase text-xs">
                {p.tech.join(" · ")}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Metrics */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {p.metrics.map((m, i) => (
            <motion.div
              key={m.v}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass rounded-2xl p-6"
            >
              <div className="font-display text-4xl text-[#E11D2E] text-glow-red">{m.k}</div>
              <div className="mt-1 text-xs tracking-[0.3em] uppercase text-white/60">{m.v}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Overview + highlights */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 mt-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-3">// Overview</div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">The story.</h2>
          <p className="mt-5 text-white/70 leading-relaxed">{p.overview}</p>
          <p className="mt-4 text-white/60 leading-relaxed">
            Built end-to-end with a focus on craft, performance and an interface that feels alive.
          </p>
        </div>
        <div className="md:col-span-2">
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-3">// Highlights</div>
          <ul className="space-y-3">
            {p.highlights.map((h) => (
              <li key={h} className="glass rounded-xl p-4 flex gap-3 items-start">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-[#E11D2E]/15 border border-[#E11D2E]/40 text-[#E11D2E] flex items-center justify-center shrink-0">
                  <Check size={14} />
                </div>
                <span className="text-sm text-white/85 leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tech stack */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 mt-16">
        <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-3">// Stack</div>
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="px-4 py-2 rounded-full glass text-sm text-white/85 font-mono-cyber tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 mt-24 mb-24">
        <a
          href={`/projects/${next.slug}`}
          className="group block glass rounded-3xl p-10 md:p-14 relative overflow-hidden card-glow"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${next.accent} opacity-[0.18] group-hover:opacity-[0.28] transition-opacity`} />
          <div className="relative flex items-center justify-between gap-6 flex-wrap">
            <div>
              <div className="text-xs tracking-[0.4em] uppercase text-white/50 mb-2">// Next project</div>
              <div className="font-display text-3xl md:text-5xl">{next.title}</div>
              <div className="mt-2 text-white/65 max-w-xl">{next.tagline}</div>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center red-glow group-hover:scale-110 transition">
              <ArrowUpRight size={22} />
            </div>
          </div>
        </a>
      </section>

      <CustomCursor />

      {showApk && <ApkDownloadModal project={p} onClose={() => setShowApk(false)} />}
    </main>
  );
}
