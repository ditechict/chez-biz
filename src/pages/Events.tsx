import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  date: string;
  month: string;
  day: string;
  venue: string;
  city: string;
  country: string;
  ticketUrl?: string;
  soldOut?: boolean;
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    date: "2024-03-15",
    month: "MAR",
    day: "15",
    venue: "Warehouse 23",
    city: "Berlin",
    country: "Germany",
    ticketUrl: "#",
  },
  {
    id: "2",
    date: "2024-03-22",
    month: "MAR",
    day: "22",
    venue: "Fabric",
    city: "London",
    country: "UK",
    soldOut: true,
  },
  {
    id: "3",
    date: "2024-04-05",
    month: "APR",
    day: "05",
    venue: "Rex Club",
    city: "Paris",
    country: "France",
    ticketUrl: "#",
  },
  {
    id: "4",
    date: "2024-04-18",
    month: "APR",
    day: "18",
    venue: "Shelter",
    city: "Amsterdam",
    country: "Netherlands",
    ticketUrl: "#",
  },
  {
    id: "5",
    date: "2024-05-10",
    month: "MAY",
    day: "10",
    venue: "Movement Festival",
    city: "Detroit",
    country: "USA",
    ticketUrl: "#",
  },
];

const Events = () => {
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
          <h1 className="text-4xl md:text-6xl font-light mb-4">Events</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Upcoming shows and festival appearances
          </p>
        </motion.div>
      </section>

      {/* Events List */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-4xl">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-border/30 py-8 flex flex-col md:flex-row md:items-center gap-6"
            >
              {/* Date */}
              <div className="flex-shrink-0 w-20">
                <div className="text-sm text-muted-foreground tracking-wide">{event.month}</div>
                <div className="text-4xl font-light">{event.day}</div>
              </div>

              {/* Venue Info */}
              <div className="flex-grow">
                <h3 className="text-xl font-medium mb-1">{event.venue}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{event.city}, {event.country}</span>
                </div>
              </div>

              {/* Action */}
              <div className="flex-shrink-0">
                {event.soldOut ? (
                  <Button variant="outline" size="sm" disabled className="border-foreground/20">
                    Sold Out
                  </Button>
                ) : event.ticketUrl ? (
                  <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-foreground/20 hover:bg-foreground hover:text-background gap-2">
                      Tickets <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" size="sm" disabled className="border-foreground/20">
                    TBA
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* No Events Fallback (commented out - use when no events) */}
      {upcomingEvents.length === 0 && (
        <section className="px-6 md:px-12 py-24 text-center">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-light mb-4">No upcoming events</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Check back soon for new show announcements. Follow on social media for the latest updates.
          </p>
        </section>
      )}

      {/* Booking CTA */}
      <section className="px-6 md:px-12 py-16 border-t border-border/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 max-w-4xl">
          <div>
            <h2 className="text-2xl font-light mb-2">Book for your event</h2>
            <p className="text-muted-foreground">Available for festivals, clubs, and private events</p>
          </div>
          <a href="mailto:booking@artist.com">
            <Button variant="outline" className="border-foreground/20 hover:bg-foreground hover:text-background">
              Contact Booking
            </Button>
          </a>
        </div>
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
            <Link to="/press" className="hover:text-primary transition-colors">Press</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;
