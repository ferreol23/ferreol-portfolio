import Link from "next/link";
import type { ReactNode } from "react";
import { en } from "@/content/en";

/*
  A link that looks like a button.
  - variant "primary": orange, the main action
  - variant "secondary": outlined
  - variant "dark": near-black, used on the orange banner
  External links (starting with http) open in a new tab, safely.
*/

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary: "bg-accent text-on-accent hover:bg-[color-mix(in_oklab,var(--accent),white_12%)]",
  secondary: "border border-line text-text hover:border-accent-strong hover:text-accent-strong",
  dark: "bg-on-accent text-[#f5f3f0] hover:bg-[color-mix(in_oklab,var(--on-accent),white_14%)]",
};

type Props = {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ href, variant = "primary", className = "", children }: Props) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only"> {en.common.opensInNewTab}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
