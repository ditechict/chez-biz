CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  event_type text NOT NULL CHECK (event_type IN ('concert','festival','club','private','corporate','other')),
  event_date date NOT NULL,
  city text NOT NULL CHECK (char_length(city) BETWEEN 1 AND 120),
  venue text CHECK (venue IS NULL OR char_length(venue) <= 200),
  expected_guests integer CHECK (expected_guests IS NULL OR expected_guests BETWEEN 1 AND 1000000),
  budget text CHECK (budget IS NULL OR char_length(budget) <= 80),
  message text CHECK (message IS NULL OR char_length(message) <= 2000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','reviewing','confirmed','declined')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.booking_requests TO authenticated;
GRANT UPDATE ON public.booking_requests TO authenticated;
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users create own booking requests" ON public.booking_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id AND status = 'new' AND event_date >= CURRENT_DATE);
CREATE POLICY "Users view own booking requests" ON public.booking_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR private.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins update booking requests" ON public.booking_requests FOR UPDATE TO authenticated
  USING (private.has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));