import { en } from './en';
import { nl } from './nl';

export type Lang = 'en' | 'nl';
export const LANGS: Lang[] = ['en', 'nl'];
export const DEFAULT_LANG: Lang = 'en';

export type Dict = typeof en;
const dicts: Record<Lang, Dict> = { en, nl };

export function t(lang: Lang): Dict {
  return dicts[lang];
}

/** English lives at the root, Dutch under /nl. */
export function localePath(lang: Lang, path = '/') {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return lang === DEFAULT_LANG ? clean || '/' : `/nl${clean}`;
}

export function langFromParam(param: string | undefined): Lang {
  return param === 'nl' ? 'nl' : 'en';
}

/** getStaticPaths helper for pages under src/pages/[...lang]/ */
export function langPaths() {
  return LANGS.map((lang) => ({ params: { lang: lang === DEFAULT_LANG ? undefined : lang } }));
}
