/* ── PERFORMANCE CHECK ── */
const isLowEnd = navigator.hardwareConcurrency <= 4;
if (isLowEnd) document.body.classList.add('reduce-motion');

/* ── 1. LOADER ── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hide');
    revealHomeSection();
  }, 2000);
});

function revealHomeSection() {
  const selectors = ['.home-eyebrow', '.home-detail h1', '.home-roles', '.home-bio', '.btn-sci', '.home-img'];
  selectors.forEach((selector, i) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.8s ease ${i * 0.12}s, transform 0.8s ease ${i * 0.12}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
}

/* ── 2. CUSTOM CURSOR ── */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, ringAnimId;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
});

function animateRing() {
  if (!cursorRing) return;
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  ringAnimId = requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .services-box').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing?.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hovering'));
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(ringAnimId);
  else animateRing();
});

/* ── 3. HEADER + SCROLL ── */
const header      = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');
let lastScrollY = 0, ticking = false;

function handleScroll() {
  const current = window.scrollY;
  if (current < 80) {
    header.classList.remove('scrolled-up', 'scrolled-down');
  } else if (current > lastScrollY) {
    header.classList.add('scrolled-down');
    header.classList.remove('scrolled-up');
  } else {
    header.classList.add('scrolled-up');
    header.classList.remove('scrolled-down');
  }
  if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', current > 500);
  lastScrollY = current;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { handleScroll(); ticking = false; });
    ticking = true;
  }
});

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── 4. MOBILE MENU ── */
const menuIcon = document.getElementById('menu-icon');
const navbar   = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('open');
    menuIcon.classList.toggle('bx-x');
    menuIcon.classList.toggle('bx-menu');
  });
  navbar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('open');
      menuIcon.classList.remove('bx-x');
      menuIcon.classList.add('bx-menu');
    });
  });
}

/* ── 5. ACTIVE NAV ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 250) current = sec.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

/* ── 6. REVEAL ANIMATION ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

/* ── 7. CONTACT FORM ── */
const form = document.getElementById('contact-form');
const msg  = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    btn.disabled = true;

    emailjs.send('service_mttb4al', 'template_gx5ad3t', {
      from_name:  form.from_name.value,
      from_email: form.from_email.value,
      subject:    form.subject.value,
      message:    form.message.value
    })
    .then(() => { showMsg('✓ Message sent successfully!', 'success'); form.reset(); })
    .catch(err => { console.error(err); showMsg('✕ Failed to send. Please try again.', 'error'); })
    .finally(() => { btn.innerHTML = 'Send Message'; btn.disabled = false; });
  });
}

function showMsg(text, type) {
  if (!msg) return;
  msg.textContent = text;
  msg.className = `form-message ${type}`;
  msg.style.display = 'block';
  setTimeout(() => { msg.style.display = 'none'; }, 5000);
}