-- 1. Profiles: restrict SELECT to own profile
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 2. Withdrawals: enforce pending status and unverified KYC on insert
DROP POLICY IF EXISTS "Users can insert own withdrawals" ON public.withdrawals;
CREATE POLICY "Users can insert own withdrawals" ON public.withdrawals
  FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND status = 'pending'
    AND kyc_verified = false
    AND processed_at IS NULL
  );

-- 3. Defense-in-depth: block any direct writes to daily_limits and points_transactions
--    (writes must go through the service-role backend only)
CREATE OR REPLACE FUNCTION public.reject_client_write()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RAISE EXCEPTION 'Direct writes are not allowed'; 
END;
$$;

CREATE TRIGGER block_daily_limits_writes
  BEFORE INSERT OR UPDATE OR DELETE ON public.daily_limits
  FOR EACH ROW
  WHEN (current_setting('request.jwt.claims', true) IS NOT NULL AND current_setting('request.jwt.claims', true)::jsonb ->> 'role' <> 'service_role')
  EXECUTE FUNCTION public.reject_client_write();

CREATE TRIGGER block_points_transactions_writes
  BEFORE INSERT OR UPDATE OR DELETE ON public.points_transactions
  FOR EACH ROW
  WHEN (current_setting('request.jwt.claims', true) IS NOT NULL AND current_setting('request.jwt.claims', true)::jsonb ->> 'role' <> 'service_role')
  EXECUTE FUNCTION public.reject_client_write();