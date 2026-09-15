import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePressAssets } from "@/hooks/useSiteContent";
import { artist } from "@/content/artist";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";

const Press = () => {
  const { data: assets = [] } = usePressAssets();

  const photos = assets.filter((a) => a.asset_type === "photo" && a.file_url);
  const logos = assets.filter((a) => a.asset_type === "logo" && a.file_url);
  const listening = assets.filter((a) => (a.asset_type === "audio" || a.asset_type === "video") && a.external_url);

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
          <h1 className="text-4xl md:text-6xl font-light mb-4">{artist.nameUpper}</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Electronic Press Kit · {artist.genres} · {artist.base}
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Short Bio</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed">{artist.shortBio}</p>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Full Bio</h2>
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
            {artist.longBio.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl grid grid-cols-2 gap-8 text-sm"
        >
          <div>
            <div className="text-muted-foreground mb-1">Legal name</div>
            <div>{artist.legalName}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Based in</div>
            <div>{artist.base}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Genres</div>
            <div>{artist.genres}</div>
          </div>
          <div>
            <div className="text-muted-foreground mb-1">Active since</div>
            <div>{artist.activeSince} · Independent</div>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">Press Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden bg-card"
              >
                <img src={photo.file_url!} alt={photo.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <a href={photo.file_url!} download>
                    <Button variant="outline" className="gap-2 border-foreground/20">
                      <Download className="w-4 h-4" /> Download
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {logos.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-6">
              {logos.map((logo) => (
                <a key={logo.id} href={logo.file_url!} download className="group">
                  <div className="w-40 h-40 bg-card overflow-hidden">
                    <img src={logo.file_url!} alt={logo.title} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" /> Logo
                  </div>
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">Listen</h2>
          <div className="space-y-6 max-w-2xl">
            {listening.map((item) => (
              <div
                key={item.id}
                className="bg-card/50 border border-border/30 rounded-lg p-6 flex items-center justify-between gap-4"
              >
                <div>
                  <p className="font-medium mb-1">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                 {item.asset_type === "audio" && item.external_url.includes("/track/") && (
                   <SpotifyEmbed type="track" spotifyId={item.external_url.split("/track/")[1].split("?")[0]} title={item.title} compact className="mt-4" />
                 )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-24 border-t border-border/30 bg-card/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-6">Booking &amp; Inquiries</h2>
          <p className="text-muted-foreground text-lg mb-8">
            For booking requests, press inquiries, and collaboration opportunities
          </p>
          <a href={`mailto:${artist.bookingEmail}`}>
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Mail className="w-5 h-5" /> {artist.bookingEmail}
            </Button>
          </a>
        </motion.div>
      </section>

      <footer className="py-12 px-6 md:px-12 border-t border-border/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} {artist.name}. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Press;
