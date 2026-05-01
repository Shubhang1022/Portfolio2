"use client";
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const LOGO_URL = "https://customer-assets.emergentagent.com/job_d2581c17-2329-4bd0-b1dc-d1732adefe4a/artifacts/alm67zts_download%20%281%29.jpg";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#E11D2E]/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-red-600/40">
              <img src={LOGO_URL} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display text-xl tracking-wide">SHUBHANG</div>
              <div className="text-[11px] tracking-[0.3em] uppercase text-white/50">Full Stack · AI · UI/UX</div>
            </div>
          </div>
          <p className="mt-5 text-white/55 max-w-md leading-relaxed text-sm">
            Crafted with obsession for motion, systems and soul. Spun together with Next.js, Tailwind and Framer Motion — one line at a time.
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a href="https://github.com/shubhang1022" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/shubhang-mishra/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition"><Linkedin size={16} /></a>
           
            <a href="https://mail.google.com/mail/?view=cm&to=mishrashanu233@gmail.com&su=Hey%20Shubhang%20%E2%80%94%20Let%27s%20connect&body=Hi%20Shubhang%2C%0A%0A" className="w-10 h-10 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition"><Mail size={16} /></a>
          </div>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#E11D2E] mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/#about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/#projects" className="hover:text-white transition">Projects</Link></li>
            <li><Link href="/#contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#E11D2E] mb-4">Hotkeys</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center justify-between gap-3">
              <span>Command palette</span>
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono-cyber">⌘ K</kbd>
            </li>
            <li className="flex items-center justify-between gap-3">
              <span>Close overlay</span>
              <kbd className="px-2 py-0.5 rounded bg-white/10 text-[11px] font-mono-cyber">ESC</kbd>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-white/40 tracking-wider">
          <div>© {new Date().getFullYear()} Shubhang. All rights reserved.</div>
          <div>Built with intention. Shipped with joy.</div>
        </div>
      </div>
    </footer>
  );
}
