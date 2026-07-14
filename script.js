// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ---------------------------------------------
// Mobile nav toggle
// ---------------------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-active');
  if (isOpen) {
    navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:66px;left:0;right:0;background:var(--bg);padding:24px 32px;gap:18px;border-bottom:1px solid var(--border);z-index:400;';
  } else {
    navLinks.style.cssText = '';
  }
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  navLinks.style.cssText = '';
}));

// ---------------------------------------------
// Your photos.
// Rename/add your own files in images/hero/ and images/life/ using
// these exact names (see images/README.txt), or edit this list.
// ---------------------------------------------
const PHOTO_COUNT = 17;
const photoFiles = Array.from({ length: PHOTO_COUNT }, (_, i) =>
  `photo-${String(i + 1).padStart(2, '0')}.jpg`
);

function photoTileHTML(src, extraClass = '') {
  return `
    <img src="images/life/${src}" alt="" loading="lazy"
         onerror="this.style.display='none'; this.closest('.${extraClass}').classList.add('media-fallback')">
    <div class="media-fallback-content" aria-hidden="true"><span>Add images/life/${src}</span></div>
  `;
}

// ---------------------------------------------
// Hero mosaic background — low opacity grid, brightens on hover
// ---------------------------------------------
(function buildHeroMosaic() {
  const mosaic = document.getElementById('heroMosaic');
  if (!mosaic) return;
  const TILE_COUNT = 32; // 8 columns x 4 rows
  let html = '';
  for (let i = 0; i < TILE_COUNT; i++) {
    const file = photoFiles[i % photoFiles.length];
    html += `<div class="tile">${photoTileHTML(file, 'tile')}</div>`;
  }
  mosaic.innerHTML = html;
})();

// ---------------------------------------------
// Life section — bigger photo grid, gentle random tilt per photo
// ---------------------------------------------
(function buildLifeGrid() {
  const grid = document.getElementById('lifeGrid');
  if (!grid) return;
  let html = '';
  photoFiles.forEach((file) => {
    const rotation = (Math.random() * 6 - 3).toFixed(1);
    html += `<div class="photo" style="--r:${rotation}deg">${photoTileHTML(file, 'photo')}</div>`;
  });
  grid.innerHTML = html;
})();
















// ---------------------------------------------
// Tech orbit — radial layout, ring spins, items counter-spin to stay upright
// ---------------------------------------------
(function buildTechOrbit() {
  const ring = document.getElementById('orbitRing');
  const fallback = document.getElementById('techFallback');
  if (!ring) return;

  const stack = [
    { name: 'React', tag: 'Frontend', color: '#61DAFB' },
    { name: 'FastAPI', tag: 'Backend', color: '#059669' },
    { name: 'Node.js', tag: 'Backend', color: '#3C873A' },
    { name: 'Python', tag: 'Language', color: '#FFC331' },
    { name: 'LangChain', tag: 'AI', color: '#8B5CF6' },
    { name: 'MongoDB', tag: 'Database', color: '#47A248' },
    { name: 'Postgres', tag: 'Database', color: '#336791' },
    { name: 'Supabase', tag: 'Database', color: '#3ECF8E' },
    { name: 'Docker', tag: 'DevOps', color: '#2496ED' },
    { name: 'n8n', tag: 'Automation', color: '#EA4B71' },
    { name: 'Zoho', tag: 'Automation', color: '#E4453A' },
    { name: 'OpenAI', tag: 'AI', color: '#10A37F' },
    { name: 'Claude', tag: 'AI', color: '#D97757' },
    { name: 'Tailwind', tag: 'Frontend', color: '#38BDF8' },
  ];

  const radius = 190;
  let ringHTML = '';
  let fallbackHTML = '';

  stack.forEach((tech, i) => {
    const angle = (360 / stack.length) * i;
    ringHTML += `
      <div class="item" style="transform: rotate(${angle}deg) translateX(${radius}px)">
        <div class="item-inner" style="transform: rotate(${-angle}deg); border-color:${tech.color}66;" title="${tech.name}">
          <span style="color:${tech.color}">${tech.name.slice(0, 2).toUpperCase()}</span>
          <span class="badge-label">${tech.name}</span>
        </div>
      </div>`;
    fallbackHTML += `<div class="chip"><span style="color:${tech.color}">●</span> ${tech.name}</div>`;
  });

  ring.innerHTML = ringHTML;
  if (fallback) fallback.innerHTML = fallbackHTML;
})();







// ---------------------------------------------
// Reveal-on-scroll
// ---------------------------------------------
const revealTargets = document.querySelectorAll(
  '.service-card, .project, .why-item, .process-step, .timeline-item, .faq-item, .life-grid .photo'
);
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.translate = '0 0';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.translate = '0 18px';
  el.style.transition = 'opacity 0.6s ease, translate 0.6s ease';
  io.observe(el);
});