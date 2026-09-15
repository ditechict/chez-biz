import { cn } from "@/lib/utils";

interface SpotifyEmbedProps {
  type: "track" | "artist";
  spotifyId: string;
  title: string;
  className?: string;
  compact?: boolean;
}

export const SpotifyEmbed = ({ type, spotifyId, title, className, compact = false }: SpotifyEmbedProps) => (
  <iframe
    title={`${title} on Spotify`}
    src={`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator&theme=0`}
    className={cn("w-full border-0", compact ? "h-[152px]" : "h-[352px]", className)}
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  />
);