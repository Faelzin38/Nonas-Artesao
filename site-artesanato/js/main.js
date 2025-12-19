document.addEventListener('DOMContentLoaded', function(){
    // --- Mobile Nav Logic ---
    const navToggle = document.querySelector('.nav-toggle');
    const navClose = document.querySelector('.nav-close');
    const siteNav = document.querySelector('#site-nav');

    if (navToggle && navClose && siteNav) {
        const openNav = () => siteNav.classList.add('active');
        const closeNav = () => siteNav.classList.remove('active');
        navToggle.addEventListener('click', openNav);
        navClose.addEventListener('click', closeNav);
        document.querySelectorAll('#site-nav a').forEach(link => {
            link.addEventListener('click', () => siteNav.classList.contains('active') && closeNav());
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

    // --- Universal Carousel Logic ---
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
            nextButton.style.display = currentSlide >= slides.length - 1 ? 'none' : 'flex';
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

        updateCarousel(); // Initial state
    };

    // --- Initialize ALL Carousels ---
    document.querySelectorAll('.product-carousel, .video-carousel').forEach(setupCarousel);
    
    // Special handling for testimonial carousel (grid on desktop)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const initTestimonialCarousel = () => {
        if (window.innerWidth <= 768 && testimonialCarousel) {
            setupCarousel(testimonialCarousel);
        }
    };
    initTestimonialCarousel();

    // --- Lazy Load Videos ---
    const lazyVideos = document.querySelectorAll("video.lazy-video");
    if (lazyVideos.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const sources = video.querySelectorAll("source");
                    sources.forEach(source => {
                        source.src = source.dataset.src;
                    });
                    video.load();
                    video.classList.remove("lazy-video");
                    obs.unobserve(video);
                }
            });
        });
        lazyVideos.forEach(video => observer.observe(video));
    }

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.scrollY > 300);
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Floating CTA vs Footer Logic ---
    const floatingCta = document.querySelector('.floating-cta');
    const footer = document.querySelector('.site-footer-main');
    if (floatingCta && backToTopButton && footer) {
        const intersectionObserver = new IntersectionObserver((entries) => {
            const footerEntry = entries[0];
            const offset = footer.offsetHeight;
            floatingCta.style.bottom = footerEntry.isIntersecting ? `${offset + 20}px` : '20px';
            backToTopButton.style.bottom = footerEntry.isIntersecting ? `${offset + 95}px` : '95px';
        }, { threshold: 0.1 });
        intersectionObserver.observe(footer);
    }

    // --- Resize handler for testimonials (optional but good practice) ---
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Re-initialize testimonial carousel logic on resize
            initTestimonialCarousel();
        }, 200);
    });
});