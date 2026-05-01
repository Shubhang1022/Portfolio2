export const notes = [
  {
    slug: "designing-cinematic-portfolios",
    title: "Designing cinematic portfolios without the cheese",
    excerpt:
      "How to use motion, typography and restraint to make a portfolio feel alive — without turning it into a theme-park ride.",
    date: "2025-04-12",
    readTime: "6 min",
    tag: "Design",
    body: `A cinematic site doesn't mean more animation — it means the right animation.

Start with intent. Every motion should answer: what is it telling the user? If you can't answer, cut it.

Next, choose one hero moment per section and commit. Parallax in the hero. A subtle scale-in on the about image. Cards that tilt gently on hover. That's enough. Restraint is the secret sauce of premium.

Finally, respect the reader's attention: reduce motion by default, disable heavy effects on mobile, and make transitions feel continuous (never hard cuts). Cinematic = continuous.`,
  },
  {
    slug: "building-rag-that-doesnt-hallucinate",
    title: "Building RAG that actually doesn't hallucinate",
    excerpt:
      "Hybrid retrieval, re-ranking and schema-guarded outputs — a practical stack for grounded, production-quality answers.",
    date: "2025-03-03",
    readTime: "9 min",
    tag: "AI",
    body: `Most "RAG" demos work on ten docs. Production is different.

At 1M+ pages, vanilla dense retrieval falls apart. What works: hybrid retrieval (BM25 + dense), cross-encoder re-ranking on the top 50, and a tight prompt that forces citation spans.

Never trust the model to hallucinate the answer from thin context. Return "I don't know" when the retrieval score is low. Users forgive honesty; they don't forgive wrong confidence.`,
  },
  {
    slug: "the-one-framer-motion-trick",
    title: "The one Framer Motion trick I use everywhere",
    excerpt:
      "useSpring + useTransform on a motion value makes any interaction feel dialed-in. Here's the pattern, and when to reach for it.",
    date: "2025-01-20",
    readTime: "4 min",
    tag: "Code",
    body: `Most motion in product UIs is linear or eased — it feels fine, but not alive. Wrap a motion value in a spring, and suddenly your interaction has weight.

The pattern: useMotionValue → useSpring → useTransform. It costs you 3 lines and buys an order of magnitude of feel. Every parallax, magnetic button, and scroll camera in my stack uses this.`,
  },
];

export const getNote = (slug) => notes.find((n) => n.slug === slug);
