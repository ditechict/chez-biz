import { useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export const YouTubeEmbed = ({ youtubeId, title, className }: YouTubeEmbedProps) => {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden border border-border/50 bg-card", className)}>
      {active ? (
        <iframe
          title={`${title} — official video`}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          className="absolute inset-0 h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${title} video`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <img
            src={`https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`}
            alt={`${title} video thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.src = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
            }}
          />
          <span className="absolute inset-0 bg-background/30 transition-colors group-hover:bg-background/20" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/40 bg-background/50 backdrop-blur-sm transition-colors group-hover:border-foreground">
            <Play className="h-6 w-6 translate-x-[1px] fill-current" />
          </span>
        </button>
      )}
    </div>
  );
};
