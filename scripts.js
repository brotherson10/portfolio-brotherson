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
  nav.classList.toggle('scrolled', window.scrollY > 40);
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

const reveals = document.querySelectorAll('.reveal');

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

reveals.forEach((element) => {
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

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.counter);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 42));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target === 100 ? '100%' : `+${target}`;
          clearInterval(timer);
          return;
        }
        counter.textContent = target === 100 ? `${current}%` : `+${current}`;
      }, 24);
      observer.unobserve(counter);
    });
  },
  { threshold: 0.8 }
);
counters.forEach((counter) => counterObserver.observe(counter));
