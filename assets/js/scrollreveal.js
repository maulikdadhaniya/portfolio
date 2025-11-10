document.addEventListener('DOMContentLoaded', function () {
    // Hero area
    ScrollReveal().reveal('.hero-img', { delay: 200, origin: 'bottom' });
    ScrollReveal().reveal('.hero-title', { delay: 600, origin: 'bottom' });
    ScrollReveal().reveal('.hero-desc', { delay: 900, origin: 'bottom' });
    ScrollReveal().reveal('.hero-slider', { delay: 1200, origin: 'right' });
    ScrollReveal().reveal('.hero-next', { delay: 1500, origin: 'top' });

    // About area
    ScrollReveal().reveal('.about-title', { delay: 300, origin: 'bottom' });
    ScrollReveal().reveal('.about-desc', { delay: 400, origin: 'bottom' });
    ScrollReveal().reveal('.about-gallery', { delay: 600, origin: 'bottom' });

    // Experience area
    ScrollReveal().reveal('.experience-title', { delay: 300, origin: 'left' });

    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
        ScrollReveal().reveal(item, { delay: 200 + index * 250, origin: 'left' });
    });

    // Projects area
    ScrollReveal().reveal('.project-title', { delay: 300, origin: 'bottom' });

    const projectItems = document.querySelectorAll('.project_card');
    projectItems.forEach((item, index) => {
        ScrollReveal().reveal(item, { delay: 200 + index * 250, origin: 'bottom' });
    });

    const projectItems2 = document.querySelectorAll('.project_card_2');
    projectItems2.forEach((item, index) => {
        ScrollReveal().reveal(item, { delay: 200 + index * 250, origin: 'bottom' });
    });

    ScrollReveal().reveal('.project-more', { delay: 800, origin: 'top' });

    // Contact area
    ScrollReveal().reveal('.contact-title', { delay: 300, origin: 'bottom' });
    ScrollReveal().reveal('.contact-desc', { delay: 400, origin: 'bottom' });

    const contactIcons = document.querySelectorAll('.contact-icon');
    contactIcons.forEach((icon, index) => {
        ScrollReveal().reveal(icon, { delay: 200 + index * 250, origin: 'bottom' });
    });
});