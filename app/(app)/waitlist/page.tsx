"use client";

import { useMemo, useState } from "react";
import { Search, Download, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/components/i18n/language-provider";
import { signups, type Signup } from "@/lib/demo/data";
import { formatNumber, cn } from "@/lib/utils";

const statusTone = { confirmed: "success", pending: "warning", rewarded: "primary" } as const;

type Filter = "all" | "confirmed" | "pending" | "rewarded";
type SortKey = "position" | "referrals";

export default function WaitlistPage() {
  const { lang } = useLang();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("position");

  const m = {
    tr: {
      title: "Liste", sub: "Sıralı bekleme listen — her kayıt, sırası ve referansları.",
      search: "İsim veya e-posta ara…", export: "Dışa aktar",
      filters: { all: "Tümü", confirmed: "Onaylı", pending: "Bekliyor", rewarded: "Ödüllü" } as Record<Filter, string>,
      sortPos: "Sıraya göre", sortRef: "Referansa göre",
      cols: { person: "Kişi", pos: "Sıra", ref: "Referans", source: "Kaynak", status: "Durum", joined: "Katıldı" },
      status: { confirmed: "onaylı", pending: "bekliyor", rewarded: "ödüllü" } as Record<string, string>,
      total: "kayıt", empty: "Eşleşen kayıt yok.",
    },
    en: {
      title: "Waitlist", sub: "Your ranked list — every signup, their position and referrals.",
      search: "Search name or email…", export: "Export",
      filters: { all: "All", confirmed: "Confirmed", pending: "Pending", rewarded: "Rewarded" } as Record<Filter, string>,
      sortPos: "By position", sortRef: "By referrals",
      cols: { person: "Person", pos: "Position", ref: "Referrals", source: "Source", status: "Status", joined: "Joined" },
      status: { confirmed: "confirmed", pending: "pending", rewarded: "rewarded" } as Record<string, string>,
      total: "signups", empty: "No matching signups.",
    },
  }[lang];

  const rows = useMemo(() => {
    let r: Signup[] = [...signups];
    if (filter !== "all") r = r.filter((s) => s.status === filter);
    if (q.trim()) {
      const needle = q.toLowerCase();
      r = r.filter((s) => s.person.toLowerCase().includes(needle) || s.email.toLowerCase().includes(needle));
    }
    r.sort((a, b) => (sort === "position" ? a.position - b.position : b.referrals - a.referrals));
    return r;
  }, [q, filter, sort]);

  const counts = useMemo(() => ({
    all: signups.length,
    confirmed: signups.filter((s) => s.status === "confirmed").length,
    pending: signups.filter((s) => s.status === "pending").length,
    rewarded: signups.filter((s) => s.status === "rewarded").length,
  }), []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">{m.title}</h2>
          <p className="text-sm text-muted-foreground">{m.sub}</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:bg-muted">
          <Download className="h-4 w-4" /> {m.export}
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 text-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={m.search}
            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1">
          {(Object.keys(m.filters) as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold transition",
                filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m.filters[f]}
              <span className={cn("tnum text-[11px]", filter === f ? "opacity-80" : "text-muted-foreground/70")}>{counts[f]}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setSort(sort === "position" ? "referrals" : "position")}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-[13px] font-semibold transition hover:bg-muted"
        >
          <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
          {sort === "position" ? m.sortPos : m.sortRef}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left label-mono text-muted-foreground">
                <th className="px-5 py-3 font-medium">{m.cols.pos}</th>
                <th className="px-5 py-3 font-medium">{m.cols.person}</th>
                <th className="px-5 py-3 text-right font-medium">{m.cols.ref}</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">{m.cols.source}</th>
                <th className="px-5 py-3 font-medium">{m.cols.status}</th>
                <th className="hidden px-5 py-3 text-right font-medium md:table-cell">{m.cols.joined}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/40">
                  <td className="px-5 py-3">
                    <span className={cn("grid h-8 w-8 place-items-center rounded-lg text-[13px] font-bold tnum", s.position <= 3 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>#{s.position}</span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">{s.person.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{s.person}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-right tnum font-bold text-primary">{formatNumber(s.referrals)}</td>
                  <td className="hidden px-5 py-3 text-muted-foreground sm:table-cell">{s.source}</td>
                  <td className="px-5 py-3"><Badge tone={statusTone[s.status]} className="capitalize">{m.status[s.status]}</Badge></td>
                  <td className="hidden px-5 py-3 text-right tnum text-muted-foreground md:table-cell">{s.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="px-5 py-10 text-center text-sm text-muted-foreground">{m.empty}</p>}
      </div>
      <p className="text-center text-xs text-muted-foreground tnum">{rows.length} / {signups.length} {m.total}</p>
    </div>
  );
}
