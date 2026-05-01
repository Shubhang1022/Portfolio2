"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Send, MapPin, User, MessageSquare, CheckCircle, Loader2, Pencil, Trash2, X, Check } from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "my_review_tokens"; // { [reviewId]: token }
const ACCENTS = [
  "from-[#E11D2E] to-[#7a0b17]",
  "from-[#0A0F2C] to-[#1b2a72]",
  "from-[#00F0FF] to-[#0a6e77]",
  "from-[#E11D2E] to-[#0A0F2C]",
  "from-[#7a0b17] to-[#050505]",
  "from-[#0A0F2C] to-[#00F0FF]",
];

function getInitials(name) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}
function getAccent(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return ACCENTS[Math.abs(h) % ACCENTS.length];
}
function loadTokens() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveToken(id, token) {
  const t = loadTokens();
  t[id] = token;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
}
function removeToken(id) {
  const t = loadTokens();
  delete t[id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(t));
}

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", place: "", review: "", rating: 5 });
  const [myTokens, setMyTokens] = useState(() => {
    // Load synchronously so isOwner is correct on first render
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  });

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      if (Array.isArray(data)) setReviews(data);
    } catch (_) {}
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
    // Sync tokens again after mount (in case SSR returned empty)
    setMyTokens(loadTokens());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.place.trim() || !form.review.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed");
      // Save token so this user can edit/delete later
      saveToken(data.id, data.token);
      setMyTokens(loadTokens());
      setSubmitted(true);
      setForm({ name: "", place: "", review: "", rating: 5 });
      fetchReviews();
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    const token = myTokens[id];
    if (!token) return;
    try {
      await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      removeToken(id);
      setMyTokens(loadTokens());
      fetchReviews();
    } catch (_) {}
  };

  const handleEdit = async (id, updated) => {
    const token = myTokens[id];
    if (!token) throw new Error("No token");
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...updated, token }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || "Failed");
    fetchReviews();
  };

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : "5.0";

  return (
    <section id="testimonials" className="relative section-pad overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[900px] h-[300px] rounded-full bg-[#E11D2E]/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-xs tracking-[0.4em] uppercase text-[#E11D2E] mb-4">// Word on the street</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Kind words from <span className="text-[#E11D2E] text-glow-red">great people</span>.
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-1 text-[#00F0FF]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className="fill-current" />)}
              <span className="ml-2 text-sm text-white/60">
                {avgRating} · {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>
            <button
              onClick={() => { setShowForm((v) => !v); setSubmitted(false); }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E11D2E]/40 text-[#E11D2E] text-xs font-medium hover:bg-[#E11D2E]/10 transition"
            >
              <MessageSquare size={13} />
              {showForm ? "Hide form" : "Leave a review"}
            </button>
          </div>
        </motion.div>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10 max-w-2xl mx-auto">
                <div className="relative rounded-2xl glass border border-white/10 p-7 overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E11D2E]/60 to-transparent"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-8 text-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 mx-auto mb-4">
                          <CheckCircle size={28} className="text-green-400" />
                        </motion.div>
                        <h4 className="font-display text-xl text-white mb-2">Thank you! 🕷️</h4>
                        <p className="text-white/50 text-sm">Your review has been posted. You can edit or delete it anytime.</p>
                        <button onClick={() => setSubmitted(false)} className="mt-5 text-xs text-[#E11D2E] hover:underline">Write another</button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
                        <h4 className="font-display text-lg text-white mb-5">Share your experience</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="relative">
                            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                            <input type="text" placeholder="Your name" value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={80}
                              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2E]/50 transition" />
                          </div>
                          <div className="relative">
                            <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                            <input type="text" placeholder="City / Country" value={form.place}
                              onChange={(e) => setForm({ ...form, place: e.target.value })} maxLength={100}
                              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2E]/50 transition" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-white/40">Rating:</span>
                          <div className="flex gap-1">
                            {[1,2,3,4,5].map((star) => (
                              <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })} className="transition hover:scale-110">
                                <Star size={18} className={star <= form.rating ? "fill-[#00F0FF] text-[#00F0FF]" : "text-white/20"} />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="relative">
                          <textarea placeholder="What was it like working with Shubhang or using his work?"
                            value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })}
                            maxLength={1000} rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#E11D2E]/50 transition resize-none" />
                          <span className="absolute bottom-3 right-3 text-[10px] text-white/20">{form.review.length}/1000</span>
                        </div>
                        {error && <p className="text-red-400 text-xs p-3 rounded-lg bg-red-500/10 border border-red-500/20">{error}</p>}
                        <motion.button type="submit" disabled={submitting}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white text-sm font-medium transition disabled:opacity-60"
                          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                          {submitting ? "Posting..." : "Post Review"}
                        </motion.button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="mt-14">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-white/30">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Loading reviews...</span>
            </div>
          ) : reviews.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="text-5xl mb-4">🕷️</div>
              <p className="text-white/40 text-sm">No reviews yet — be the first!</p>
              <button onClick={() => setShowForm(true)} className="mt-4 text-[#E11D2E] text-sm hover:underline">Leave a review →</button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {reviews.map((r, i) => (
                <ReviewCard
                  key={r.id || i}
                  r={r}
                  i={i}
                  isOwner={!!myTokens[r.id]}
                  onDelete={() => handleDelete(r.id)}
                  onEdit={(updated) => handleEdit(r.id, updated)}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

function ReviewCard({ r, i, isOwner, onDelete, onEdit }) {
  const accent = getAccent(r.name);
  const initials = getInitials(r.name);
  const date = r.created_at
    ? new Date(r.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : "";

  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editForm, setEditForm] = useState({ name: r.name, place: r.place, review: r.review, rating: r.rating || 5 });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    if (!editForm.review.trim()) return;
    setSaving(true);
    setSaveError("");
    try {
      await onEdit(editForm);
      setEditing(false);
    } catch (e) {
      setSaveError("Failed to save. Try again.");
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setSaveError("");
    // reset form back to original
    setEditForm({ name: r.name, place: r.place, review: r.review, rating: r.rating || 5 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
      className="relative glass rounded-2xl p-7 overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.08] pointer-events-none`} />

      {/* Owner buttons */}
      {isOwner && !editing && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
          <button
            type="button"
            onClick={() => { setEditing(true); setConfirmDelete(false); }}
            title="Edit"
            className="w-7 h-7 rounded-full bg-white/8 hover:bg-[#00F0FF]/15 border border-white/10 hover:border-[#00F0FF]/40 flex items-center justify-center text-white/50 hover:text-[#00F0FF] transition"
          >
            <Pencil size={12} />
          </button>
          {confirmDelete ? (
            <>
              <button type="button" onClick={onDelete}
                className="w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/30 transition"
                title="Confirm delete">
                <Check size={12} />
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)}
                className="w-7 h-7 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition"
                title="Cancel">
                <X size={12} />
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)} title="Delete"
              className="w-7 h-7 rounded-full bg-white/8 hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 flex items-center justify-center text-white/50 hover:text-red-400 transition">
              <Trash2 size={12} />
            </button>
          )}
        </div>
      )}

      {editing ? (
        <div className="space-y-3 relative z-10">
          {/* Edit header */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#00F0FF] tracking-wider uppercase font-medium">Editing your review</span>
          </div>

          {/* Name + Place */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Name"
              maxLength={80}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E11D2E]/60 transition"
            />
            <input
              type="text"
              value={editForm.place}
              onChange={(e) => setEditForm((f) => ({ ...f, place: e.target.value }))}
              placeholder="City / Country"
              maxLength={100}
              className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E11D2E]/60 transition"
            />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/40 mr-1">Rating:</span>
            {[1,2,3,4,5].map((star) => (
              <button key={star} type="button" onClick={() => setEditForm((f) => ({ ...f, rating: star }))}>
                <Star size={16} className={star <= editForm.rating ? "fill-[#00F0FF] text-[#00F0FF]" : "text-white/20"} />
              </button>
            ))}
          </div>

          {/* Review text */}
          <textarea
            value={editForm.review}
            onChange={(e) => setEditForm((f) => ({ ...f, review: e.target.value }))}
            maxLength={1000}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#E11D2E]/60 transition resize-none"
          />

          {/* Error */}
          {saveError && (
            <p className="text-red-400 text-xs px-1">{saveError}</p>
          )}

          {/* Save / Cancel */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-[#E11D2E] hover:bg-[#ff2a3d] text-white text-xs font-medium transition disabled:opacity-60"
            >
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2.5 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-xs transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <Quote className="relative text-[#E11D2E]/80" size={22} />
          <blockquote className="relative mt-4 text-white/85 leading-relaxed text-[15px]">
            &ldquo;{r.review}&rdquo;
          </blockquote>
          <figcaption className="relative mt-6 flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${accent} border border-white/10 flex items-center justify-center font-display text-sm text-white shrink-0`}>
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate flex items-center gap-1.5">
                {r.name}
                {isOwner && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E11D2E]/15 border border-[#E11D2E]/30 text-[#E11D2E] font-mono-cyber">you</span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin size={10} className="text-white/30 shrink-0" />
                <span className="text-xs text-white/45 truncate">{r.place}</span>
                {date && <span className="text-white/20 text-xs">· {date}</span>}
              </div>
            </div>
            <div className="flex items-center gap-0.5 text-[#00F0FF] shrink-0">
              {Array.from({ length: r.rating || 5 }).map((_, k) => (
                <Star key={k} size={11} className="fill-current" />
              ))}
            </div>
          </figcaption>
        </>
      )}
    </motion.div>
  );
}
