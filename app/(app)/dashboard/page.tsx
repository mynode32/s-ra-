"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight, Zap, TrendingUp, Share2, Trophy, Plus,
  Mail, CheckCircle2, Copy, CheckCheck, AtSign, Link2, Send, Gift, Activity as ActivityIcon,
} from "lucide-react";
import { useLang } from "@/components/i18n/language-provider";
import {
  breakdown,
  funnel,
  growthCurve,
  hero,
  rewardTiers,
  trend,
  leaderboard as demoLeaderboard,
  signups as demoSignups,
  viralStats as demoViralStats,
} from "@/lib/demo/data";
import { formatNumber } from "@/lib/utils";

const nf = (n: number) => formatNumber(n);
const medal = ["🥇", "🥈", "🥉"];

/** Big inline-SVG area chart for the cumulative growth curve. */
function GrowthArea({ data }: { data: { label: string; value: number }[] }) {
  const w = 560, h = 150, pad = 6;
  const max = Math.max(...data.map((d) => d.value));
  const pts = data.map((d, i) => [
    (i / (data.length - 1)) * w,
    h - (d.value / max) * (h - pad * 2) - pad,
  ]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[150px] w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-primary)" stopOpacity="0.42" />
          <stop offset="1" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w} ${h} L0 ${h} Z`} fill="url(#growthFill)" />
      <path d={line} fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r="5" fill="var(--color-primary)" />
      <circle cx={last[0]} cy={last[1]} r="9" fill="none" stroke="var(--color-primary)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

/** Daily-velocity bar chart — signups per day this week. */
function VelocityBars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-[120px] items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center gap-1.5">
          <span className="tnum text-[10px] font-bold text-primary opacity-0 transition group-hover:opacity-100">{d.value}</span>
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition-all duration-500 group-hover:opacity-90"
              style={{ height: `${Math.max(8, (d.value / max) * 100)}%`, background: "var(--grad-brand)" }}
            />
          </div>
          <span className="label-mono text-[9px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Animated count-up for the hero signup number. */
function useCountUp(target: number, ms = 1100) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return n;
}

const sourceTones: Record<string, string> = {
  Referral: "var(--grad-brand)",
  "Product Hunt": "oklch(72% 0.16 40)",
  Twitter: "oklch(70% 0.13 230)",
  Direct: "oklch(60% 0.02 145)",
};

export default function SiraDashboard() {
  const { lang, t } = useLang();
  
  // Gerçek Veri Durumu
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSignups: 0,
    referredSignups: 0,
    refSharePct: 0,
    kFactor: "0.0",
    pendingSignups: 0
  });
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [signups, setSignups] = useState<any[]>([]);

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const store_id = typeof window !== 'undefined' 
          ? new URLSearchParams(window.location.search).get('store_id') 
          : null;
          
        if (!store_id) return;

        const res = await fetch(`/api/dashboard?store_id=${store_id}`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setLeaderboard(data.leaderboard);
          setSignups(data.recentSignups);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRealData();
  }, []);

  // Animasyonlu sayacın hedefi artık gerçek veri
  const count = useCountUp(stats.totalSignups || 0);
  const pct = Math.round(((stats.totalSignups || 0) / hero.goal) * 100);
  const [copied, setCopied] = useState(false);

  const m = {
    tr: {
      hi: "Tekrar hoş geldin, Alex", run: "launch-2026 · canlı", add: "Kayıt ekle",
      total: "Toplam kayıt", of: `${nf(hero.goal)} hedefinin %${pct}'si`,
      viral: "Viral katsayı", viralSub: "K-faktörü, son 5 hafta",
      refShare: "Referans payı", refShareSub: "kayıtların referanstan gelen kısmı",
      curve: "Büyüme eğrisi", curveSub: "Kümülatif kayıt",
      board: "Referans liderlik tablosu", boardSub: "Listeni kim büyütüyor",
      invites: "davet", joined: "katıldı",
      tiers: "Ödül seviyeleri", unlocked: "kişi açtı", at: "referansta",
      feed: "Son kayıtlar", all: "Tümü", pos: "Sıra",
      funnel: "Dönüşüm hunisi", live: "CANLI",
      // new
      kAvgOpen: "Ortalama açılma", kAvgOpenSub: "6 e-posta şablonu",
      kPending: "Onay bekleyen", kPendingSub: "9'u 48 saati geçti",
      velocity: "Günlük hız", velocitySub: "Bu hafta, gün başına kayıt",
      sources: "Kayıt kaynağı", sourcesSub: "kayıtlar nereden geliyor",
      ofTotal: "toplamın", share: "Paylaşım araçları", shareSub: "döngüyü hızlandır",
      shareLink: "Paylaşım bağlantın", copy: "Kopyala", copied: "Kopyalandı",
      shareX: "X'te paylaş", shareEmail: "E-posta ile davet", shareEmbed: "Embed'i kopyala",
      reward: "ödül", threshold: "eşik", people: "kişi",
      pulse: "Canlı akış", reminderCta: "Hatırlatma gönder",
    },
    en: {
      hi: "Welcome back, Alex", run: "launch-2026 · live", add: "Add signup",
      total: "Total signups", of: `${pct}% of ${nf(hero.goal)} goal`,
      viral: "Viral coefficient", viralSub: "K-factor, last 5 weeks",
      refShare: "Referral share", refShareSub: "of signups come from referrals",
      curve: "Growth curve", curveSub: "Cumulative signups",
      board: "Referral leaderboard", boardSub: "Who's growing your list",
      invites: "invites", joined: "joined",
      tiers: "Reward tiers", unlocked: "unlocked", at: "referrals",
      feed: "Recent signups", all: "All", pos: "Pos",
      funnel: "Conversion funnel", live: "LIVE",
      // new
      kAvgOpen: "Avg open rate", kAvgOpenSub: "across 6 templates",
      kPending: "Pending confirm", kPendingSub: "9 past 48h",
      velocity: "Daily velocity", velocitySub: "This week, signups per day",
      sources: "Signup sources", sourcesSub: "where signups come from",
      ofTotal: "of total", share: "Share tools", shareSub: "speed up the loop",
      shareLink: "Your share link", copy: "Copy", copied: "Copied",
      shareX: "Share on X", shareEmail: "Invite by email", shareEmbed: "Copy embed",
      reward: "reward", threshold: "threshold", people: "people",
      pulse: "Live feed", reminderCta: "Send reminder",
    },
  }[lang];

  const refShare = stats.refSharePct;
  const pendingCount = stats.pendingSignups;
  const breakdownTotal = breakdown.reduce((acc, b) => acc + b.value, 0);

  const shareLink = "sira.so/r/alex";
  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${shareLink}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  // +2 KPIs alongside the existing two in-hero
  const extraKpis = [
    { label: m.kAvgOpen, value: "67%", sub: m.kAvgOpenSub, icon: Mail, delta: "+3.1%" },
    { label: m.kPending, value: nf(pendingCount * 4 + 1), sub: m.kPendingSub, icon: CheckCircle2, delta: "-12%" },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{m.hi}</h2>
          <p className="label-mono mt-1 inline-flex items-center gap-2 text-muted-foreground">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" /> {m.run}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90">
          <Plus className="h-4 w-4" /> {m.add}
        </button>
      </div>

      {/* HERO — big counter + viral + growth curve */}
      <section className="relative overflow-hidden rounded-3xl border border-sidebar-border bg-sidebar p-7 text-sidebar-foreground glow lg:p-8" style={{ backgroundImage: "var(--grad-hero)" }}>
        <span className="blob -right-12 -top-20 h-64 w-64 bg-primary/45 drift" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="label-mono text-sidebar-muted">{m.total}</p>
            <p className="mt-1 font-display text-6xl font-bold leading-none tnum text-primary text-glow lg:text-7xl">{nf(count)}</p>
            <div className="mt-4 max-w-xs">
              <div className="flex items-center justify-between text-[11px] text-sidebar-muted tnum">
                <span>{nf(stats.totalSignups)}</span><span>{nf(hero.goal)}</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-2 text-[13px] text-sidebar-foreground/80">{m.of}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                <p className="flex items-center gap-1.5 label-mono text-sidebar-muted"><Zap className="h-3 w-3 text-primary" /> {m.viral}</p>
                <p className="mt-1.5 font-display text-3xl font-bold tnum text-primary">{stats.kFactor}×</p>
                <p className="mt-0.5 text-[11px] text-sidebar-foreground/60">{m.viralSub}</p>
              </div>
              <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-white/10">
                <p className="flex items-center gap-1.5 label-mono text-sidebar-muted"><Share2 className="h-3 w-3 text-primary" /> {m.refShare}</p>
                <p className="mt-1.5 font-display text-3xl font-bold tnum text-primary">%{refShare}</p>
                <p className="mt-0.5 text-[11px] text-sidebar-foreground/60">{m.refShareSub}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <p className="label-mono text-sidebar-muted">{m.curve}</p>
                <p className="text-sm font-medium">{m.curveSub}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[11px] font-bold text-primary ring-1 ring-primary/30">
                <TrendingUp className="h-3 w-3" /> +18.4%
              </span>
            </div>
            <div className="mt-3 flex-1">
              <GrowthArea data={growthCurve} />
              <div className="mt-1 flex justify-between text-[10px] text-sidebar-muted tnum">
                {growthCurve.map((d) => <span key={d.label}>{d.label}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ★ NEW: +2 KPIs + daily velocity bar chart */}
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr_1.4fr]">
        {extraKpis.map((k) => {
          const Ic = k.icon;
          const down = k.delta.startsWith("-");
          return (
            <div key={k.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/12 text-primary"><Ic className="h-4 w-4" /></span>
                <span className={`tnum inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${down ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                  <TrendingUp className={`h-3 w-3 ${down ? "rotate-180" : ""}`} /> {k.delta}
                </span>
              </div>
              <p className="mt-4 font-display text-4xl font-bold leading-none tnum">{k.value}</p>
              <p className="mt-2 text-sm font-semibold">{k.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{k.sub}</p>
            </div>
          );
        })}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="inline-flex items-center gap-2 font-display text-base font-bold tracking-tight"><ActivityIcon className="h-4 w-4 text-primary" /> {m.velocity}</h3>
              <p className="text-xs text-muted-foreground">{m.velocitySub}</p>
            </div>
            <span className="label-mono inline-flex items-center gap-1.5 text-primary"><span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" /> {m.live}</span>
          </div>
          <VelocityBars data={trend} />
        </div>
      </section>

      {/* Leaderboard (signature) + reward tiers */}
      <section className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Trophy className="h-4 w-4 text-primary" /> {m.board}</h3>
              <p className="text-xs text-muted-foreground">{m.boardSub}</p>
            </div>
            <Link href="/referrals" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">{m.all} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <ol className="space-y-1.5">
            {leaderboard.length === 0 && <p className="text-sm text-muted-foreground mt-4">Henüz referans yapan kimse yok.</p>}
            {leaderboard.slice(0, 6).map((r) => {
              const top = r.rank <= 3;
              const barMax = leaderboard[0]?.referrals || 1;
              return (
                <li key={r.id} className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/50">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold tnum ${top ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {top ? medal[r.rank - 1] : r.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{r.person} <span className="font-normal text-muted-foreground">{r.handle}</span></p>
                      <p className="tnum text-sm font-bold text-primary">{r.referrals}</p>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary/80" style={{ width: `${(r.referrals / barMax) * 100}%` }} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ★ EXPANDED: reward-tier detail panel */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-4 inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Gift className="h-4 w-4 text-primary" /> {m.tiers}</h3>
          <div className="space-y-3.5">
            {rewardTiers.map((tier) => {
              const goal = rewardTiers[0].unlocked;
              return (
                <div key={tier.id} className="rounded-xl border border-border bg-muted/20 p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-2 text-sm font-bold">
                      <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/15 text-[11px] font-bold tnum text-primary">{tier.threshold}</span>
                      {t(tier.name)}
                    </p>
                    <p className="tnum text-xs text-muted-foreground"><span className="font-bold text-foreground">{nf(tier.unlocked)}</span> {m.unlocked}</p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(tier.reward)}</p>
                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.max(6, (tier.unlocked / goal) * 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ★ NEW: referral-source breakdown + share tools */}
      <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-1 inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Share2 className="h-4 w-4 text-primary" /> {m.sources}</h3>
          <p className="mb-4 text-xs text-muted-foreground">{m.sourcesSub}</p>
          {/* stacked bar */}
          <div className="flex h-3 w-full overflow-hidden rounded-full ring-1 ring-border">
            {breakdown.map((b) => (
              <div key={b.label} style={{ width: `${(b.value / breakdownTotal) * 100}%`, background: sourceTones[b.label] ?? "var(--grad-brand)" }} />
            ))}
          </div>
          <ul className="mt-5 space-y-3">
            {breakdown.map((b) => {
              const share = Math.round((b.value / breakdownTotal) * 100);
              return (
                <li key={b.label} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: sourceTones[b.label] ?? "var(--grad-brand)" }} />
                  <span className="flex-1 text-sm font-medium">{b.label}</span>
                  <span className="tnum text-sm font-bold">{nf(b.value)}</span>
                  <span className="tnum w-12 text-right text-xs text-muted-foreground">%{share} {m.ofTotal}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-1 inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Link2 className="h-4 w-4 text-primary" /> {m.share}</h3>
          <p className="mb-4 text-xs text-muted-foreground">{m.shareSub}</p>
          <p className="label-mono text-muted-foreground">{m.shareLink}</p>
          <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2.5">
            <span className="flex-1 truncate font-mono text-[13px] text-primary">{shareLink}</span>
            <button onClick={copyLink} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-[12px] font-bold text-primary ring-1 ring-primary/30 transition hover:bg-primary/25">
              {copied ? <><CheckCheck className="h-3.5 w-3.5" /> {m.copied}</> : <><Copy className="h-3.5 w-3.5" /> {m.copy}</>}
            </button>
          </div>
          <div className="mt-4 grid gap-2">
            {[
              { icon: AtSign, label: m.shareX },
              { icon: Send, label: m.shareEmail },
              { icon: ActivityIcon, label: m.shareEmbed },
            ].map((s) => {
              const Ic = s.icon;
              return (
                <button key={s.label} className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 px-3.5 py-2.5 text-left text-sm font-medium transition hover:border-primary/40 hover:bg-muted/40">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/12 text-primary"><Ic className="h-3.5 w-3.5" /></span>
                  {s.label}
                  <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ★ EXPANDED: recent signups live feed + conversion funnel */}
      <section className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight">{m.feed}</h3>
              <p className="label-mono mt-0.5 inline-flex items-center gap-1.5 text-muted-foreground"><span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" /> {m.pulse}</p>
            </div>
            <Link href="/waitlist" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground">{m.all} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
          <ul className="space-y-1">
            {signups.length === 0 && <p className="text-sm text-muted-foreground mt-4">Henüz kayıt yok.</p>}
            {signups.slice(0, 10).map((s) => {
              const pending = s.status === "pending" || s.status === "unconfirmed";
              return (
                <li key={s.id} className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/50">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">{s.person?.split(" ").map((p: string) => p[0]).join("").slice(0, 2) || "?"}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.person}
                      {s.status === "rewarded" && <span className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-primary/12 px-1.5 py-0.5 text-[10px] font-bold text-primary"><Gift className="h-2.5 w-2.5" /></span>}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{s.source} · {s.joined}</p>
                  </div>
                  {pending ? (
                    <button className="shrink-0 rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-bold text-warning ring-1 ring-warning/25 transition hover:bg-warning/25">{m.reminderCta}</button>
                  ) : (
                    <div className="shrink-0 text-right">
                      <p className="tnum text-sm font-bold">#{s.position}</p>
                      <p className="tnum text-[11px] text-primary">{s.referrals} {m.invites}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="mb-4 font-display text-lg font-bold tracking-tight">{m.funnel}</h3>
          <div className="space-y-3">
            {funnel.map((f, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium">{t(f.label)}</p>
                  <p className="tnum text-sm font-bold">{nf(f.value)} <span className="text-xs font-normal text-muted-foreground">· %{f.pct}</span></p>
                </div>
                <div className="mt-1.5 h-7 overflow-hidden rounded-lg bg-muted">
                  <div
                    className="flex h-full items-center rounded-lg"
                    style={{ width: `${f.pct}%`, background: "var(--grad-brand)", minWidth: "8%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
