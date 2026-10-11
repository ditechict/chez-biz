import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "@/pages/Landing";
import Gallery from "@/pages/Gallery";
import Press from "@/pages/Press";
import Events from "@/pages/Events";
import Dashboard from "@/pages/Dashboard";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/NotFound";

export function PageTransitions() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => {
      if (!location.hash) window.scrollTo({ top: 0, behavior: "instant" });
    }}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: reducedMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reducedMotion ? 1 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <HashPosition hash={location.hash} />
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/press" element={<Press />} />
          <Route path="/events" element={<Events />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/app" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function HashPosition({ hash }: { hash: string }) {
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  return null;
}