import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-light tracking-[0.2em] uppercase">
            Artist
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            <Link to="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
            <Link to="/press" className="hover:text-primary transition-colors">Press</Link>
            <Link to="/events" className="hover:text-primary transition-colors">Events</Link>
            <Link to="/auth" className="hover:text-primary transition-colors">Stream & Earn</Link>
          </div>
          <Link to="/auth">
            <Button variant="outline" size="sm" className="border-foreground/20 hover:bg-foreground hover:text-background">
              Enter
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={heroBg} 
            alt="Artist" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
        >
          <h1 className="text-5xl md:text-8xl font-light tracking-tight mb-4">
            The Sound
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8">
            A sonic journey through rhythm and emotion
          </p>
          <div className="flex items-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 gap-2">
                <Play className="w-4 h-4" /> Stream Now
              </Button>
            </Link>
            <Link to="/press">
              <Button variant="ghost" size="lg" className="gap-2">
                Press Kit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Gallery Preview - Asymmetric Grid */}
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
            Visual Stories <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 md:col-span-7 aspect-[4/3] overflow-hidden"
          >
            <Link to="/gallery">
              <img 
                src={album1} 
                alt="Gallery image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="col-span-6 md:col-span-5 aspect-square overflow-hidden"
          >
            <Link to="/gallery">
              <img 
                src={album2} 
                alt="Gallery image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-6 md:col-span-5 aspect-[3/4] overflow-hidden"
          >
            <Link to="/gallery">
              <img 
                src={album3} 
                alt="Gallery image" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Music Section */}
      <section className="py-24 px-6 md:px-12 border-t border-border/30">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">Latest Release</h2>
            <h3 className="text-4xl md:text-6xl font-light mb-8">New Album Out Now</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mb-8">
              Experience the full album on your favorite streaming platform. 
              Join our community to earn rewards while you listen.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="lg" className="border-foreground/20">
                Spotify
              </Button>
              <Button variant="outline" size="lg" className="border-foreground/20">
                Apple Music
              </Button>
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary text-primary-foreground">
                  Stream & Earn
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking CTA */}
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
              Available for shows,<br />festivals & collaborations
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a href="mailto:booking@artist.com">
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
          <div className="text-sm text-muted-foreground">
            © 2024 Artist. All rights reserved.
          </div>
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
