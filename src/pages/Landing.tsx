import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGalleryImages } from "@/hooks/useSiteContent";
import { artist } from "@/content/artist";

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

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {hero && (
            <img src={hero.image_url} alt={hero.alt_text} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-4">{artist.nameUpper}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8">
            {artist.tagline} — {artist.genres} from {artist.base}
          </p>
          <div className="flex items-center gap-4">
            <a href={artist.spotifyArtist} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                <Play className="w-4 h-4" /> Listen
              </Button>
            </a>
            <Link to="/press">
              <Button variant="ghost" size="lg" className="gap-2">
                Press Kit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

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
      <section className="py-24 px-6 md:px-12 border-t border-border/30">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">The Music</h2>
            <h3 className="text-4xl md:text-6xl font-light mb-8">Beautiful. Quality.</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Afrobeats, R&amp;B and contemporary pop written and recorded independently in Lagos.
              Warm vocals, patient grooves, songs built to last past the season.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={artist.spotifyArtist} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-foreground/20">
                  Spotify
                </Button>
              </a>
              <a href={artist.youtube} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-foreground/20">
                  YouTube
                </Button>
              </a>
              <a href={artist.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="border-foreground/20">
                  Instagram
                </Button>
              </a>
            </div>
          </motion.div>
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
            <Link to="/auth" className="hover:text-primary transition-colors">Fan Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
