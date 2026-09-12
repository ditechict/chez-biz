REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.get_user_points(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.check_daily_limit(uuid) FROM anon;

CREATE OR REPLACE FUNCTION public.get_user_points(user_uuid uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(amount), 0)::INTEGER
  FROM public.points_transactions
  WHERE user_id = auth.uid()
$$;

CREATE OR REPLACE FUNCTION public.check_daily_limit(user_uuid uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(points_earned, 0)
  FROM public.daily_limits
  WHERE user_id = auth.uid() AND date = CURRENT_DATE
$$;

REVOKE ALL ON FUNCTION public.get_user_points(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.check_daily_limit(uuid) FROM anon;