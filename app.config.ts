/**
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │  app.config.ts — the single source of truth for this starter.            │
 * │  Every user-facing string is bilingual: { tr, en }.                      │
 * │  Run `/setup` (or say "bu projeyi kur") to rebrand.                       │
 * └──────────────────────────────────────────────────────────────────────────┘
 */
import type { L } from "@/lib/i18n/config";

export type IconName = string;

export interface NavItem { label: L; href: string; icon: IconName; }
export interface Feature { icon: IconName; title: L; body: L; }
export interface Stat { value: string; label: L; }
export interface PricingTier { name: string; price: string; period?: string; tagline: L; features: L[]; cta: L; featured?: boolean; }
export interface FaqItem { q: L; a: L; }
export interface Integration { key: string; name: string; envVars: string[]; required: boolean; docsUrl: string; purpose: string; }

export interface AppConfig {
  name: string;
  tagline: L;
  description: L;
  domain: string;
  logoText: string;
  accentName: string;
  marketing: {
    badge: L; heroTitle: L; heroAccent: L; heroSubtitle: L; heroCtaPrimary: L; heroCtaSecondary: L;
    features: Feature[]; stats: Stat[]; pricing: PricingTier[]; faq: FaqItem[];
  };
  nav: NavItem[];
  integrations: Integration[];
}

export const appConfig: AppConfig = {
  name: "Sıra",
  tagline: { tr: "Lansman öncesi listeni bir büyüme döngüsüne çevir.", en: "Turn your pre-launch list into a growth loop." },
  description: {
    tr: "Sıra kayıtları toplar, onları referanslarına göre sıralar ve en büyük hayranlarını ödüllendirir — böylece sen daha hiçbir şey çıkarmadan listen kendi kendine büyür.",
    en: "Sıra collects signups, ranks them by referrals, and rewards your biggest fans — so your waitlist grows itself before you've shipped a thing.",
  },
  domain: "sira.so",
  logoText: "Sı",
  accentName: "lime",

  marketing: {
    badge: { tr: "Bekleme listesi & referans motoru", en: "Waitlist & referral engine" },
    heroTitle: {
      tr: "Bekleme listen sen uyurken",
      en: "Your waitlist should grow",
    },
    heroAccent: {
      tr: "büyümeli.",
      en: "while you sleep.",
    },
    heroSubtitle: {
      tr: "Açılış sayfana tek bir embed bırak; Sıra kayıtları, referans sıralamalarını ve ödül e-postalarını halleder — her yeni hayranı sonraki ona dönüştürür.",
      en: "Drop one embed on your landing page and Sıra handles signups, referral positions, and reward emails — turning every new fan into the next ten.",
    },
    heroCtaPrimary: { tr: "Listeni başlat", en: "Start your waitlist" },
    heroCtaSecondary: { tr: "Canlı demoyu gör", en: "See a live demo" },
    features: [
      { icon: "list-ordered", title: { tr: "Sıralı bekleme listesi", en: "Ranked waitlist" }, body: { tr: "Her kayıt canlı bir sıra alır. Arkadaş davet ederek sırada yüksel — ikna işini liderlik tablosu yapar.", en: "Every signup gets a live position. Move up the line by referring friends — the leaderboard does the persuading for you." } },
      { icon: "share-2", title: { tr: "Dahili referanslar", en: "Built-in referrals" }, body: { tr: "Herkese benzersiz bir paylaşım bağlantısı düşer. Davetleri, dönüşümleri ve viral katsayıyı tek satır kod yazmadan izle.", en: "Each person gets a unique share link. Track invites, conversions and viral coefficient without wiring up a thing." } },
      { icon: "gift", title: { tr: "Ödül seviyeleri", en: "Reward tiers" }, body: { tr: "3, 10 ve 25 referansta erken erişim, hediye veya ayrıcalık vaat et. En sadık hayranlar bunları otomatik açar.", en: "Promise early access, swag or perks at 3, 10 and 25 referrals. Top fans unlock them automatically." } },
      { icon: "mail", title: { tr: "Onay e-postaları", en: "Confirmation emails" }, body: { tr: "Markalı çift onay ve aşama e-postaları kayıtta ve her sıra atlamada otomatik gider — Resend ile.", en: "Branded double opt-in and milestone emails fire on signup and every position jump — powered by Resend." } },
      { icon: "code", title: { tr: "Kopyala-yapıştır embed", en: "Copy-paste embed" }, body: { tr: "Tek bir snippet, herhangi bir siteye şık bir kayıt aracı bırakır — Webflow, Framer, düz HTML ya da kendi uygulaman.", en: "One snippet drops a styled signup widget on any site — Webflow, Framer, plain HTML or your own app." } },
      { icon: "trending-up", title: { tr: "Viral analitik", en: "Viral analytics" }, body: { tr: "K-faktörünü, en iyi davetçilerini ve kayıt hızını canlı izle; döngünün ne zaman tutuştuğunu gör.", en: "Watch your K-factor, top referrers and signup velocity in real time, so you know when the loop is catching." } },
    ],
    stats: [
      { value: "1.8×", label: { tr: "ortalama viral katsayı", en: "average viral coefficient" } },
      { value: "60sn", label: { tr: "embed et ve yayında ol", en: "to embed & go live" } },
      { value: "%41", label: { tr: "referanstan gelen kayıt", en: "signups from referrals" } },
      { value: "0", label: { tr: "anahtarla dene", en: "keys to try it" } },
    ],
    pricing: [
      { name: "Launch", price: "$0", period: "/ay", tagline: { tr: "Bir fikri doğrulamak için.", en: "For validating an idea." }, features: [{ tr: "1 bekleme listesi", en: "1 waitlist" }, { tr: "500 kayıta kadar", en: "Up to 500 signups" }, { tr: "Referans sıralamaları", en: "Referral positions" }, { tr: "Temel embed aracı", en: "Basic embed widget" }], cta: { tr: "Ücretsiz başla", en: "Start free" } },
      { name: "Growth", price: "$29", period: "/ay", tagline: { tr: "Gerçek bir lansman hamlesi için.", en: "For a real pre-launch push." }, features: [{ tr: "5 bekleme listesi", en: "5 waitlists" }, { tr: "Sınırsız kayıt", en: "Unlimited signups" }, { tr: "Ödül seviyeleri", en: "Reward tiers" }, { tr: "Markalı e-postalar", en: "Branded emails" }, { tr: "Viral analitik", en: "Viral analytics" }], cta: { tr: "Ücretsiz dene", en: "Start free trial" }, featured: true },
      { name: "Scale", price: "$89", period: "/ay", tagline: { tr: "Büyük çıkış yapan ekipler için.", en: "For teams launching big." }, features: [{ tr: "Sınırsız bekleme listesi", en: "Unlimited waitlists" }, { tr: "Özel alan adları", en: "Custom domains" }, { tr: "Webhook'lar & API", en: "Webhooks & API" }, { tr: "Öncelikli destek", en: "Priority support" }], cta: { tr: "Bize ulaş", en: "Talk to us" } },
    ],
    faq: [
      { q: { tr: "Denemek için API anahtarı gerekli mi?", en: "Do I need API keys to try it?" }, a: { tr: "Hayır. Sıra; tam bir örnek bekleme listesi, liderlik tablosu ve e-posta şablonlarıyla demo modda açılır, hemen tıklayabilirsin. Canlıya geçmek için Resend ve Supabase anahtarlarını sonra ekle.", en: "No. Sıra boots in demo mode with a full sample waitlist, leaderboard and email templates so you can click around immediately. Add Resend and Supabase keys later to go live." } },
      { q: { tr: "Referanslar insanları gerçekte nasıl yukarı taşır?", en: "How do referrals actually move people up?" }, a: { tr: "Her kayıt benzersiz bir paylaşım bağlantısı alır. Bu bağlantıyla katılan her onaylı arkadaş, davet edenin sırasını yükseltir ve ödül seviyesine sayılır.", en: "Each signup gets a unique share link. Every confirmed friend who joins through it bumps the referrer's position and counts toward their reward tier." } },
      { q: { tr: "Aracı nereye gömebilirim?", en: "Where can I embed the widget?" }, a: { tr: "HTML yapıştırabildiğin her yere — Webflow, Framer, WordPress, düz bir açılış sayfası ya da kendi uygulamanın içine. Snippet'i panodan kopyala.", en: "Anywhere you can paste HTML — Webflow, Framer, WordPress, a plain landing page, or inside your own app. Copy the snippet from the dashboard." } },
      { q: { tr: "Teknoloji nedir?", en: "What's the stack?" }, a: { tr: "Next.js 16, React 19, Tailwind v4. Her yere dağıtabileceğin standart bir uygulama.", en: "Next.js 16, React 19, Tailwind v4. It's a standard app you can deploy anywhere." } },
      { q: { tr: "Sahte kayıtları ve çoklu davetleri nasıl engelliyorsunuz?", en: "How do you stop fake signups and double referrals?" }, a: { tr: "Çift onay (double opt-in) zorunlu, aynı IP/cihazdan gelen tekrarlı davetler işaretlenir ve onaylanmamış kayıtlar referans saymaz. Şüpheli aktivite panelde kırmızı bayrakla görünür.", en: "Double opt-in is required, repeat invites from the same IP/device are flagged, and unconfirmed signups don't count as referrals. Suspicious activity shows up with a red flag in the dashboard." } },
      { q: { tr: "Listemi başka bir araca taşıyabilir miyim?", en: "Can I move my list to another tool?" }, a: { tr: "Her zaman. Tüm kayıtları, referans ağacını ve sıraları tek tıkla CSV ya da JSON olarak dışa aktar. Kilit yok — liste ilk günden senindir.", en: "Always. Export every signup, the full referral tree and positions as CSV or JSON in one click. No lock-in — the list is yours from day one." } },
      { q: { tr: "Ödül seviyelerini kendim ayarlayabilir miyim?", en: "Can I customize the reward tiers?" }, a: { tr: "Evet. Eşikleri (örn. 3/10/25), ödül metnini ve görselini panelden değiştir. Biri bir seviyeyi açtığında otomatik markalı e-posta gider.", en: "Yes. Set the thresholds (e.g. 3/10/25), reward copy and artwork from the dashboard. A branded email fires automatically when someone unlocks a tier." } },
    ],
  },

  nav: [
    { label: { tr: "Genel", en: "Overview" }, href: "/dashboard", icon: "layout-dashboard" },
    { label: { tr: "Liste", en: "Waitlist" }, href: "/waitlist", icon: "list-ordered" },
    { label: { tr: "Referanslar", en: "Referrals" }, href: "/referrals", icon: "share-2" },
    { label: { tr: "E-postalar", en: "Emails" }, href: "/emails", icon: "mail" },
    { label: { tr: "Ayarlar", en: "Settings" }, href: "/settings", icon: "settings" },
  ],

  integrations: [
    {
      key: "resend",
      name: "Resend",
      envVars: ["RESEND_API_KEY"],
      required: false,
      docsUrl: "https://resend.com/api-keys",
      purpose: "Sends confirmation, milestone and reward emails to your signups.",
    },
    {
      key: "supabase",
      name: "Supabase",
      envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      required: false,
      docsUrl: "https://supabase.com/dashboard/project/_/settings/api",
      purpose: "Stores signups, referrals and positions. Without it, runs in demo mode.",
    },
  ],
};

export default appConfig;
