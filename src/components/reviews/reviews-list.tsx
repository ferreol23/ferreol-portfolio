import { CircleAlert, MessageSquareQuote } from "lucide-react";
import { connection } from "next/server";
import { en } from "@/content/en";
import { getSupabase } from "@/lib/supabase";
import { StarRating } from "./star-rating";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" });

type PublicReview = { id: string; name: string; rating: number; comment: string; created_at: string };

/**
 * Approved reviews, loaded fresh from Supabase on every visit (so a review you
 * approve shows up right away). Shown inside <Suspense>, which displays the
 * loading state below while this runs.
 */
export async function ReviewsList() {
  await connection();
  const t = en.reviewsPage;

  let reviews: PublicReview[];
  try {
    const { data, error } = await getSupabase()
      .from("reviews")
      .select("id, name, rating, comment, created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    reviews = data ?? [];
  } catch {
    return (
      <div role="alert" className="flex items-start gap-4 border-t border-line pt-8">
        <CircleAlert className="mt-1 size-6 shrink-0 text-danger" aria-hidden="true" />
        <div>
          <p className="text-xl font-bold">{t.errorTitle}</p>
          <p className="mt-1 text-muted">{t.errorBody}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="flex items-start gap-4 border-t border-line pt-8">
        <MessageSquareQuote className="mt-1 size-6 shrink-0 text-accent-strong" aria-hidden="true" />
        <div>
          <p className="text-xl font-bold">{t.emptyTitle}</p>
          <p className="mt-1 text-muted">{t.emptyBody}</p>
        </div>
      </div>
    );
  }

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id} className="border-t border-line py-8">
          <article>
            <StarRating rating={review.rating} />
            <blockquote className="mt-4 font-display text-[clamp(1.25rem,2.2vw,1.6rem)] font-semibold leading-snug">
              <p>“{review.comment}”</p>
            </blockquote>
            <footer className="mt-4 text-muted">
              <span className="font-semibold text-text">{review.name}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={review.created_at}>{dateFormat.format(new Date(review.created_at))}</time>
            </footer>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** Placeholder shown while the reviews load. */
export function ReviewsSkeleton() {
  return (
    <div role="status" className="space-y-0">
      <span className="sr-only">{en.reviewsPage.loading}</span>
      {[0, 1, 2].map((i) => (
        <div key={i} aria-hidden="true" className="border-t border-line py-8 motion-safe:animate-pulse">
          <div className="h-4 w-28 rounded-full bg-surface-2" />
          <div className="mt-5 h-5 w-full rounded-full bg-surface-2" />
          <div className="mt-3 h-5 w-4/5 rounded-full bg-surface-2" />
          <div className="mt-5 h-4 w-40 rounded-full bg-surface-2" />
        </div>
      ))}
    </div>
  );
}
