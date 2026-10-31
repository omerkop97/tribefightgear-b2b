/**
 * Webshop-style view of the catalogue: every model becomes a product with its own page,
 * grouped by line (Essential, Performance, Elite, MMA Gloves, Accessories).
 * The source data stays in products.ts, organised like the client's photo folders.
 */
import type { Lang } from '../i18n';
import { CATEGORIES, TIERS, type CategoryId, type Model } from './products';

type L = Record<Lang, string>;

export type LineId = 'essential' | 'performance' | 'elite' | 'mma' | 'accessories';

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
  /**
   * TODO: placeholder article numbers (TG-<line>-<type>-<nn>).
   * Replace with the client's real article numbers once delivered.
   */
  sku: string;
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
      en: 'The Performance line is presented exclusively at ISPO 2026. Book a meeting to see and test it first.',
      nl: 'De Performance-lijn wordt exclusief gepresenteerd op ISPO 2026. Plan een afspraak om hem als eerste te zien en te testen.',
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
];

const LINE_CODE: Record<LineId, string> = { essential: 'ESS', performance: 'PRF', elite: 'ELT', mma: 'MMA', accessories: 'ACC' };
const TYPE_CODE: Record<string, string> = {
  'Boxing gloves': 'BG',
  'MMA gloves': 'MG',
  'Head guards': 'HG',
  'Shin pads': 'SP',
  'Focus pads': 'FP',
  'Arm pads': 'AP',
  'Belly pads': 'BP',
  Speedballs: 'SB',
  'Shin instep guards': 'SI',
  'Groin guards': 'GG',
  'Boxing shoes': 'BS',
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function buildProducts(): Product[] {
  const out: Product[] = [];
  const counters = new Map<string, number>();
  const add = (m: Model, line: LineId, category: CategoryId) => {
    const isAccessory = line === 'accessories';
    const key = `${line}-${m.type.en}`;
    const n = (counters.get(key) ?? 0) + 1;
    counters.set(key, n);
    out.push({
      ...m,
      id: isAccessory ? slugify(m.name) : `${slugify(m.name)}-${slugify(m.type.en)}`,
      line,
      category,
      title: isAccessory ? same(m.name) : { en: `${m.name} ${titleCase(m.type.en)}`, nl: `${m.name} ${m.type.nl}` },
      sku: `TG-${LINE_CODE[line]}-${TYPE_CODE[m.type.en] ?? 'XX'}-${String(n).padStart(2, '0')}`,
    });
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
