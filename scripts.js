const toast = document.getElementById('toast');
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

function copyEmail() {
  navigator.clipboard.writeText('brotherson100@gmail.com');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2400);
}

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
});

menuToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.stagger').forEach((group) => {
  const items = group.querySelectorAll('.reveal');

  items.forEach((item, index) => {
    item.style.setProperty('--delay', `${index * 0.07}s`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // deixa de observar após revelar
    });
  },
  {
    threshold: 0.16
  }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll('section[id]');
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((section) => activeObserver.observe(section));
