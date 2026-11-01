// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Canonical URLs, hreflang, social previews and the /welcome QR code use this domain.
  site: 'https://tribefightgear.com',
  trailingSlash: 'ignore',
  // Windows file events are sometimes missed in dev (stale styles); poll instead.
  vite: { server: { watch: { usePolling: true, interval: 300 } } },
});
