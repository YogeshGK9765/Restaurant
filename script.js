/* ============================================================
   SPICE GARDEN — script.js
   Template by DigitalCraft · Yogesh G. Kalyankar
   ============================================================ */

'use strict';

/* ── LOADER ─────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

/* ── HERO ENTRANCE ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const animated = document.querySelectorAll('.animate-fade-up, .animate-fade-right');
  animated.forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => {
      el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.23,1,0.32,1) ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'none';
    }, 600 + delay);
  });
});

/* ── NAVBAR SCROLL ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } }),
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── MENU DATA ──────────────────────────────────────────── */
const menuData = {
  starters: [
    { emoji: '🍢', name: 'Seekh Kebab', desc: 'Minced lamb & spices grilled on skewers in tandoor. Served with mint chutney.', price: '₹220', badge: 'Chef\'s Pick' },
    { emoji: '🥙', name: 'Paneer Tikka', desc: 'Marinated cottage cheese cubes grilled to perfection with bell peppers and onions.', price: '₹200', badge: 'veg', type: 'veg' },
    { emoji: '🍗', name: 'Chicken 65', desc: 'Crispy deep-fried chicken tossed with curry leaves, red chilli and ginger garlic.', price: '₹240', badge: 'Spicy' },
    { emoji: '🥗', name: 'Papdi Chaat', desc: 'Classic Delhi-style chaat with crispy papdi, yogurt, tamarind & chutneys.', price: '₹120', badge: 'veg', type: 'veg' },
  ],
  mains: [
    { emoji: '🍛', name: 'Dum Biryani', desc: 'Aromatic basmati rice slow-cooked with whole spices and your choice of protein.', price: '₹349', badge: 'Best Seller' },
    { emoji: '🥘', name: 'Butter Chicken', desc: 'Tender chicken in a rich, creamy tomato-butter gravy. The classic North Indian favourite.', price: '₹300', badge: 'Popular' },
    { emoji: '🫕', name: 'Dal Makhani', desc: 'Black lentils slow-cooked overnight in butter and cream. Rich, hearty and velvety.', price: '₹220', badge: 'veg', type: 'veg' },
    { emoji: '🥣', name: 'Palak Paneer', desc: 'Cottage cheese cubes in a velvety spinach gravy spiced with cumin and garam masala.', price: '₹240', badge: 'veg', type: 'veg' },
  ],
  breads: [
    { emoji: '🫓', name: 'Garlic Naan', desc: 'Soft leavened bread baked in tandoor, brushed with garlic butter and fresh coriander.', price: '₹60', badge: 'veg', type: 'veg' },
    { emoji: '🫓', name: 'Missi Roti', desc: 'Whole wheat and chickpea flour flatbread with carom seeds and onion. Rustic and wholesome.', price: '₹50', badge: 'veg', type: 'veg' },
    { emoji: '🍚', name: 'Jeera Rice', desc: 'Long grain basmati rice tempered with cumin seeds, ghee and fried onions.', price: '₹150', badge: 'veg', type: 'veg' },
    { emoji: '🍛', name: 'Veg Thali (Unlimited)', desc: '12 dishes, 4 rotis, rice, dal, sabzi, raita, papad and dessert. Fully unlimited!', price: '₹349', badge: 'Value' },
  ],
  desserts: [
    { emoji: '🍮', name: 'Gulab Jamun', desc: 'Soft, melt-in-mouth milk dumplings soaked in rose-scented sugar syrup. Served warm.', price: '₹90', badge: 'veg', type: 'veg' },
    { emoji: '🍨', name: 'Mango Kulfi', desc: 'Traditional Indian ice cream made with condensed milk and Alphonso mango pulp.', price: '₹120', badge: 'Seasonal' },
    { emoji: '🥣', name: 'Shahi Kheer', desc: 'Royal rice pudding simmered in whole milk with saffron, cardamom and dry fruits.', price: '₹100', badge: 'veg', type: 'veg' },
    { emoji: '☕', name: 'Masala Chai', desc: 'Strong, aromatic spiced tea brewed with ginger, cardamom, cinnamon and whole milk.', price: '₹50', badge: 'veg', type: 'veg' },
  ],
};

/* ── RENDER MENU ────────────────────────────────────────── */
const menuGrid = document.getElementById('menuGrid');
let currentTab = 'starters';

function renderMenu(tab) {
  menuGrid.innerHTML = '';
  menuData[tab].forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-item';
    card.style.animationDelay = `${i * 80}ms`;
    card.innerHTML = `
      <div class="mi-emoji">${item.emoji}</div>
      <div class="mi-name">${item.name}</div>
      <div class="mi-desc">${item.desc}</div>
      <div class="mi-footer">
        <span class="mi-price">${item.price}</span>
        <span class="mi-badge ${item.type === 'veg' ? 'veg' : ''}">${item.badge}</span>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

renderMenu(currentTab);

document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTab = btn.dataset.tab;
    renderMenu(currentTab);
  });
});

/* ── TESTIMONIALS SLIDER ────────────────────────────────── */
const track  = document.getElementById('testiTrack');
const dotsEl = document.getElementById('testiDots');
const cards  = track ? track.querySelectorAll('.testi-card') : [];
let currentSlide = 0;
let autoSlide;

function getPerPage() {
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function initDots() {
  dotsEl.innerHTML = '';
  const perPage = getPerPage();
  const pages   = Math.ceil(cards.length / perPage);
  for (let i = 0; i < pages; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  }
}

function goTo(idx) {
  const perPage = getPerPage();
  const pages   = Math.ceil(cards.length / perPage);
  currentSlide  = Math.max(0, Math.min(idx, pages - 1));
  const cardW   = cards[0] ? cards[0].offsetWidth + 24 : 0;
  track.style.transform = `translateX(-${currentSlide * cardW * perPage}px)`;
  dotsEl.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

function startAuto() {
  autoSlide = setInterval(() => {
    const perPage = getPerPage();
    const pages   = Math.ceil(cards.length / perPage);
    goTo((currentSlide + 1) % pages);
  }, 4500);
}

if (track) {
  initDots();
  startAuto();
  document.getElementById('testiPrev').addEventListener('click', () => { clearInterval(autoSlide); goTo(currentSlide - 1); startAuto(); });
  document.getElementById('testiNext').addEventListener('click', () => { clearInterval(autoSlide); goTo(currentSlide + 1); startAuto(); });
  window.addEventListener('resize', () => { initDots(); goTo(0); });
}

/* ── FAQ ACCORDION ──────────────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ── SMOOTH ACTIVE NAV LINK ─────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) link.style.color = (scrollY >= top && scrollY < top + height) ? 'var(--gold-light)' : '';
  });
}, { passive: true });

/* ── 3D TILT ON MENU CARDS ──────────────────────────────── */
function applyTilt() {
  document.querySelectorAll('.menu-item, .feature-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Re-apply after menu tab change
const origRender = renderMenu;
function renderMenuWithTilt(tab) {
  origRender(tab);
  setTimeout(applyTilt, 100);
}
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => setTimeout(applyTilt, 200));
});
applyTilt();
setTimeout(applyTilt, 1500); // after initial render

/* ── COUNTER ANIMATION ──────────────────────────────────── */
function animateCounter(el) {
  const text   = el.textContent.trim();
  const match  = text.match(/^(\d+)(.*)$/);
  if (!match) return;
  const end    = parseInt(match[1]);
  const suffix = match[2];
  let start    = 0;
  const step   = Math.ceil(end / 50);
  const timer  = setInterval(() => {
    start += step;
    if (start >= end) { start = end; clearInterval(timer); }
    el.textContent = start + suffix;
  }, 30);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statObserver.observe(heroStats);

/* ── GALLERY LIGHTBOX (SIMPLE) ──────────────────────────── */
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const emoji = item.querySelector('.gi-inner').childNodes[0].textContent.trim();
    const name  = item.querySelector('span').textContent;
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(14,10,6,0.92);z-index:9998;
      display:flex;align-items:center;justify-content:center;flex-direction:column;gap:20px;
      cursor:pointer;backdrop-filter:blur(16px);animation:fadeIn 0.3s ease;
    `;
    overlay.innerHTML = `
      <div style="font-size:8rem;filter:drop-shadow(0 20px 40px rgba(0,0,0,0.6));animation:scaleIn 0.4s cubic-bezier(0.23,1,0.32,1)">${emoji}</div>
      <p style="font-family:Playfair Display,serif;font-size:1.8rem;color:#f0c060;font-style:italic">${name}</p>
      <p style="color:rgba(255,255,255,0.4);font-size:0.85rem">Click anywhere to close</p>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
  });
});

/* ── ADD CSS KEYFRAMES DYNAMICALLY ─────────────────────── */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
  @keyframes scaleIn { from { transform:scale(0.7); opacity:0 } to { transform:scale(1); opacity:1 } }
`;
document.head.appendChild(style);

/* ── CONSOLE BRANDING ───────────────────────────────────── */
console.log('%c🌶️ Spice Garden', 'font-size:24px;font-weight:bold;color:#c9933a;font-family:serif');
console.log('%cTemplate by DigitalCraft · Yogesh G. Kalyankar', 'color:#888;font-size:12px');
console.log('%chttps://yogeshgk9765.github.io/My-Portfolio/', 'color:#4285F4;font-size:12px');
