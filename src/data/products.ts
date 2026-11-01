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
  images: number;
  /** Colourways: each becomes its own product, using these photo numbers. */
  colours?: Colourway[]; // number of angles in /public/images/products/<category>/<slug>/
}

export interface Colour { code: string; name: L }
export interface Closure { code: string; name: L; title: L }
export interface Colourway { colour: Colour; images: number[]; closure?: Closure }

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

const BW: Colour = { code: 'BKW', name: { en: 'Black / White', nl: 'Zwart / Wit' } };
const BLK: Colour = { code: 'BLK', name: { en: 'Black', nl: 'Zwart' } };
const BGR: Colour = { code: 'BKG', name: { en: 'Black / Grey', nl: 'Zwart / Grijs' } };
const BGD: Colour = { code: 'BKD', name: { en: 'Black / Gold', nl: 'Zwart / Goud' } };
const BGN: Colour = { code: 'BKN', name: { en: 'Black / Green', nl: 'Zwart / Groen' } };
const WG: Colour = { code: 'WGD', name: { en: 'White / Gold', nl: 'Wit / Goud' } };
const WHT: Colour = { code: 'WHT', name: { en: 'White', nl: 'Wit' } };
const GRN: Colour = { code: 'GRN', name: { en: 'Green', nl: 'Groen' } };
const WBK: Colour = { code: 'WBK', name: { en: 'White / Black', nl: 'Wit / Zwart' } };
const BSL: Colour = { code: 'BSL', name: { en: 'Black / Silver', nl: 'Zwart / Zilver' } };
const GCM: Colour = { code: 'GCM', name: { en: 'Green Camo', nl: 'Groen Camo' } };
const MNT: Colour = { code: 'MNT', name: { en: 'Mint / Grey', nl: 'Mint / Grijs' } };
const GGD: Colour = { code: 'GGD', name: { en: 'Green / Gold', nl: 'Groen / Goud' } };

const LACE: Closure = { code: 'L', name: { en: 'Lace-up', nl: 'Veters' }, title: { en: 'Lace-up', nl: 'met veters' } };
const VELCRO: Closure = { code: 'V', name: { en: 'Hook & loop', nl: 'Klittenband' }, title: { en: 'Velcro', nl: 'met klittenband' } };

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
          { slug: 'mandala', name: 'TRIBE Element', type: BOXING, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'dotline', name: 'TRIBE Foundation', type: BOXING, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'warrior', name: 'TRIBE Solid', type: BOXING, material: PU, images: 6, colours: [{ colour: BLK, images: [1, 2, 3] }, { colour: BGR, images: [4, 5, 6] }] },
        ],
      },
      {
        id: 'performance',
        models: [
          { slug: 'performance-apex', name: 'TRIBE Apex', type: BOXING, images: 9, colours: [{ colour: BLK, images: [1, 2, 3], closure: LACE }, { colour: BLK, images: [4, 5, 6], closure: VELCRO }, { colour: WG, images: [7, 8, 9], closure: LACE }] },
          { slug: 'top-king', name: 'TRIBE Pro', type: BOXING, material: LEATHER, images: 6, colours: [{ colour: BGD, images: [1, 2, 3] }, { colour: GGD, images: [4, 5, 6] }] },
          { slug: 'twins', name: 'TRIBE Advance', type: BOXING, material: LEATHER, images: 3, colours: [{ colour: BGN, images: [1, 2, 3] }] },
        ],
      },
      {
        id: 'elite',
        models: [
          { slug: 'apex', name: 'TRIBE Apex', type: BOXING, material: LEATHER, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory', name: 'TRIBE Signature', type: BOXING, material: MICRO, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'fly', name: 'TRIBE Prestige', type: BOXING, material: MICRO, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
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
        models: [{ slug: 'mma-hybrid', name: 'Venum', type: { en: 'MMA gloves', nl: 'MMA-handschoenen' }, images: 9, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }, { colour: WG, images: [7, 8, 9] }] }],
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
          { slug: 'mandala-headguard', name: 'TRIBE Element', type: HEAD, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'dotline-headguard', name: 'TRIBE Foundation', type: HEAD, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'warrior-headguard', name: 'TRIBE Solid', type: HEAD, material: PU, images: 6, colours: [{ colour: BLK, images: [1, 2, 3] }, { colour: BGR, images: [4, 5, 6] }] },
          { slug: 'mandala-shinguard', name: 'TRIBE Element', type: SHIN, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'dotline-shinguard', name: 'TRIBE Foundation', type: SHIN, material: PU, images: 6, colours: [{ colour: BW, images: [1, 2, 3] }, { colour: BLK, images: [4, 5, 6] }] },
          { slug: 'warrior-shinguard', name: 'TRIBE Solid', type: SHIN, material: PU, images: 6, colours: [{ colour: BLK, images: [1, 2, 3] }, { colour: BGR, images: [4, 5, 6] }] },
        ],
      },
      {
        id: 'performance',
        models: [
          { slug: 'performance-apex-headguard', name: 'TRIBE Apex', type: HEAD, images: 6, colours: [{ colour: BLK, images: [1, 2, 3] }, { colour: WG, images: [4, 5, 6] }] },
          { slug: 'top-king-headguard', name: 'TRIBE Pro', type: HEAD, images: 6, colours: [{ colour: BGD, images: [1, 2, 3] }, { colour: GGD, images: [4, 5, 6] }] },
          { slug: 'twins-headguard', name: 'TRIBE Advance', type: HEAD, images: 3, colours: [{ colour: GRN, images: [1, 2, 3] }] },
          { slug: 'performance-apex-shinguard', name: 'TRIBE Apex', type: SHIN, images: 3, colours: [{ colour: BLK, images: [1, 2, 3] }] },
          { slug: 'top-king-shinguard', name: 'TRIBE Pro', type: SHIN, images: 8, colours: [{ colour: BGD, images: [1, 2, 3, 4] }, { colour: GGD, images: [5, 6, 7, 8] }] },
          { slug: 'twins-shinguard', name: 'TRIBE Advance', type: SHIN, images: 3, colours: [{ colour: GRN, images: [1, 2, 3] }] },
        ],
      },
      {
        id: 'elite',
        models: [
          { slug: 'apex-headguard', name: 'TRIBE Apex', type: HEAD, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-headguard', name: 'TRIBE Signature', type: HEAD, images: 4, colours: [{ colour: WG, images: [1, 2, 3, 4] }] },
          { slug: 'fly-headguard', name: 'TRIBE Prestige', type: HEAD, images: 1, colours: [{ colour: WG, images: [1] }] },
          { slug: 'apex-shinguard', name: 'TRIBE Apex', type: SHIN, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-shinguard', name: 'TRIBE Signature', type: SHIN, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'fly-shinguard', name: 'TRIBE Prestige', type: SHIN, images: 4, colours: [{ colour: WG, images: [1, 2, 3, 4] }] },
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
          { slug: 'mandala-focus-pads', name: 'TRIBE Element', type: FOCUS, material: PU, images: 6, colours: [{ colour: BW, images: [1, 3, 4] }, { colour: BLK, images: [2, 5, 6] }] },
          { slug: 'warrior-focus-pads', name: 'TRIBE Solid', type: FOCUS, material: PU, images: 2, colours: [{ colour: BW, images: [1, 2] }] },
        ],
      },
      { id: 'performance', models: [], planned: { en: 'The Performance coaching line is coming soon.', nl: 'De Performance-lijn trainersmateriaal komt binnenkort.' } },
      {
        id: 'elite',
        models: [
          { slug: 'glory-focus-long', name: 'TRIBE Signature Long', type: FOCUS, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-focus-short', name: 'TRIBE Signature Short', type: FOCUS, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-focus-mini', name: 'TRIBE Signature Mini', type: FOCUS, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'fly-focus-pads', name: 'TRIBE Prestige', type: FOCUS, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'apex-arm-pads', name: 'TRIBE Apex', type: ARM, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-arm-pads', name: 'TRIBE Signature', type: ARM, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'fly-arm-pads', name: 'TRIBE Prestige', type: ARM, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
          { slug: 'glory-belly-pads', name: 'TRIBE Signature', type: BELLY, images: 3, colours: [{ colour: WG, images: [1, 2, 3] }] },
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
      en: 'Complete the collection: fightwear and accessories in the same design language as your equipment, in the Tribe Gear black and white-gold lines.',
      nl: 'Maak de collectie compleet: fightwear en accessoires in dezelfde designtaal als je materiaal, in de zwarte en wit-gouden Tribe Gear-lijnen.',
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
          { slug: 'speedball', name: 'Speedball', type: { en: 'Speedballs', nl: 'Speedballs' }, images: 6, colours: [{ colour: WG, images: [1, 2] }, { colour: BLK, images: [3, 4, 5, 6] }] },
          { slug: 'shin-instep', name: 'Shin In Step', type: { en: 'Shin instep guards', nl: 'Scheen-wreefbeschermers' }, images: 5, colours: [{ colour: BLK, images: [1] }, { colour: BW, images: [2, 4] }, { colour: WHT, images: [3, 5] }] },
          { slug: 'groin-guard', name: 'Groin Guard', type: { en: 'Groin guards', nl: 'Toks' }, images: 2, colours: [{ colour: BLK, images: [1, 2] }] },
          { slug: 'boxing-shoes', name: 'Boxing Shoes', type: { en: 'Boxing shoes', nl: 'Boksschoenen' }, images: 5, colours: [{ colour: WG, images: [1, 2, 3, 4, 5] }] },
        ],
      },
      {
        id: 'apparel',
        name: { en: 'Fightwear', nl: 'Fightwear' },
        intro: {
          en: 'Thai shorts and MMA apparel in the same design language as your equipment.',
          nl: 'Thaiboks-shorts en MMA-kleding in dezelfde designtaal als je materiaal.',
        },
        models: [
          {
            slug: 'thai-shorts', name: 'Thai Shorts', type: { en: 'Thai shorts', nl: 'Thaiboks-shorts' }, images: 12,
            colours: [
              { colour: WG, images: [1, 2] }, { colour: BGD, images: [3, 4] }, { colour: BW, images: [5, 6] },
              { colour: BSL, images: [7, 8] }, { colour: WBK, images: [9, 10] }, { colour: BLK, images: [11, 12] },
            ],
          },
          {
            slug: 'mma-apparel', name: 'MMA Set', type: { en: 'MMA apparel', nl: 'MMA-kleding' }, images: 8,
            colours: [
              { colour: GCM, images: [1, 2] }, { colour: BW, images: [3, 4] }, { colour: BLK, images: [5, 6] }, { colour: MNT, images: [7, 8] },
            ],
          },
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
