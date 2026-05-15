document.addEventListener('DOMContentLoaded', function () {
  // ------------------------------
  // 1. HAMBURGER MENU TOGGLE (mobile view)
  // ------------------------------
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

  // ------------------------------
  // 2. FOOTER: DYNAMIC COPYRIGHT YEAR & LAST MODIFIED DATE
  // ------------------------------
  // Set current year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Set last modified date from document
  const lastModifiedSpan = document.getElementById('lastModified');
  if (lastModifiedSpan) {
    const lastModified = document.lastModified;
    // Format: MM/DD/YYYY HH:MM:SS or any readable format
    const formattedDate = new Date(lastModified).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    lastModifiedSpan.textContent = formattedDate;
  }

  // ------------------------------
  // 3. OPTIONAL: Close mobile menu on link click (better UX)
  // ------------------------------
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

  // ------------------------------
  // 4. Active link highlighting based on current hash or simple # tracking
  // ------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const allNavAnchors = document.querySelectorAll('.nav-list a');
  
  allNavAnchors.forEach(anchor => {
    // For simple demo, if href="#" and we are on the main page, highlight Home
    if (anchor.getAttribute('href') === '#') {
      if (currentPath === 'temples.html' || currentPath === '' || currentPath === 'index.html') {
        anchor.classList.add('active-nav');
      }
    }
    // Remove any other active class from others
    anchor.addEventListener('click', function(e) {
      allNavAnchors.forEach(a => a.classList.remove('active-nav'));
      this.classList.add('active-nav');
    });
  });

  // Ensure Home is active by default if no other match
  if (!document.querySelector('.nav-list a.active-nav')) {
    const homeLink = document.querySelector('.nav-list a[href="#"]');
    if (homeLink) homeLink.classList.add('active-nav');
  }

  // ------------------------------
  // 5. Small enhancement: smooth scroll for anchor links (already graceful)
  // ------------------------------
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
});
