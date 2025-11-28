-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('analyst', 'admin', 'user');

-- Create enum for risk levels
CREATE TYPE public.risk_level AS ENUM ('high', 'medium', 'low');

-- Create enum for verdict types
CREATE TYPE public.verdict_type AS ENUM ('true', 'false', 'unproven');

-- Create enum for claim categories
CREATE TYPE public.claim_category AS ENUM ('health', 'disaster', 'weather', 'crime', 'government', 'other');

-- Create enum for claim status
CREATE TYPE public.claim_status AS ENUM ('pending', 'analyzing', 'verified', 'published');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create claims table
CREATE TABLE public.claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  claim_text TEXT NOT NULL,
  source_url TEXT,
  category claim_category,
  risk_level risk_level,
  verdict verdict_type,
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  evidence TEXT[],
  explanation TEXT,
  recommended_action TEXT,
  status claim_status DEFAULT 'pending',
  submitter_name TEXT,
  submitter_email TEXT,
  image_url TEXT,
  analyzed_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on claims
ALTER TABLE public.claims ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for claims
-- Anyone can insert a claim (public submission)
CREATE POLICY "Anyone can submit claims"
  ON public.claims FOR INSERT
  WITH CHECK (true);

-- Anyone can view published claims
CREATE POLICY "Anyone can view published claims"
  ON public.claims FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

-- Analysts and admins can update claims
CREATE POLICY "Analysts can update claims"
  ON public.claims FOR UPDATE
  USING (
    public.has_role(auth.uid(), 'analyst') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Analysts and admins can delete claims
CREATE POLICY "Analysts can delete claims"
  ON public.claims FOR DELETE
  USING (
    public.has_role(auth.uid(), 'analyst') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at columns
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_claims_updated_at
  BEFORE UPDATE ON public.claims
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();