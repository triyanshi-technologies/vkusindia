import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./container";
import { SectionHeading } from "./section-heading";

interface PageHeaderProps {
  crumbs: Crumb[];
  crumbsLabel: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}

export function PageHeader({ crumbs, crumbsLabel, eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-mist/70">
      <Container className="pt-8 pb-14 lg:pt-10 lg:pb-20">
        <Breadcrumbs items={crumbs} label={crumbsLabel} />
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          className="mt-10 max-w-3xl lg:mt-14"
        >
          {children}
        </SectionHeading>
      </Container>
    </header>
  );
}
