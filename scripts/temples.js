
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.main-nav');
  const body = document.body;

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('is-open');
      body.classList.toggle('nav-open');
    });
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);

      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (targetId) {
          history.pushState(null, '', '#' + targetId);
        }
      }
    });
  });

  const pagePath = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === pagePath || href === './' + pagePath || href === window.location.pathname) {
      link.classList.add('active');
    }
  });
});
