import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

declare global {
  interface Window { __motionReady?: boolean }
}

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const EASE = 'power3.out';

gsap.registerPlugin(ScrollTrigger);

/* ---------- Header: compact on scroll, hide while scrolling down ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
let lastY = window.scrollY;
function onScroll() {
  const y = window.scrollY;
  if (header) {
    header.classList.toggle('is-scrolled', y > 60);
    header.classList.toggle('is-hidden', y > 400 && y > lastY + 2);
    if (y < lastY - 2) header.classList.remove('is-hidden');
  }
  lastY = y;
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Product spin: scrub through angles with the pointer ---------- */
document.querySelectorAll<HTMLElement>('[data-spin]').forEach((el) => {
  const img = el.querySelector('img');
  const frames = (el.dataset.spin ?? '').split('|').filter(Boolean);
  if (!img || frames.length < 2) return;
  const original = img.currentSrc || img.src;
  let loaded = false;
  el.addEventListener('pointerenter', () => {
    if (loaded) return;
    loaded = true;
    frames.forEach((f) => { const i = new Image(); i.src = f; });
  });
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const idx = Math.min(frames.length - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * frames.length)));
    img.srcset = '';
    img.src = frames[idx];
  });
  el.addEventListener('pointerleave', () => { img.src = original; });
});

if (reduced) {
  root.classList.remove('motion');
} else {
  initMotion();
}
window.__motionReady = true;

function initMotion() {
  /* ---------- Smooth scroll ---------- */
  const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.addEventListener('tg:lock', () => lenis.stop());
  window.addEventListener('tg:unlock', () => lenis.start());

  /* ---------- Split headings into masked words ---------- */
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    splitWords(el);
    const words = el.querySelectorAll('.wi');
    gsap.set(el, { visibility: 'visible' });
    gsap.set(words, { yPercent: 115 });
    const play = () => gsap.to(words, { yPercent: 0, duration: 1.05, ease: 'power4.out', stagger: 0.045 });
    if (el.dataset.split === 'load') gsap.delayedCall(0.15, play);
    else ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: play });
  });

  /* ---------- Reveals ---------- */
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal;
    const from: gsap.TweenVars =
      kind === 'left' ? { x: -40 } : kind === 'right' ? { x: 40 } : kind === 'scale' ? { scale: 0.94 } : { y: 40 };
    gsap.fromTo(el, { autoAlpha: 0, ...from }, {
      autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 1.1, ease: EASE,
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((el) => {
    gsap.fromTo(el.children, { autoAlpha: 0, y: 36 }, {
      autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  /* ---------- Clip reveal for imagery ---------- */
  document.querySelectorAll<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
    const img = el.querySelector('img');
    if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
  });

  /* ---------- Count-up numbers ---------- */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: target, duration: 2, ease: 'power2.out',
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  /* ---------- Parallax ---------- */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.parallax || 0.15);
    gsap.fromTo(el, { yPercent: -speed * 100 }, {
      yPercent: speed * 100, ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  /* ---------- Hero ---------- */
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const product = hero.querySelector('[data-hero-product]');
    const word = hero.querySelector('[data-hero-word]');
    const intro = gsap.timeline({ delay: 0.2 });
    if (product) intro.fromTo(product, { autoAlpha: 0, scale: 0.86, rotate: -8, y: 60 }, { autoAlpha: 1, scale: 1, rotate: 0, y: 0, duration: 1.6, ease: 'expo.out' }, 0);
    if (word) intro.fromTo(word, { autoAlpha: 0, xPercent: 8 }, { autoAlpha: 1, xPercent: 0, duration: 1.8, ease: 'expo.out' }, 0);
    hero.querySelectorAll('[data-hero-in]').forEach((el, i) => {
      intro.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE }, 0.55 + i * 0.1);
    });

    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    if (product) gsap.to(product, { yPercent: 18, rotate: 9, scale: 1.08, ease: 'none', scrollTrigger: scrub });
    if (word) gsap.to(word, { xPercent: -18, ease: 'none', scrollTrigger: scrub });
  }

  /* ---------- Horizontal category rail (desktop only) ---------- */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
      if (!track) return;
      const distance = () => track.scrollWidth - track.clientWidth;
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          // Start only once the whole card row is on screen (section bottom meets viewport bottom).
          start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  /* ---------- Process line ---------- */
  document.querySelectorAll<HTMLElement>('[data-process]').forEach((el) => {
    const line = el.querySelector('[data-process-line]');
    const steps = el.querySelectorAll<HTMLElement>('[data-process-step]');
    const vertical = window.matchMedia('(max-width: 760px)');
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      end: 'bottom 45%',
      scrub: true,
      onUpdate: (self) => {
        if (line) gsap.set(line, vertical.matches ? { scaleX: 1, scaleY: self.progress } : { scaleY: 1, scaleX: self.progress });
        const active = Math.floor(self.progress * steps.length + 0.15);
        steps.forEach((s, i) => s.classList.toggle('is-on', i < active));
      },
    });
  });

  /* ---------- Photo strip drift ---------- */
  document.querySelectorAll<HTMLElement>('[data-drift]').forEach((row) => {
    const dir = Number(row.dataset.drift);
    gsap.fromTo(row, { xPercent: dir > 0 ? -12 : 0 }, {
      xPercent: dir > 0 ? 0 : -12, ease: 'none',
      scrollTrigger: { trigger: row.parentElement ?? row, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
    });
  });

  /* ---------- Final CTA wipe ---------- */
  document.querySelectorAll<HTMLElement>('[data-wipe]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(12% 8% 12% 8%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
    });
  });

  /* ---------- Footer word drift ---------- */
  const footerWord = document.querySelector('[data-footer-word]');
  if (footerWord) {
    gsap.fromTo(footerWord, { xPercent: 6 }, {
      xPercent: -6, ease: 'none',
      scrollTrigger: { trigger: footerWord, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/** Wraps every word in two spans so it can slide up from behind a mask. Keeps <br> and nested accent spans. */
function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          w.className = 'w';
          const wi = document.createElement('span');
          wi.className = 'wi';
          wi.textContent = part;
          w.append(wi);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
}
