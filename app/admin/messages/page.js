"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Loader2, Lock, Mail } from "lucide-react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");

  const load = async (k) => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/messages?key=${encodeURIComponent(k)}`);
      if (res.status === 401) {
        setErr("Wrong key — try again.");
        setAuthed(false);
        sessionStorage.removeItem("adminKey");
      } else {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
        setAuthed(true);
        sessionStorage.setItem("adminKey", k);
      }
    } catch (_) {
      setErr("Network error.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("adminKey");
    if (saved) { setKey(saved); load(saved); }
  }, []);

  if (!authed) {
    return (
      <main className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
        <div className="comic-bg" />
        <motion.form
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          onSubmit={(e) => { e.preventDefault(); load(key); }}
          className="relative z-10 w-full max-w-md glass rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#E11D2E]/15 border border-[#E11D2E]/40 text-[#E11D2E] flex items-center justify-center">
              <Lock size={20} />
            </div>
            <div>
              <div className="text-xs tracking-[0.3em] uppercase text-[#E11D2E]">// Restricted</div>
              <h1 className="font-display text-2xl">Admin Inbox</h1>
            </div>
          </div>
          <label className="text-xs tracking-wider uppercase text-white/60">Access key</label>
          <input
            autoFocus
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="input-cyber w-full mt-2 px-4 py-3 rounded-lg text-white"
            placeholder="Enter admin key"
          />
          {err && <div className="mt-3 text-sm text-[#E11D2E]">{err}</div>}
          <button
            type="submit"
            disabled={loading || !key}
            className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white font-medium transition red-glow disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : "Enter"}
          </button>
          <p className="mt-4 text-xs text-white/40">Hint: set <code className="text-[#00F0FF]">ADMIN_KEY</code> in <code>.env</code>. Default: <code>spidey</code>.</p>
        </motion.form>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      <div className="comic-bg" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="flex items-center justify-between gap-4 flex-wrap"
        >
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-2">// Inbox</div>
            <h1 className="font-display text-4xl md:text-5xl">
              Incoming <span className="text-[#E11D2E] text-glow-red">signals</span>
            </h1>
            <p className="text-white/60 mt-2 text-sm">Contact-form submissions, freshest first.</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => load(key)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-white/10 transition text-sm">
              <Loader2 size={14} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button onClick={() => { sessionStorage.removeItem("adminKey"); setAuthed(false); setKey(""); }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-[#E11D2E]/60 hover:text-[#E11D2E] transition text-sm">
              Lock
            </button>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4">
          {loading && (
            <div className="glass rounded-2xl p-8 flex items-center gap-3 text-white/70">
              <Loader2 className="animate-spin" size={18} /> Loading messages...
            </div>
          )}
          {!loading && messages.length === 0 && (
            <div className="glass rounded-2xl p-10 text-center text-white/60">
              <Inbox className="mx-auto mb-3 text-[#E11D2E]" size={28} />
              No messages yet. Your inbox is clean — for now.
            </div>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.04 }}
              className="glass rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-4 md:items-start"
            >
              <div className="w-10 h-10 rounded-lg bg-[#E11D2E]/15 border border-[#E11D2E]/30 text-[#E11D2E] flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="font-display text-lg">{m.name}</div>
                  <a href={`mailto:${m.email}`} className="text-xs text-[#00F0FF] hover:underline">{m.email}</a>
                  <span className="ml-auto text-[11px] text-white/40 font-mono-cyber tracking-wider">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="mt-2 text-white/80 whitespace-pre-wrap break-words">{m.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default App;
