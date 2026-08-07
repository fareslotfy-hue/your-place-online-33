
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notifications" ON public.notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all notifications" ON public.notifications
  FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_notifications_user_read ON public.notifications(user_id, read, created_at DESC);

-- Trigger: notify user on enrollment approval
CREATE OR REPLACE FUNCTION public.notify_enrollment_status_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    RETURN NEW;
  END IF;

  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    IF NEW.status = 'approved' THEN
      INSERT INTO public.notifications (user_id, title, message, type, link)
      VALUES (
        NEW.user_id,
        '🎉 تم تفعيل اشتراكك',
        'مبروك! تم تفعيل اشتراكك في باقة "' || NEW.package_name || '". تقدر تستمتع بكل الكتب والفيديوهات دلوقتي.',
        'success',
        '/dashboard'
      );
    ELSIF NEW.status = 'rejected' THEN
      INSERT INTO public.notifications (user_id, title, message, type, link)
      VALUES (
        NEW.user_id,
        'تم رفض طلب الاشتراك',
        'للأسف، تم رفض طلب اشتراكك في باقة "' || NEW.package_name || '". برجاء التواصل مع الإدارة لمزيد من التفاصيل.',
        'error',
        '/dashboard'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.notify_enrollment_status_change() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER trg_enrollment_status_notify
  AFTER UPDATE ON public.enrollments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_enrollment_status_change();
