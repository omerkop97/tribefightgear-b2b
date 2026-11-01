/* ---------- Category cards: random cover per visit ---------- */
document.querySelectorAll<HTMLElement>('[data-covers]').forEach((stage) => {
  const img = stage.querySelector('img');
  let covers: { src: string; srcset: string; frames: string }[] = [];
  try { covers = JSON.parse(stage.dataset.covers ?? '[]'); } catch { return; }
  if (!img || covers.length < 2) return;
  const pick = covers[Math.floor(Math.random() * covers.length)];
  img.srcset = pick.srcset;
  img.src = pick.src;
  stage.dataset.spin = pick.frames;
});

/* ---------- Mobile menu ---------- */
const menu = document.querySelector<HTMLElement>('[data-menu]');
const openBtn = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeBtn = document.querySelector<HTMLButtonElement>('[data-menu-close]');

function setMenu(open: boolean) {
  if (!menu || !openBtn) return;
  menu.hidden = !open;
  openBtn.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
  window.dispatchEvent(new CustomEvent(open ? 'tg:lock' : 'tg:unlock'));
  if (open) closeBtn?.focus();
  else openBtn.focus();
}
openBtn?.addEventListener('click', () => setMenu(true));
closeBtn?.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu && !menu.hidden) setMenu(false);
});

/* ---------- ISPO banner: hide after the fair, even on a stale build ---------- */
document.querySelectorAll<HTMLElement>('[data-banner]').forEach((el) => {
  const ends = Date.parse(el.dataset.ends ?? '');
  if (ends && Date.now() > ends) el.remove();
});

/* ---------- Product galleries ---------- */
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
  const main = gallery.querySelector<HTMLImageElement>('[data-gallery-main]');
  const thumbs = gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-thumb]');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      if (!main) return;
      thumbs.forEach((t) => t.setAttribute('aria-pressed', 'false'));
      thumb.setAttribute('aria-pressed', 'true');
      main.animate([{ opacity: 0.2, transform: 'scale(0.97)' }, { opacity: 1, transform: 'none' }], {
        duration: 450,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
      main.src = thumb.dataset.src!;
      main.srcset = thumb.dataset.srcset!;
    });
  });
});

/* ---------- Lightbox ---------- */
const lb = document.querySelector<HTMLElement>('[data-lightbox]');
if (lb) {
  const lbImg = lb.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const lbCount = lb.querySelector<HTMLElement>('[data-lb-count]')!;
  let items: string[] = [];
  let index = 0;
  let opener: HTMLElement | null = null;

  const show = (i: number) => {
    index = (i + items.length) % items.length;
    lbImg.src = items[index];
    lbCount.textContent = `${index + 1} / ${items.length}`;
    lbImg.animate([{ opacity: 0, transform: 'scale(0.97)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = '';
    window.dispatchEvent(new CustomEvent('tg:unlock'));
    opener?.focus();
  };

  document.querySelectorAll<HTMLElement>('[data-lightbox-group]').forEach((group) => {
    group.querySelector<HTMLElement>('[data-lightbox-open]')?.addEventListener('click', (e) => {
      opener = e.currentTarget as HTMLElement;
      const thumbs = Array.from(group.querySelectorAll<HTMLElement>('[data-lightbox-item]'));
      const main = group.querySelector<HTMLImageElement>('[data-gallery-main]');
      items = thumbs.length ? thumbs.map((t) => t.dataset.lightboxItem!) : main ? [main.src] : [];
      if (!items.length) return;
      const active = thumbs.findIndex((t) => t.getAttribute('aria-pressed') === 'true');
      lb.hidden = false;
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('tg:lock'));
      lb.querySelector<HTMLElement>('[data-lb-close]')?.focus();
      show(Math.max(0, active));
    });
  });

  lb.querySelector('[data-lb-close]')?.addEventListener('click', close);
  lb.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(index - 1));
  lb.querySelector('[data-lb-next]')?.addEventListener('click', () => show(index + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
}

/* ---------- Product grid filters ---------- */
document.querySelectorAll<HTMLElement>('[data-pgrid]').forEach((grid) => {
  const key = grid.dataset.filterKey;
  const chips = grid.querySelectorAll<HTMLButtonElement>('[data-filter-value]');
  const cards = grid.querySelectorAll<HTMLElement>('.pcard');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const value = chip.dataset.filterValue;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      let visible = 0; // used for the stagger delay
      cards.forEach((card) => {
        const show = !value || card.dataset[key ?? 'category'] === value;
        card.hidden = !show;
        if (show) {
          visible++;
          card.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 400, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', delay: Math.min(visible, 9) * 30, fill: 'backwards' });
        }
      });
      window.dispatchEvent(new Event('resize'));
    });
  });
});

/* ---------- Factory film ---------- */
document.querySelectorAll<HTMLElement>('[data-film]').forEach((box) => {
  const video = box.querySelector<HTMLVideoElement>('video');
  const btn = box.querySelector<HTMLButtonElement>('[data-film-play]');
  if (!video || !btn) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) video.pause();
  btn.addEventListener('click', () => {
    video.removeAttribute('loop');
    video.removeAttribute('data-loop');
    video.muted = false;
    video.controls = true;
    video.src = box.dataset.film!;
    box.classList.add('is-playing');
    video.play().catch(() => {});
  });
});
// Muted background loops: play while on screen, pause off screen, and recover from any stall
// (browsers may pause muted autoplay video, e.g. after it was briefly invisible or buffered).
const loops = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-loop]'));
if (loops.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const visible = new WeakMap<HTMLVideoElement, boolean>();
  const isLoop = (v: HTMLVideoElement) => v.hasAttribute('data-loop');
  const resume = (v: HTMLVideoElement) => {
    if (isLoop(v) && visible.get(v) !== false && v.paused && !document.hidden) v.play().catch(() => {});
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target as HTMLVideoElement;
        visible.set(v, e.isIntersecting);
        if (!isLoop(v)) return;
        if (e.isIntersecting) resume(v);
        else v.pause();
      });
    }, { threshold: 0.05 });
    loops.forEach((v) => io.observe(v));
  }
  loops.forEach((v) => {
    ['pause', 'stalled', 'suspend', 'waiting', 'ended'].forEach((ev) => v.addEventListener(ev, () => window.setTimeout(() => resume(v), 400)));
  });
  document.addEventListener('visibilitychange', () => loops.forEach(resume));
  window.setInterval(() => loops.forEach(resume), 2000);
}


/* ---------- Footer wordmark spotlight ---------- */
document.querySelectorAll<HTMLElement>('[data-footer-word]').forEach((wrap) => {
  const mark = wrap.querySelector<HTMLElement>('[data-footer-mark]');
  const light = wrap.querySelector<HTMLElement>('[data-footer-light]');
  if (!mark || !light) return;
  wrap.addEventListener('pointermove', (e) => {
    const r = mark.getBoundingClientRect();
    mark.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    mark.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
  // Touch screens: one light sweep when the wordmark comes into view.
  if (window.matchMedia('(hover: none)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { light.classList.add('is-on'); io.disconnect(); }
    }, { threshold: 0.6 });
    io.observe(mark);
  }
});
