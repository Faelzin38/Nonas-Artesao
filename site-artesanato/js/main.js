document.addEventListener('DOMContentLoaded', function(){
    // --- Mobile Nav Logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const siteNav = document.querySelector('#site-nav');

    if (navToggle && navClose && siteNav) {
        const openNav = () => {
            siteNav.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
        };

        const closeNav = () => {
            siteNav.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', openNav);
        navClose.addEventListener('click', closeNav);

        document.querySelectorAll('#site-nav a').forEach(link => {
            link.addEventListener('click', () => {
                if (siteNav.classList.contains('active')) closeNav();
            });
        });
    }

    // --- Smooth Scroll Logic ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.length > 1 && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Universal Carousel Setup ---
    const setupCarousel = (carouselElement) => {
        const track = carouselElement.querySelector('.carousel-track, .testimonial-track');
        const prevButton = carouselElement.querySelector('.prev-arrow, .testimonial-prev');
        const nextButton = carouselElement.querySelector('.next-arrow, .testimonial-next');

        if (!track || !prevButton || !nextButton) return;

        const slides = Array.from(track.children);
        if (slides.length <= 1) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        let currentSlide = 0;

        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            prevButton.style.display = currentSlide === 0 ? 'none' : 'flex';
            nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'flex';
        };

        nextButton.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                updateCarousel();
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                updateCarousel();
            }
        });

        updateCarousel(); // Set initial state
    };

    // --- Initialize Carousels based on context ---
    const productCarousel = document.querySelector('.product-carousel');
    if (productCarousel) {
        setupCarousel(productCarousel);
    }

    // Testimonial carousel is more complex: grid on desktop, carousel on mobile.
    // We need to check screen width and potentially re-init on resize.
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    let testimonialIsCarousel = false;

    const initTestimonialCarousel = () => {
        if (window.innerWidth <= 768) {
            if (!testimonialIsCarousel && testimonialCarousel) {
                setupCarousel(testimonialCarousel);
                testimonialIsCarousel = true;
            }
        } else {
            // On desktop, it's a grid, so we don't initialize it.
            // If we wanted to revert a carousel back to a grid, logic would go here.
            testimonialIsCarousel = false;
        }
    };
    
    // Initial check
    initTestimonialCarousel();
    // Optional: check on resize if you want it to be responsive without a refresh
    // window.addEventListener('resize', initTestimonialCarousel); 

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Floating CTA & Back-to-Top vs Footer Logic ---
    const floatingCta = document.querySelector('.floating-cta');
    const footer = document.querySelector('.site-footer-main');
    if (floatingCta && backToTopButton && footer) {
        const observer = new IntersectionObserver(
            (entries) => {
                const footerEntry = entries[0];
                if (footerEntry.isIntersecting) {
                    const footerHeight = footer.offsetHeight;
                    floatingCta.style.bottom = `${footerHeight + 20}px`;
                    backToTopButton.style.bottom = `${footerHeight + 95}px`;
                } else {
                    floatingCta.style.bottom = '20px';
                    backToTopButton.style.bottom = '95px';
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(footer);
    }
});