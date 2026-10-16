import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";

import { cn } from "@/lib/utils";

/** Maps the Studio's allowed styles (normal, h3, bullet list, bold, italic) to site markup. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h3: ({ children }) => <h3>{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
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
