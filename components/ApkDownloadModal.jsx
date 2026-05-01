"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download, ShieldCheck, AlertTriangle } from "lucide-react";
import { useRef } from "react";

export default function ApkDownloadModal({ project, onClose }) {
  const linkRef = useRef(null);

  const handleDownload = () => {
    // trigger real download
    const a = document.createElement("a");
    a.href = project.demo;
    a.download = `${project.title.replace(/\s+/g, "-")}.apk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[300] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-green-500/10 blur-2xl scale-110" />

          <div className="relative rounded-3xl glass border border-white/10 overflow-hidden">
            {/* Top shimmer */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/60 to-transparent"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Header */}
            <div className="relative p-6 pb-0 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30">
                  <Smartphone size={22} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">Android App</h3>
                  <p className="text-white/40 text-xs mt-0.5">{project.title} · APK File</p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/30 hover:text-white transition mt-1">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* App info card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/8">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center shrink-0`}>
                  <span className="text-2xl">🌿</span>
                </div>
                <div>
                  <div className="text-white font-medium">{project.title}</div>
                  <div className="text-white/50 text-xs mt-0.5">{project.tagline}</div>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 font-mono-cyber">
                      .APK
                    </span>
                    <span className="text-[10px] text-white/30">Android Application Package</span>
                  </div>
                </div>
              </div>

              {/* Warning notice */}
              <div className="flex gap-3 p-4 rounded-2xl bg-amber-500/8 border border-amber-500/20">
                <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-white/60 leading-relaxed">
                  <span className="text-amber-400 font-medium">Before installing:</span> You may need to enable{" "}
                  <span className="text-white/80">"Install from unknown sources"</span> in your Android settings
                  (Settings → Security → Unknown Sources).
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {[
                  { n: "1", t: "Download the APK file to your Android device" },
                  { n: "2", t: 'Enable "Install unknown apps" in Settings if prompted' },
                  { n: "3", t: "Open the downloaded file and tap Install" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-3 text-xs text-white/50">
                    <span className="w-5 h-5 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-[10px] text-white/60 shrink-0 font-medium">
                      {s.n}
                    </span>
                    {s.t}
                  </div>
                ))}
              </div>

              {/* Security note */}
              <div className="flex items-center gap-2 text-xs text-white/30">
                <ShieldCheck size={13} className="text-green-400/60" />
                This APK is built and distributed directly by the developer.
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition"
              >
                Cancel
              </button>
              <motion.button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download APK
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
