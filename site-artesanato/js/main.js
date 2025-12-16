document.addEventListener('DOMContentLoaded', function(){
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  // Mobile menu toggle
  if(navToggle){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('active');
    });
  }

  // Smooth scroll for internal anchors (works for older browsers too)
  document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.length > 1 && document.querySelector(href)){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav when link clicked
        if(siteNav.classList.contains('active')){
          siteNav.classList.remove('active');
          if(navToggle) navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });
});