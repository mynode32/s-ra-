"use client";

import { useState } from "react";
import { Plus, Pencil, Eye, Code2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useLang } from "@/components/i18n/language-provider";
import { emailTemplates } from "@/lib/demo/data";
import { formatNumber, cn } from "@/lib/utils";

const statusTone = { live: "success", draft: "neutral", paused: "warning" } as const;

const totalSent = emailTemplates.reduce((n, e) => n + e.sent, 0);
const liveCount = emailTemplates.filter((e) => e.status === "live").length;

const M = {
  tr: {
    title: "E-postalar",
    sub: (live: number, sent: string) =>
      `İnsanlar katıldıkça ve davet ettikçe tetiklenen yaşam döngüsü şablonları. ${live} yayında · ${sent} gönderildi.`,
    newTemplate: "Yeni şablon",
    triggerLabel: "Tetikleyici",
    openLabel: (pct: number) => `%${pct} açılma`,
    notSent: "henüz gönderilmedi",
    edit: "Düzenle", preview: "Önizleme", source: "HTML",
    subject: "Konu", sendTest: "Test gönder",
    status: { live: "yayında", draft: "taslak", paused: "duraklatıldı" } as Record<string, string>,
  },
  en: {
    title: "Emails",
    sub: (live: number, sent: string) =>
      `Lifecycle templates that fire as people join and refer. ${live} live · ${sent} sent.`,
    newTemplate: "New template",
    triggerLabel: "Trigger",
    openLabel: (pct: number) => `${pct}% open`,
    notSent: "not sent yet",
    edit: "Edit", preview: "Preview", source: "HTML",
    subject: "Subject", sendTest: "Send test",
    status: { live: "live", draft: "draft", paused: "paused" } as Record<string, string>,
  },
};

function TemplateCard({ e, m, t }: { e: (typeof emailTemplates)[number]; m: (typeof M)["en"]; t: (v: { tr: string; en: string }) => string }) {
  const [tab, setTab] = useState<"preview" | "source">("preview");
  return (
    <Card>
      <CardContent className="space-y-4 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
              <Icon name="mail" className="h-5 w-5" />
            </span>
            <div>
              <p className="flex items-center gap-2 font-display text-base font-bold tracking-tight">
                {t(e.name)}
                <Badge tone={statusTone[e.status]} className="capitalize">{m.status[e.status]}</Badge>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{m.triggerLabel}: {t(e.trigger)}</p>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <div className="font-display text-lg font-bold tnum">{formatNumber(e.sent)}</div>
            <div className="text-xs text-muted-foreground">{e.sent > 0 ? m.openLabel(Math.round(e.openRate * 100)) : m.notSent}</div>
          </div>
        </div>

        {/* tab switch */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-0.5">
          {(["preview", "source"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-semibold transition",
                tab === k ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {k === "preview" ? <Eye className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
              {k === "preview" ? m.preview : m.source}
            </button>
          ))}
        </div>

        {tab === "preview" ? (
          <div className="rounded-xl border border-border bg-background p-4">
            <p className="label-mono text-muted-foreground">{m.subject}</p>
            <p className="mt-1 text-sm font-semibold">{t(e.subject)}</p>
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-sm leading-relaxed text-muted-foreground">{t(e.preview)}</p>
            </div>
          </div>
        ) : (
          <pre className="overflow-x-auto rounded-xl border border-border bg-sidebar p-4 font-mono text-[12px] leading-relaxed text-sidebar-foreground">
{`<h1 style="color:#a6f019">${t(e.subject)}</h1>
<p>${t(e.preview)}</p>
<a href="{{referral_link}}"
   class="sira-btn">${m.preview}</a>`}
          </pre>
        )}

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5"><Pencil className="h-3.5 w-3.5" /> {m.edit}</Button>
          <Button variant="ghost" size="sm" className="gap-1.5"><Send className="h-3.5 w-3.5" /> {m.sendTest}</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EmailsPage() {
  const { lang, t } = useLang();
  const m = M[lang];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{m.title}</h2>
          <p className="text-sm text-muted-foreground">{m.sub(liveCount, formatNumber(totalSent))}</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> {m.newTemplate}</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {emailTemplates.map((e) => (
          <TemplateCard key={e.id} e={e} m={m} t={t} />
        ))}
      </div>
    </div>
  );
}
