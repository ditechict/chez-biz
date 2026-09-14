import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  size: string;
  sort_order: number;
}

export interface SiteEvent {
  id: string;
  event_date: string;
  venue: string;
  city: string;
  country: string;
  ticket_url: string | null;
  sold_out: boolean;
}

export interface PressAsset {
  id: string;
  title: string;
  asset_type: string;
  file_url: string | null;
  external_url: string | null;
  description: string | null;
  sort_order: number;
}

export const useGalleryImages = () =>
  useQuery({
    queryKey: ["gallery_images"],
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, alt_text, caption, size, sort_order")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

export const useEvents = () =>
  useQuery({
    queryKey: ["events"],
    queryFn: async (): Promise<SiteEvent[]> => {
      const { data, error } = await supabase
        .from("events")
        .select("id, event_date, venue, city, country, ticket_url, sold_out")
        .eq("published", true)
        .gte("event_date", new Date().toISOString().slice(0, 10))
        .order("event_date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

export const usePressAssets = () =>
  useQuery({
    queryKey: ["press_assets"],
    queryFn: async (): Promise<PressAsset[]> => {
      const { data, error } = await supabase
        .from("press_assets")
        .select("id, title, asset_type, file_url, external_url, description, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
