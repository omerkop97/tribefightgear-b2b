# Tribe Gear B2B

B2B website for Tribe Gear, premium fight gear manufacturing (OEM, ODM, Private Label). Built with [Astro](https://astro.build), GSAP ScrollTrigger and Lenis.

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Structure

- `src/pages/[...lang]/`: all pages; English at `/`, Dutch at `/nl/`
- `src/i18n/en.ts`, `src/i18n/nl.ts`: all copy
- `src/data/site.ts`: contact details, ISPO info, booking link
- `src/data/products.ts`: categories, levels and models
- `public/images/products/`: product photos (WebP), generated with `scripts/process-photos.py`
- `src/assets/brand/`: logo (SVG)

See `IMPLEMENTATIEPLAN.md` for the plan and open items.
