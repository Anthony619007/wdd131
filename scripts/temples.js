/* scripts/temples.js - Hamburger Menu, Dynamic Footer with San Diego California */

document.addEventListener('DOMContentLoaded', function () {
  // ==============================================
  // 1. HAMBURGER MENU TOGGLE (mobile view)
  // ==============================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const primaryNav = document.getElementById('primaryNav');

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener('click', function () {
      // Toggle open class on nav
      primaryNav.classList.toggle('open');
      // Toggle active class on hamburger to show X
      hamburgerBtn.classList.toggle('active');
      
      // Update aria-expanded for accessibility
      const isExpanded = primaryNav.classList.contains('open');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // ==============================================
  // 2. FOOTER: DYNAMIC COPYRIGHT YEAR & LAST MODIFIED
  //    With "San Diego California" repeated as shown in reference images
  // ==============================================
  
  // Set current year in copyright
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Set last modified date from document
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

  // Ensure "San Diego California" appears multiple times in footer
  // as shown in the reference images (temples-large.png shows it repeated)
  const footerCredit = document.querySelector('.footer-credit');
  if (footerCredit && footerCredit.textContent === 'San Diego California') {
    // Already set correctly in HTML
  }

  // ==============================================
  // 3. Close mobile menu on link click (better UX)
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
  // 4. Active link highlighting
  // ==============================================
  const currentPath = window.location.pathname.split('/').pop() || 'temples.html';
  const allNavAnchors = document.querySelectorAll('.nav-list a');
  
  allNavAnchors.forEach(anchor => {
    if (anchor.getAttribute('href') === '#') {
      if (currentPath === 'temples.html' || currentPath === '' || currentPath === 'index.html') {
        anchor.classList.add('active-nav');
      }
    }
    
    anchor.addEventListener('click', function(e) {
      allNavAnchors.forEach(a => a.classList.remove('active-nav'));
      this.classList.add('active-nav');
    });
  });

  // Set Home as active by default
  if (!document.querySelector('.nav-list a.active-nav')) {
    const homeLink = document.querySelector('.nav-list a[href="#"]');
    if (homeLink) homeLink.classList.add('active-nav');
  }

  // ==============================================
  // 5. Smooth scroll for anchor links
  // ==============================================
  const allSmoothLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  allSmoothLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==============================================
  // 6. Handle responsive resize - ensure nav state resets on window resize
  // ==============================================
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      const windowWidth = window.innerWidth;
      // If screen becomes large (>= 768px) and nav is open, close it properly
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