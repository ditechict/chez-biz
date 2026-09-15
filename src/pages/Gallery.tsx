import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGalleryImages } from "@/hooks/useSiteContent";
import { artist } from "@/content/artist";

const Gallery = () => {

const Gallery = () => {
  const { data: images = [], isLoading } = useGalleryImages();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, goToPrevious, goToNext]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="px-6 py-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm tracking-wide">Back</span>
        </Link>
        <Link to="/" className="text-xl font-light tracking-[0.2em] uppercase">
          {artist.nameUpper}
        </Link>
        <div className="w-20" />
      </header>

      <section className="px-6 md:px-12 py-12 md:py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-6xl font-light mb-4">Gallery</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Stages, studios and street portraits from Lagos and beyond
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 pb-24">
        {isLoading ? (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="col-span-6 md:col-span-4 aspect-square bg-muted/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 md:gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.08 }}
                className={`${spanFor(image.size)} overflow-hidden cursor-pointer`}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedIndex !== null && images[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6 z-10 text-foreground hover:bg-foreground/10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 md:left-8 z-10 text-foreground hover:bg-foreground/10"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 md:right-8 z-10 text-foreground hover:bg-foreground/10"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[selectedIndex].image_url}
              alt={images[selectedIndex].alt_text}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              {images[selectedIndex].caption ? `${images[selectedIndex].caption} — ` : ""}
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
