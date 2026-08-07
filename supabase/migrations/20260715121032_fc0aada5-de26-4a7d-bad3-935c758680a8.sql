
-- 1. Fix enrollment INSERT policy: authenticated users must set user_id = self OR NULL (anon)
DROP POLICY "Anyone can create enrollment" ON public.enrollments;
CREATE POLICY "Anyone can create enrollment" ON public.enrollments
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- 2. Lock down SECURITY DEFINER functions from client execution
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM anon, authenticated, PUBLIC;

-- 3. Storage policies for receipts bucket (per-user folder: <uid>/filename)
CREATE POLICY "Users upload own receipts" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'receipts' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users read own receipts" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'receipts' AND (storage.foldername(name))[1] = auth.uid()::text);
