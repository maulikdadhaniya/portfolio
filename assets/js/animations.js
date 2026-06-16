document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ================= scroll progress bar ================= */
    const progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        gsap.to(progressBar, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
            },
        });
    }

    /* ================= navbar scroll state ================= */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        ScrollTrigger.create({
            start: 'top -10',
            end: 99999,
            toggleClass: { targets: navbar, className: 'scrolled' },
        });
    }

    /* ================= section navigation (scroll-spy) ================= */
    const NAV_OFFSET = 72;
    const navLinks = gsap.utils.toArray('.nav-link[data-section]');
    const mobileMenu = document.getElementById('mobileMenu');
    const navToggle = document.getElementById('navToggle');

    const setActiveLink = (id) => {
        navLinks.forEach((l) => l.classList.toggle('active', l.dataset.section === id));
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenu.classList.contains('open')) return;
        mobileMenu.classList.remove('open');
        if (navToggle) {
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    navLinks.forEach((link) => {
        const section = document.getElementById(link.dataset.section);
        if (!section) return;

        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
                if (self.isActive) setActiveLink(link.dataset.section);
            },
        });

        link.addEventListener('click', (event) => {
            event.preventDefault();
            closeMobileMenu();
            gsap.to(window, {
                duration: 1,
                ease: 'power2.inOut',
                scrollTo: { y: section, offsetY: NAV_OFFSET },
            });
        });
    });

    /* ================= back to top ================= */
    const backToTop = document.getElementById('backToTop');
    const ringFg = backToTop ? backToTop.querySelector('.ring-fg') : null;
    const RING_CIRCUMFERENCE = 132;

    if (backToTop) {
        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => {
                backToTop.classList.toggle('show', self.scroll() > 400);
                if (ringFg) {
                    ringFg.style.strokeDashoffset = RING_CIRCUMFERENCE * (1 - self.progress);
                }
            },
        });

        backToTop.addEventListener('click', () => {
            gsap.to(window, { duration: 1, ease: 'power2.inOut', scrollTo: { y: 0 } });
        });
    }

    /* ================= hero entrance ================= */
    if (!reduceMotion) {
        gsap.timeline({ delay: 0.4 })
            .from('.hero-greeting', { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out' })
            .from('.hero-title-line', { opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
            .from('.hero-role', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3')
            .from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3')
            .from('.hero-cta > *', { opacity: 0, y: 20, duration: 0.5, stagger: 0.12, ease: 'power3.out' }, '-=0.3')
            .from('.hero-socials > *', { opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
            .from('.hero-img-ring', { opacity: 0, scale: 0.4, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6')
            .from('.hero-float-card-1', { opacity: 0, x: -30, y: -10, duration: 0.6, ease: 'power3.out' }, '-=0.3')
            .from('.hero-float-card-2', { opacity: 0, x: 30, y: 10, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-float-card-3', { opacity: 0, x: 30, y: -10, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-float-card-4', { opacity: 0, x: -30, y: 10, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-float-card-5', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-float-card-6', { opacity: 0, y: -20, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-marquee', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.2');
    }

    /* ================= hero role typewriter ================= */
    const roleEl = document.getElementById('heroRole');
    if (roleEl && !reduceMotion) {
        const roles = [
            'Android Developer',
            'Kotlin Enthusiast',
            'Mobile App Architect',
            'Clean Architecture Advocate',
        ];

        const typeTl = gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 2 });
        roles.forEach((role) => {
            typeTl
                .to(roleEl, { duration: Math.max(role.length * 0.06, 0.6), text: role, ease: 'none' })
                .to({}, { duration: 1.2 })
                .to(roleEl, { duration: 0.4, text: '', ease: 'none' });
        });
    }

    /* ================= magnetic buttons ================= */
    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        document.querySelectorAll('.magnetic-btn, .magnetic-btn-outline').forEach((btn) => {
            btn.addEventListener('mousemove', (event) => {
                const rect = btn.getBoundingClientRect();
                const x = event.clientX - rect.left - rect.width / 2;
                const y = event.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.3, y: y * 0.4, duration: 0.4, ease: 'power3.out' });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
        });
    }

    /* ================= scroll reveal helpers ================= */
    const reveal = (selector, vars = {}) => {
        gsap.utils.toArray(selector).forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' },
                ...vars,
            });
        });
    };

    const revealStagger = (containerSelector, itemSelector, vars = {}) => {
        gsap.utils.toArray(containerSelector).forEach((container) => {
            const items = container.querySelectorAll(itemSelector);
            if (!items.length) return;

            gsap.from(items, {
                opacity: 0,
                y: 50,
                scale: 0.95,
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.15,
                scrollTrigger: { trigger: container, start: 'top 80%' },
                ...vars,
            });
        });
    };

    /* ================= about ================= */
    reveal('.about-title');
    reveal('.about-desc', { y: 30 });
    revealStagger('.stats-grid', '.stat-card', { y: 30, scale: 0.9 });

    document.querySelectorAll('.stat-number').forEach((el) => {
        const target = parseFloat(el.dataset.count || '0');
        const suffix = el.dataset.suffix || '';
        const counter = { val: 0 };

        gsap.to(counter, {
            val: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
            onUpdate: () => { el.textContent = Math.floor(counter.val) + suffix; },
            onComplete: () => { el.textContent = target + suffix; },
        });
    });

    /* ================= experience ================= */
    reveal('.experience-title', { x: -40, y: 0 });

    const timelineWrap = document.querySelector('.timeline-wrap');
    if (timelineWrap) {
        gsap.to('.timeline-line', {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: timelineWrap,
                start: 'top 70%',
                end: 'bottom 70%',
                scrub: 0.5,
            },
        });
    }

    revealStagger('.timeline-wrap', '.experience-item', { x: -40, y: 0, scale: 1 });

    /* ================= projects ================= */
    reveal('.projects_section .project-title');
    reveal('.projects_section .project-subtitle', { y: 20 });
    revealStagger('.project_grid', '.project_card');

    /* ================= contact ================= */
    reveal('.availability-badge', { y: 20, scale: 0.9 });
    reveal('.contact-title');
    reveal('.contact-desc', { y: 30 });
    revealStagger('.contact_icons', '.contact-icon', { y: 30, scale: 0.7 });

    window.addEventListener('load', () => ScrollTrigger.refresh());
});
