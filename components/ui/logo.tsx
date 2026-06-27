import { cn } from "@/lib/utils";
import appConfig from "@/app.config";

/**
 * Sıra logomark — stacked, ascending ranks (a climbing queue) struck through
 * by an upward bolt. Lime gradient on near-black, for bold launch energy.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label={appConfig.name}>
      <defs>
        <linearGradient id="sira-grad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#a6f019" />
          <stop offset="1" stopColor="#dcff66" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="#10160c" />
      <rect width="40" height="40" rx="11" fill="url(#sira-grad)" opacity="0.1" />
      {/* ascending ranks */}
      <g fill="url(#sira-grad)">
        <rect x="8" y="25" width="6" height="7" rx="2" opacity="0.45" />
        <rect x="17" y="20" width="6" height="12" rx="2" opacity="0.7" />
        <rect x="26" y="13" width="6" height="19" rx="2" />
      </g>
      {/* upward bolt */}
      <path
        d="M21 6 L12.5 19 H18 L16 28 L25.5 14.5 H20 Z"
        fill="#10160c"
        stroke="url(#sira-grad)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  withWordmark = true,
  onDark = false,
}: {
  className?: string;
  withWordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0" />
      {withWordmark && (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            onDark ? "text-sidebar-foreground" : "text-foreground",
          )}
        >
          {appConfig.name}
        </span>
      )}
    </span>
  );
}
