
-- 1. profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- 2. subject_progress
CREATE TABLE public.subject_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  total_lectures INT NOT NULL DEFAULT 0,
  watched_lectures INT NOT NULL DEFAULT 0,
  last_watched TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, subject_code)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subject_progress TO authenticated;
GRANT ALL ON public.subject_progress TO service_role;
ALTER TABLE public.subject_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON public.subject_progress FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3. watch_history
CREATE TABLE public.watch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  lecture_title TEXT NOT NULL,
  watched_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.watch_history TO authenticated;
GRANT ALL ON public.watch_history TO service_role;
ALTER TABLE public.watch_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own watch history" ON public.watch_history FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 4. enrollments (subscription requests with receipt)
CREATE TABLE public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  package_name TEXT NOT NULL,
  package_price INT NOT NULL,
  payment_method TEXT NOT NULL,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.enrollments TO authenticated;
GRANT INSERT ON public.enrollments TO anon;
GRANT ALL ON public.enrollments TO service_role;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own enrollments" ON public.enrollments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create enrollment" ON public.enrollments FOR INSERT TO anon, authenticated WITH CHECK (true);

-- 5. updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_progress_updated BEFORE UPDATE ON public.subject_progress FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_enrollments_updated BEFORE UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6. On signup: create profile + seed 12 subjects
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone'
  );

  INSERT INTO public.subject_progress (user_id, subject_code, subject_name, total_lectures, watched_lectures) VALUES
    (NEW.id, 'ENG101', 'اللغة الإنجليزية', 16, 0),
    (NEW.id, 'FIQ101', 'الفقه', 10, 0),
    (NEW.id, 'DRW101', 'الرسم الهندسي', 16, 0),
    (NEW.id, 'DGM101', 'الهندسة الوصفية', 20, 0),
    (NEW.id, 'EVO102', 'التطور', 12, 0),
    (NEW.id, 'CSC102', 'الحاسب', 12, 0),
    (NEW.id, 'PED101', 'الرياضة', 14, 0),
    (NEW.id, 'AQE102', 'العقيدة', 10, 0),
    (NEW.id, 'PHY101', 'الفيزياء', 22, 0),
    (NEW.id, 'CHM101', 'الكيمياء', 24, 0),
    (NEW.id, 'PRD101', 'هندسة الإنتاج', 20, 0),
    (NEW.id, 'QUR101', 'القرآن الكريم', 30, 0);

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
