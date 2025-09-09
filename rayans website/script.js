// Theme toggle (Light/Dark) with persistence
(function initTheme() {
    const docEl = document.documentElement;
    const storageKey = 'theme';
    const getStored = () => localStorage.getItem(storageKey);
    const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    const applyTheme = (theme) => {
      if (theme === 'dark') docEl.classList.add('dark');
      else docEl.classList.remove('dark');
      localStorage.setItem(storageKey, theme);
    };
  
    // Initialize: use stored theme, else system preference, fallback to dark to match original design
    const initial = getStored() || (prefersDark() ? 'dark' : 'dark');
    applyTheme(initial);
  
    // Toggle button
    window.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('themeToggle');
      if (!btn) return;
      btn.addEventListener('click', () => {
        const isDark = docEl.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
      });
    });
  
    // Sync with system preference if user hasn't set a manual theme
    try {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener?.('change', (e) => {
        if (!getStored()) applyTheme(e.matches ? 'dark' : 'light');
      });
    } catch (_) { /* no-op */ }
  })();
  
  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  
  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-show');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
  
  // Subtle tilt effect for cards
  const tiltEls = document.querySelectorAll('.tilt');
  tiltEls.forEach((card) => {
    const dampen = 20; // lower = stronger tilt
    const reset = () => (card.style.transform = 'rotateX(0deg) rotateY(0deg)');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const rx = (+dy / dampen).toFixed(2);
      const ry = (-dx / dampen).toFixed(2);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    card.addEventListener('mouseleave', reset);
    card.addEventListener('blur', reset);
  });