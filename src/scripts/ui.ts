const root = document.documentElement;

/* ---------- Theme ---------- */
const media = window.matchMedia('(prefers-color-scheme: dark)');

function currentTheme(): 'light' | 'dark' {
  const forced = root.getAttribute('data-theme');
  if (forced === 'light' || forced === 'dark') return forced;
  return media.matches ? 'dark' : 'light';
}
function syncTheme() {
  root.setAttribute('data-theme-current', currentTheme());
}
syncTheme();
media.addEventListener('change', syncTheme);

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    // Matching the system preference again means: follow the system from now on.
    if ((next === 'dark') === media.matches) {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem('theme'); } catch {}
    } else {
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch {}
    }
    syncTheme();
  });
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
