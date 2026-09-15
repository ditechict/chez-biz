-- 1. Profiles: no anonymous reads
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles"
ON public.profiles FOR SELECT TO authenticated USING (true);
REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- 2. Subscriptions: owners may update their own settings (e.g. auto_renew)
DROP POLICY IF EXISTS "Users can update own subscription settings" ON public.subscriptions;
CREATE POLICY "Users can update own subscription settings"
ON public.subscriptions FOR UPDATE TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. Withdrawals: status changes limited to admins; users keep view/insert
DROP POLICY IF EXISTS "Admins can update withdrawals" ON public.withdrawals;
CREATE POLICY "Admins can update withdrawals"
ON public.withdrawals FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));
REVOKE UPDATE, DELETE ON public.withdrawals FROM authenticated;
GRANT SELECT, INSERT ON public.withdrawals TO authenticated;
GRANT ALL ON public.withdrawals TO service_role;

-- 4. Server-only write tables: explicit grants + documentation
COMMENT ON TABLE public.daily_limits IS 'Written only by trusted server-side code (edge functions using the service role). Users may read their own row.';
COMMENT ON TABLE public.points_transactions IS 'Written only by trusted server-side code (edge functions using the service role). Users may read their own rows.';
REVOKE INSERT, UPDATE, DELETE ON public.daily_limits FROM authenticated, anon;
REVOKE INSERT, UPDATE, DELETE ON public.points_transactions FROM authenticated, anon;
GRANT SELECT ON public.daily_limits TO authenticated;
GRANT SELECT ON public.points_transactions TO authenticated;
GRANT ALL ON public.daily_limits TO service_role;
GRANT ALL ON public.points_transactions TO service_role;

-- 5. Point lookups run as the caller (RLS enforced), no elevated privileges
CREATE OR REPLACE FUNCTION public.get_user_points(user_uuid uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY INVOKER
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
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT COALESCE(points_earned, 0)
  FROM public.daily_limits
  WHERE user_id = auth.uid() AND date = CURRENT_DATE
$$;

-- 6. Signup trigger helper: hardened input, not callable by app users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(trim(left(NEW.raw_user_meta_data->>'username', 50)), ''),
      split_part(COALESCE(NEW.email, 'member'), '@', 1)
    )
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;