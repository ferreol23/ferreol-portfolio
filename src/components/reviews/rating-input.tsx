"use client";

import { CircleAlert, Star } from "lucide-react";
import { useState } from "react";
import { en, fill } from "@/content/en";

/**
 * Pick 1 to 5 stars. Built from real radio buttons (keyboard: Tab to the group,
 * arrow keys to change), styled as stars that light up on hover and selection.
 */
export function RatingInput({ value, onChange, error }: { value: string; onChange: (value: string) => void; error?: string }) {
  const [hover, setHover] = useState(0);
  const selected = Number(value) || 0;
  const shown = hover || selected;
  const errorId = error ? "rating-error" : undefined;

  return (
    <fieldset aria-describedby={errorId}>
      <legend className="font-semibold">{en.reviewsPage.ratingLegend}</legend>
      <div className="mt-2 flex" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            onMouseEnter={() => setHover(n)}
            className="grid size-11 cursor-pointer place-items-center rounded-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-accent-strong"
          >
            <input
              type="radio"
              name="rating"
              value={n}
              checked={selected === n}
              onChange={() => onChange(String(n))}
              className="sr-only"
            />
            <span className="sr-only">{fill(en.reviewsPage.starLabel, { count: String(n) })}</span>
            <Star
              aria-hidden="true"
              className={`size-7 transition-[color,transform] duration-200 ${
                n <= shown ? "scale-105 fill-accent text-accent" : "text-muted"
              }`}
            />
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 flex items-start gap-2 text-sm font-semibold text-danger">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}
