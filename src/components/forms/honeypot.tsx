import { en } from "@/content/en";

/**
 * Anti-spam trap. Moved far off-screen and hidden from screen readers, so real
 * visitors never see or fill it. Spam bots fill every field: if this one has a
 * value, the form pretends to succeed and sends nothing.
 */
export const HONEYPOT_NAME = "website";

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_NAME}>{en.forms.honeypotLabel}</label>
      <input id={HONEYPOT_NAME} name={HONEYPOT_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}
