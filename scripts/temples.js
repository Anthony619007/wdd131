 <!-- Embedded JavaScript - All functionality included -->
  <script>
    document.addEventListener('DOMContentLoaded', function () {
      // ==============================================
      // 1. HAMBURGER MENU TOGGLE (mobile view)
      // ==============================================
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
      // 2. FOOTER: DYNAMIC COPYRIGHT YEAR & LAST MODIFIED
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
      // 3. Close mobile menu on link click
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
      const allNavAnchors = document.querySelectorAll('.nav-list a');
      allNavAnchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          allNavAnchors.forEach(a => a.classList.remove('active-nav'));
          this.classList.add('active-nav');
        });
      });

      // Set Home as active by default
      const homeLink = document.querySelector('.nav-list a[href="#"]');
      if (homeLink && !document.querySelector('.nav-list a.active-nav')) {
        homeLink.classList.add('active-nav');
      }

      // ==============================================
      // 5. Handle responsive resize
      // ==============================================
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
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
  </script>