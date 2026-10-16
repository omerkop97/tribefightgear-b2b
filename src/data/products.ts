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
  material: L;
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
      en: 'Hand-finished flagship constructions with the best materials we source. For brands that compete at the top.',
      nl: 'Met de hand afgewerkte topmodellen met de beste materialen die we inkopen. Voor merken die aan de top meedoen.',
    },
  },
};

export const CATEGORIES: Category[] = [
  {
    id: 'gloves',
    name: { en: 'Gloves', nl: 'Handschoenen' },
    short: {
      en: 'Boxing, kickboxing, Muay Thai and MMA gloves, training, sparring and competition.',
      nl: 'Boks-, kickboks-, Muay Thai- en MMA-handschoenen, training, sparring en wedstrijd.',
    },
    intro: {
      en: 'Our core. From high-volume PU training gloves to hand-finished leather flagships, every glove can be developed into your own model.',
      nl: 'Onze kern. Van PU-trainingshandschoenen op volume tot met de hand afgewerkte leren topmodellen, elke handschoen kan worden doorontwikkeld tot jouw eigen model.',
    },
    cover: 'warrior',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala', name: 'Aiba', type: { en: 'Boxing gloves', nl: 'Bokshandschoenen' }, material: PU, images: 6 },
          { slug: 'dotline', name: 'AD', type: { en: 'Boxing gloves', nl: 'Bokshandschoenen' }, material: PU, images: 6 },
          { slug: 'warrior', name: 'RDX', type: { en: 'Boxing gloves', nl: 'Bokshandschoenen' }, material: PU, images: 6 },
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
        models: [],
        planned: {
          en: 'Apex (full leather) and two microfibre flagships, presented at ISPO 2026.',
          nl: 'Apex (volledig leer) en twee microfiber-topmodellen, gepresenteerd op ISPO 2026.',
        },
      },
    ],
    collections: [
      {
        id: 'mma',
        name: { en: 'MMA Gloves', nl: 'MMA-handschoenen' },
        intro: {
          en: 'Open-palm MMA gloves for sparring and grappling, the same construction quality, built for mixed martial arts.',
          nl: 'MMA-handschoenen met open handpalm voor sparring en grappling, dezelfde bouwkwaliteit, gemaakt voor mixed martial arts.',
        },
        models: [
          {
            slug: 'mma-hybrid',
            name: 'Venum',
            type: { en: 'MMA gloves', nl: 'MMA-handschoenen' },
            material: { en: 'Microfibre', nl: 'Microfiber' },
            images: 6,
          },
        ],
      },
    ],
  },
  {
    id: 'protective',
    name: { en: 'Protective Equipment', nl: 'Bescherming' },
    short: {
      en: 'Head guards, shin guards and body protection.',
      nl: 'Hoofdbeschermers, scheenbeschermers en bodyprotectie.',
    },
    intro: {
      en: 'Protection that fighters trust: shaped foams, secure closures and finishes that match your glove line.',
      nl: 'Bescherming waar vechters op vertrouwen: gevormde foams, stevige sluitingen en afwerking die aansluit op je handschoenenlijn.',
    },
    cover: 'warrior-headguard',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala-headguard', name: 'Aiba', type: { en: 'Head guards', nl: 'Hoofdbeschermers' }, material: PU, images: 6 },
          { slug: 'dotline-headguard', name: 'AD', type: { en: 'Head guards', nl: 'Hoofdbeschermers' }, material: PU, images: 6 },
          { slug: 'warrior-headguard', name: 'RDX', type: { en: 'Head guards', nl: 'Hoofdbeschermers' }, material: PU, images: 6 },
          { slug: 'mandala-shinguard', name: 'Aiba', type: { en: 'Shin pads', nl: 'Scheenbeschermers' }, material: PU, images: 6 },
          { slug: 'dotline-shinguard', name: 'AD', type: { en: 'Shin pads', nl: 'Scheenbeschermers' }, material: PU, images: 6 },
          { slug: 'warrior-shinguard', name: 'RDX', type: { en: 'Shin pads', nl: 'Scheenbeschermers' }, material: PU, images: 6 },
        ],
      },
      { id: 'performance', models: [], planned: { en: 'Leather protection line, in development.', nl: 'Leren beschermingslijn, in ontwikkeling.' } },
      { id: 'elite', models: [], planned: { en: 'Flagship protection, in development.', nl: 'Topmodellen bescherming, in ontwikkeling.' } },
    ],
  },
  {
    id: 'coaching',
    name: { en: 'Coaching Equipment', nl: 'Trainersmateriaal' },
    short: {
      en: 'Focus mitts, Thai pads and kick shields.',
      nl: 'Focus mitts, Thai pads en trapkussens.',
    },
    intro: {
      en: 'Equipment trainers use for hours every day, built to absorb impact and keep its shape.',
      nl: 'Materiaal dat trainers dagelijks urenlang gebruiken, gemaakt om impact op te vangen en in vorm te blijven.',
    },
    cover: 'mandala-focus-pads',
    tiers: [
      {
        id: 'essential',
        models: [
          { slug: 'mandala-focus-pads', name: 'Aiba', type: { en: 'Focus pads', nl: 'Focus pads' }, material: PU, images: 6 },
          { slug: 'warrior-focus-pads', name: 'RDX', type: { en: 'Focus pads', nl: 'Focus pads' }, material: PU, images: 2 },
        ],
      },
      { id: 'performance', models: [], planned: { en: 'Leather Thai pads and kick shields, in development.', nl: 'Leren Thai pads en trapkussens, in ontwikkeling.' } },
      { id: 'elite', models: [], planned: { en: 'Flagship coaching line, in development.', nl: 'Topmodellen trainersmateriaal, in ontwikkeling.' } },
    ],
  },
  {
    id: 'fightwear',
    name: { en: 'Fightwear & Accessories', nl: 'Fightwear & Accessoires' },
    short: {
      en: 'Shorts, rash guards, hand wraps and bags to complete your collection.',
      nl: 'Shorts, rashguards, bandages en tassen om je collectie compleet te maken.',
    },
    intro: {
      en: 'Complete the collection: apparel and accessories in the same design language as your equipment.',
      nl: 'Maak de collectie compleet: kleding en accessoires in dezelfde designtaal als je materiaal.',
    },
    tiers: [
      { id: 'essential', models: [], planned: { en: 'Hand wraps, shorts and training apparel, on request.', nl: 'Bandages, shorts en trainingskleding, op aanvraag.' } },
      { id: 'performance', models: [], planned: { en: 'Fight shorts and rash guards, on request.', nl: 'Fight shorts en rashguards, op aanvraag.' } },
      { id: 'elite', models: [], planned: { en: 'Signature fightwear, on request.', nl: 'Signature fightwear, op aanvraag.' } },
    ],
  },
];

export function img(category: CategoryId, slug: string, n: number, size: 700 | 1400 = 1400) {
  return `/images/products/${category}/${slug}/${n}-${size}.webp`;
}

export function srcset(category: CategoryId, slug: string, n: number) {
  return `${img(category, slug, n, 700)} 700w, ${img(category, slug, n, 1400)} 1400w`;
}
