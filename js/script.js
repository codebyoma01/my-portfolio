window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hide');
  }, 2400);
});

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('sticky', window.scrollY > 100);
});

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
  navbar.classList.remove('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navbar.classList.remove('active');
  });
});

const resumeButtons = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeButtons.forEach(button => {
  button.addEventListener('click', () => {
    resumeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    resumeDetails.forEach(detail => detail.classList.remove('active'));
    const target = document.getElementById(button.getAttribute('data-target'));
    if (target) target.classList.add('active');
  });
});

const portfolioDetails = document.querySelectorAll('.Portfolio-detail');
const imgSlideWrapper = document.querySelector('.img-slide-wrapper');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const portfolioContainer = document.querySelector('.Portfolio-container');

let currentSlide = 0;
const totalSlides = portfolioDetails.length;

function updatePortfolio(index) {
  portfolioDetails.forEach(d => d.classList.remove('active'));
  portfolioDetails[index].classList.add('active');
  if (imgSlideWrapper) imgSlideWrapper.style.transform = `translateX(${-index * 100}%)`;
}

arrowRight?.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updatePortfolio(currentSlide);
});
arrowLeft?.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updatePortfolio(currentSlide);
});

let autoSlide = setInterval(() => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updatePortfolio(currentSlide);
}, 5000);

portfolioContainer?.addEventListener('mouseenter', () => clearInterval(autoSlide));
portfolioContainer?.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updatePortfolio(currentSlide);
  }, 5000);
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updatePortfolio(currentSlide);
  } else if (e.key === 'ArrowRight') {
    currentSlide = (currentSlide + 1) % totalSlides;
    updatePortfolio(currentSlide);
  }
});


const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name    = formData.get('from_name')?.trim();
    const email   = formData.get('from_email')?.trim();
    const subject = formData.get('subject')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    emailjs.send('service_mttb4al', 'template_gx5ad3t', {
      from_name: name, from_email: email, subject, message
    })
    .then(() => {
      showMessage(`Thank you ${name}! Your message has been sent.`, 'success');
      contactForm.reset();
    })
    .catch(() => showMessage('Something went wrong. Please try again.', 'error'));
  });
}

function showMessage(text, type) {
  if (!formMessage) return;
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`;
  formMessage.style.display = 'block';
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.services-box, .timeline-item, .skill-group-badge').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  revealObserver.observe(el);
});


const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
Object.assign(scrollTopBtn.style, {
  position: 'fixed', bottom: '30px', right: '30px',
  width: '50px', height: '50px', background: '#00abf0',
  color: '#081b29', border: 'none', borderRadius: '50%',
  fontSize: '24px', cursor: 'pointer', opacity: 0,
  visibility: 'hidden', transition: 'all 0.3s ease',
  zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
});
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
  const show = window.scrollY > 500;
  scrollTopBtn.style.opacity = show ? '1' : '0';
  scrollTopBtn.style.visibility = show ? 'visible' : 'hidden';
});
scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
scrollTopBtn.addEventListener('mouseenter', () => { scrollTopBtn.style.boxShadow = '0 0 25px #00abf0'; scrollTopBtn.style.transform = 'scale(1.1)'; });
scrollTopBtn.addEventListener('mouseleave', () => { scrollTopBtn.style.boxShadow = 'none'; scrollTopBtn.style.transform = 'scale(1)'; });

console.log('%c👋 Welcome to CodebyOma Portfolio!', 'color: #00abf0; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & JavaScript', 'color: #ededed; font-size: 14px;');