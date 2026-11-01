// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: replace with the final domain once it is known
  site: 'https://tribegear-b2b.example',
  trailingSlash: 'ignore',
  // Windows file events are sometimes missed in dev (stale styles); poll instead.
  vite: { server: { watch: { usePolling: true, interval: 300 } } },
});
