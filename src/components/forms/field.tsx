import { CircleAlert } from "lucide-react";
import type { ChangeEvent } from "react";
import { en, fill } from "@/content/en";

/*
  One labelled form field (input or textarea) with:
  - a label that is always visible (never placeholder-only),
  - an optional hint and character counter,
  - its error shown right under it and linked for screen readers.
*/

const control =
  "w-full rounded-2xl border bg-bg px-4 py-3.5 text-base text-text transition-colors duration-200 placeholder:text-muted/70 hover:border-muted focus:border-accent-strong focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong";

type Props = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  maxLength?: number;
  showCounter?: boolean;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
};

export function Field({
  id,
  name,
  label,
  value,
  onChange,
  error,
  hint,
  maxLength,
  showCounter,
  multiline,
  type = "text",
  autoComplete,
}: Props) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const className = `${control} ${error ? "border-danger" : "border-line"}`;
  const handle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(event.target.value);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-semibold">
          {label}
        </label>
        {showCounter && maxLength && (
          <span className="text-sm text-muted" aria-hidden="true">
            {fill(en.forms.counter, { count: String(value.length), max: String(maxLength) })}
          </span>
        )}
      </div>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {multiline ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={handle}
            maxLength={maxLength}
            rows={6}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={`${className} resize-y`}
          />
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={handle}
            maxLength={maxLength}
            autoComplete={autoComplete}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={className}
          />
        )}
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm font-semibold text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
