# CLAUDE.md — Animation rules for this project

> Read **`AGENTS.md`** first: this is a modified Next.js (16.4.2, App Router).
> Consult the bundled guides in `node_modules/next/dist/docs/` before writing
> framework code, and **Context7** before using any animation API.

Stack: **Next.js + React 19 + Tailwind 4**. Animation: **GSAP** (+ ScrollTrigger,
`@gsap/react`) and **Lenis** for smooth scroll; **motion** (`motion/react`) when a
React-idiomatic motion component is the better fit.

## Craft rules

- **Animate only `transform` and `opacity`.** Never animate `width`, `height`,
  `top`, `left`, `margin` (they trigger layout). Use GSAP's `x`/`y`/`scale`/
  `rotation` and `autoAlpha`.
- **Durations** — micro-interactions **0.2–0.4s**, appearances **0.6–1s**.
  Default easing **`power3.out`**. Use the tokens, don't hardcode:
  `src/config/motion.ts` (JS) / `--dur-*`, `--ease-power3` (CSS) — kept in sync.
- **Respect `prefers-reduced-motion` everywhere.** The CSS safety net in
  `globals.css` flattens all motion; Lenis never starts in reduce mode
  (`animations/setup.ts`). Any new JS effect must early-return on
  `prefersReducedMotion()`.
- **Content must be readable without JavaScript.** Never hide content behind an
  entrance animation that only completes in JS. Start from a visible, correct DOM
  and enhance.
- **One signature effect per page**, everything else micro-interactions. Restraint
  over spectacle. *Exception chosen by Ferreol:* the home page has two —
  `ProcessStory` ("How I work") and `WorkTilt` (3D tilt into "Selected work").
  Don't add a third.
- **One animation tool per element** — never GSAP *and* motion on the same element.

## Workflow rules

- **One effect at a time.** Build it, validate it, then **`git commit`** before
  starting the next. Keep the tree clean (commit the AGENTS.md block too).
- **After every visual change: run the site and verify with a screenshot**
  (built-in browser pane, or Playwright MCP if connected). Check the console is
  error-free.
- **In React**: use `useGSAP(() => { … }, { scope: containerRef })`; animations
  are reverted automatically on unmount. Never run bare selector strings without a
  scope. Clean up any manual listeners / instances.
- **`ScrollTrigger.refresh()`** after images/fonts load or layout changes (the
  base already refreshes on `window.load`). **Never ship `markers: true`.**

## The base (already set up — don't duplicate)

- `src/animations/setup.ts` — the single base file: registers `ScrollTrigger` +
  `useGSAP`, sets GSAP defaults, starts Lenis and syncs it with ScrollTrigger
  (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add` +
  `lagSmoothing(0)`), gated on reduced motion. Exports `initMotion()` and
  `prefersReducedMotion()`.
- `src/components/motion-provider.tsx` — `'use client'` entry, mounted once in
  the root layout; boots and tears down the base. Renders nothing.
- `src/config/motion.ts` — timing/easing tokens (mirrored by CSS vars).
