import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { logger } from "@/lib/logger";

export const useUserPoints = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPoints = async () => {
    if (!user) {
      setPoints(0);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .rpc('get_user_points', { user_uuid: user.id });
      
      if (error) throw error;
      setPoints(data || 0);
    } catch (error) {
      logger.error("Error fetching points:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [user]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('points-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'points_transactions',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchPoints();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return { points, loading, refetch: fetchPoints };
};
