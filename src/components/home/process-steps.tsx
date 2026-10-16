import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

interface ProcessStepsProps {
  eyebrow: string;
  title: string;
  steps: { title: string; text: string }[];
}

export function ProcessSteps({ eyebrow, title, steps }: ProcessStepsProps) {
  return (
    <section aria-labelledby="process-title" className="py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} id="process-title" />
        <ol className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl border border-line p-7 lg:p-9">
              <span className="grid size-11 place-items-center rounded-full bg-leaf font-serif text-lg text-ink">
                {index + 1}
              </span>
              <h3 className="mt-6 font-serif text-[1.375rem] leading-snug text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-muted-strong">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
