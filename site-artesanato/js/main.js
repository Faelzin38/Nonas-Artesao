document.addEventListener('DOMContentLoaded', function(){
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const siteNav = document.querySelector('#site-nav');

    // Function to open the nav
    const openNav = () => {
        siteNav.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    // Function to close the nav
    const closeNav = () => {
        siteNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    // Event listeners
    if (navToggle && siteNav) {
        navToggle.addEventListener('click', openNav);
    }

    if (navClose && siteNav) {
        navClose.addEventListener('click', closeNav);
    }

    // Close nav when a link inside is clicked
    document.querySelectorAll('#site-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('active')) {
                closeNav();
            }
        });
    });

    // Smooth scroll for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
