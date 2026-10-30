// The two brand marks, drawn as SVG so they follow the theme:
// the letter takes the text colour (currentColor), the accent parts take the site's accent.
// Masters and the full logo kit live outside the site (logo-profil/kit).

/** "F." — the F whose empty corner is filled by the orange period of FERREOL. */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="40 32 178 194" aria-hidden="true" focusable="false" className={className}>
      <path fill="currentColor" d="M40 32H216V84H96V100H176V146H96V224H40Z" />
      <circle className="fill-accent-strong" cx="189" cy="197" r="29" />
    </svg>
  );
}

/** "</F>" — the slash of a code tag is the stem of the F. */
export function SlashMark({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="15 29 226 198" aria-hidden="true" focusable="false" className={className}>
      <path className="fill-accent-strong" d="M15.51 128L49.13 69.76H78.25L44.63 128L78.25 186.24H49.13Z" />
      <path
        fill="currentColor"
        d="M80.89 226.56L133.7 29.44H207.62L200.42 56.32H153.38L143.78 92.16H177.38L170.78 116.8H137.18L107.77 226.56Z"
      />
      <path className="fill-accent-strong" d="M177.75 69.76H206.87L240.49 128L206.87 186.24H177.75L211.37 128Z" />
    </svg>
  );
}
