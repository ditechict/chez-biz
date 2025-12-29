import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number;
  file_url: string;
  image_url: string | null;
}

export const useTracks = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setTracks(data || []);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        setError("Failed to load tracks");
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
};
