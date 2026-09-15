import { useState } from "react";
import { Headphones, PauseCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotifyEmbed } from "@/components/SpotifyEmbed";
import { featuredTracks, spotifyArtistId } from "@/content/music";

export const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const track = featuredTracks[currentTrack];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-y border-border/50 py-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <PauseCircle className="h-5 w-5" />
          <span>Rewards paused. Listening does not earn points.</span>
        </div>
        <Headphones className="h-5 w-5 text-foreground" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="min-w-0">
          <SpotifyEmbed type="track" spotifyId={track.spotifyId} title={track.title} compact />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{track.description}</p>
        </div>
        <div className="space-y-1 border-t border-border/50 pt-3 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          {featuredTracks.map((item, index) => (
            <Button
              key={item.spotifyId}
              variant="ghost"
              className={`h-auto w-full justify-start rounded-none px-3 py-3 text-left ${index === currentTrack ? "bg-secondary text-foreground" : "text-muted-foreground"}`}
              onClick={() => setCurrentTrack(index)}
            >
              <span className="w-6 text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="truncate">{item.title}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="border-t border-border/50 pt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">Complete catalog</p>
        <SpotifyEmbed type="artist" spotifyId={spotifyArtistId} title="Che.z Bizzie catalog" />
      </div>
    </div>
  );
};