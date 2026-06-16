// preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    preloader.classList.add('preloader-hidden');
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
});

// footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// theme toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// mobile menu toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}
