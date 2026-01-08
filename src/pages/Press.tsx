import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";

const Press = () => {
  const shortBio = `A boundary-pushing artist whose sonic landscape defies categorization. Blending electronic textures with organic instrumentation, they've cultivated a devoted following through immersive live performances and critically acclaimed releases. Their work has been featured in major publications and streaming platforms worldwide.`;

  const longBio = `Emerging from the underground electronic scene, this visionary artist has spent the past decade crafting a unique sonic identity that bridges the gap between experimental and accessible. Their journey began in small clubs and warehouse parties, where they honed a performance style that emphasizes emotional connection and sonic innovation.

Their debut album received widespread critical acclaim, earning spots on year-end lists and establishing them as a force in contemporary music. Subsequent releases have continued to push boundaries while maintaining the emotional core that defines their work.

Beyond the studio, they've become known for transformative live experiences that blend cutting-edge visuals with powerful sound design. From intimate venues to festival main stages, each performance is crafted as a unique journey for the audience.

Collaborations span genres and mediums, working with visual artists, filmmakers, and musicians across the spectrum. Their commitment to artistic integrity while embracing innovation has positioned them at the forefront of a new wave of creators redefining what's possible in electronic music.`;

  const pressPhotos = [
    { id: "1", src: heroBg, title: "Press Photo 1 - High Res" },
    { id: "2", src: album1, title: "Press Photo 2 - High Res" },
    { id: "3", src: album2, title: "Press Photo 3 - High Res" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 py-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm tracking-wide">Back</span>
        </Link>
        <Link to="/" className="text-xl font-light tracking-[0.2em] uppercase">
          Artist
        </Link>
        <div className="w-20" />
      </header>

      {/* Hero */}
      <section className="px-6 md:px-12 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-4">Press Kit</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Electronic Press Kit for media and industry professionals
          </p>
        </motion.div>
      </section>

      {/* Short Bio */}
      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Short Bio</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed">{shortBio}</p>
        </motion.div>
      </section>

      {/* Long Bio */}
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
            {longBio.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Press Photos */}
      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">Press Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pressPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden bg-card"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="outline" className="gap-2 border-foreground/20">
                    <Download className="w-4 h-4" /> Download
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Music Embeds */}
      <section className="px-6 md:px-12 py-12 border-t border-border/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8">Featured Tracks</h2>
          <div className="space-y-6 max-w-2xl">
            {/* Spotify Embed Placeholder */}
            <div className="bg-card/50 border border-border/30 rounded-lg p-6 flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Latest Single</p>
                <p className="text-sm text-muted-foreground">Stream on Spotify</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-foreground/20">
                <ExternalLink className="w-4 h-4" /> Open
              </Button>
            </div>
            
            <div className="bg-card/50 border border-border/30 rounded-lg p-6 flex items-center justify-between">
              <div>
                <p className="font-medium mb-1">Album - Full Project</p>
                <p className="text-sm text-muted-foreground">Stream on Apple Music</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2 border-foreground/20">
                <ExternalLink className="w-4 h-4" /> Open
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Booking CTA */}
      <section className="px-6 md:px-12 py-24 border-t border-border/30 bg-card/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-6">Booking & Inquiries</h2>
          <p className="text-muted-foreground text-lg mb-8">
            For booking requests, press inquiries, and collaboration opportunities
          </p>
          <a href="mailto:booking@artist.com">
            <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
              <Mail className="w-5 h-5" /> booking@artist.com
            </Button>
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            © 2024 Artist. All rights reserved.
          </div>
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
