import { company, type ContactPerson } from "@/content/company";
import type { Locale } from "@/i18n/config";
import { IconUser } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Contact persons grouped by country (Contact and About pages). */
export function ContactPeople({ locale, className }: { locale: Locale; className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {company.people.map((group) => (
        <div key={group.country.en}>
          <p className="text-sm font-medium tracking-[0.12em] text-muted-strong uppercase">
            {group.country[locale]}
          </p>
          <ul className="mt-3 space-y-4">
            {group.members.map((person: ContactPerson) => (
              <li key={person.name.en} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-mist text-lg text-olive">
                  <IconUser />
                </span>
                <span>
                  <span className="block font-medium text-ink">{person.name[locale]}</span>
                  {person.role && (
                    <span className="block text-sm text-muted-strong">{person.role[locale]}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
