"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight, ArrowRight, Check, X, Plus, Minus, Zap, Trophy, Mail,
  ListOrdered, Share2, Gift, Code, TrendingUp, Copy, CheckCheck, Rocket,
  Users, Search, Megaphone, Sparkles, Quote, MousePointerClick, Link2,
} from "lucide-react";
import { LogoMark } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLang } from "@/components/i18n/language-provider";
import appConfig from "@/app.config";
import { cn } from "@/lib/utils";

const featureIcons = [ListOrdered, Share2, Gift, Mail, Code, TrendingUp];

const content = {
  tr: {
    nav: ["Özellikler", "Nasıl çalışır", "Fiyatlar"], signin: "Giriş yap", demo: "Demoyu aç",
    h1a: "Bekleme listen sen", hl: "uyurken", h1b: "büyümeli.",
    sub: "Açılış sayfana tek bir embed bırak; Sıra kayıtları, referans sıralamalarını ve ödül e-postalarını halleder — her yeni hayranı sonraki ona dönüştürür.",
    cta1: "Listeni başlat", cta2: "Nasıl çalışır",
    emailPlaceholder: "sen@sirketin.com", emailCta: "Sıraya gir",
    social: "Bu hafta 2.847 kişi sıraya girdi.", live: "canlı",
    marqueeTitle: "Her yere gömülür",
    marquee: ["Webflow", "Framer", "Next.js", "WordPress", "Shopify", "Astro", "Notion", "Carrd", "düz HTML", "Wix"],
    problemKicker: "Tanıdık geldi mi",
    problemH: ["Lansman günü", "kimse gelmiyor."],
    problemBody: "Aylarca ürünü yaptın, “coming soon” koydun, e-posta topladın. Lansman günü 200 sessiz adres ve sıfır ivme. Sıra, bekleyeni elçiye çevirir — liste daha sen çıkmadan kendini pazarlar.",
    problemStats: [{ n: "%2", l: "“coming soon” formunun dönüşümü" }, { n: "0", l: "tek başına e-posta listesinin viral etkisi" }, { n: "47%", l: "açılmayan lansman e-postası" }, { n: "1 gün", l: "sönen lansman ivmesi" }],
    whatKicker: "Ne yapar",
    whatH: ["Bir büyüme döngüsü,", "tek embed'de."],
    stepsKicker: "Nasıl çalışır",
    stepsH: "Üç adımda viral liste.",
    steps: [
      { t: "Embed'i yapıştır", b: "Tek bir snippet, sitende şık bir kayıt aracı açar. Kod gerekmez." },
      { t: "Sıra ve referans dağıt", b: "Her kayıt canlı bir sıra ve benzersiz bir paylaşım bağlantısı alır." },
      { t: "Döngü tutuşsun", b: "Davet eden yükselir, ödül açılır; liste kendi kendine büyür." },
    ],
    proofKicker: "Sonuç",
    proof: [{ big: "1.8×", l: "ortalama viral katsayı", c: "Her kayıt 1.8 yeni kayıt getiriyor" }, { big: "%41", l: "referanstan gelen kayıt", c: "Bedava trafik, ücretli değil" }, { big: "60sn", l: "embed et ve yayında ol", c: "Backend kurmadan" }],
    promiseKicker: "Sessiz söz",
    promiseH: ["Liste senin.", "Döngü bizden."],
    promiseBody: "Kayıtlar, referanslar ve sıralar tek bir yerde toplanır. Veriyi tek tıkla dışa aktar, istediğin zaman taşı. Sıra büyümeyi motorlar — sahibi her zaman sensin.",
    promiseBullets: ["Tek embed: Webflow, Framer, düz HTML — her yere düşer.", "Gerçek viral döngü: referans = sırada yükselme + ödül.", "Markalı e-postalar: onay, aşama ve ödül, Resend ile.", "Dışa aktar / taşı: liste her zaman senin, kilit yok."],
    pricingKicker: "Fiyatlar", pricingH: ["Tek liste.", "Dürüst fiyat."],
    faqKicker: "Merak edilenler", faqH: "Kısa cevaplar.",
    finaleKicker: "Dene · 60 saniye", finaleH: "Listeni tutuştur.",
    finaleBody: "Önceden doldurulmuş canlı bir demo — her ekran tıklanabilir. Kart yok, kayıt yok.",
    footTagline: "Lansman öncesi listeni bir büyüme döngüsüne çeviren bekleme listesi & referans motoru.",
    recommended: "Önerilen", waitlistMini: "Bekleme listesi", topReferrers: "En iyi davetçiler", you: "Sen",

    // —— NEW: interactive demo ——
    tryKicker: "Canlı dene · sahte demo",
    tryH: ["Listeye katıl,", "sıranı izle."],
    tryBody: "Bir e-posta yaz ve Sıra'nın gerçekte nasıl çalıştığını gör: sıran belirir, referans bağlantın açılır ve liderlik tablosu canlanır. Hiçbir veri kaydedilmez.",
    tryPlaceholder: "sen@harika-fikir.com",
    tryJoin: "Sıraya gir",
    tryJoined: "Sıradasın!",
    tryYourPos: "Senin sıran",
    tryShareLabel: "Referans bağlantın",
    tryCopied: "Kopyalandı",
    tryCopy: "Kopyala",
    tryShareHint: "Her arkadaş seni 1 sıra yukarı taşır →",
    tryBumpHint: "↑ Paylaş ve test et: her tıklama 1 sıra yükseltir",
    tryReset: "Sıfırla",
    tryInvalid: "Geçerli bir e-posta yaz.",
    trySim: "Bir davet simüle et",
    tryBoard: "Liderlik tablosu",

    // —— NEW: use cases ——
    useKicker: "Kimin için",
    useH: ["Her lansman,", "bir döngü."],
    useSub: "İlk 1.000 kullanıcıya ihtiyacı olan herkes — Sıra büyümeyi onlar için motorluyor.",
    useCases: [
      { icon: "rocket", t: "Indie hacker", d: "Tek başına ürün çıkaran sen için: backend kurmadan ilk 500 kaydı topla, sıçramayı erken davetçilere bırak.", tag: "0 backend" },
      { icon: "megaphone", t: "SaaS lansmanı", d: "Beta listesini ödül seviyeleriyle besle. En sadık 25 kişi kurucu çevresi olsun, geri kalanı onları takip etsin.", tag: "Kurucu 25" },
      { icon: "search", t: "Ürün avı", d: "Product Hunt gününden önce sırayı doldur. Lansman saatinde 2.000 hazır oy patlat, ilk sayfayı kap.", tag: "PH-ready" },
      { icon: "users", t: "Topluluk", d: "Discord/Newsletter büyüt: davet eden öne geçer, ödülü açar. Üyeler senin yerine büyütür.", tag: "Davet = statü" },
    ],

    // —— NEW: testimonials ——
    voiceKicker: "Kullananlar",
    voiceH: ["Lansmanı", "kendi sözleriyle."],
    voices: [
      { q: "Embed'i Framer sitemize yapıştırdık, ertesi sabah 1.200 kayıt vardı. Referans döngüsü gerçekten tutuştu — para harcamadan.", n: "Lena Brandt", r: "Kurucu", b: "Northpeak", m: "1.200 kayıt / 9 gün", i: "LB" },
      { q: "Ödül seviyeleri en büyük hilemizdi. İlk 25 kişi kurucu çevremiz oldu ve hâlâ en aktif kullanıcılarımız.", n: "Marco Silva", r: "Büyüme lideri", b: "Tideline", m: "K-faktörü 2.1×", i: "MS" },
      { q: "Product Hunt günü için 3 hafta önce sırayı açtık. Lansman saatinde 2.000 hazır oyumuz vardı — günün ürünü olduk.", n: "Priya Nair", r: "CEO", b: "Stackbloom", m: "#1 Product Hunt", i: "PN" },
      { q: "Eskiden Google Form + tablo ile boğuşuyorduk. Sıra hepsini tek panele indirdi, e-postalar otomatik gidiyor.", n: "Tom Whitaker", r: "Indie hacker", b: "Maker'd", m: "8 sa → 0 sa / hafta", i: "TW" },
      { q: "Viral katsayıyı canlı görmek bağımlılık yaptı. Hangi kanalın listeyi büyüttüğünü tam olarak biliyoruz.", n: "Aïcha Benali", r: "Pazarlama", b: "Lumen", m: "%41 referanstan", i: "AB" },
      { q: "60 saniyede yayındaydık. Bir backend kurmaya çalışmadığıma hâlâ inanamıyorum — sadece çalıştı.", n: "Jonas Berg", r: "Solo founder", b: "Driftboard", m: "60sn kurulum", i: "JB" },
    ],

    // —— NEW: comparison ——
    cmpKicker: "Eski yol vs Sıra",
    cmpH: ["Form değil,", "bir döngü."],
    cmpOld: "Google Form / Notion",
    cmpNew: "Sıra",
    cmpRows: [
      { f: "Referans döngüsü", o: false, n: true, on: "Yok — herkes aynı sırada", nn: "Davet = yükselme + ödül" },
      { f: "Canlı sıra numarası", o: false, n: true, on: "Statik tablo satırı", nn: "Gerçek zamanlı #N" },
      { f: "Otomatik e-postalar", o: false, n: true, on: "Elle, tek tek", nn: "Onay · aşama · ödül, Resend" },
      { f: "Ödül seviyeleri", o: false, n: true, on: "Manuel takip", nn: "3 / 10 / 25'te otomatik açılır" },
      { f: "Viral analitik", o: false, n: true, on: "Yok", nn: "K-faktörü canlı" },
      { f: "Her yere göm", o: "kısmen", n: true, on: "iframe hilesi", nn: "Tek satır snippet" },
      { f: "Kurulum süresi", o: "saatler", n: true, on: "Form + Zapier + tablo", nn: "60 saniye" },
      { f: "Veriyi dışa aktar", o: true, n: true, on: "CSV (elle)", nn: "CSV / JSON, tek tık" },
    ],

    // —— NEW: viral loop deep dive ——
    loopKicker: "Viral döngü nasıl çalışır",
    loopH: ["Bir kayıt,", "üç yeni kayıt."],
    loopBody: "Mekanik basit ama güçlü: her kişi paylaşır, getirir, yükselir. Sonra getirdikleri de aynısını yapar. İşte döngü böyle kendini besler.",
    loopSteps: [
      { t: "Katıl & bağlantını al", b: "Kayıt anında benzersiz bir paylaşım bağlantısı düşer. Kopyala, paylaş.", icon: "link" },
      { t: "Arkadaşlar tıklar", b: "Bağlantınla gelen her onaylı kayıt, seni sırada yukarı taşır.", icon: "pointer" },
      { t: "Yüksel & ödül aç", b: "3, 10, 25 referansta erken erişim ve hediyeler otomatik açılır.", icon: "gift" },
    ],
    coeffLabel: "Viral katsayı (K)",
    coeffNote: "K > 1 olduğunda liste kendi kendine büyür. Sende ortalama:",
    gen: "Nesil",

    // —— NEW: embed act ——
    embedKicker: "Tek satır kodla sitene göm",
    embedH: ["Kopyala,", "yapıştır, yayında."],
    embedBody: "Backend yok, veritabanı yok, sunucu yok. Bu snippet'i sitene düşür; şık, markalı bir kayıt aracı belirir ve döngü çalışmaya başlar.",
    embedTabs: ["HTML", "React"],
    embedFeatures: ["Siteye uyan tema", "Çift onay dahili", "Referans takibi açık", "Sıra sayacı görünür"],

    // —— NEW: footer extra cols ——
    footCols: {
      product: { h: "Ürün", links: ["Özellikler", "Nasıl çalışır", "Fiyatlar", "Embed aracı", "Değişiklikler"] },
      use: { h: "Kullanım", links: ["Indie hacker", "SaaS lansmanı", "Ürün avı", "Topluluk", "Newsletter"] },
      company: { h: "Şirket", links: ["Hakkında", "Blog", "İletişim", "hello@sira.so"] },
      legal: { h: "Yasal", links: ["Gizlilik", "Şartlar", "Veri işleme", "Durum"] },
    },
    footRights: "Tüm hakları saklıdır.",
    footStatus: "Tüm sistemler çalışıyor",
  },
  en: {
    nav: ["Features", "How it works", "Pricing"], signin: "Sign in", demo: "Open the demo",
    h1a: "Your waitlist should", hl: "grow", h1b: "while you sleep.",
    sub: "Drop one embed on your landing page and Sıra handles signups, referral positions, and reward emails — turning every new fan into the next ten.",
    cta1: "Start your waitlist", cta2: "How it works",
    emailPlaceholder: "you@company.com", emailCta: "Join the line",
    social: "2,847 people joined the line this week.", live: "live",
    marqueeTitle: "Embeds anywhere",
    marquee: ["Webflow", "Framer", "Next.js", "WordPress", "Shopify", "Astro", "Notion", "Carrd", "plain HTML", "Wix"],
    problemKicker: "Sound familiar",
    problemH: ["Launch day,", "nobody shows up."],
    problemBody: "You built for months, slapped up a “coming soon”, collected emails. Launch day: 200 silent addresses and zero momentum. Sıra turns every waiter into an evangelist — the list markets itself before you ship.",
    problemStats: [{ n: "2%", l: "“coming soon” form conversion" }, { n: "0", l: "viral effect of a plain email list" }, { n: "47%", l: "unopened launch emails" }, { n: "1 day", l: "of launch momentum, then flat" }],
    whatKicker: "What it does",
    whatH: ["A growth loop,", "in a single embed."],
    stepsKicker: "How it works",
    stepsH: "A viral list in three steps.",
    steps: [
      { t: "Paste the embed", b: "One snippet drops a styled signup widget on your site. No code required." },
      { t: "Hand out positions & links", b: "Every signup gets a live position and a unique share link." },
      { t: "Let the loop catch", b: "Referrers climb, rewards unlock, and the list grows itself." },
    ],
    proofKicker: "The result",
    proof: [{ big: "1.8×", l: "average viral coefficient", c: "Each signup brings 1.8 more" }, { big: "41%", l: "signups from referrals", c: "Free traffic, not paid" }, { big: "60s", l: "to embed and go live", c: "No backend to stand up" }],
    promiseKicker: "The quiet promise",
    promiseH: ["The list is yours.", "The loop is ours."],
    promiseBody: "Signups, referrals and positions land in one place. Export your data in one click, take it anywhere. Sıra engines the growth — you always own it.",
    promiseBullets: ["One embed: Webflow, Framer, plain HTML — drops anywhere.", "A real viral loop: referral = climbing the line + rewards.", "Branded emails: confirm, milestone and reward, via Resend.", "Export / move: the list is always yours, no lock-in."],
    pricingKicker: "Pricing", pricingH: ["One list.", "Honest pricing."],
    faqKicker: "Good to know", faqH: "The short answers.",
    finaleKicker: "Try it · 60 seconds", finaleH: "Light the fuse.",
    finaleBody: "A pre-loaded live demo — every screen interactive. No card, no signup.",
    footTagline: "The waitlist & referral engine that turns your pre-launch list into a growth loop.",
    recommended: "Recommended", waitlistMini: "Waitlist", topReferrers: "Top referrers", you: "You",

    // —— NEW: interactive demo ——
    tryKicker: "Try it live · mock demo",
    tryH: ["Join the list,", "watch your spot."],
    tryBody: "Type an email and see how Sıra actually works: your position appears, your referral link unlocks, and the leaderboard comes alive. Nothing is stored.",
    tryPlaceholder: "you@great-idea.com",
    tryJoin: "Join the line",
    tryJoined: "You're in!",
    tryYourPos: "Your position",
    tryShareLabel: "Your referral link",
    tryCopied: "Copied",
    tryCopy: "Copy",
    tryShareHint: "Each friend moves you up 1 spot →",
    tryBumpHint: "↑ Share & test it: every click bumps you up a spot",
    tryReset: "Reset",
    tryInvalid: "Enter a valid email.",
    trySim: "Simulate a referral",
    tryBoard: "Leaderboard",

    // —— NEW: use cases ——
    useKicker: "Who it's for",
    useH: ["Every launch,", "a loop."],
    useSub: "Anyone who needs their first 1,000 users — Sıra engines the growth for them.",
    useCases: [
      { icon: "rocket", t: "Indie hacker", d: "For shipping solo: collect your first 500 signups with zero backend, let early referrers do the leapfrogging.", tag: "0 backend" },
      { icon: "megaphone", t: "SaaS launch", d: "Feed your beta list with reward tiers. Make your most loyal 25 the founding circle, the rest chase them.", tag: "Founding 25" },
      { icon: "search", t: "Product Hunt", d: "Fill the line before launch day. Detonate 2,000 ready upvotes at launch hour and grab the front page.", tag: "PH-ready" },
      { icon: "users", t: "Community", d: "Grow Discord/newsletter: referrers jump ahead and unlock rewards. Members grow it for you.", tag: "Invite = status" },
    ],

    // —— NEW: testimonials ——
    voiceKicker: "Used by makers",
    voiceH: ["The launch,", "in their words."],
    voices: [
      { q: "We pasted the embed onto our Framer site, and by next morning there were 1,200 signups. The referral loop genuinely caught — without spending a cent.", n: "Lena Brandt", r: "Founder", b: "Northpeak", m: "1,200 signups / 9 days", i: "LB" },
      { q: "Reward tiers were our biggest hack. The first 25 became our founding circle and they're still our most active users.", n: "Marco Silva", r: "Growth lead", b: "Tideline", m: "K-factor 2.1×", i: "MS" },
      { q: "We opened the line 3 weeks before Product Hunt day. At launch hour we had 2,000 ready upvotes — we became product of the day.", n: "Priya Nair", r: "CEO", b: "Stackbloom", m: "#1 Product Hunt", i: "PN" },
      { q: "We used to wrestle with a Google Form and a spreadsheet. Sıra collapsed it into one dashboard, emails go out automatically.", n: "Tom Whitaker", r: "Indie hacker", b: "Maker'd", m: "8h → 0h / week", i: "TW" },
      { q: "Watching the viral coefficient live got addictive. We know exactly which channel is growing the list.", n: "Aïcha Benali", r: "Marketing", b: "Lumen", m: "41% from referrals", i: "AB" },
      { q: "We were live in 60 seconds. I still can't believe I didn't have to stand up a backend — it just worked.", n: "Jonas Berg", r: "Solo founder", b: "Driftboard", m: "60s setup", i: "JB" },
    ],

    // —— NEW: comparison ——
    cmpKicker: "The old way vs Sıra",
    cmpH: ["Not a form,", "a loop."],
    cmpOld: "Google Form / Notion",
    cmpNew: "Sıra",
    cmpRows: [
      { f: "Referral loop", o: false, n: true, on: "None — everyone in same line", nn: "Invite = climb + reward" },
      { f: "Live position number", o: false, n: true, on: "Static table row", nn: "Real-time #N" },
      { f: "Automatic emails", o: false, n: true, on: "Manual, one by one", nn: "Confirm · milestone · reward, Resend" },
      { f: "Reward tiers", o: false, n: true, on: "Tracked by hand", nn: "Auto-unlock at 3 / 10 / 25" },
      { f: "Viral analytics", o: false, n: true, on: "None", nn: "K-factor, live" },
      { f: "Embed anywhere", o: "partial", n: true, on: "iframe hack", nn: "One-line snippet" },
      { f: "Setup time", o: "hours", n: true, on: "Form + Zapier + sheet", nn: "60 seconds" },
      { f: "Export data", o: true, n: true, on: "CSV (manual)", nn: "CSV / JSON, one click" },
    ],

    // —— NEW: viral loop deep dive ——
    loopKicker: "How the viral loop works",
    loopH: ["One signup,", "three new ones."],
    loopBody: "The mechanic is simple but powerful: every person shares, brings, climbs. Then the ones they brought do the same. That's how the loop feeds itself.",
    loopSteps: [
      { t: "Join & grab your link", b: "A unique share link drops the moment you sign up. Copy it, share it.", icon: "link" },
      { t: "Friends click through", b: "Every confirmed signup from your link moves you up the line.", icon: "pointer" },
      { t: "Climb & unlock rewards", b: "At 3, 10, 25 referrals, early access and swag unlock automatically.", icon: "gift" },
    ],
    coeffLabel: "Viral coefficient (K)",
    coeffNote: "When K > 1, the list grows itself. Yours averages:",
    gen: "Gen",

    // —— NEW: embed act ——
    embedKicker: "Embed it with one line of code",
    embedH: ["Copy,", "paste, live."],
    embedBody: "No backend, no database, no server. Drop this snippet on your site; a styled, branded signup widget appears and the loop starts running.",
    embedTabs: ["HTML", "React"],
    embedFeatures: ["Theme matches your site", "Double opt-in built in", "Referral tracking on", "Position counter visible"],

    // —— NEW: footer extra cols ——
    footCols: {
      product: { h: "Product", links: ["Features", "How it works", "Pricing", "Embed widget", "Changelog"] },
      use: { h: "Use cases", links: ["Indie hacker", "SaaS launch", "Product Hunt", "Community", "Newsletter"] },
      company: { h: "Company", links: ["About", "Blog", "Contact", "hello@sira.so"] },
      legal: { h: "Legal", links: ["Privacy", "Terms", "Data processing", "Status"] },
    },
    footRights: "All rights reserved.",
    footStatus: "All systems operational",
  },
};

const miniBoard = [
  { name: "Mei Lin", ref: 38 },
  { name: "Diego F.", ref: 27 },
  { name: "Priya R.", ref: 14 },
];

const useCaseIcons: Record<string, typeof Rocket> = { rocket: Rocket, megaphone: Megaphone, search: Search, users: Users };
const loopStepIcons: Record<string, typeof Link2> = { link: Link2, pointer: MousePointerClick, gift: Gift };

function ProductPreview({ c }: { c: (typeof content)["en"] }) {
  return (
    <div className="relative mx-auto w-[320px] floaty">
      <div className="rounded-[2rem] border border-sidebar-border bg-sidebar p-3 shadow-pop glow-pulse">
        <div className="rounded-[1.5rem] bg-background p-5">
          {/* counter */}
          <div className="rounded-2xl p-4 text-primary-foreground" style={{ background: "var(--grad-brand)" }}>
            <p className="label-mono opacity-70">{c.waitlistMini}</p>
            <p className="mt-1 font-display text-4xl font-bold tnum">2,847</p>
            <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold opacity-80"><TrendingUp className="h-3 w-3" /> +18.4% · {c.live}</p>
          </div>
          {/* mini leaderboard */}
          <div className="mt-4">
            <p className="mb-2 inline-flex items-center gap-1.5 label-mono text-muted-foreground"><Trophy className="h-3 w-3 text-primary" /> {c.topReferrers}</p>
            <ul className="space-y-2">
              {miniBoard.map((r, i) => (
                <li key={r.name} className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/15 text-xs font-bold text-primary tnum">{i + 1}</span>
                  <span className="flex-1 truncate text-sm font-medium">{r.name}</span>
                  <span className="tnum text-sm font-bold text-primary">{r.ref}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute -right-5 top-12 hidden rounded-xl border border-border bg-card px-3 py-2 shadow-pop sm:block floaty" style={{ animationDelay: "0.8s" }}>
        <p className="flex items-center gap-1.5 text-xs font-semibold"><Zap className="h-4 w-4 text-primary" /> 1.8× viral</p>
      </div>
      <div className="absolute -left-6 bottom-20 hidden rounded-xl border border-border bg-card px-3 py-2 shadow-pop sm:block floaty" style={{ animationDelay: "0.4s" }}>
        <p className="flex items-center gap-1.5 text-xs font-semibold"><Gift className="h-4 w-4 text-primary" /> +3 ödül</p>
      </div>
    </div>
  );
}

/* ============================================================================
   INTERACTIVE INLINE DEMO — "Listeye katıl" working mini waitlist
   ============================================================================ */
function InlineDemo({ c }: { c: (typeof content)["en"] }) {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [refCode, setRefCode] = useState("");
  const [bumps, setBumps] = useState(0);
  const [error, setError] = useState<string | false>(false);
  const [copied, setCopied] = useState(false);

  const STORE_ID = "eb2b8b94-32d9-4865-80f4-43130486a685"; // Gerçek Test Mağazası Kimliği

  const board = useMemo(() => {
    const you = { name: c.you, ref: bumps, you: true };
    const rest = [
      { name: "Mei Lin", ref: 38, you: false },
      { name: "Diego F.", ref: 27, you: false },
      { name: "Priya R.", ref: 14, you: false },
      { name: "Tom W.", ref: 11, you: false },
    ];
    return [...rest, you].sort((a, b) => b.ref - a.ref).slice(0, 5);
  }, [bumps, c.you]);

  const submit = async () => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) { setError(c.tryInvalid); return; }
    
    setLoading(true);
    setError(false);
    
    try {
      // 1. Gerçek API'ye istek at
      const res = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, store_id: STORE_ID })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Bir hata oluştu');
      }

      setPosition(data.position);
      setRefCode(data.referral_code);
      setJoined(true);
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const simulateReferral = async () => {
    setLoading(true);
    try {
      // 2. Senin bağlantın üzerinden rastgele biri kayıt olmuş gibi simüle et
      const randomEmail = `friend_${Math.random().toString(36).slice(2, 6)}@test.com`;
      await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: randomEmail, store_id: STORE_ID, ref_code: refCode })
      });
      setBumps(b => b + 1);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setEmail(""); setJoined(false); setBumps(0); setError(false); setCopied(false); };
  const copy = () => {
    navigator.clipboard?.writeText(`https://sira.so/r/${refCode}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="px-5 py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="label-mono inline-flex items-center gap-2 text-primary"><Zap className="h-3 w-3" /> {c.tryKicker}</p>
          <h2 className="mt-4 font-display text-[clamp(32px,4.8vw,56px)] font-bold leading-[1] tracking-tight">{c.tryH[0]} <span className="text-primary text-glow">{c.tryH[1]}</span></h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">{c.tryBody}</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT — join card */}
          <div className="relative overflow-hidden rounded-3xl border border-sidebar-border bg-sidebar p-7 text-sidebar-foreground glow lg:p-9" style={{ backgroundImage: "var(--grad-hero)" }}>
            <span className="blob -right-12 -top-16 h-56 w-56 bg-primary/45 drift" aria-hidden />
            <div className="relative">
              {!joined ? (
                <>
                  <p className="label-mono text-sidebar-muted">{c.waitlistMini}</p>
                  <p className="mt-1 font-display text-5xl font-bold leading-none tnum text-primary text-glow">{basePos.toLocaleString()}</p>
                  <p className="mt-2 text-[13px] text-sidebar-foreground/70">{c.tryShareHint}</p>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(false); }}
                      onKeyDown={(e) => e.key === "Enter" && submit()}
                      type="email"
                      placeholder={c.tryPlaceholder}
                      className="flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-sidebar-foreground placeholder:text-sidebar-muted outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
                    />
                    <button onClick={submit} disabled={loading} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                      {loading ? 'Bekle...' : c.tryJoin} <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {error && <p className="mt-2 text-[12px] font-semibold text-destructive">{error}</p>}
                </>
              ) : (
                <>
                  <p className="inline-flex items-center gap-1.5 label-mono text-primary"><CheckCheck className="h-3.5 w-3.5" /> {c.tryJoined}</p>
                  <p className="mt-3 label-mono text-sidebar-muted">{c.tryYourPos}</p>
                  <p key={position} className="rise mt-1 font-display text-6xl font-bold leading-none tnum text-primary text-glow">#{position}</p>
                  {/* referral link */}
                  <div className="mt-6">
                    <p className="label-mono text-sidebar-muted">{c.tryShareLabel}</p>
                    <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2.5">
                      <span className="flex-1 truncate font-mono text-[13px] text-primary">sira.so/r/{refCode}</span>
                      <button onClick={copy} className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-[12px] font-bold text-primary ring-1 ring-primary/30 transition hover:bg-primary/25">
                        {copied ? <><CheckCheck className="h-3.5 w-3.5" /> {c.tryCopied}</> : <><Copy className="h-3.5 w-3.5" /> {c.tryCopy}</>}
                      </button>
                    </div>
                    <p className="mt-2 text-[12px] text-sidebar-foreground/60">{c.tryBumpHint}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2.5">
                    <button onClick={simulateReferral} disabled={loading} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
                      <Share2 className="h-3.5 w-3.5" /> {loading ? 'Ekleniyor...' : c.trySim}
                    </button>
                    <span className="tnum inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-2 text-[12px] font-semibold text-sidebar-foreground/80 ring-1 ring-white/10">
                      <Gift className="h-3.5 w-3.5 text-primary" /> {bumps} {lang0(c)}
                    </span>
                    <button onClick={reset} className="text-[12px] font-medium text-sidebar-muted underline-offset-2 transition hover:text-sidebar-foreground hover:underline">{c.tryReset}</button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT — live leaderboard */}
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <h3 className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight"><Trophy className="h-4 w-4 text-primary" /> {c.tryBoard}</h3>
            <ol className="mt-5 space-y-2">
              {board.map((r, i) => {
                const max = board[0].ref || 1;
                return (
                  <li key={r.name} className={cn("flex items-center gap-3 rounded-xl px-2.5 py-2.5 transition-colors", r.you ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-muted/50")}>
                    <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm font-bold tnum", i < 3 ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground")}>{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className={cn("truncate text-sm", r.you ? "font-bold text-primary" : "font-semibold")}>{r.name}</p>
                        <p className="tnum text-sm font-bold text-primary">{r.ref}</p>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary/80 transition-all duration-500" style={{ width: `${Math.max(4, (r.ref / max) * 100)}%` }} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
// tiny helper: "referral(s)" word for the chip
function lang0(c: (typeof content)["en"]) { return c.tryBoard === "Leaderboard" ? "referrals" : "referans"; }

/* ============================================================================
   USE-CASES / personas
   ============================================================================ */
function UseCases({ c }: { c: (typeof content)["en"] }) {
  return (
    <section className="border-t border-border bg-card/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.useKicker}</p>
          <h2 className="mt-4 font-display text-[clamp(32px,4.8vw,56px)] font-bold leading-[1] tracking-tight">{c.useH[0]} <span className="text-primary">{c.useH[1]}</span></h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">{c.useSub}</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.useCases.map((u, i) => {
            const Ic = useCaseIcons[u.icon] ?? Rocket;
            return (
              <article key={u.t} className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop" style={{ transform: i % 2 ? "rotate(0.6deg)" : "rotate(-0.6deg)" }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary transition group-hover:scale-110"><Ic className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{u.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{u.d}</p>
                <span className="mt-4 inline-flex w-fit items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary ring-1 ring-primary/25">{u.tag}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   EXPANDED TESTIMONIALS
   ============================================================================ */
function Testimonials({ c }: { c: (typeof content)["en"] }) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.voiceKicker}</p>
          <h2 className="mt-4 font-display text-[clamp(32px,4.8vw,56px)] font-bold leading-[1] tracking-tight">{c.voiceH[0]} <span className="text-primary">{c.voiceH[1]}</span></h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.voices.map((v) => (
            <figure key={v.n} className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:border-primary/30 hover:shadow-pop">
              <Quote className="h-6 w-6 text-primary/40" />
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-foreground/90">“{v.q}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[11px] font-bold ring-2 ring-background" style={{ background: "oklch(28% 0.06 130)", color: "oklch(86% 0.2 125)" }}>{v.i}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{v.n}</p>
                  <p className="truncate text-xs text-muted-foreground">{v.r} · {v.b}</p>
                </div>
                <span className="tnum shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary ring-1 ring-primary/25">{v.m}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   COMPARISON TABLE — old way vs Sıra
   ============================================================================ */
function Comparison({ c }: { c: (typeof content)["en"] }) {
  const cell = (val: boolean | string, note: string, good: boolean) => (
    <div className="flex items-start gap-2.5">
      <span className={cn("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full", good ? "bg-primary/15 text-primary" : "bg-destructive/12 text-destructive")}>
        {good ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
      </span>
      <span className={cn("text-[13px] leading-snug", good ? "text-foreground/90" : "text-muted-foreground")}>{note}</span>
    </div>
  );
  return (
    <section className="border-y border-border bg-card/40 py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="label-mono text-primary">{c.cmpKicker}</p>
          <h2 className="mt-3 font-display text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.02] tracking-tight">{c.cmpH[0]} <span className="text-primary">{c.cmpH[1]}</span></h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          {/* header */}
          <div className="grid grid-cols-[1.1fr_1.2fr_1.2fr] items-center gap-3 border-b border-border bg-muted/40 px-5 py-4">
            <span className="label-mono text-muted-foreground">vs</span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground">{c.cmpOld}</span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary"><LogoMark className="h-4 w-4" /> {c.cmpNew}</span>
          </div>
          <ul>
            {c.cmpRows.map((row, i) => (
              <li key={row.f} className={cn("grid grid-cols-[1.1fr_1.2fr_1.2fr] items-start gap-3 px-5 py-4", i % 2 && "bg-muted/20")}>
                <span className="text-[13.5px] font-semibold leading-snug">{row.f}</span>
                {cell(row.o, row.on, row.o === true)}
                {cell(row.n, row.nn, true)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   VIRAL LOOP DEEP DIVE
   ============================================================================ */
function ViralLoop({ c }: { c: (typeof content)["en"] }) {
  // coefficient generations: 1 → 1.8 → 3.24 → 5.83 ...
  const k = 1.8;
  const gens = [1, k, k * k, k * k * k].map((n) => Math.round(n * 10) / 10);
  const maxGen = gens[gens.length - 1];
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.loopKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.02] tracking-tight">{c.loopH[0]} <span className="text-primary">{c.loopH[1]}</span></h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{c.loopBody}</p>
            <ol className="mt-8 space-y-3">
              {c.loopSteps.map((s, i) => {
                const Ic = loopStepIcons[s.icon] ?? Link2;
                return (
                  <li key={s.t} className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary"><Ic className="h-5 w-5" /></span>
                    <div>
                      <p className="inline-flex items-center gap-2 text-sm font-bold"><span className="tnum text-primary/60">0{i + 1}</span> {s.t}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{s.b}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* coefficient visual */}
          <div className="relative overflow-hidden rounded-3xl border border-sidebar-border bg-sidebar p-7 text-sidebar-foreground glow lg:p-9" style={{ backgroundImage: "var(--grad-hero)" }}>
            <span className="blob -left-10 -top-12 h-52 w-52 bg-primary/40 drift" aria-hidden />
            <div className="relative">
              <p className="label-mono text-sidebar-muted">{c.coeffLabel}</p>
              <p className="mt-1 font-display text-6xl font-bold leading-none tnum text-primary text-glow">{k}×</p>
              <p className="mt-3 max-w-xs text-[13px] text-sidebar-foreground/70">{c.coeffNote} <span className="font-bold text-primary">{k}×</span></p>
              <div className="mt-7 space-y-3">
                {gens.map((g, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between text-[12px]">
                      <span className="label-mono text-sidebar-muted">{c.gen} {i + 1}</span>
                      <span className="tnum font-bold text-primary">×{g}</span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(6, (g / maxGen) * 100)}%`, background: "var(--grad-brand)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10">
                <Sparkles className="h-5 w-5 shrink-0 text-primary" />
                <p className="text-[12.5px] leading-snug text-sidebar-foreground/80">{c.coeffNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   EMBED / integration act
   ============================================================================ */
function EmbedAct({ c }: { c: (typeof content)["en"] }) {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const html = `<!-- Sıra embed — drop where you want the form -->
<div id="sira-waitlist" data-list="launch-2026"></div>
<script
  src="https://cdn.sira.so/widget.js"
  data-key="sira_live_8f3a92c1"
  async
></script>`;
  const react = `import { WaitlistForm } from "@sira/react";

export default function Page() {
  return (
    <WaitlistForm
      listId="launch-2026"
      publicKey="sira_live_8f3a92c1"
      referralsEnabled
    />
  );
}`;
  const snippet = tab === 0 ? html : react;
  const copy = () => {
    navigator.clipboard?.writeText(snippet).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className="border-t border-border bg-card/40 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.25fr] lg:items-center">
          <div>
            <p className="label-mono inline-flex items-center gap-2 text-primary"><Code className="h-3.5 w-3.5" /> {c.embedKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(30px,4.4vw,52px)] font-bold leading-[1.02] tracking-tight">{c.embedH[0]} <span className="text-primary">{c.embedH[1]}</span></h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">{c.embedBody}</p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {c.embedFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-[13px]"><Check className="h-4 w-4 shrink-0 text-primary" /> {f}</li>
              ))}
            </ul>
          </div>

          {/* code block */}
          <div className="overflow-hidden rounded-3xl border border-sidebar-border bg-sidebar shadow-pop">
            <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                {c.embedTabs.map((tname, i) => (
                  <button key={tname} onClick={() => setTab(i)} className={cn("rounded-lg px-3 py-1.5 text-[12px] font-bold transition", tab === i ? "bg-primary/15 text-primary ring-1 ring-primary/30" : "text-sidebar-muted hover:text-sidebar-foreground")}>{tname}</button>
                ))}
              </div>
              <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-3 py-1.5 text-[12px] font-bold text-sidebar-foreground ring-1 ring-white/10 transition hover:bg-white/[0.1]">
                {copied ? <><CheckCheck className="h-3.5 w-3.5 text-primary" /> {c.tryCopied}</> : <><Copy className="h-3.5 w-3.5" /> {c.tryCopy}</>}
              </button>
            </div>
            <pre className="overflow-x-auto px-5 py-5 text-[12.5px] leading-relaxed text-sidebar-foreground/90"><code className="font-mono">{snippet}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SiraLanding() {
  const { lang, t } = useLang();
  const c = content[lang];
  const mk = appConfig.marketing;
  const [open, setOpen] = useState<number | null>(0);
  const fc = c.footCols;

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center px-5 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2.5"><LogoMark className="h-8 w-8" /><span className="font-display text-lg font-bold tracking-tight">Sıra</span></Link>
          <nav className="ml-auto hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a href="#what" className="hover:text-foreground">{c.nav[0]}</a>
            <a href="#how" className="hover:text-foreground">{c.nav[1]}</a>
            <a href="#pricing" className="hover:text-foreground">{c.nav[2]}</a>
          </nav>
          <div className="ml-auto flex items-center gap-2 md:ml-7">
            <LanguageToggle className="mr-1" />
            <Link href="/login" className="hidden px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">{c.signin}</Link>
            <Link href="/signup" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-bold text-primary-foreground transition hover:opacity-90">{c.demo} <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: "var(--grad-hero)" }} />
        <span className="blob -left-24 -top-24 -z-10 h-[28rem] w-[28rem] bg-primary/30 drift" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:py-24">
          <div>
            <p className="rise label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {t(mk.badge)}</p>
            <h1 className="rise mt-6 font-display text-[clamp(40px,6.5vw,76px)] font-bold leading-[0.95] tracking-tight" style={{ animationDelay: "0.08s" }}>
              {c.h1a} <span className="text-primary text-glow">{c.hl}</span><br />{c.h1b}
            </h1>
            <p className="rise mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground" style={{ animationDelay: "0.18s" }}>{c.sub}</p>
            {/* email field mockup */}
            <div className="rise mt-8 flex max-w-md items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-soft" style={{ animationDelay: "0.26s" }}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground"><Mail className="h-4 w-4" /></span>
              <span className="flex-1 truncate text-sm text-muted-foreground">{c.emailPlaceholder}</span>
              <Link href="/signup" className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition hover:opacity-90">{c.emailCta} <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="rise mt-7 flex items-center gap-3 text-sm text-muted-foreground" style={{ animationDelay: "0.38s" }}>
              <div className="flex -space-x-2">{["ML", "DF", "PR", "TW"].map((i, k) => <span key={i} className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-bold ring-2 ring-background" style={{ background: `oklch(${32 - k * 2}% 0.04 145)`, color: "oklch(86% 0.18 125)" }}>{i}</span>)}</div>
              <span className="inline-flex items-center gap-1.5"><span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" /> {c.social}</span>
            </div>
          </div>
          <div className="rise" style={{ animationDelay: "0.3s" }}><ProductPreview c={c} /></div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="overflow-hidden border-y border-border py-7">
        <p className="label-mono mb-4 text-center text-muted-foreground">{c.marqueeTitle}</p>
        <div className="marquee gap-10">{[...c.marquee, ...c.marquee].map((it, i) => <span key={i} className="whitespace-nowrap px-2 font-display text-2xl font-bold text-muted-foreground/50">{it}<span className="ml-10 text-primary">/</span></span>)}</div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.05fr] lg:px-8">
          <div>
            <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.problemKicker}</p>
            <h2 className="mt-4 font-display text-[clamp(32px,4.8vw,56px)] font-bold leading-[1] tracking-tight">{c.problemH[0]} <span className="text-primary">{c.problemH[1]}</span></h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">{c.problemBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            {c.problemStats.map((s, i) => <div key={s.l} className="rounded-3xl border border-border bg-card p-6 shadow-soft" style={{ transform: `rotate(${i % 2 ? 1.4 : -1.4}deg)` }}><p className="font-display text-[40px] font-bold leading-none tnum text-primary">{s.n}</p><p className="mt-2 text-[13px] text-muted-foreground">{s.l}</p></div>)}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="what" className="border-t border-border bg-card/40 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="max-w-2xl"><p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.whatKicker}</p><h2 className="mt-4 font-display text-[clamp(32px,4.8vw,56px)] font-bold leading-[1] tracking-tight">{c.whatH[0]} <span className="text-primary">{c.whatH[1]}</span></h2></div>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mk.features.map((f, i) => { const Ic = featureIcons[i]; return (
              <article key={t(f.title)} className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary transition group-hover:scale-110"><Ic className="h-5 w-5" /></span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{t(f.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(f.body)}</p>
              </article>); })}
          </div>
        </div>
      </section>

      {/* ★ NEW: INTERACTIVE INLINE DEMO */}
      <InlineDemo c={c} />

      {/* HOW */}
      <section id="how" className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.stepsKicker}</p>
          <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,52px)] font-bold tracking-tight">{c.stepsH}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.steps.map((s, i) => <div key={s.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft"><span className="font-display text-5xl font-bold text-primary/25 tnum">0{i + 1}</span><h3 className="mt-2 text-lg font-bold">{s.t}</h3><p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.b}</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${[40, 72, 100][i]}%` }} /></div></div>)}
          </div>
        </div>
      </section>

      {/* ★ NEW: VIRAL LOOP DEEP DIVE */}
      <ViralLoop c={c} />

      {/* ★ NEW: USE-CASES / PERSONAS */}
      <UseCases c={c} />

      {/* PROOF — big numbers */}
      <section className="border-y border-border bg-card py-14">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-3 lg:px-8">
          {c.proof.map((p) => <div key={p.l}><p className="font-display text-[64px] font-bold leading-none tnum text-primary text-glow">{p.big}</p><p className="mt-2 text-sm font-semibold">{p.l}</p><p className="mt-1 text-xs text-muted-foreground">{p.c}</p></div>)}
        </div>
      </section>

      {/* ★ NEW: EXPANDED TESTIMONIALS */}
      <Testimonials c={c} />

      {/* ★ NEW: COMPARISON TABLE */}
      <Comparison c={c} />

      {/* INVERTED PROMISE */}
      <section className="px-5 py-16 lg:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] p-10 lg:p-16" style={{ background: "oklch(22% 0.07 130)", color: "oklch(96% 0.02 125)" }}>
          <span className="blob right-1/4 -top-16 h-72 w-72 bg-primary/40 drift" aria-hidden />
          <div className="relative grid gap-12 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="label-mono inline-flex items-center gap-2 text-primary"><span className="h-px w-7 bg-primary" /> {c.promiseKicker}</p>
              <h2 className="mt-4 font-display text-[clamp(30px,4.2vw,52px)] font-bold leading-[1.02] tracking-tight">{c.promiseH[0]} <span className="text-primary">{c.promiseH[1]}</span></h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed opacity-75">{c.promiseBody}</p>
            </div>
            <ul className="space-y-3">{c.promiseBullets.map((b) => <li key={b} className="flex gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><p className="text-[13.5px] leading-relaxed opacity-90">{b}</p></li>)}</ul>
          </div>
        </div>
      </section>

      {/* ★ NEW: EMBED ACT */}
      <EmbedAct c={c} />

      {/* PRICING */}
      <section id="pricing" className="py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-xl text-center"><p className="label-mono text-primary">{c.pricingKicker}</p><h2 className="mt-3 font-display text-[clamp(30px,4.8vw,52px)] font-bold tracking-tight">{c.pricingH[0]} <span className="text-primary">{c.pricingH[1]}</span></h2></div>
          <div className="grid gap-4 md:grid-cols-3">
            {mk.pricing.map((p) => (
              <article key={p.name} className={cn("relative rounded-3xl p-7 lg:p-8", p.featured ? "border border-primary/50 bg-card glow" : "border border-border bg-card shadow-soft")}>
                {p.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground">{c.recommended}</span>}
                <p className="label-mono text-muted-foreground">{p.name}</p>
                <p className="mt-3 flex items-end gap-1"><span className="font-display text-5xl font-bold leading-none tnum">{p.price}</span><span className="pb-1.5 text-[13px] text-muted-foreground">{p.period}</span></p>
                <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{t(p.tagline)}</p>
                <ul className="mt-6 space-y-2.5">{p.features.map((f) => <li key={t(f)} className="flex items-start gap-2 text-[13px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t(f)}</li>)}</ul>
                <Link href="/signup" className={cn("mt-7 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[13px] font-bold transition", p.featured ? "bg-primary text-primary-foreground hover:opacity-90" : "ring-1 ring-border hover:bg-muted")}>{t(p.cta)}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/40 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <div className="mb-10 text-center"><p className="label-mono text-primary">{c.faqKicker}</p><h2 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-bold tracking-tight">{c.faqH}</h2></div>
          <ul className="space-y-2.5">
            {mk.faq.map((item, i) => (
              <li key={t(item.q)} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="text-[15px] font-bold tracking-tight">{t(item.q)}</span>{open === i ? <Minus className="h-4 w-4 shrink-0 text-muted-foreground" /> : <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />}</button>
                {open === i && <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-muted-foreground">{t(item.a)}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FINALE */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] p-10 text-center lg:p-16" style={{ background: "var(--grad-brand)", color: "oklch(18% 0.06 140)" }}>
          <span className="blob left-1/4 -top-12 h-64 w-64 bg-white/25 drift" aria-hidden />
          <div className="relative">
            <p className="label-mono inline-flex items-center justify-center gap-2 opacity-70"><Zap className="h-3 w-3" /> {c.finaleKicker}</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(38px,6vw,76px)] font-bold leading-[0.98] tracking-tight">{c.finaleH}</h2>
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed opacity-80">{c.finaleBody}</p>
            <div className="mt-9"><Link href="/signup" className="inline-flex items-center gap-2 rounded-full bg-[oklch(14%_0.02_145)] px-6 py-3 text-[15px] font-bold text-primary transition hover:opacity-90">{c.cta1} <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>

      {/* ★ EXPANDED FOOTER — multi-column */}
      <footer className="border-t border-border py-14">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground md:grid-cols-6">
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2.5"><LogoMark className="h-7 w-7" /><span className="font-display text-base font-bold tracking-tight text-foreground">Sıra</span></Link>
              <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed">{c.footTagline}</p>
              <p className="mt-4 inline-flex items-center gap-2 label-mono text-muted-foreground"><span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-primary" /> {c.footStatus}</p>
            </div>
            {[fc.product, fc.use, fc.company, fc.legal].map((col) => (
              <div key={col.h}>
                <p className="label-mono mb-3 text-foreground/80">{col.h}</p>
                <ul className="space-y-1.5">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="transition hover:text-foreground">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground md:flex-row md:items-center">
            <p>© 2026 Sıra · sira.so · {c.footRights}</p>
            <p className="label-mono">v1.0 · Next.js 16 · {lang === "tr" ? "Türkçe" : "English"}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
