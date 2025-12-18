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
            // Ensure it's a valid internal link and the element exists
            if (href && href.length > 1 && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Product Carousel Logic (only on index.html) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-arrow');
        const prevButton = document.querySelector('.prev-arrow');

        if (slides.length > 1 && nextButton && prevButton) {
            let currentSlide = 0;

            const updateSlidePosition = () => {
                const amountToMove = -100 * currentSlide;
                track.style.transform = `translateX(${amountToMove}%)`;
                prevButton.style.display = currentSlide === 0 ? 'none' : 'block';
                nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'block';
            }

            nextButton.addEventListener('click', () => {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                    updateSlidePosition();
                }
            });

            prevButton.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlidePosition();
                }
            });

            updateSlidePosition();
        }
    }

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
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
            { threshold: 0.1 } // Trigger when 10% of the footer is visible
        );

        observer.observe(footer);
    }
});
