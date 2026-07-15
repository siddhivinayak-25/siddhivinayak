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

















// -------------------------------------------------------------
// Dynamic Concentric Tech Astrolabe Configuration
// -------------------------------------------------------------
(function buildTechAstrolabe() {
  const ringInner = document.getElementById('orbitRingInner');
  const ringOuter = document.getElementById('orbitRingOuter');
  const fallback = document.getElementById('techFallback');
  
  if (!ringInner || !ringOuter) return;

  // Concentric Orbit Segregations
  const innerStack = [
    { 
      name: 'React', 
      color: '#61DAFB', 
      svg: `<ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(30 12 12)" stroke="currentColor" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(90 12 12)" stroke="currentColor" stroke-width="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(150 12 12)" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>` 
    },
    { 
      name: 'FastAPI', 
      color: '#059669', 
      svg: `<path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5Zm-1 15.5l-4-4h2.5v-4H11V9l4 4.5h-2.5v4H11v.5Z" fill="currentColor"/>` 
    },
    { 
      name: 'Node.js', 
      color: '#339933', 
      svg: `<path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2Zm0 3.5l6 3.5v6l-6 3.5-6-3.5v-6l6-3.5Z" fill="currentColor" />` 
    },
    { 
      name: 'Python', 
      color: '#3776AB', 
      svg: `<path d="M12 2C8.7 2 8.2 2.3 7 3.5v2.2h5v.8H5.8C4.3 6.5 4 7.2 4 10.5c0 3.3.3 4 1.8 4H7v-2.2c0-1.8 1.5-3.3 3.3-3.3h3.5c1 0 1.2-.2 1.2-1.2V5.8c0-1.2-.2-1.5-1.5-1.8C14.2 3.8 13.8 2 12 2Zm-2.2 1.5a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6ZM12 22c3.3 0 3.8-.3 5-1.5v-2.2h-5v-.8h6.2c1.5 0 1.8-.7 1.8-4 0-3.3-.3-4-1.8-4H17v2.2c0 1.8-1.5 3.3-3.3 3.3h-3.5c-1 0-1.2.2-1.2 1.2v2.2c0 1.2.2 1.5 1.5 1.8 1.3.2 1.7 2 3.5 2Zm2.2-1.5a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z" fill="currentColor"/>` 
    },
    { 
      name: 'Tailwind', 
      color: '#38BDF8', 
      svg: `<path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.57.9 2.3 1.65 1.17 1.2 2.5 2.55 5.5 2.55 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.57-.9-2.3-1.65-1.17-1.2-2.5-2.55-5.5-2.55Zm-6 6c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.57.9 2.3 1.65 1.17 1.2 2.5 2.55 5.5 2.55 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.57-.9-2.3-1.65-1.17-1.2-2.5-2.55-5.5-2.55Z" fill="currentColor"/>` 
    },
    { 
      name: 'OpenAI', 
      color: '#412991', 
      svg: `<path d="M19.1 11.2a4.4 4.4 0 0 0-2.3-3.8 4.4 4.4 0 0 0-4.6-.2l-3.3-1.9a4.4 4.4 0 0 0-5.5.9 4.4 4.4 0 0 0-.2 4.6l-3.3 1.9a4.4 4.4 0 0 0-.9 5.5 4.4 4.4 0 0 0 4.6.2l3.3 1.9a4.4 4.4 0 0 0 5.5-.9 4.4 4.4 0 0 0 .2-4.6l3.3-1.9a4.4 4.4 0 0 0 .9-5.5z" fill="none" stroke="currentColor" stroke-width="1.2"/>` 
    }
  ];

  const outerStack = [
    { 
      name: 'MongoDB', 
      color: '#47A248', 
      svg: `<path d="M12 1.5c-.3 0-.5.2-.6.4C10.1 5.3 8 9.5 8 12.5c0 2.8 1.6 5 4 5s4-2.2 4-5c0-3-2.1-7.2-3.4-10.6-.1-.2-.3-.4-.6-.4Zm0 1.6c1.1 2.8 2.8 6.4 2.8 9.4 0 2-1.1 3.4-2.8 3.4s-2.8-1.4-2.8-3.4c0-3 1.7-6.6 2.8-9.4Z" fill="currentColor"/>` 
    },
    { 
      name: 'Postgres', 
      color: '#336791', 
      svg: `<path d="M12 2c5.52 0 10 2.24 10 5s-4.48 5-10 5S2 9.76 2 7s4.48-5 10-5Zm10 8c0 2.76-4.48 5-10 5S2 12.76 2 10v4c0 2.76 4.48 5 10 5s10-2.24 10-5v-4Zm0 5c0 2.76-4.48 5-10 5S2 17.76 2 15v4c0 2.76 4.48 5 10 5s10-2.24 10-5v-4Z" fill="none" stroke="currentColor" stroke-width="1.5"/>` 
    },
    { 
      name: 'Supabase', 
      color: '#3ECF8E', 
      svg: `<path d="M13.4 2.1c-.6-.7-1.7-.3-1.7.6l-.3 7.8H4.2c-.8 0-1.2.9-.7 1.5l10.1 11.2c.6.7 1.7.3 1.7-.6l.3-7.8h7.2c.8 0 1.2-.9.7-1.5L13.4 2.1Z" fill="currentColor"/>` 
    },
    { 
      name: 'Docker', 
      color: '#2496ED', 
      svg: `<path d="M2 14h3v-2H2v2Zm4 0h3v-2H6v2Zm4 0h3v-2h-3v2Zm4 0h3v-2h-3v2Zm-8-3h3V9H6v2Zm4 0h3V9h-3v2Zm4 0h3V9h-3v2Zm-4-3h3V6h-3v2Zm12 6c0-3-2.5-5-5-5v1c2 0 4 1.5 4 4H22Z" fill="currentColor"/>` 
    },
    { 
      name: 'n8n', 
      color: '#EA4B71', 
      svg: `<circle cx="6" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M9 12h6M15 11l3-3M15 13l3 3" stroke="currentColor" stroke-width="1.5"/>` 
    },
    { 
      name: 'Claude', 
      color: '#D97757', 
      svg: `<path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>` 
    },
    { 
      name: 'LangChain', 
      color: '#13B5C8', 
      svg: `<path d="M8 12h8M6 8h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2Zm12 0h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2Z" fill="none" stroke="currentColor" stroke-width="1.5"/>` 
    },
    { 
      name: 'Zoho', 
      color: '#E4453A', 
      svg: `<rect x="4" y="4" width="6" height="6" rx="1" fill="currentColor"/><rect x="14" y="4" width="6" height="6" rx="1" fill="currentColor"/><rect x="4" y="14" width="6" height="6" rx="1" fill="currentColor"/><rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor"/>` 
    }
  ];

  const innerRadius = 120; // Radius for core stack (inside)
  const outerRadius = 205; // Radius for secondary stack (outside)

  let innerHTML = '';
  let outerHTML = '';
  let fallbackHTML = '';

  // 1. Build Core Stack (Inner Ring)
  innerStack.forEach((tech, i) => {
    const angle = (360 / innerStack.length) * i;
    innerHTML += `
      <div class="item" style="transform: rotate(${angle}deg) translate(${innerRadius}px)">
        <div class="item-inner" 
             style="--initial-angle: ${-angle}deg; --brand-color: ${tech.color};" 
             data-name="${tech.name}">
          <svg viewBox="0 0 24 24">${tech.svg}</svg>
        </div>
      </div>`;
    
    fallbackHTML += `
      <div class="chip">
        <svg viewBox="0 0 24 24" style="color: ${tech.color}">${tech.svg}</svg>
        <span>${tech.name}</span>
      </div>`;
  });

  // 2. Build Supporting Stack (Outer Ring)
  outerStack.forEach((tech, i) => {
    const angle = (360 / outerStack.length) * i;
    outerHTML += `
      <div class="item" style="transform: rotate(${angle}deg) translate(${outerRadius}px)">
        <div class="item-inner" 
             style="--initial-angle: ${-angle}deg; --brand-color: ${tech.color};" 
             data-name="${tech.name}">
          <svg viewBox="0 0 24 24">${tech.svg}</svg>
        </div>
      </div>`;

    fallbackHTML += `
      <div class="chip">
        <svg viewBox="0 0 24 24" style="color: ${tech.color}">${tech.svg}</svg>
        <span>${tech.name}</span>
      </div>`;
  });

  ringInner.innerHTML = innerHTML;
  ringOuter.innerHTML = outerHTML;
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
















const form = document.querySelector(".contact-form");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    result.innerHTML = "Sending...";

    const formData = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    if (data.success) {

        result.classList.add("show");

        result.innerHTML = `
        <strong style="color:#8B5CF6;">✓ Message Sent Successfully</strong><br>
        Thank you for reaching out! I'll get back to you as soon as possible.
        `;

        form.reset();

        // Reload page after 4 seconds
        setTimeout(() => {
            window.location.reload();
        }, 4000);

    } else {

        result.innerHTML =
        "❌ Something went wrong. Please try again.";

    }
});