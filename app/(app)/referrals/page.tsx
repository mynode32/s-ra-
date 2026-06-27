"use client";

import { useState } from "react";
import { Copy, Check, Send, MessageCircle, Mail } from "lucide-react";
import { TrendChart } from "@/components/app/trend-chart";
import { DataTable, type DataRow } from "@/components/app/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { useLang } from "@/components/i18n/language-provider";
import {
  leaderboard,
  referralColumns,
  rewardTiers,
  viralStats,
  viralTrend,
} from "@/lib/demo/data";
import { formatNumber } from "@/lib/utils";

const medal = ["🥇", "🥈", "🥉"];
const REFERRAL_LINK = "https://sira.so/?ref=alex-x9k2";

const M = {
  tr: {
    title: "Referanslar",
    sub: "Kim sesini duyuruyor — ve döngü ne kadar viral oldu.",
    viral: "Viral katsayı",
    viralSub: "Son 5 haftadaki K-faktörü",
    invitesSent: "Davet gönderildi",
    friendsJoined: "Katılan arkadaş",
    acceptRate: "Kabul oranı",
    tiers: "Ödül seviyeleri",
    tiersSub: "Referanslarla açılır",
    referralsWord: "referans",
    topTitle: "En iyi davetçiler",
    topSub: "En gürültücü hayranların, sıralı",
    joinedWord: "katıldı",
    detail: "Referans detayı",
    shareTitle: "Paylaşım araçları",
    shareSub: "Davetçilere bu hazır bağlantı ve mesajları ver.",
    yourLink: "Senin referans bağlantın",
    copy: "Kopyala",
    copied: "Kopyalandı",
    shareVia: "Şununla paylaş",
  },
  en: {
    title: "Referrals",
    sub: "Who's spreading the word — and how viral the loop has gone.",
    viral: "Viral coefficient",
    viralSub: "K-factor over the last 5 weeks",
    invitesSent: "Invites sent",
    friendsJoined: "Friends joined",
    acceptRate: "Accept rate",
    tiers: "Reward tiers",
    tiersSub: "Unlocked by referrals",
    referralsWord: "referrals",
    topTitle: "Top referrers",
    topSub: "Your loudest fans, ranked",
    joinedWord: "joined",
    detail: "Referral detail",
    shareTitle: "Share tools",
    shareSub: "Hand referrers this ready-made link and messages.",
    yourLink: "Your referral link",
    copy: "Copy",
    copied: "Copied",
    shareVia: "Share via",
  },
};

export default function ReferralsPage() {
  const { lang, t } = useLang();
  const m = M[lang];
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(REFERRAL_LINK).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const referralRows: DataRow[] = leaderboard.map((r) => ({
    id: r.id,
    person: r.person,
    _sub: r.handle,
    referrals: r.referrals,
    converted: r.converted,
    tier: t(r.tier),
  }));

  const shareLinks = [
    { icon: Send, label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(REFERRAL_LINK)}` },
    { icon: MessageCircle, label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(REFERRAL_LINK)}` },
    { icon: Mail, label: "Email", href: `mailto:?body=${encodeURIComponent(REFERRAL_LINK)}` },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">{m.title}</h2>
        <p className="text-sm text-muted-foreground">{m.sub}</p>
      </div>

      {/* Share tools */}
      <Card>
        <CardHeader>
          <CardTitle>{m.shareTitle}</CardTitle>
          <p className="text-sm text-muted-foreground">{m.shareSub}</p>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="min-w-[260px] flex-1">
            <p className="label-mono mb-1.5 text-muted-foreground">{m.yourLink}</p>
            <div className="flex h-11 items-center gap-2 rounded-xl border border-border bg-muted/40 px-3">
              <Icon name="link" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 truncate font-mono text-[13px]">{REFERRAL_LINK}</span>
              <button onClick={copy} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[12px] font-bold text-primary-foreground transition hover:opacity-90">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? m.copied : m.copy}
              </button>
            </div>
          </div>
          <div>
            <p className="label-mono mb-1.5 text-muted-foreground">{m.shareVia}</p>
            <div className="flex items-center gap-2">
              {shareLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition hover:border-primary/40 hover:text-primary">
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Viral coefficient + tiers */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>{m.viral}</CardTitle>
              <p className="text-sm text-muted-foreground">{m.viralSub}</p>
            </div>
            <Badge tone="success">{viralStats.coefficient.toFixed(1)}×</Badge>
          </CardHeader>
          <CardContent>
            <TrendChart data={viralTrend} height={200} />
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-display text-2xl font-semibold tabular-nums">
                  {formatNumber(viralStats.invitesSent)}
                </div>
                <div className="text-xs text-muted-foreground">{m.invitesSent}</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold tabular-nums">
                  {formatNumber(viralStats.invitesAccepted)}
                </div>
                <div className="text-xs text-muted-foreground">{m.friendsJoined}</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold tabular-nums">
                  {Math.round(viralStats.acceptRate * 100)}%
                </div>
                <div className="text-xs text-muted-foreground">{m.acceptRate}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{m.tiers}</CardTitle>
            <p className="text-sm text-muted-foreground">{m.tiersSub}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {rewardTiers.map((tier) => (
              <div key={tier.id} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon name="gift" className="h-[18px] w-[18px]" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {t(tier.name)}{" "}
                    <span className="text-muted-foreground">· {tier.threshold} {m.referralsWord}</span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{t(tier.reward)}</p>
                </div>
                <Badge tone="primary" className="ml-auto shrink-0">
                  {tier.unlocked}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>{m.topTitle}</CardTitle>
          <p className="text-sm text-muted-foreground">{m.topSub}</p>
        </CardHeader>
        <CardContent className="space-y-1.5">
          {leaderboard.map((r) => (
            <div
              key={r.id}
              className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50"
            >
              <span className="w-7 text-center text-lg tabular-nums">
                {medal[r.rank - 1] ?? <span className="text-sm text-muted-foreground">{r.rank}</span>}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{r.person}</p>
                <p className="truncate text-xs text-muted-foreground">{r.handle}</p>
              </div>
              <Badge tone="neutral" className="shrink-0">{t(r.tier)}</Badge>
              <div className="w-20 text-right">
                <div className="text-sm font-semibold tabular-nums">{r.referrals}</div>
                <div className="text-xs text-muted-foreground">{r.converted} {m.joinedWord}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <DataTable
        title={m.detail}
        columns={referralColumns.map((c) => ({ ...c, label: t(c.label) }))}
        rows={referralRows}
      />
    </div>
  );
}
