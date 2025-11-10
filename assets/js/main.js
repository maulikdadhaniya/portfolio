// cursor js
new kursor({
    type: 1,
    // removeDefaultCursor: true
});

// Initialize ScrollReveal with global settings
ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'ease-in-out', // Smooth easing
    distance: '50px',      // Adds a nice slide effect
    viewOffset: { top: 20, bottom: 20 }, // Trigger animations slightly earlier
});

// Stop preloader
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('preloader').style.display = 'none';
});