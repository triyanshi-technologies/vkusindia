import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";

import { cn } from "@/lib/utils";

/**
 * Maps the Studio's allowed styles (paragraph, subheading, bold, italic) to site markup.
 * Line breaks inside a paragraph (Shift+Enter in the Studio, <br> on the old site)
 * are rendered as <br> by Portable Text itself.
 */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
};

export function RichText({ value, className }: { value: PortableTextBlock[]; className?: string }) {
  if (!value.length) return null;
  return (
    <div className={cn("prose-content", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
