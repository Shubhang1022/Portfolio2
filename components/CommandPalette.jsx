"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, FolderGit2, Home, Mail, Search, Sparkles } from "lucide-react";
import { projects } from "@/lib/projects";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo(() => {
    const quick = [
      { group: "Navigate", label: "Home", href: "/", icon: Home },
      { group: "Navigate", label: "About", href: "/#about", icon: Sparkles },
      { group: "Navigate", label: "Projects", href: "/#projects", icon: FolderGit2 },
      { group: "Navigate", label: "Contact", href: "/#contact", icon: Mail },
    ];
    const proj = projects.map((p) => ({
      group: "Projects",
      label: p.title,
      subtitle: p.tagline,
      href: `/projects/${p.slug}`,
      icon: FolderGit2,
    }));
    const all = [...quick, ...proj];
    if (!q.trim()) return all;
    const qq = q.toLowerCase();
    return all.filter((i) => i.label.toLowerCase().includes(qq) || (i.subtitle || "").toLowerCase().includes(qq));
  }, [q]);

  const groups = useMemo(() => {
    const g = {};
    items.forEach((i) => { (g[i.group] ||= []).push(i); });
    return g;
  }, [items]);

  const go = (href) => {
    setOpen(false);
    setQ("");
    if (href.startsWith("/#")) {
      router.push("/");
      setTimeout(() => {
        const id = href.slice(2);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* Floating hint - shows only on home */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden md:flex fixed bottom-6 right-6 z-30 items-center gap-2 glass-soft px-4 py-2 rounded-full text-xs text-white/70 hover:text-white hover:border-[#E11D2E]/40 border border-transparent transition"
      >
        <Search size={12} />
        Quick nav
        <kbd className="ml-1 px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono-cyber">⌘ K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="cmdk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[120] flex items-start justify-center pt-[10vh] px-4"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl glass rounded-2xl overflow-hidden red-glow-sm"
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <Search size={16} className="text-[#E11D2E]" />
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search projects, sections..."
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
                />
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono-cyber text-white/60">ESC</kbd>
              </div>
              <div className="max-h-[55vh] overflow-y-auto py-2">
                {Object.keys(groups).length === 0 && (
                  <div className="px-5 py-10 text-center text-white/50 text-sm">No matches.</div>
                )}
                {Object.entries(groups).map(([group, list]) => (
                  <div key={group} className="py-2">
                    <div className="px-5 text-[10px] tracking-[0.3em] uppercase text-white/40">{group}</div>
                    <div className="mt-1">
                      {list.map((it, i) => (
                        <button
                          key={group + i}
                          onClick={() => go(it.href)}
                          className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-[#E11D2E]/10 group transition text-left"
                        >
                          <it.icon size={16} className="text-white/60 group-hover:text-[#E11D2E] transition shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm text-white truncate">{it.label}</div>
                            {it.subtitle && <div className="text-xs text-white/45 truncate">{it.subtitle}</div>}
                          </div>
                          <ArrowRight size={14} className="text-white/30 group-hover:text-[#E11D2E] transition" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
                  <span>open</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
