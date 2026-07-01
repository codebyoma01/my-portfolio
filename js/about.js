/* ============================================
   CODE BY OMA — ABOUT PAGE SCRIPT
   ============================================ */

   (function(){

    /* ── THEME TOGGLE ── */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
  
    function setTheme(theme) {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('cbo-theme', theme);
    }
  
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(current);
      });
    }
  
    /* ── CUSTOM CURSOR ── */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, ringAnimId;
  
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (cursorDot) { cursorDot.style.left = mouseX + 'px'; cursorDot.style.top = mouseY + 'px'; }
    });
  
    function animateRing() {
      if (!cursorRing) return;
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top  = ringY + 'px';
      ringAnimId = requestAnimationFrame(animateRing);
    }
    animateRing();
  
    document.querySelectorAll('a, button, .exp-item, .skill-card, .edu-item').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovering'));
    });
  
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(ringAnimId);
      else animateRing();
    });
  
    /* ── HEADER SCROLL ── */
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    let lastScrollY = 0, ticking = false;
  
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const current = window.scrollY;
          if (!header) return;
          if (current < 80) {
            header.classList.add('scrolled-up');
            header.classList.remove('scrolled-down');
          } else if (current > lastScrollY) {
            header.classList.add('scrolled-down');
            header.classList.remove('scrolled-up');
          } else {
            header.classList.add('scrolled-up');
            header.classList.remove('scrolled-down');
          }
          if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', current > 500);
          lastScrollY = current;
          ticking = false;
        });
        ticking = true;
      }
    });
  
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  
    /* ── MOBILE MENU ── */
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
  
    if (menuToggle && navbar) {
      menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
        menuToggle.classList.toggle('open');
      });
      navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('open');
          menuToggle.classList.remove('open');
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
  
  })();