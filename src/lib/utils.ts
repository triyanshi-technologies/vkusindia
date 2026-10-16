type ClassValue = string | false | null | undefined;

/**
 * Joins truthy class names. There is no tailwind-merge step, so callers must not pass
 * utilities that conflict with a component's base classes.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
