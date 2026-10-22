import { Asterisk } from "lucide-react";
import { en } from "@/content/en";

/**
 * Orange strip with services scrolling sideways forever.
 * The list is drawn twice so the loop is seamless; the copy is hidden from screen readers.
 */
export function Marquee() {
  const items = en.marquee;

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display px-6 text-3xl uppercase sm:text-4xl">{item}</span>
          <Asterisk className="size-7 shrink-0" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    // The outer box clips the slanted strip so it never causes sideways scrolling.
    <div className="overflow-x-clip py-6">
      <div className="marquee -mx-10 -rotate-1 overflow-hidden bg-accent py-5 text-on-accent">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
