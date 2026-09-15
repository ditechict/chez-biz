import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const DAILY_POINT_LIMIT = 50;
const MIN_LISTEN_DURATION = 60; // 60 seconds minimum to earn points
const POINTS_PER_TRACK = 1;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get auth token from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      console.error('Auth error:', userError);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json().catch(() => null);
    const track_id = body?.track_id;
    const listen_duration = body?.listen_duration;

    // Validate input shape
    const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (
      typeof track_id !== 'string' ||
      !UUID_RE.test(track_id) ||
      typeof listen_duration !== 'number' ||
      !Number.isFinite(listen_duration) ||
      listen_duration < 0 ||
      listen_duration > 86400
    ) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if track exists
    const { data: track, error: trackError } = await supabase
      .from('tracks')
      .select('id, duration')
      .eq('id', track_id)
      .maybeSingle();

    if (trackError || !track) {
      return new Response(JSON.stringify({ error: 'Track not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Reported duration cannot exceed the track length (small tolerance for buffering)
    if (listen_duration > track.duration + 5) {
      return new Response(JSON.stringify({ error: 'Invalid duration' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Replay protection: same track cannot be counted again immediately
    const { data: recentPlay } = await supabase
      .from('plays')
      .select('created_at')
      .eq('user_id', user.id)
      .eq('track_id', track_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentPlay) {
      const elapsedMs = Date.now() - new Date(recentPlay.created_at).getTime();
      const minGapMs = Math.max(30, Math.min(track.duration, 600)) * 1000;
      if (elapsedMs < minGapMs) {
        return new Response(JSON.stringify({ error: 'Too many requests' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }


    // Check if user listened for at least 60 seconds
    const completed = listen_duration >= MIN_LISTEN_DURATION;
    let pointsAwarded = 0;

    if (completed) {
      // Check daily limit
      const today = new Date().toISOString().split('T')[0];
      
      const { data: dailyLimit } = await supabase
        .from('daily_limits')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .maybeSingle();

      const currentPoints = dailyLimit?.points_earned || 0;
      const currentListeningPoints = dailyLimit?.listening_points || 0;

      if (currentPoints < DAILY_POINT_LIMIT) {
        pointsAwarded = Math.min(POINTS_PER_TRACK, DAILY_POINT_LIMIT - currentPoints);

        if (pointsAwarded > 0) {
          // Update or insert daily limit
          if (dailyLimit) {
            await supabase
              .from('daily_limits')
              .update({
                points_earned: currentPoints + pointsAwarded,
                listening_points: currentListeningPoints + pointsAwarded,
              })
              .eq('id', dailyLimit.id);
          } else {
            await supabase
              .from('daily_limits')
              .insert({
                user_id: user.id,
                date: today,
                points_earned: pointsAwarded,
                listening_points: pointsAwarded,
              });
          }

          // Add points transaction
          await supabase
            .from('points_transactions')
            .insert({
              user_id: user.id,
              amount: pointsAwarded,
              transaction_type: 'listening',
              description: `Listened to track`,
              reference_id: track_id,
            });
        }
      }
      console.log(`User ${user.id} earned ${pointsAwarded} points (daily total: ${currentPoints + pointsAwarded})`);
    }

    // Record the play
    const { error: playError } = await supabase
      .from('plays')
      .insert({
        user_id: user.id,
        track_id,
        listen_duration,
        completed,
        points_awarded: pointsAwarded,
      });

    if (playError) {
      console.error('Error recording play:', playError);
    }

    // Get updated total points (computed server-side for this user only)
    const { data: txns } = await supabase
      .from('points_transactions')
      .select('amount')
      .eq('user_id', user.id);
    const totalPoints = (txns ?? []).reduce((sum, t) => sum + (t.amount ?? 0), 0);

    return new Response(JSON.stringify({
      success: true,
      completed,
      points_awarded: pointsAwarded,
      total_points: totalPoints || 0,
      message: completed 
        ? pointsAwarded > 0 
          ? `Earned ${pointsAwarded} point!` 
          : 'Daily limit reached'
        : 'Keep listening to earn points (60s minimum)'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in track-play function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
