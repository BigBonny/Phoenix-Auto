/**
 * Phoenix Permis — moteur d'animations léger (≈3 Ko, sans dépendance).
 * - Révélations au scroll (IntersectionObserver)
 * - Titres découpés mot par mot
 * - Compteurs animés
 * - Effet "spotlight" et boutons magnétiques (pointeur fin uniquement)
 * - Parallaxe douce + progression de la frise
 * Tout est désactivé si l'utilisateur préfère réduire les animations.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ───────── Split text ───────── */
function splitWords(el: HTMLElement) {
  let index = 0;
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/([ \t\n\r]+)/).forEach((part) => {
          if (!part) return;
          if (/^[ \t\n\r]+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const outer = document.createElement('span');
          outer.className = 'split-word';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.setProperty('--w', String(index++));
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).matches('br')) {
        walk(child);
      }
    });
  };
  walk(el);
}

if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);
}

/* ───────── Reveal on scroll ───────── */
const revealTargets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-split], [data-count], [data-draw]');

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target as HTMLElement;
      el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    });
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
);
revealTargets.forEach((el) => io.observe(el));

/* ───────── Counters ───────── */
function countUp(el: HTMLElement) {
  const target = parseFloat(el.dataset.count ?? '0');
  const decimals = parseInt(el.dataset.decimals ?? '0', 10);
  const format = (n: number) =>
    n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  if (reduce) {
    el.textContent = format(target);
    return;
  }
  const duration = 1800;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = format(target * eased);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ───────── Spotlight cards ───────── */
if (finePointer) {
  document.querySelectorAll<HTMLElement>('.spotlight').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ───────── Magnetic buttons ───────── */
if (finePointer && !reduce) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const strength = 0.28;
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}

/* ───────── Scroll-linked: header, parallax, progress ───────── */
const header = document.querySelector<HTMLElement>('[data-header]');
const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
const progress = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));

/* Parallax positions are measured once (and on resize), not on every scroll frame */
type ParallaxItem = { el: HTMLElement; top: number; height: number; speed: number };
let parallaxItems: ParallaxItem[] = [];
function measureParallax() {
  parallaxItems = parallax.map((el) => {
    const prev = el.style.transform;
    el.style.transform = '';
    const r = el.getBoundingClientRect();
    el.style.transform = prev;
    return { el, top: r.top + window.scrollY, height: r.height, speed: parseFloat(el.dataset.parallax ?? '0.1') };
  });
}
measureParallax();
// Fonts/images can shift layout after first paint
window.addEventListener('load', () => { measureParallax(); onScroll(); });
let resizeTimer = 0;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => { measureParallax(); onScroll(); }, 150);
});

let lastY = window.scrollY;
let ticking = false;

function onScroll() {
  const y = window.scrollY;
  const vh = window.innerHeight;

  if (header) {
    header.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY && y > 400;
    if (!header.classList.contains('menu-open')) header.classList.toggle('is-hidden', goingDown);
  }

  // Read every position first, then write: no forced layout between elements
  if (!reduce) {
    const moves: [HTMLElement, number][] = [];
    for (const p of parallaxItems) {
      const top = p.top - y; // layout position, independent of the parallax transform itself
      if (top + p.height < -200 || top > vh + 200) continue;
      moves.push([p.el, (top + p.height / 2 - vh / 2) * p.speed]);
    }
    for (const [el, offset] of moves) el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  }

  const ratios = progress.map((el) => {
    const r = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
  });
  progress.forEach((el, i) => el.style.setProperty('--p', ratios[i].toFixed(3)));

  lastY = y;
  ticking = false;
}

window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  },
  { passive: true },
);
onScroll();

/* ───────── Pause decorative loops when off-screen ───────── */
const hero = document.querySelector<HTMLElement>('.hero');
if (hero) {
  new IntersectionObserver(([e]) => hero.classList.toggle('is-off', !e.isIntersecting)).observe(hero);
}

/* ───────── Hero entrance ───────── */
requestAnimationFrame(() => {
  document.documentElement.classList.add('is-loaded');
});
