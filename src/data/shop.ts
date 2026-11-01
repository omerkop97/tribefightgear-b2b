/**
 * Webshop-style view of the catalogue: every model becomes a product with its own page,
 * grouped by line (Essential, Performance, Elite, MMA Gloves, Accessories).
 * The source data stays in products.ts, organised like the client's photo folders.
 */
import type { Lang } from '../i18n';
import { CATEGORIES, TIERS, type CategoryId, type Closure, type Colour, type Model } from './products';

type L = Record<Lang, string>;

export type LineId = 'essential' | 'performance' | 'elite' | 'mma' | 'accessories' | 'apparel';

export interface Line {
  id: LineId;
  name: L;
  tagline: L;
  body: L;
  /** Shown on the line page while no products are photographed yet. */
  comingSoon?: L;
}

export interface Product extends Model {
  /** URL segment, unique within its line. */
  id: string;
  line: LineId;
  category: CategoryId;
  title: L;
  colour: Colour;
  closure?: Closure;
  /** Photo numbers of this colourway inside the model folder. */
  photos: number[];
  /** Key shared by all colourways of the same model (for "also available in"). */
  family: string;
}

const same = (s: string): L => ({ en: s, nl: s });

export const LINES: Line[] = [
  { id: 'essential', name: same(TIERS.essential.name), tagline: TIERS.essential.tagline, body: TIERS.essential.body },
  {
    id: 'performance',
    name: same(TIERS.performance.name),
    tagline: TIERS.performance.tagline,
    body: TIERS.performance.body,
    comingSoon: {
      en: 'Book a meeting to hear about the Performance line first.',
      nl: 'Plan een afspraak om als eerste over de Performance-lijn te horen.',
    },
  },
  { id: 'elite', name: same(TIERS.elite.name), tagline: TIERS.elite.tagline, body: TIERS.elite.body },
  {
    id: 'mma',
    name: { en: 'MMA Gloves', nl: 'MMA-handschoenen' },
    tagline: { en: 'Built for mixed martial arts', nl: 'Gemaakt voor mixed martial arts' },
    body: {
      en: 'Open-finger MMA gloves in three colourways, with the same construction quality as our boxing gloves.',
      nl: 'MMA-handschoenen met open vingers in drie kleurstellingen, met dezelfde bouwkwaliteit als onze bokshandschoenen.',
    },
  },
  {
    id: 'accessories',
    name: { en: 'Accessories', nl: 'Accessoires' },
    tagline: { en: 'Complete the collection', nl: 'Maak de collectie compleet' },
    body: {
      en: 'Speedballs, shin instep guards, groin guards and boxing shoes in the Tribe Gear black and white-gold lines.',
      nl: 'Speedballs, scheen-wreefbeschermers, toks en boksschoenen in de zwarte en wit-gouden Tribe Gear-lijnen.',
    },
  },
  {
    id: 'apparel',
    name: { en: 'Fightwear', nl: 'Fightwear' },
    tagline: { en: 'Wear the brand', nl: 'Draag het merk' },
    body: {
      en: 'Thai shorts and MMA apparel in the same design language as your equipment.',
      nl: 'Thaiboks-shorts en MMA-kleding in dezelfde designtaal als je materiaal.',
    },
    comingSoon: {
      en: 'The fightwear collection is presented at ISPO 2026. Book a meeting to see it first.',
      nl: 'De fightwear-collectie wordt gepresenteerd op ISPO 2026. Plan een afspraak om hem als eerste te zien.',
    },
  },
];


const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function buildProducts(): Product[] {
  const out: Product[] = [];
  const add = (m: Model, line: LineId, category: CategoryId) => {
    // Accessories and fightwear are named by the product itself ("Speedball", "Thai Shorts").
    const isAccessory = line === 'accessories' || line === 'apparel';
    const base = isAccessory ? slugify(m.name) : `${slugify(m.name)}-${slugify(m.type.en)}`;
    // TRIBE Apex exists in both Performance and Elite: the later line gets its name in the URL.
    const taken = out.some((x) => x.category === category && x.family !== `${line}-${m.slug}` && x.id.startsWith(`${base}-`));
    const stem = taken ? `${line}-${base}` : base;
    const colourways = m.colours ?? [];
    for (const cw of colourways) {
      out.push({
        ...m,
        images: cw.images.length,
        photos: cw.images,
        colour: cw.colour,
        closure: cw.closure,
        family: `${line}-${m.slug}`,
        id: `${stem}-${slugify(cw.colour.name.en)}${cw.closure ? `-${slugify(cw.closure.name.en)}` : ''}`,
        line,
        category,
        title: isAccessory
          ? same(m.name)
          : cw.closure
            ? { en: `${m.name} ${cw.closure.title.en} ${titleCase(m.type.en)}`, nl: `${m.name} ${m.type.nl} ${cw.closure.title.nl}` }
            : { en: `${m.name} ${titleCase(m.type.en)}`, nl: `${m.name} ${m.type.nl}` },
      });
    }
  };
  for (const c of CATEGORIES) {
    for (const tier of c.tiers) for (const m of tier.models) add(m, tier.id, c.id);
    for (const col of c.collections ?? []) for (const m of col.models) add(m, col.id as LineId, c.id);
  }
  return out;
}

export const PRODUCTS: Product[] = buildProducts();

export function lineById(id: LineId) {
  return LINES.find((l) => l.id === id)!;
}

export function productsInLine(id: LineId) {
  return PRODUCTS.filter((p) => p.line === id);
}

export function productsInCategory(id: CategoryId) {
  return PRODUCTS.filter((p) => p.category === id);
}

/** Lines offered within a category, in the order of LINES (levels first, then collections). */
export function linesInCategory(id: CategoryId): Line[] {
  const c = CATEGORIES.find((x) => x.id === id)!;
  const ids = new Set<string>([...c.tiers.map((t) => t.id), ...(c.collections ?? []).map((col) => col.id)]);
  return LINES.filter((l) => ids.has(l.id));
}

export function productsIn(category: CategoryId, line: LineId) {
  return PRODUCTS.filter((p) => p.category === category && p.line === line);
}

/** /products/<category>/<product> */
export function productPath(p: Product) {
  return `/products/${p.category}/${p.id}`;
}

/** Other colourways of the same model. */
export function siblings(p: Product) {
  return PRODUCTS.filter((x) => x.family === p.family && x !== p);
}

/** URL of photo `n` (1-based position within the colourway) of a product. */
export function photo(p: Product, n: number, size: 700 | 1400 = 1400) {
  return `/images/products/${p.category}/${p.slug}/${p.photos[n - 1]}-${size}.webp`;
}

export function photoSrcset(p: Product, n: number) {
  return `${photo(p, n, 700)} 700w, ${photo(p, n, 1400)} 1400w`;
}

