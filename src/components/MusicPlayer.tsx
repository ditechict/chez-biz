import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Shuffle, Repeat } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import album1 from "@/assets/album-1.jpg";
import album2 from "@/assets/album-2.jpg";
import album3 from "@/assets/album-3.jpg";

const mockTracks = [
  { id: 1, title: "Neon Dreams", artist: "Synthwave Collective", album: "Midnight Drive", image: album1, duration: 245 },
  { id: 2, title: "Electric Pulse", artist: "Cyber Echo", album: "Digital Horizons", image: album2, duration: 198 },
  { id: 3, title: "Cosmic Flow", artist: "Stellar Beats", album: "Space Odyssey", image: album3, duration: 312 },
];

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [isLiked, setIsLiked] = useState(false);

  const track = mockTracks[currentTrack];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % mockTracks.length);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + mockTracks.length) % mockTracks.length);
    setCurrentTime(0);
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      {/* Album Art & Info */}
      <div className="flex items-start gap-6">
        <div className="relative group">
          <img 
            src={track.image} 
            alt={track.album}
            className="w-32 h-32 rounded-xl object-cover shadow-glow-primary"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-smooth rounded-xl" />
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            {track.title}
          </h3>
          <p className="text-muted-foreground">{track.artist}</p>
          <p className="text-sm text-muted-foreground">{track.album}</p>
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsLiked(!isLiked)}
          className="hover:scale-110 transition-smooth"
        >
          <Heart className={isLiked ? "fill-accent text-accent" : ""} />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={track.duration}
          step={1}
          onValueChange={(value) => setCurrentTime(value[0])}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Shuffle className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Repeat className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePrevious}
            className="hover:scale-110 transition-smooth"
          >
            <SkipBack />
          </Button>
          
          <Button 
            variant="gradient" 
            size="icon"
            onClick={handlePlayPause}
            className="w-14 h-14 rounded-full hover:scale-110 transition-smooth"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNext}
            className="hover:scale-110 transition-smooth"
          >
            <SkipForward />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-32">
          <Volume2 className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={volume}
            max={100}
            step={1}
            onValueChange={setVolume}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};