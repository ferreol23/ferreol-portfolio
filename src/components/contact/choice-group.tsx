import { en } from "@/content/en";

/*
  A row of pill-shaped choices (real radio buttons, styled), e.g. "What do you need?".
  Optional: nothing is selected until the visitor clicks. Arrow keys move between pills.
*/

type Props<Key extends string> = {
  name: string;
  legend: string;
  options: Record<Key, string>;
  value: Key | undefined;
  onChange: (value: Key) => void;
};

export function ChoiceGroup<Key extends string>({ name, legend, options, value, onChange }: Props<Key>) {
  return (
    <fieldset>
      <legend className="font-semibold">
        {legend} <span className="font-normal text-muted">({en.contactPage.optional})</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {(Object.entries(options) as [Key, string][]).map(([key, label]) => (
          <label key={key} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-bg px-4 text-sm font-semibold text-muted transition-colors duration-200 hover:border-muted hover:text-text peer-checked:border-accent-strong peer-checked:bg-accent peer-checked:text-on-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-strong">
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
