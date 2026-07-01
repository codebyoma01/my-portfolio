/* ============================================
   CODE BY OMA — PORTFOLIO SCRIPT
   ============================================ */

   (function(){
    /* ── PERFORMANCE CHECK ── */
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    if (isLowEnd) document.body.classList.add('reduce-motion');
  
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
  
    /* ── LOADER ── */
    window.addEventListener('load', () => {
      const loader = document.getElementById('loader');
      if (!loader) return;
      setTimeout(() => {
        loader.classList.add('hide');
        typeRole();
        animateCounters();
      }, 1500);
    });
  
    /* ── HERO TERMINAL TYPING ── */
    const roles = ['Frontend Developer', 'UI/UX Designer', 'Creative Technologist'];
    const typedEl = document.getElementById('typedRole');
    let roleIndex = 0, charIndex = 0, deleting = false;
  
    function typeRole() {
      if (!typedEl) return;
      const current = roles[roleIndex];
  
      if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeRole, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(typeRole, deleting ? 35 : 65);
    }
  
    /* ── ANIMATED STAT COUNTERS ── */
    let countersStarted = false;
    function animateCounters() {
      if (countersStarted) return;
      countersStarted = true;
      document.querySelectorAll('.hero-stat-num').forEach(el => {
        const target = parseInt(el.dataset.count, 10) || 0;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 40));
        const tick = () => {
          cur = Math.min(target, cur + step);
          el.textContent = cur;
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
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
  
    document.querySelectorAll('a, button, .project, .service-card, .why-card, .other-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hovering'));
    });
  
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(ringAnimId);
      else animateRing();
    });
  
    /* ── HEADER SCROLL BEHAVIOR ── */
    const header = document.getElementById('header');
    const scrollTopBtn = document.getElementById('scrollTop');
    let lastScrollY = 0, ticking = false;
  
    function handleScroll() {
      const current = window.scrollY;
      if (!header) return;
      if (current < 80) {
        header.classList.remove('scrolled-up', 'scrolled-down');
      } else if (current > lastScrollY) {
        header.classList.add('scrolled-down');
        header.classList.remove('scrolled-up');
      } else {
        header.classList.add('scrolled-up');
        header.classList.remove('scrolled-down');
      }
      if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', current > 600);
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
  
    /* ── ACTIVE NAV ON SCROLL ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('[data-nav]');
  
    function updateActiveNav() {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 220) current = sec.getAttribute('id');
      });
      navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
      });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
  
    /* ── REVEAL + SKILL BAR ANIMATION ── */
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  
    document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));
  
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
  
    document.querySelectorAll('.skill-bar span').forEach(el => skillObserver.observe(el));
  
    /* ── CONTACT FORM (EmailJS) ── */
    const form = document.getElementById('contact-form');
    const msg  = document.getElementById('form-message');
  
    function showMsg(text, type) {
      if (!msg) return;
      msg.textContent = text;
      msg.className = `form-message ${type}`;
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 5000);
    }
  
    if (form && window.emailjs) {
      emailjs.init({ publicKey: 'KvN6qbobSKsQqNy4O' });
  
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
  
        emailjs.send('service_mttb4al', 'template_gx5ad3t', {
          from_name:  form.from_name.value,
          from_email: form.from_email.value,
          subject:    form.subject.value,
          message:    form.message.value
        })
        .then(() => { showMsg('Message sent successfully.', 'success'); form.reset(); })
        .catch(err => { console.error(err); showMsg('Failed to send. Please try again.', 'error'); })
        .finally(() => { btn.textContent = originalText; btn.disabled = false; });
      });
    }
  
    /* Fallback: if loader event never fires (e.g. already loaded), kick off anyway */
    if (document.readyState === 'complete') {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hide');
        typeRole();
        animateCounters();
      }, 300);
    }
  })();