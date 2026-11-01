/** Sitemap of every page in both languages, for search engines. */
import type { APIRoute } from 'astro';

const pages = import.meta.glob('./**/*.astro');

export const GET: APIRoute = async ({ site }) => {
  // Collect the built routes from the dynamic page modules.
  const urls = new Set<string>();
  for (const [file, load] of Object.entries(pages)) {
    if (file.includes('404')) continue;
    const mod: any = await load();
    if (typeof mod.getStaticPaths !== 'function') continue;
    const paths = await mod.getStaticPaths({ paginate: () => [] });
    for (const { params } of paths) {
      const route = file
        .replace(/^\.\//, '/')
        .replace(/\.astro$/, '')
        .replace(/\[\.\.\.lang\]/, params.lang ?? '')
        .replace(/\[(\w+)\]/g, (_: string, k: string) => params[k])
        .replace(/\/index$/, '')
        .replace(/\/+/g, '/');
      urls.add(new URL(route || '/', site).href);
    }
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].sort().map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
