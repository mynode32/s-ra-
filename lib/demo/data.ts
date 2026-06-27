/**
 * Sıra demo data — a pre-launch waitlist with referral positions.
 * Labels are bilingual ({ tr, en }); the pages resolve them to the active
 * language. People names / emails / handles stay as-is (content). Wire Resend +
 * Supabase (run /setup) to collect real signups and send live emails.
 *
 * Dashboard contract: kpis · trend · trendMeta · activity · breakdown ·
 * breakdownMeta · tableMeta · tableColumns · tableRows · growthCurve · funnel.
 */
import type { TrendPoint } from "@/components/app/trend-chart";
import type { DataRow } from "@/components/app/data-table";
import type { L } from "@/lib/i18n/config";

export interface LColumn { key: string; label: L; align?: "right"; format?: "money" | "number" | "badge" | "text"; }

export interface DKpi { label: L; value: string; delta?: number; icon?: string; hint?: L; tone?: 1 | 2 | 3 | 4; }

export const kpis: DKpi[] = [
  { label: { tr: "Toplam kayıt", en: "Total signups" }, value: "2,847", delta: 18.4, icon: "users", hint: { tr: "bu hafta", en: "this week" }, tone: 1 },
  { label: { tr: "Referanslı kayıt", en: "Referred signups" }, value: "1,164", delta: 26.1, icon: "share-2", hint: { tr: "toplamın %41'i", en: "41% of total" }, tone: 2 },
  { label: { tr: "Viral katsayı", en: "Viral coefficient" }, value: "1.8×", delta: 9.2, icon: "trending-up", hint: { tr: "K-faktörü", en: "K-factor" }, tone: 3 },
  { label: { tr: "Onaylanma oranı", en: "Confirmed rate" }, value: "92.3%", delta: 1.7, icon: "mail-check", hint: { tr: "çift onay", en: "double opt-in" }, tone: 4 },
];

export const hero = {
  eyebrow: { tr: "Bu hafta", en: "This week" } as L,
  title: { tr: "Tekrar hoş geldin, Alex.", en: "Welcome back, Alex." } as L,
  accent: { tr: "2.847 kayıt, erişim %18.4 arttı.", en: "2,847 signups, up 18.4% this week." } as L,
  body: {
    tr: "Döngün tutuştu — kayıtların %41'i artık referanslardan geliyor. 9 onaylanmamış kayıt 48 saati geçti; onları bir hatırlatma e-postasıyla geri kazanabilirsin.",
    en: "Your loop is catching — 41% of signups now come from referrals. 9 unconfirmed signups are past 48h; a reminder email could win them back.",
  } as L,
  count: 2847,
  goal: 5000,
};

/** Cumulative signups over the launch run — the dashboard hero area chart. */
export const growthCurve: { label: string; value: number }[] = [
  { label: "W1", value: 180 },
  { label: "W2", value: 460 },
  { label: "W3", value: 820 },
  { label: "W4", value: 1290 },
  { label: "W5", value: 1880 },
  { label: "W6", value: 2410 },
  { label: "Now", value: 2847 },
];

/** Conversion funnel — visitor → signup → confirm → referrer. */
export interface FunnelStep { label: L; value: number; pct: number; }
export const funnel: FunnelStep[] = [
  { label: { tr: "Embed görüntülendi", en: "Embed viewed" }, value: 18420, pct: 100 },
  { label: { tr: "Kayıt oldu", en: "Signed up" }, value: 2847, pct: 15.5 },
  { label: { tr: "E-posta onayladı", en: "Confirmed email" }, value: 2628, pct: 14.3 },
  { label: { tr: "Birini davet etti", en: "Referred someone" }, value: 964, pct: 5.2 },
];

export const heroStat = {
  label: { tr: "Lansman hedefi", en: "Launch goal" } as L,
  value: "2,847 / 5,000",
  sub: { tr: "5.000 kayıt hedefinin %57'si", en: "57% of 5,000-signup goal" } as L,
  pct: 57,
};

export const trend: TrendPoint[] = [
  { label: "Mon", value: 218 },
  { label: "Tue", value: 304 },
  { label: "Wed", value: 461 },
  { label: "Thu", value: 389 },
  { label: "Fri", value: 612 },
  { label: "Sat", value: 540 },
  { label: "Sun", value: 423 },
];

export const trendMeta = {
  title: { tr: "Kayıtlar", en: "Signups" } as L,
  subtitle: { tr: "Son 7 gün, tüm kaynaklar", en: "Last 7 days, all sources" } as L,
  delta: "+18.4%",
  prefix: "",
  suffix: "",
};

export interface DActivity { id: string; who: string; action: L; target: string; at: string; tone: "neutral" | "success" | "warning" | "info"; }

export const activity: DActivity[] = [
  { id: "a1", who: "Priya Raman", action: { tr: "katıldı ve sıçradı:", en: "joined and jumped to" }, target: "#3 · 14 referans", at: "2026-06-13T09:10:00Z", tone: "success" },
  { id: "a2", who: "Sıra", action: { tr: "aşama e-postası gönderdi:", en: "sent milestone email to" }, target: "26 kişi · seviye 2", at: "2026-06-13T08:40:00Z", tone: "info" },
  { id: "a3", who: "Diego Fuentes", action: { tr: "ödülü açtı:", en: "unlocked the reward" }, target: "“Erken erişim”", at: "2026-06-12T19:25:00Z", tone: "success" },
  { id: "a4", who: "System", action: { tr: "işaretledi:", en: "flagged" }, target: "9 onaylanmamış kayıt (>48s)", at: "2026-06-12T17:00:00Z", tone: "warning" },
  { id: "a5", who: "Mei Lin", action: { tr: "davet etti:", en: "referred" }, target: "tek günde 5 arkadaş", at: "2026-06-12T13:15:00Z", tone: "neutral" },
];

export const breakdownMeta = { title: { tr: "Kaynağa göre kayıt", en: "Signups by source" } as L, prefix: "" };
export const breakdown: { label: string; value: number }[] = [
  { label: "Referral", value: 1164 },
  { label: "Product Hunt", value: 742 },
  { label: "Twitter", value: 531 },
  { label: "Direct", value: 410 },
];

export const tableMeta = { title: { tr: "Bekleme listesinin tepesi", en: "Top of the waitlist" } as L };

export const tableColumns: LColumn[] = [
  { key: "person", label: { tr: "Kişi", en: "Person" } },
  { key: "position", label: { tr: "Sıra", en: "Position" }, format: "number" },
  { key: "referrals", label: { tr: "Referans", en: "Referrals" }, align: "right", format: "number" },
  { key: "source", label: { tr: "Kaynak", en: "Source" } },
  { key: "status", label: { tr: "Durum", en: "Status" }, format: "badge" },
];

export interface Signup {
  id: string;
  person: string;
  email: string;
  position: number;
  referrals: number;
  source: string;
  status: "confirmed" | "pending" | "rewarded";
  joined: string;
}

/** Full waitlist — used by the dashboard table (top slice) and elsewhere. */
export const signups: Signup[] = [
  { id: "s1", person: "Mei Lin", email: "mei.lin@hey.com", position: 1, referrals: 38, source: "Referral", status: "rewarded", joined: "2026-05-29" },
  { id: "s2", person: "Diego Fuentes", email: "diego@fuentes.io", position: 2, referrals: 27, source: "Twitter", status: "rewarded", joined: "2026-06-01" },
  { id: "s3", person: "Priya Raman", email: "priya.r@gmail.com", position: 3, referrals: 14, source: "Referral", status: "confirmed", joined: "2026-06-02" },
  { id: "s4", person: "Tom Whitaker", email: "tom@whitaker.dev", position: 4, referrals: 11, source: "Product Hunt", status: "confirmed", joined: "2026-06-03" },
  { id: "s5", person: "Aïcha Benali", email: "aicha.benali@proton.me", position: 5, referrals: 9, source: "Referral", status: "confirmed", joined: "2026-06-05" },
  { id: "s6", person: "Jonas Berg", email: "jonas.berg@outlook.com", position: 6, referrals: 7, source: "LinkedIn", status: "confirmed", joined: "2026-06-06" },
  { id: "s7", person: "Sara Okafor", email: "sara.okafor@gmail.com", position: 7, referrals: 4, source: "Referral", status: "pending", joined: "2026-06-09" },
  { id: "s8", person: "Lucas Moreau", email: "lucas@moreau.fr", position: 8, referrals: 2, source: "Newsletter", status: "confirmed", joined: "2026-06-10" },
  { id: "s9", person: "Hana Kim", email: "hana.kim@kakao.com", position: 9, referrals: 1, source: "Direct", status: "pending", joined: "2026-06-12" },
  { id: "s10", person: "Owen Carter", email: "owen.carter@gmail.com", position: 10, referrals: 0, source: "Direct", status: "confirmed", joined: "2026-06-13" },
];

export const tableRows: DataRow[] = signups.slice(0, 7).map((s) => ({
  id: s.id,
  person: s.person,
  _sub: s.email,
  position: s.position,
  referrals: s.referrals,
  source: s.source,
  status: s.status,
}));

/* ── Referrals page ─────────────────────────────────────────────────────── */
export interface Referrer {
  id: string;
  rank: number;
  person: string;
  handle: string;
  referrals: number;
  converted: number;
  tier: L;
}

const TIER_FOUNDING: L = { tr: "Kurucu 25", en: "Founding 25" };
const TIER_INSIDER: L = { tr: "İçeriden 10", en: "Insider 10" };
const TIER_EARLY: L = { tr: "Erken 3", en: "Early 3" };

export const leaderboard: Referrer[] = [
  { id: "r1", rank: 1, person: "Mei Lin", handle: "@meilin", referrals: 38, converted: 31, tier: TIER_FOUNDING },
  { id: "r2", rank: 2, person: "Diego Fuentes", handle: "@diegof", referrals: 27, converted: 22, tier: TIER_FOUNDING },
  { id: "r3", rank: 3, person: "Priya Raman", handle: "@priyar", referrals: 14, converted: 11, tier: TIER_INSIDER },
  { id: "r4", rank: 4, person: "Tom Whitaker", handle: "@twhitaker", referrals: 11, converted: 9, tier: TIER_INSIDER },
  { id: "r5", rank: 5, person: "Aïcha Benali", handle: "@aicha", referrals: 9, converted: 6, tier: TIER_EARLY },
  { id: "r6", rank: 6, person: "Jonas Berg", handle: "@jonasb", referrals: 7, converted: 5, tier: TIER_EARLY },
  { id: "r7", rank: 7, person: "Sara Okafor", handle: "@saraok", referrals: 4, converted: 3, tier: TIER_EARLY },
];

/** Reward tiers, with how many people have unlocked each. */
export interface RewardTier {
  id: string;
  name: L;
  threshold: number;
  reward: L;
  unlocked: number;
}

export const rewardTiers: RewardTier[] = [
  { id: "t1", name: TIER_EARLY, threshold: 3, reward: { tr: "Sırayı atla + erken erişim", en: "Skip the line + early access" }, unlocked: 184 },
  { id: "t2", name: TIER_INSIDER, threshold: 10, reward: { tr: "Ömür boyu %30 indirim", en: "Lifetime 30% off" }, unlocked: 41 },
  { id: "t3", name: TIER_FOUNDING, threshold: 25, reward: { tr: "Kurucu hediyesi + Slack daveti", en: "Founder swag + Slack invite" }, unlocked: 6 },
];

/** Viral coefficient over the last weeks. */
export const viralTrend: TrendPoint[] = [
  { label: "W1", value: 0.9 },
  { label: "W2", value: 1.2 },
  { label: "W3", value: 1.4 },
  { label: "W4", value: 1.6 },
  { label: "W5", value: 1.8 },
];

export const viralStats = {
  coefficient: 1.8,
  invitesSent: 5210,
  invitesAccepted: 1164,
  acceptRate: 0.223,
};

export const referralColumns: LColumn[] = [
  { key: "person", label: { tr: "Davet eden", en: "Referrer" } },
  { key: "referrals", label: { tr: "Davet", en: "Invites" }, align: "right", format: "number" },
  { key: "converted", label: { tr: "Katılan", en: "Joined" }, align: "right", format: "number" },
  { key: "tier", label: { tr: "Seviye", en: "Tier" } },
];

/* ── Emails page ────────────────────────────────────────────────────────── */
export interface EmailTemplate {
  id: string;
  name: L;
  trigger: L;
  subject: L;
  preview: L;
  status: "live" | "draft" | "paused";
  sent: number;
  openRate: number;
}

export const emailTemplates: EmailTemplate[] = [
  { id: "e1", name: { tr: "Yerini onayla", en: "Confirm your spot" }, trigger: { tr: "Kayıtta", en: "On signup" }, subject: { tr: "Sıra listesindesin — kilitlemek için onayla", en: "You're on the Sıra list — confirm to lock it in" }, preview: { tr: "E-postanı onaylamak ve referans bağlantını almak için dokun. Ne kadar çok arkadaş getirirsen o kadar yükselirsin.", en: "Tap to confirm your email and grab your referral link. The more friends you bring, the higher you climb." }, status: "live", sent: 2847, openRate: 0.71 },
  { id: "e2", name: { tr: "Hoş geldin + bağlantın", en: "Welcome + your link" }, trigger: { tr: "Onaydan sonra", en: "After confirm" }, subject: { tr: "Sıran #{position}. İşte nasıl yükselirsin 🚀", en: "You're #{position}. Here's how to move up 🚀" }, preview: { tr: "Benzersiz bağlantını paylaş — katılan her arkadaş seni sırada ve erken erişime doğru yükseltir.", en: "Share your unique link — every friend who joins bumps you up the line and toward early access." }, status: "live", sent: 2628, openRate: 0.64 },
  { id: "e3", name: { tr: "Ödül açıldı", en: "Reward unlocked" }, trigger: { tr: "Seviyeye ulaşınca", en: "Tier reached" }, subject: { tr: "Harika — az önce {reward} ödülünü açtın", en: "Nice — you just unlocked {reward}" }, preview: { tr: "{threshold} referansa ulaştın. Ödülün lansman günü için ayrıldı ve seni bekliyor.", en: "You hit {threshold} referrals. Your reward is reserved and waiting for launch day." }, status: "live", sent: 231, openRate: 0.82 },
  { id: "e4", name: { tr: "Sıra atlama", en: "Position jump" }, trigger: { tr: "10+ sıra çıkınca", en: "Moved up 10+" }, subject: { tr: "Bekleme listesinde 12 kişiyi geçtin", en: "You leapfrogged 12 people on the waitlist" }, preview: { tr: "Arkadaşların seni mahcup etmedi. Artık #{position} sıradasın — seriyi sürdür.", en: "Your friends came through. You're now #{position} — keep the streak going." }, status: "live", sent: 489, openRate: 0.58 },
  { id: "e5", name: { tr: "Az kaldı dürtüsü", en: "Almost there nudge" }, trigger: { tr: "Sonraki seviyeye 1 kala", en: "1 from next tier" }, subject: { tr: "Bir referans daha {reward} ödülünü açar", en: "One more referral unlocks {reward}" }, preview: { tr: "Sonraki ödül seviyesine tek bir arkadaş uzaktasın. İşte bağlantın yine.", en: "You're a single friend away from the next reward tier. Here's your link again." }, status: "paused", sent: 96, openRate: 0.49 },
  { id: "e6", name: { tr: "Lansman günü", en: "Launch day" }, trigger: { tr: "Lansmanda", en: "On launch" }, subject: { tr: "Yayında — ve sırada ilk sensin", en: "It's live — and you're first in line" }, preview: { tr: "Bekleyiş bitti. En iyi davetçilerden biri olarak herkesten önce giriyorsun. Aramıza hoş geldin.", en: "The wait is over. As a top referrer you get in before everyone else. Welcome aboard." }, status: "draft", sent: 0, openRate: 0 },
];

/* ── Embed page ─────────────────────────────────────────────────────────── */
export const embedSnippet = `<!-- Sıra embed — drop this where you want the signup form -->
<div id="sira-waitlist" data-list="launch-2026"></div>
<script
  src="https://cdn.sira.so/widget.js"
  data-key="sira_live_8f3a92c1"
  async
></script>`;

export const embedReactSnippet = `import { WaitlistForm } from "@sira/react";

export default function Page() {
  return (
    <WaitlistForm
      listId="launch-2026"
      publicKey="sira_live_8f3a92c1"
      referralsEnabled
    />
  );
}`;

export interface EmbedOption { id: string; label: L; value: L; hint: L; }
export const embedOptions: EmbedOption[] = [
  { id: "o1", label: { tr: "Referans topla", en: "Collect referrals" }, value: { tr: "Açık", en: "On" }, hint: { tr: "Her kayda paylaşım bağlantısı ver", en: "Give each signup a share link" } },
  { id: "o2", label: { tr: "Çift onay", en: "Double opt-in" }, value: { tr: "Açık", en: "On" }, hint: { tr: "E-posta onayı iste", en: "Require email confirmation" } },
  { id: "o3", label: { tr: "Tema", en: "Theme" }, value: { tr: "Siteye uy", en: "Match site" }, hint: { tr: "Sayfa renklerini devral", en: "Inherit your page colors" } },
  { id: "o4", label: { tr: "Sıra sayacı", en: "Position counter" }, value: { tr: "Görünür", en: "Visible" }, hint: { tr: "Kayıttan sonra #N göster", en: "Show #N after signup" } },
];
