"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className={`mx-auto max-w-7xl px-4 md:px-8`}>
          <div className={`flex items-center justify-between rounded-full px-5 md:px-7 py-3 ${scrolled || open ? "glass" : ""}`}>
            <a href="#home" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-red-600/40 group-hover:ring-red-500 transition">
                <img src="https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="font-display text-lg tracking-wide">SHUBHANG</span>
            </a>
            <ul className="hidden md:flex items-center gap-8 text-sm text-white/80">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="relative hover:text-white transition group">
                    {l.label}
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#E11D2E] group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white text-sm font-medium transition red-glow-sm">
              Let&apos;s talk
            </a>
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-full glass-soft flex items-center justify-center text-white"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 md:hidden"
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-2xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative pt-28 px-8 flex flex-col gap-6"
            >
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4 }}
                  className="font-display text-4xl text-white hover:text-[#E11D2E] transition"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-6 inline-flex self-start items-center gap-2 px-6 py-3 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white font-medium transition red-glow"
              >
                Let&apos;s talk
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
