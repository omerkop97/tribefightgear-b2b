import type { Lang } from '../i18n';

type L = Record<Lang, string>;

export type TierId = 'essential' | 'performance' | 'elite';
export type CategoryId = 'gloves' | 'protective' | 'coaching' | 'fightwear';

export interface Model {
  slug: string;
  // Model names as delivered by the client (photo folder names).
  name: string;
  /** Product type: models are grouped by it, like the sub-folders (Head Guards, Shin Pads…). */
  type: L;
  /** Only shown when the client specified it. */
  material?: L;
  images: number; // number of angles in /public/images/products/<category>/<slug>/
}

export interface Tier {
  id: TierId;
  models: Model[];
  // Shown when no models are photographed yet.
  planned?: L;
}

/** A product line outside the three levels, mirroring its own photo folder (e.g. "MMA Gloves"). */
export interface Collection {
  id: string;
  name: L;
  intro: L;
  models: Model[];
}

export interface Category {
  id: CategoryId;
  name: L;
  short: L;
  intro: L;
  cover?: string; // model slug used as cover image
  tiers: Tier[];
  collections?: Collection[];
}

const PU: L = { en: 'Premium PU', nl: 'Premium PU' };
const LEATHER: L = { en: 'Leather', nl: 'Leer' };
const MICRO: L = { en: 'Microfibre', nl: 'Microfiber' };

const BOXING: L = { en: 'Boxing gloves', nl: 'Bokshandschoenen' };
const HEAD: L = { en: 'Head guards', nl: 'Hoofdbeschermers' };
const SHIN: L = { en: 'Shin pads', nl: 'Scheenbeschermers' };
const FOCUS: L = { en: 'Focus pads', nl: 'Focus pads' };
const ARM: L = { en: 'Arm pads', nl: 'Arm pads' };
const BELLY: L = { en: 'Belly pads', nl: 'Buikbeschermers' };

export const TIERS: Record<TierId, { name: string; tagline: L; body: L }> = {
  essential: {
    name: 'Essential',
    tagline: { en: 'Proven quality at volume', nl: 'Bewezen kwaliteit op volume' },
    body: {
      en: 'Durable PU constructions for gyms, clubs and entry collections. Fast to customise, competitive at scale.',
      nl: 'Duurzame PU-constructies voor sportscholen, clubs en instapcollecties. Snel aan te passen, scherp geprijsd op volume.',
    },
  },
  performance: {
    name: 'Performance',
    tagline: { en: 'Built for serious training', nl: 'Gemaakt voor serieuze training' },
    body: {
      en: 'Genuine leather and microfibre with pro-level padding systems, for fighters who train daily.',
      nl: 'Echt leer en microfiber met padding op pro-niveau, voor vechters die dagelijks trainen.',
    },
  },
  elite: {
    name: 'Elite',
    tagline: { en: 'No compromise', nl: 'Geen compromissen' },
    body: {
      en: 'Flagship constructions in leather and microfibre, finished in white and gold. For brands that compete at the top.',
      nl: 'Topmodellen in leer en microfiber, afgewerkt in wit en goud. Voor merken die aan de top meedoen.',
    },
  },
};

export const CATEGORIES: Category[] = [
  {
    id: 'gloves',
    name: { en: 'Gloves', nl: 'Handschoenen' },
    short: {
      en: 'Boxing and MMA gloves for training, sparring and competition.',
      nl: 'Boks- en MMA-handschoenen voor training, sparring en wedstrijd.',
    },
    intro: {
      en: 'Our core. From high-volume PU training gloves to leather and microfibre Elite flagships, every glove can be developed into your own model.',
      nl: 'Onze kern. Van PU-trainingshandschoenen op volume tot Elite-topmodellen in leer en microfiber, elke handschoen kan worden doorontwikkeld tot jouw eigen model.',
    },
    cover: 'apex',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala', name: 'Aiba', type: BOXING, material: PU, images: 6 },
          { slug: 'dotline', name: 'AD', type: BOXING, material: PU, images: 6 },
          { slug: 'warrior', name: 'RDX', type: BOXING, material: PU, images: 6 },
        ],
      },
      {
        id: 'performance',
        models: [],
        planned: {
          en: 'Leather pro-fight and Muay Thai models, on display at ISPO 2026.',
          nl: 'Leren pro-fight- en Muay Thai-modellen, te zien op ISPO 2026.',
        },
      },
      {
        id: 'elite',
        models: [
          { slug: 'apex', name: 'Apex', type: BOXING, material: LEATHER, images: 3 },
          { slug: 'glory', name: 'Glory', type: BOXING, material: MICRO, images: 3 },
          { slug: 'fly', name: 'Fly', type: BOXING, material: MICRO, images: 3 },
        ],
      },
    ],
    collections: [
      {
        id: 'mma',
        name: { en: 'MMA Gloves', nl: 'MMA-handschoenen' },
        intro: {
          en: 'Open-finger MMA gloves in three colourways, with the same construction quality as our boxing gloves.',
          nl: 'MMA-handschoenen met open vingers in drie kleurstellingen, met dezelfde bouwkwaliteit als onze bokshandschoenen.',
        },
        models: [{ slug: 'mma-hybrid', name: 'Venum', type: { en: 'MMA gloves', nl: 'MMA-handschoenen' }, images: 9 }],
      },
    ],
  },
  {
    id: 'protective',
    name: { en: 'Protective Equipment', nl: 'Bescherming' },
    short: {
      en: 'Head guards and shin pads, from Essential to Elite.',
      nl: 'Hoofdbeschermers en scheenbeschermers, van Essential tot Elite.',
    },
    intro: {
      en: 'Protection that fighters trust: shaped foams, secure closures and finishes that match your glove line.',
      nl: 'Bescherming waar vechters op vertrouwen: gevormde foams, stevige sluitingen en afwerking die aansluit op je handschoenenlijn.',
    },
    cover: 'apex-headguard',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala-headguard', name: 'Aiba', type: HEAD, material: PU, images: 6 },
          { slug: 'dotline-headguard', name: 'AD', type: HEAD, material: PU, images: 6 },
          { slug: 'warrior-headguard', name: 'RDX', type: HEAD, material: PU, images: 6 },
          { slug: 'mandala-shinguard', name: 'Aiba', type: SHIN, material: PU, images: 6 },
          { slug: 'dotline-shinguard', name: 'AD', type: SHIN, material: PU, images: 6 },
          { slug: 'warrior-shinguard', name: 'RDX', type: SHIN, material: PU, images: 6 },
        ],
      },
      { id: 'performance', models: [], planned: { en: 'Performance protection, presented at ISPO 2026.', nl: 'Performance-bescherming, gepresenteerd op ISPO 2026.' } },
      {
        id: 'elite',
        models: [
          { slug: 'apex-headguard', name: 'Apex', type: HEAD, images: 3 },
          { slug: 'glory-headguard', name: 'Glory', type: HEAD, images: 4 },
          { slug: 'fly-headguard', name: 'Fly', type: HEAD, images: 1 },
          { slug: 'apex-shinguard', name: 'Apex', type: SHIN, images: 3 },
          { slug: 'glory-shinguard', name: 'Glory', type: SHIN, images: 3 },
          { slug: 'fly-shinguard', name: 'Fly', type: SHIN, images: 4 },
        ],
      },
    ],
  },
  {
    id: 'coaching',
    name: { en: 'Coaching Equipment', nl: 'Trainersmateriaal' },
    short: {
      en: 'Focus pads, arm pads and belly pads.',
      nl: 'Focus pads, arm pads en buikbeschermers.',
    },
    intro: {
      en: 'Equipment trainers use for hours every day, built to absorb impact and keep its shape.',
      nl: 'Materiaal dat trainers dagelijks urenlang gebruiken, gemaakt om impact op te vangen en in vorm te blijven.',
    },
    cover: 'glory-focus-long',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala-focus-pads', name: 'Aiba', type: FOCUS, material: PU, images: 6 },
          { slug: 'warrior-focus-pads', name: 'RDX', type: FOCUS, material: PU, images: 2 },
        ],
      },
      { id: 'performance', models: [], planned: { en: 'Performance coaching line, presented at ISPO 2026.', nl: 'Performance-trainersmateriaal, gepresenteerd op ISPO 2026.' } },
      {
        id: 'elite',
        models: [
          { slug: 'glory-focus-long', name: 'Glory Long', type: FOCUS, images: 3 },
          { slug: 'glory-focus-short', name: 'Glory Short', type: FOCUS, images: 3 },
          { slug: 'glory-focus-mini', name: 'Glory Mini', type: FOCUS, images: 3 },
          { slug: 'fly-focus-pads', name: 'Fly', type: FOCUS, images: 3 },
          { slug: 'apex-arm-pads', name: 'Apex', type: ARM, images: 3 },
          { slug: 'glory-arm-pads', name: 'Glory', type: ARM, images: 3 },
          { slug: 'fly-arm-pads', name: 'Fly', type: ARM, images: 3 },
          { slug: 'glory-belly-pads', name: 'Glory', type: BELLY, images: 3 },
        ],
      },
    ],
  },
  {
    id: 'fightwear',
    name: { en: 'Fightwear & Accessories', nl: 'Fightwear & Accessoires' },
    short: {
      en: 'Speedballs, shin instep guards, groin guards and boxing shoes.',
      nl: 'Speedballs, scheen-wreefbeschermers, toks en boksschoenen.',
    },
    intro: {
      en: 'Complete the collection: accessories in the same design language as your equipment.',
      nl: 'Maak de collectie compleet: accessoires in dezelfde designtaal als je materiaal.',
    },
    cover: 'boxing-shoes',
    tiers: [],
    collections: [
      {
        id: 'accessories',
        name: { en: 'Accessories', nl: 'Accessoires' },
        intro: {
          en: 'Training and fight accessories, available in the Tribe Gear black and white-gold lines.',
          nl: 'Trainings- en wedstrijdaccessoires, beschikbaar in de zwarte en wit-gouden Tribe Gear-lijnen.',
        },
        models: [
          { slug: 'speedball', name: 'Speedball', type: { en: 'Speedballs', nl: 'Speedballs' }, images: 6 },
          { slug: 'shin-instep', name: 'Shin In Step', type: { en: 'Shin instep guards', nl: 'Scheen-wreefbeschermers' }, images: 5 },
          { slug: 'groin-guard', name: 'Groin Guard', type: { en: 'Groin guards', nl: 'Toks' }, images: 2 },
          { slug: 'boxing-shoes', name: 'Boxing Shoes', type: { en: 'Boxing shoes', nl: 'Boksschoenen' }, images: 5 },
        ],
      },
    ],
  },
];

/** Every model in a category: levels first, then collections. */
export function allModels(c: Category): Model[] {
  return [...c.tiers.flatMap((t) => t.models), ...(c.collections ?? []).flatMap((col) => col.models)];
}

export function img(category: CategoryId, slug: string, n: number, size: 700 | 1400 = 1400) {
  return `/images/products/${category}/${slug}/${n}-${size}.webp`;
}

export function srcset(category: CategoryId, slug: string, n: number) {
  return `${img(category, slug, n, 700)} 700w, ${img(category, slug, n, 1400)} 1400w`;
}
