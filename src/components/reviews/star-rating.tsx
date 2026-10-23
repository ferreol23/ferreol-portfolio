import { Star } from "lucide-react";
import { en, fill } from "@/content/en";

/** Read-only row of 5 stars, e.g. on a published review. */
export function StarRating({ rating }: { rating: number }) {
  return (
    <p className="flex gap-1 text-accent-strong" aria-label={fill(en.reviewsPage.ratingLabel, { rating: String(rating) })}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`size-5 ${n <= rating ? "fill-current" : "opacity-35"}`} aria-hidden="true" />
      ))}
    </p>
  );
}
