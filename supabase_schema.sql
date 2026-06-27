-- ikas App Store (Multi-tenant) Supabase Schema

-- 1. Mağazalar Tablosu (ikas Satıcıları için)
CREATE TABLE public.stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ikas_merchant_id TEXT UNIQUE NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  store_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Bekleme Listesi Kayıtları Tablosu
CREATE TABLE public.waitlist_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES public.waitlist_entries(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'unconfirmed' CHECK (status IN ('unconfirmed', 'confirmed')),
  position INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(store_id, email) -- Bir mağazada bir e-posta sadece bir kere kayıt olabilir
);

-- Hızlı erişim için indeksler
CREATE INDEX idx_waitlist_store_id ON public.waitlist_entries(store_id);
CREATE INDEX idx_waitlist_referral_code ON public.waitlist_entries(referral_code);

-- RLS (Row Level Security) Politikaları
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- API üzerinden okunabilmesi ve yazılabilmesi için temel politikalar (İsteğe bağlı sıkılaştırılabilir)
CREATE POLICY "Allow all operations for service role" ON public.stores FOR ALL USING (true);
CREATE POLICY "Allow public inserts to waitlist" ON public.waitlist_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read of waitlist" ON public.waitlist_entries FOR SELECT USING (true);
CREATE POLICY "Allow service role update to waitlist" ON public.waitlist_entries FOR UPDATE USING (true);
