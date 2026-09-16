import Link from "next/link";

import { Button } from "@/components/ui/button";

/** House idiom: gradient hero + SVG grid overlay (docs/design-system.md). */
export const GRID =
  "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E\")";

export const CONTACT = "dale@grantedison.com";

export const ACCENTS: Record<
  string,
  { border: string; text: string; blob: string; tile: string }
> = {
  blue: {
    border: "border-l-blue-500",
    text: "text-blue-600",
    blob: "from-blue-100 to-blue-50",
    tile: "bg-blue-50 text-blue-600",
  },
  emerald: {
    border: "border-l-emerald-500",
    text: "text-emerald-600",
    blob: "from-emerald-100 to-emerald-50",
    tile: "bg-emerald-50 text-emerald-600",
  },
  amber: {
    border: "border-l-amber-500",
    text: "text-amber-600",
    blob: "from-amber-100 to-amber-50",
    tile: "bg-amber-50 text-amber-600",
  },
  red: {
    border: "border-l-red-500",
    text: "text-red-600",
    blob: "from-red-100 to-red-50",
    tile: "bg-red-50 text-red-600",
  },
  violet: {
    border: "border-l-violet-500",
    text: "text-violet-600",
    blob: "from-violet-100 to-violet-50",
    tile: "bg-violet-50 text-violet-600",
  },
};

/** Lowercase wordmark: grant navy + edison orange; on dark heroes grant is white. */
export const Wordmark = ({ onDark = false }: { onDark?: boolean }) => (
  <span className="text-xl font-bold tracking-tight">
    <span className={onDark ? "text-white" : "text-[#1F4E79]"}>grant</span>
    <span className="text-[#FF9900]">edison</span>
  </span>
);

const NAV_LINKS = [
  { label: "What we do", href: "/#services" },
  { label: "Partners", href: "/#how" },
  { label: "Proof", href: "/#proof" },
  { label: "Live demo", href: "/demo" },
];

/** Nav row rendered inside each page's hero band. */
export const HeroNav = () => (
  <div className="relative mx-auto max-w-6xl px-6 py-6">
    <nav className="flex items-center justify-between">
      <Link href="/" aria-label="grantedison home">
        <Wordmark onDark />
      </Link>
      <div className="flex items-center gap-1 sm:gap-4">
        <div className="hidden items-center gap-5 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Button
          asChild
          variant="outline"
          className="border-white/30 bg-white/20 text-white hover:bg-white/30 hover:text-white"
        >
          <Link href="/#contact">Get in touch</Link>
        </Button>
      </div>
    </nav>
  </div>
);

/** Accent-bordered card with the corner-blob flourish. Metric or claim body. */
export const AccentCard = ({
  accent,
  children,
  className = "",
}: {
  accent: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const a = ACCENTS[accent];
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-l-4 bg-card p-6 shadow-sm ${a.border} ${className}`}
    >
      <div
        className={`absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 rounded-full bg-gradient-to-br opacity-60 ${a.blob}`}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
};

export const SiteFooter = () => (
  <footer className="border-t">
    <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        <Wordmark /> <span className="ml-1">— AI architecture, pre-sales and delivery on AWS, UK</span>
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <span>SC-cleared · AWS-certified delivery</span>
        <a className="hover:text-foreground" href={`mailto:${CONTACT}`}>
          {CONTACT}
        </a>
      </div>
    </div>
  </footer>
);
