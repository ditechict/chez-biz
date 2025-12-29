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

    const { track_id, listen_duration } = await req.json();
    console.log(`Processing play for user ${user.id}, track ${track_id}, duration ${listen_duration}s`);

    // Validate input
    if (!track_id || typeof listen_duration !== 'number') {
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
      console.error('Track not found:', trackError);
      return new Response(JSON.stringify({ error: 'Track not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
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

    // Get updated total points
    const { data: totalPoints } = await supabase
      .rpc('get_user_points', { user_uuid: user.id });

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
