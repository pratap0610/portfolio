document.getElementById('year').textContent = new Date().getFullYear();

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Active nav link highlight as sections scroll into view ----
const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];
const sections = navAnchors
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = '#' + entry.target.id;
      const link = navAnchors.find((a) => a.getAttribute('href') === id);
      if (!link) return;
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((sec) => navObserver.observe(sec));
}

// ---- Project live-preview toggle (lazy-loads the video only on demand) ----
const previewToggle = document.getElementById('previewToggle');
const previewWrap = document.getElementById('previewWrap');
const videoFrame = document.getElementById('videoFrame');
const YOUTUBE_ID = '2mjQMyqT9LM';
let videoLoaded = false;

if (previewToggle) {
  previewToggle.addEventListener('click', () => {
    const isHidden = previewWrap.hasAttribute('hidden');

    if (isHidden) {
      if (!videoLoaded) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0`;
        iframe.title = 'Capacity Connect — live preview';
        iframe.loading = 'lazy';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        videoFrame.appendChild(iframe);
        videoLoaded = true;
      }
      previewWrap.removeAttribute('hidden');
      previewToggle.setAttribute('aria-expanded', 'true');
      previewToggle.querySelector('svg').outerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6h12v12H6z"/></svg>';
      previewToggle.lastChild.textContent = ' Hide preview';
      previewWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      previewWrap.setAttribute('hidden', '');
      previewToggle.setAttribute('aria-expanded', 'false');
      previewToggle.querySelector('svg').outerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
      previewToggle.lastChild.textContent = ' Watch live preview';
    }
  });
}

// ---- Gentle reveal-on-scroll for section headers and cards ----
const revealTargets = document.querySelectorAll('.section-head, .skill-group, .project-card, .ncc-card, .interest-card');

if ('IntersectionObserver' in window) {
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
}
