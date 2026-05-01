"use client";
import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import EntryAnimation from "@/components/EntryAnimation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CustomCursor from "@/components/CustomCursor";

// Lazy load everything below the fold
const About        = lazy(() => import("@/components/About"));
const SkillsMarquee= lazy(() => import("@/components/SkillsMarquee"));
const Projects     = lazy(() => import("@/components/Projects"));
const Journey      = lazy(() => import("@/components/Journey"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact      = lazy(() => import("@/components/Contact"));
const Footer       = lazy(() => import("@/components/Footer"));
const SwingingSpider = lazy(() => import("@/components/SwingingSpider"));
const CommandPalette = lazy(() => import("@/components/CommandPalette"));

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <div className="comic-bg" />
      {!ready && <EntryAnimation onComplete={() => setReady(true)} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <Navbar />
        <Hero />
        <Suspense fallback={null}>
          <About />
          <SkillsMarquee />
          <Projects />
          <Journey />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </motion.div>
      <CustomCursor />
      <Suspense fallback={null}>
        <SwingingSpider />
        <CommandPalette />
      </Suspense>
    </main>
  );
};

export default App;
