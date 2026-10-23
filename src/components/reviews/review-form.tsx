"use client";

import { useRef, useState, type FormEvent } from "react";
import { Field } from "@/components/forms/field";
import { FormStatus } from "@/components/forms/form-status";
import { HONEYPOT_NAME, Honeypot } from "@/components/forms/honeypot";
import { SubmitButton } from "@/components/forms/submit-button";
import { useCooldown } from "@/components/forms/use-cooldown";
import { en, fill } from "@/content/en";
import { getSupabase } from "@/lib/supabase";
import { LIMITS, fieldErrors, reviewSchema } from "@/lib/validation";
import { RatingInput } from "./rating-input";

type Status = { kind: "success" | "error"; message: string } | null;

const empty = { name: "", rating: "", comment: "" };

/** "Leave a review" form. Reviews are always saved as NOT approved; you approve them in Supabase. */
export function ReviewForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const cooldown = useCooldown("cooldown:review");
  const t = en.reviewsPage;

  const set = (key: keyof typeof empty) => (value: string) => setValues((current) => ({ ...current, [key]: value }));

  function announce(next: Status) {
    setStatus(next);
    // Move focus to the result once it's on screen.
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;

    // Spam bot filled the hidden field: pretend it worked, send nothing.
    if (new FormData(form).get(HONEYPOT_NAME)) {
      announce({ kind: "success", message: t.success });
      return;
    }

    const wait = cooldown.check();
    if (wait > 0) {
      announce({ kind: "error", message: fill(en.forms.cooldown, { seconds: String(wait) }) });
      return;
    }

    const parsed = reviewSchema.safeParse(values);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus(null);
      // Put the keyboard focus on the first field that needs fixing.
      const first = ["name", "rating", "comment"].find((key) => found[key]);
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setBusy(true);
    try {
      // Never chain .select() here: visitors can't read pending reviews back.
      const { error } = await getSupabase()
        .from("reviews")
        .insert({ ...parsed.data, approved: false });
      if (error) throw error;
      setValues(empty);
      cooldown.start();
      announce({ kind: "success", message: t.success });
    } catch {
      announce({ kind: "error", message: en.forms.sendError });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative space-y-6">
      <Field
        id="review-name"
        name="name"
        label={t.nameLabel}
        value={values.name}
        onChange={set("name")}
        error={errors.name}
        maxLength={LIMITS.reviewName}
        autoComplete="name"
      />
      <RatingInput value={values.rating} onChange={set("rating")} error={errors.rating} />
      <Field
        id="review-comment"
        name="comment"
        label={t.commentLabel}
        hint={t.commentHint}
        value={values.comment}
        onChange={set("comment")}
        error={errors.comment}
        maxLength={LIMITS.reviewComment}
        showCounter
        multiline
      />
      <Honeypot />
      {status && <FormStatus ref={statusRef} kind={status.kind} message={status.message} />}
      <SubmitButton label={t.submit} busyLabel={t.submitting} busy={busy} cooldown={cooldown.remaining} />
    </form>
  );
}
