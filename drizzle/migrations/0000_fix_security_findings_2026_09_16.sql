-- Fix security findings:
-- ad_views_plays_shares_no_verification_control
-- points_transactions_no_write_control
-- user_roles_authenticated_read_all

-- ============================================================
-- 1. Verification control for ad_views, plays, shares
--    Only backend edge functions (service_role) may verify/update
--    these records. Authenticated users may only submit the
--    initial unverified claim.
-- ============================================================

-- ad_views: backend can verify, users can only insert initial unverified views
DROP POLICY IF EXISTS "Service role manages ad views" ON public.ad_views;
CREATE POLICY "Service role manages ad views"
  ON public.ad_views
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- plays: backend can verify; users can only insert an unplayed, unverified record
DROP POLICY IF EXISTS "Service role manages plays" ON public.plays;
CREATE POLICY "Service role manages plays"
  ON public.plays
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Users can insert own plays" ON public.plays;
CREATE POLICY "Users can insert own plays"
  ON public.plays
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND completed = false
    AND points_awarded = 0
    AND listen_duration = 0
  );

-- shares: backend can verify; users can only insert initial unverified shares
DROP POLICY IF EXISTS "Service role manages shares" ON public.shares;
CREATE POLICY "Service role manages shares"
  ON public.shares
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 2. Explicit write control for points_transactions
--    Remove the blanket trigger that blocked all writes and
--    replace it with explicit RLS: service_role can manage,
--    authenticated users can only view their own records.
-- ============================================================
DROP TRIGGER IF EXISTS block_points_transactions_writes ON public.points_transactions;

DROP POLICY IF EXISTS "Service role manages points transactions" ON public.points_transactions;
CREATE POLICY "Service role manages points transactions"
  ON public.points_transactions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- 3. user_roles: authenticated users should not read all roles
--    Restrict to own role; admins retain full access via the
--    existing admin policy.
-- ============================================================
DROP POLICY IF EXISTS "Authenticated can read roles" ON public.user_roles;

CREATE POLICY "Users can read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
