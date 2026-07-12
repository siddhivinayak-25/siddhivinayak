// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navCta = document.querySelector('.nav-cta');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navCta.classList.toggle('is-open');
  navToggle.classList.toggle('is-active');
  if (isOpen) {
    navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:rgba(11,15,25,0.98);padding:24px 32px;gap:20px;border-bottom:1px solid var(--border);';
    navCta.style.cssText = 'display:inline-flex;position:fixed;top:206px;left:32px;';
  } else {
    navLinks.style.cssText = '';
    navCta.style.cssText = '';
  }
});

navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  navLinks.style.cssText = '';
  navCta.style.cssText = '';
}));

// ---------------------------------------------
// Hero automation-graph background
// Represents the thing this site is actually about: nodes (systems)
// connecting and firing signals (automation / API calls).
// ---------------------------------------------
(function initGraph() {
  const canvas = document.getElementById('graph');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes, pulses;
  const NODE_COUNT_BASE = 42;

  function resize() {
    width = canvas.width = canvas.offsetWidth * devicePixelRatio;
    height = canvas.height = canvas.offsetHeight * devicePixelRatio;
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';
    setup();
  }

  function setup() {
    const count = Math.max(18, Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 60000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.6 + 1,
    }));
    pulses = [];
  }

  function maybeSpawnPulse() {
    if (Math.random() < 0.02 && nodes.length > 1) {
      const a = nodes[Math.floor(Math.random() * nodes.length)];
      let b = nodes[Math.floor(Math.random() * nodes.length)];
      let tries = 0;
      while (b === a && tries < 5) { b = nodes[Math.floor(Math.random() * nodes.length)]; tries++; }
      pulses.push({ a, b, t: 0 });
    }
  }

  const LINK_DIST = 170 * devicePixelRatio;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i], n2 = nodes[j];
        const dx = n1.x - n2.x, dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.18;
          ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(248,250,252,0.5)';
      ctx.fill();

      if (!prefersReduced) {
        n.x += n.vx * devicePixelRatio;
        n.y += n.vy * devicePixelRatio;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
    });

    // pulses (traveling signals between nodes)
    if (!prefersReduced) {
      pulses.forEach(p => { p.t += 0.012; });
      pulses = pulses.filter(p => p.t <= 1);
      pulses.forEach(p => {
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.beginPath();
        ctx.arc(x, y, 2.4 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6,182,212,0.85)';
        ctx.fill();
      });
      maybeSpawnPulse();
    }
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();
  loop();
})();

// Reveal-on-scroll for sections
const revealTargets = document.querySelectorAll('.service-card, .project, .why-item, .process-step, .timeline-item, .faq-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  io.observe(el);
});