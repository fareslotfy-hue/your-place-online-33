
-- Fix page_views permissive INSERT policy
DROP POLICY IF EXISTS "Anyone can log a page view" ON public.page_views;
CREATE POLICY "Anyone can log a page view"
  ON public.page_views
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND user_id = auth.uid())
  );

-- Lock down SECURITY DEFINER functions: revoke broad EXECUTE, grant only what's needed
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;

-- has_role is used in RLS policies for authenticated users; keep EXECUTE for authenticated
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
-- claim_first_admin is invoked via RPC by signed-in users
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;
