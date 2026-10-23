"use client";

import { useRef, useState, type FormEvent } from "react";
import { Field } from "@/components/forms/field";
import { FormStatus } from "@/components/forms/form-status";
import { HONEYPOT_NAME, Honeypot } from "@/components/forms/honeypot";
import { SubmitButton } from "@/components/forms/submit-button";
import { useCooldown } from "@/components/forms/use-cooldown";
import { en, fill } from "@/content/en";
import { getSupabase } from "@/lib/supabase";
import { LIMITS, fieldErrors, messageSchema } from "@/lib/validation";

type Status = { kind: "success" | "error"; message: string } | null;

const empty = { name: "", email: "", message: "" };

/** Contact form. Messages are saved in Supabase (table "messages"), where only you can read them. */
export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const cooldown = useCooldown("cooldown:message");
  const t = en.contactPage;

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

    const parsed = messageSchema.safeParse(values);
    if (!parsed.success) {
      const found = fieldErrors(parsed.error);
      setErrors(found);
      setStatus(null);
      // Put the keyboard focus on the first field that needs fixing.
      const first = ["name", "email", "message"].find((key) => found[key]);
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setBusy(true);
    try {
      // Never chain .select() here: visitors can't read messages back.
      const { error } = await getSupabase().from("messages").insert(parsed.data);
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
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          name="name"
          label={t.nameLabel}
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          maxLength={LIMITS.messageName}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          name="email"
          type="email"
          label={t.emailFieldLabel}
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          maxLength={LIMITS.messageEmail}
          autoComplete="email"
        />
      </div>
      <Field
        id="contact-message"
        name="message"
        label={t.messageLabel}
        hint={t.messageHint}
        value={values.message}
        onChange={set("message")}
        error={errors.message}
        maxLength={LIMITS.messageBody}
        showCounter
        multiline
      />
      <Honeypot />
      {status && <FormStatus ref={statusRef} kind={status.kind} message={status.message} />}
      <SubmitButton label={t.submit} busyLabel={t.submitting} busy={busy} cooldown={cooldown.remaining} />
    </form>
  );
}
