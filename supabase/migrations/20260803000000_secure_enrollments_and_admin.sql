-- Prevent public self-promotion to administrator. Admin roles must be assigned
-- explicitly by an existing administrator or from the Supabase dashboard.
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon, authenticated;

-- Limit repeated enrollment submissions for one account. This trigger is
-- enforced in the database, so it also protects inserts outside the web UI.
CREATE OR REPLACE FUNCTION public.limit_enrollment_submissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication is required';
  END IF;

  IF (
    SELECT count(*)
    FROM public.enrollments
    WHERE user_id = NEW.user_id
      AND created_at > now() - interval '15 minutes'
  ) >= 3 THEN
    RAISE EXCEPTION 'Too many enrollment requests. Try again later.';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.limit_enrollment_submissions() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_limit_enrollment_submissions ON public.enrollments;
CREATE TRIGGER trg_limit_enrollment_submissions
  BEFORE INSERT ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.limit_enrollment_submissions();

-- Only authenticated users may create requests for themselves.
DROP POLICY IF EXISTS "Anyone can create enrollment" ON public.enrollments;
CREATE POLICY "Users create own enrollment" ON public.enrollments
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
REVOKE INSERT ON public.enrollments FROM anon;

-- Tighten receipt uploads to the user's folder, supported file types, and 5 MB.
DROP POLICY IF EXISTS "Users upload own receipts" ON storage.objects;
CREATE POLICY "Users upload own receipts" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'receipts'
    AND (storage.foldername(name))[1] = auth.uid()::text
    AND lower(name) ~ '\.(jpg|jpeg|png|webp|pdf)$'
    AND COALESCE((metadata->>'size')::bigint, 0) <= 5242880
  );
