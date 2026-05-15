// ==============================================
// HAMBURGER MENU TOGGLE (mobile view)
// ==============================================
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const primaryNav = document.getElementById('primaryNav');

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener('click', function () {
      primaryNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      const isExpanded = primaryNav.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // ==============================================
  // FOOTER: DYNAMIC COPYRIGHT YEAR & LAST MODIFIED
  // ==============================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    const lastModified = document.lastModified;
    const formattedDate = new Date(lastModified).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    lastModifiedSpan.textContent = formattedDate;
  }

  // ==============================================
  // CLOSE MOBILE MENU WHEN CLICKING A NAV LINK
  // ==============================================
  const navLinks = document.querySelectorAll('#primaryNav .nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (hamburgerBtn) {
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // ==============================================
  // ACTIVE NAV LINK HIGHLIGHTING
  // ==============================================
  const allNavAnchors = document.querySelectorAll('.nav-list a');
  allNavAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      allNavAnchors.forEach(a => a.classList.remove('active-nav'));
      this.classList.add('active-nav');
    });
  });

  // Set default active state if none
  const homeLink = document.querySelector('.nav-list a[href="#"]');
  if (homeLink && !document.querySelector('.nav-list a.active-nav')) {
    homeLink.classList.add('active-nav');
  }

  // ==============================================
  // CLOSE MOBILE MENU ON WINDOW RESIZE
  // ==============================================
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 768 && primaryNav && primaryNav.classList.contains('open')) {
        primaryNav.classList.remove('open');
        if (hamburgerBtn) {
          hamburgerBtn.classList.remove('active');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }, 250);
  });
});