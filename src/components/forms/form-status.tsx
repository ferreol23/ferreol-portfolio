import { CircleAlert, CircleCheck } from "lucide-react";
import type { Ref } from "react";

/**
 * Message shown above a form's button after sending. It receives focus, so
 * screen-reader and keyboard users hear/see the result right away.
 */
export function FormStatus({ kind, message, ref }: { kind: "success" | "error"; message: string; ref?: Ref<HTMLDivElement> }) {
  const success = kind === "success";
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role={success ? "status" : "alert"}
      className={`flex items-start gap-3 rounded-2xl border p-4 font-semibold focus:outline-none ${
        success ? "border-accent-strong text-text" : "border-danger text-text"
      }`}
    >
      {success ? (
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-accent-strong" aria-hidden="true" />
      ) : (
        <CircleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
      )}
      {message}
    </div>
  );
}
