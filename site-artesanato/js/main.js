document.addEventListener('DOMContentLoaded', function(){
    // --- Mobile Nav Logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const siteNav = document.querySelector('#site-nav');

    const openNav = () => {
        siteNav.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    const closeNav = () => {
        siteNav.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    if (navToggle) navToggle.addEventListener('click', openNav);
    if (navClose) navClose.addEventListener('click', closeNav);

    document.querySelectorAll('#site-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (siteNav.classList.contains('active')) closeNav();
        });
    });

    // --- Smooth Scroll Logic ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Product Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-arrow');
    const prevButton = document.querySelector('.prev-arrow');

    let currentSlide = 0;

    const updateSlidePosition = () => {
        const amountToMove = -100 * currentSlide;
        track.style.transform = `translateX(${amountToMove}%)`;

        // Update arrow visibility
        prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
        nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
    }

    // Go to the next slide
    nextButton.addEventListener('click', e => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlidePosition();
        }
    });

    // Go to the previous slide
    prevButton.addEventListener('click', e => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlidePosition();
        }
    });

    // Initialize the carousel state
    updateSlidePosition();
});
