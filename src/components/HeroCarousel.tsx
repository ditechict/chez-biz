import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { artist } from "@/content/artist";
import stageAsset from "@/assets/live/stage.jpeg.asset.json";
import liveWhiteAsset from "@/assets/live/live-white.jpeg.asset.json";

interface HeroCarouselProps {
  currentImage?: { image_url: string; alt_text: string };
}

const slides = (currentImage?: HeroCarouselProps["currentImage"]) => [
  {
    image: currentImage?.image_url ?? stageAsset.url,
    alt: currentImage?.alt_text ?? "Che.z Bizzie performing on stage",
    caption: "Lagos, Nigeria",
    position: "object-center",
  },
  {
    image: stageAsset.url,
    alt: "Che.z Bizzie performing on a large stage",
    caption: "Built for the stage",
    position: "object-[55%_center]",
  },
  {
    image: liveWhiteAsset.url,
    alt: "Che.z Bizzie performing in a white cap",
    caption: "Live and direct",
    position: "object-[44%_center]",
  },
];

export const HeroCarousel = ({ currentImage }: HeroCarouselProps) => {
  const items = slides(currentImage);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % items.length), 6500);
    return () => window.clearInterval(timer);
  }, [items.length, paused, reduceMotion]);

  const move = (direction: number) => {
    setActive((value) => (value + direction + items.length) % items.length);
    setPaused(true);
  };

  return (
    <section
      className="relative h-[92svh] min-h-[640px] w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Che.z Bizzie live highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
        touchStart.current = null;
      }}
    >
      <motion.img
        key={items[active].image}
        src={items[active].image}
        alt={items[active].alt}
        className={`absolute inset-0 h-full w-full object-cover ${items[active].position}`}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-hero-overlay" />

      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-12 md:pb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-foreground/70">{artist.genres}</p>
          <h1 className="max-w-5xl text-5xl font-light uppercase leading-[0.9] md:text-8xl lg:text-9xl">
            {artist.nameUpper}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a href="#music">
              <Button size="lg" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
                <Play className="h-4 w-4 fill-current" /> Listen now
              </Button>
            </a>
            <Link to="/gallery" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
              View gallery
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div className="flex items-center gap-2" aria-label={`Slide ${active + 1} of ${items.length}`}>
            {items.map((item, index) => (
              <Button
                key={item.caption}
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-full hover:bg-foreground/10"
                onClick={() => { setActive(index); setPaused(true); }}
                aria-label={`Show slide ${index + 1}: ${item.caption}`}
              >
                <span className={`block h-px transition-all ${index === active ? "w-6 bg-foreground" : "w-3 bg-foreground/40"}`} />
              </Button>
            ))}
            <span className="ml-2 hidden text-xs uppercase tracking-[0.2em] text-foreground/60 sm:inline">{items[active].caption}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full border-foreground/30 bg-background/20 backdrop-blur-md" onClick={() => move(-1)} aria-label="Previous hero image">
              <ChevronLeft />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-foreground/30 bg-background/20 backdrop-blur-md" onClick={() => move(1)} aria-label="Next hero image">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <ArrowDown className="absolute bottom-4 left-1/2 hidden h-4 w-4 -translate-x-1/2 text-foreground/50 md:block" aria-hidden="true" />
    </section>
  );
};