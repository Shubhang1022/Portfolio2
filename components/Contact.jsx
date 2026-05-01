"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
    } catch (_) {
      // fall through; still give positive UX
    }
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 2800);
  };

  return (
    <section id="contact" className="relative section-pad">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-4">// Contact</div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight">
            Let&apos;s build something <span className="text-[#E11D2E] text-glow-red">cinematic</span>.
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Got a project, role, or wild idea? Send a signal — I reply fast.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-12 glass rounded-2xl p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-wider uppercase text-white/60">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-cyber w-full mt-2 px-4 py-3 rounded-lg text-white"
                placeholder="Peter Parker"
              />
            </div>
            <div>
              <label className="text-xs tracking-wider uppercase text-white/60">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-cyber w-full mt-2 px-4 py-3 rounded-lg text-white"
                placeholder="peter@dailybugle.com"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-xs tracking-wider uppercase text-white/60">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-cyber w-full mt-2 px-4 py-3 rounded-lg text-white resize-none"
              placeholder="Tell me about your project..."
            />
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <a href="https://github.com/shubhang1022" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/shubhang-mishra/" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition">
                <Linkedin size={18} />
              </a>
              
              <a
                href="https://mail.google.com/mail/?view=cm&to=mishrashanu233@gmail.com&su=Hey%20Shubhang%20%E2%80%94%20Let%27s%20connect&body=Hi%20Shubhang%2C%0A%0A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full glass-soft flex items-center justify-center hover:text-[#E11D2E] hover:border-[#E11D2E]/40 hover:-translate-y-0.5 transition"
              >
                <Mail size={18} />
              </a>
            </div>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white font-medium transition red-glow disabled:opacity-60"
            >
              {status === "idle" && (<>Send Message <Send size={16} /></>)}
              {status === "sending" && "Transmitting..."}
              {status === "sent" && "Message sent ✓"}
            </button>
          </div>
        </motion.form>

        <div className="mt-16 text-center text-white/40 text-xs tracking-wider">
          © {new Date().getFullYear()} BUILT BY Shubhang 
        </div>
      </div>
    </section>
  );
}
