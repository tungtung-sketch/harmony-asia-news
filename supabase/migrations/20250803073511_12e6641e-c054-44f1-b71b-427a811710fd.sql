-- Create enum types
CREATE TYPE public.user_role AS ENUM ('reader', 'editor', 'admin');
CREATE TYPE public.subscription_tier AS ENUM ('free_trial', 'starter', 'business', 'enterprise');
CREATE TYPE public.content_type AS ENUM ('news', 'analysis', 'thailand_101');
CREATE TYPE public.language_code AS ENUM ('en', 'ja', 'th');
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'reader',
  preferred_language language_code NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tier subscription_tier NOT NULL DEFAULT 'free_trial',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  trial_end_date TIMESTAMPTZ,
  subscription_end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ja TEXT,
  name_th TEXT,
  description_en TEXT,
  description_ja TEXT,
  description_th TEXT,
  content_type content_type NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create articles table
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content_type content_type NOT NULL,
  status content_status NOT NULL DEFAULT 'draft',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  featured_image_url TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create article_content table for multi-language support
CREATE TABLE public.article_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE NOT NULL,
  language language_code NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  meta_description TEXT,
  tags TEXT[],
  UNIQUE(article_id, language)
);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  preferred_language language_code NOT NULL DEFAULT 'en',
  is_active BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

-- Create RLS policies for subscriptions
CREATE POLICY "Users can view their own subscription" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all subscriptions" ON public.subscriptions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

-- Create RLS policies for categories (public read)
CREATE POLICY "Categories are publicly readable" ON public.categories
  FOR SELECT USING (true);
CREATE POLICY "Editors and admins can manage categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );

-- Create RLS policies for articles
CREATE POLICY "Published articles are publicly readable" ON public.articles
  FOR SELECT USING (status = 'published' OR EXISTS (
    SELECT 1 FROM public.profiles p 
    WHERE p.user_id = auth.uid() AND p.role IN ('editor', 'admin')
  ));
CREATE POLICY "Editors and admins can manage articles" ON public.articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );

-- Create RLS policies for article_content
CREATE POLICY "Published article content is publicly readable" ON public.article_content
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles a 
      WHERE a.id = article_id AND a.status = 'published'
    ) OR EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );
CREATE POLICY "Editors and admins can manage article content" ON public.article_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role IN ('editor', 'admin')
    )
  );

-- Create RLS policies for newsletter
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage newsletter subscribers" ON public.newsletter_subscribers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND p.role = 'admin'
    )
  );

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Create free trial subscription
  INSERT INTO public.subscriptions (user_id, tier, trial_end_date)
  VALUES (
    NEW.id,
    'free_trial',
    NOW() + INTERVAL '30 days'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default categories
INSERT INTO public.categories (slug, name_en, name_ja, name_th, content_type, description_en) VALUES
('business-news', 'Business News', 'ビジネスニュース', 'ข่าวธุรกิจ', 'news', 'Daily business news in Thailand'),
('market-analysis', 'Market Analysis', '市場分析', 'การวิเคราะห์ตลาด', 'analysis', 'Strategic business analysis and reports'),
('culture-guide', 'Business Culture', 'ビジネス文化', 'วัฒนธรรมธุรกิจ', 'thailand_101', 'Thai business culture and practices'),
('legal-tips', 'Legal Tips', '法的アドバイス', 'คำแนะนำกฎหมาย', 'thailand_101', 'Legal advice for business in Thailand'),
('lifestyle', 'Lifestyle', 'ライフスタイル', 'การดำเนินชีวิต', 'thailand_101', 'Lifestyle tips for expats in Thailand');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();