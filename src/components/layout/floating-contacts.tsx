import { company } from "@/content/company";
import { IconPhone, IconWhatsApp } from "@/components/ui/icons";

/** Persistent quick-contact buttons (the old site had the same WhatsApp + call shortcuts). */
export function FloatingContacts({ labels }: { labels: { whatsapp: string; call: string } }) {
  const [primaryPhone] = company.phones;
  const buttonClass =
    "grid size-13 place-items-center rounded-full text-2xl shadow-[0_10px_30px_-10px_rgb(34_34_34/0.45)] transition-transform duration-200 hover:-translate-y-0.5";

  return (
    <div className="fixed right-4 bottom-4 z-30 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <a
        href={company.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labels.whatsapp}
        className={`${buttonClass} bg-leaf text-ink hover:bg-olive hover:text-paper`}
      >
        <IconWhatsApp />
      </a>
      <a
        href={primaryPhone.href}
        aria-label={labels.call}
        className={`${buttonClass} bg-ink text-paper ring-1 ring-paper/25 hover:bg-olive`}
      >
        <IconPhone className="text-[1.375rem]" />
      </a>
    </div>
  );
}
