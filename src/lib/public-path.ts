import "server-only";

/** Prefixes a public asset path for project sites hosted below /<repository>/. */
export function publicPath(path: string): string {
  const basePath = process.env.PAGES_BASE_PATH ?? "";
  if (!basePath) return path;
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}
