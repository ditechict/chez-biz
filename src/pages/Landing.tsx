import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGalleryImages } from "@/hooks/useSiteContent";
import { artist } from "@/content/artist";
import { featuredTracks, spotifyArtistId } from "@/content/music";
import { HeroCarousel } from "@/components/HeroCarousel";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";

const Landing = () => {
  const { data: images = [] } = useGalleryImages();
  const hero = images[0];
  const preview = images.slice(1, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-light tracking-[0.2em] uppercase">
            {artist.nameUpper}
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/press" className="hover:text-primary transition-colors">Press</Link>
            <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
          </div>
          <a href={`mailto:${artist.bookingEmail}`}>
            <Button variant="outline" size="sm" className="border-foreground/20 hover:bg-foreground hover:text-background">
              Booking
            </Button>
          </a>
        </div>
      </nav>

      <HeroCarousel currentImage={hero} />

      {/* Gallery preview */}
      <section className="py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-2">Gallery</h2>
          <Link to="/gallery" className="text-3xl md:text-4xl font-light hover:text-primary transition-colors inline-flex items-center gap-3">
            Stages &amp; Portraits <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {preview.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={
                index === 0
                  ? "col-span-12 md:col-span-7 aspect-[4/3] overflow-hidden"
                  : index === 1
                    ? "col-span-6 md:col-span-5 aspect-square overflow-hidden"
                    : "col-span-6 md:col-span-5 aspect-[3/4] overflow-hidden"
              }
            >
              <Link to="/gallery">
                <img
                  src={image.image_url}
                  alt={image.alt_text}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Music */}
      <section id="music" className="scroll-mt-16 border-t border-border/30 px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">The Music</h2>
            <h3 className="mb-8 text-4xl font-light leading-tight md:text-6xl">Warm vocals.<br />Patient grooves.</h3>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Afrobeats, R&amp;B and contemporary pop written and recorded independently in Lagos. Five songs, each carrying a different angle of the same measured, melodic voice.
            </p>
          </motion.div>
          <div className="space-y-10">
            {featuredTracks.map((track, index) => (
              <motion.article key={track.spotifyId} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: Math.min(index, 3) * 0.08 }} className="border-t border-border/50 pt-5">
                <div className="mb-4 grid grid-cols-[2rem_1fr] gap-3">
                  <span className="pt-1 text-xs tabular-nums text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                  <div><h4 className="text-2xl font-light">{track.title}</h4><p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{track.description}</p></div>
                </div>
                <SpotifyEmbed type="track" spotifyId={track.spotifyId} title={track.title} compact />
              </motion.article>
            ))}
            <div className="border-t border-border/50 pt-8">
              <h4 className="mb-4 text-xs uppercase tracking-[0.24em] text-muted-foreground">More from Che.z Bizzie</h4>
              <SpotifyEmbed type="artist" spotifyId={spotifyArtistId} title="Che.z Bizzie catalog" />
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="py-24 px-6 md:px-12 border-t border-border/30">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">Booking</h2>
            <p className="text-3xl md:text-5xl font-light">
              Available for shows,<br />festivals &amp; collaborations
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href={`mailto:${artist.bookingEmail}`}>
              <Button size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground hover:text-background gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} {artist.name}. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/press" className="hover:text-primary transition-colors">Press</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
