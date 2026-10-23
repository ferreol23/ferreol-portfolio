import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { en, fill } from "@/content/en";

/** The form's send button: shows a spinner while sending and the countdown during the cooldown. */
export function SubmitButton({ label, busyLabel, busy, cooldown }: { label: string; busyLabel: string; busy: boolean; cooldown: number }) {
  const disabled = busy || cooldown > 0;
  return (
    <div>
      <button
        type="submit"
        disabled={disabled}
        aria-disabled={disabled}
        className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-on-accent transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--accent),white_12%)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
      >
        {busy ? (
          <>
            <LoaderCircle className="size-5 motion-safe:animate-spin" aria-hidden="true" />
            {busyLabel}
          </>
        ) : (
          <>
            {label}
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </>
        )}
      </button>
      {cooldown > 0 && !busy && (
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {fill(en.forms.cooldown, { seconds: String(cooldown) })}
        </p>
      )}
    </div>
  );
}
