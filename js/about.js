/* ── CUSTOM CURSOR ── */
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

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing?.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing?.classList.remove('hovering'));
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) cancelAnimationFrame(ringAnimId);
  else animateRing();
});

/* ── HEADER ── */
const header = document.getElementById('header');
let lastScrollY = 0, ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const current = window.scrollY;
      if (current < 80) {
        header.classList.remove('scrolled-down');
        header.classList.add('scrolled-up');
      } else if (current > lastScrollY) {
        header.classList.add('scrolled-down');
        header.classList.remove('scrolled-up');
      } else {
        header.classList.add('scrolled-up');
        header.classList.remove('scrolled-down');
      }
      lastScrollY = current;
      ticking = false;
    });
    ticking = true;
  }
});

/* ── MOBILE MENU ── */
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

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

/* ── SCROLL TOP ── */
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}