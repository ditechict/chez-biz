-- 1) ad_views, plays, shares: force client inserts to be unverified with zero points
DROP POLICY IF EXISTS "Users can insert own ad views" ON public.ad_views;
CREATE POLICY "Users can insert own ad views" ON public.ad_views
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND verified = false AND points_awarded = 0);

DROP POLICY IF EXISTS "Users can insert own plays" ON public.plays;
CREATE POLICY "Users can insert own plays" ON public.plays
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND completed = false AND points_awarded = 0 AND listen_duration >= 0);

DROP POLICY IF EXISTS "Users can insert own shares" ON public.shares;
CREATE POLICY "Users can insert own shares" ON public.shares
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id AND valid = false AND points_awarded = 0);

-- 2) daily_limits: no client writes at all (RLS has no write policies; revoke grants too)
REVOKE INSERT, UPDATE, DELETE ON public.daily_limits FROM anon, authenticated;

-- 3) points_transactions: no client writes at all
REVOKE INSERT, UPDATE, DELETE ON public.points_transactions FROM anon, authenticated;

-- 4) withdrawals: hide raw payment_details from client reads (column-level privileges)
REVOKE SELECT ON public.withdrawals FROM anon, authenticated;
GRANT SELECT (id, user_id, amount, cash_value, status, kyc_verified, payment_method, created_at, processed_at) ON public.withdrawals TO authenticated;