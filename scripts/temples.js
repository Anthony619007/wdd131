// temples.js - External JavaScript file for Temple Album

// Temple data - YEAR BUILT field is removed from display (only kept for filtering logic)
const templesData = [
  { id: 0, name: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August 7", area: 11500, year: 2005, imageUrl: "images/aba-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-lds-1024x768.jpg" },
  { id: 1, name: "Salt Lake Temple", location: "Salt Lake City, Utah", dedicated: "1893, April 6", area: 253015, year: 1893, imageUrl: "images/saltlake-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg" },
  { id: 2, name: "Manti Utah", location: "Manti, Utah", dedicated: "1888, May 21", area: 100000, year: 1888, imageUrl: "images/manti-utah-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg" },
  { id: 3, name: "St. George Utah", location: "St. George, Utah", dedicated: "1877, April 6", area: 110000, year: 1877, imageUrl: "images/st.-george-utah-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"},
  { id: 4, name: "Logan Utah", location: "Logan, Utah", dedicated: "1884, May 17", area: 119619, year: 1884, imageUrl: "images/logan-utah-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg" },
  { id: 5, name: "Rome Italy", location: "Rome, Italy", dedicated: "2019, March 10", area: 41010, year: 2019, imageUrl: "images/rome-italy-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg" },
  { id: 6, name: "Gilbert Arizona", location: "Gilbert, Arizona", dedicated: "2014, March 2", area: 85219, year: 2014, imageUrl: "images/gilbert-arizona-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/gilbert-arizona-temple/gilbert-arizona-temple-3802-main.jpg" },
  { id: 7, name: "Payson Utah", location: "Payson, Utah", dedicated: "2015, June 7", area: 96630, year: 2015, imageUrl: "images/payson-utah-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-62834-main.jpg" },
  { id: 8, name: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May 2", area: 6861, year: 2020, imageUrl: "images/yigo-guam-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg"},
  { id: 9, name: "Barcelona Spain", location: "Barcelona, Spain", dedicated: "2023, March 19", area: 54300, year: 2023, imageUrl: "images/barcelona-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/barcelona-spain-temple/barcelona-spain-temple-43015-main.jpg" },
  { id: 10, name: "Cape Town South Africa", location: "Cape Town, South Africa", dedicated: "2023, July 9", area: 21900, year: 2023, imageUrl: "images/cape-town-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cape-town-south-africa-temple/cape-town-south-africa-temple-64609-main.jpg" },
  { id: 11, name: "Dallas Texas", location: "Dallas, Texas", dedicated: "1984, October 28", area: 44934, year: 1984, imageUrl: "images/dallas-texas-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-55240-main.jpg" },
  { id: 12, name: "London England", location: "Surrey, England", dedicated: "1958, September 7", area: 42990, year: 1958, imageUrl: "images/london-england-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-56886-main.jpg" },
  { id: 13, name: "Kansas City Missouri", location: "Kansas City, Missouri", dedicated: "2012, May 6", area: 32100, year: 2012, imageUrl: "images/kansas-city-temple.jpeg", fallbackUrl: "https://churchofjesuschristtemples.org/assets/img/temples/kansas-city-missouri-temple/kansas-city-missouri-temple-36983-main.jpg" }
];

let currentlySelectedImage = null;
let currentFilter = 'all';

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function filterTemples(filterType) {
  if (filterType === 'old') return templesData.filter(t => t.year < 1900);
  if (filterType === 'new') return templesData.filter(t => t.year > 2000);
  if (filterType === 'large') return templesData.filter(t => t.area > 90000);
  if (filterType === 'small') return templesData.filter(t => t.area < 10000);
  return templesData;
}

function getImageSource(temple) {
  if (temple.customLocalImage) {
    return temple.customLocalImage;
  }
  return temple.imageUrl;
}

function renderGallery(filterType = 'all') {
  currentFilter = filterType;
  const filtered = filterTemples(filterType);
  const gallery = document.getElementById('templeGallery');
  const templeCountSpan = document.getElementById('templeCount');
  const activeFilterSpan = document.getElementById('activeFilterName');
  const dynamicTitle = document.getElementById('dynamicTitle');
  
  templeCountSpan.innerText = filtered.length;
  let filterDisplayName = '';
  switch(filterType) {
    case 'old': filterDisplayName = 'Old Temples (Pre-1900)'; break;
    case 'new': filterDisplayName = 'New Temples (Post-2000)'; break;
    case 'large': filterDisplayName = 'Large Temples (>90k sq ft)'; break;
    case 'small': filterDisplayName = 'Small Temples (<10k sq ft)'; break;
    default: filterDisplayName = 'All Sacred Temples';
  }
  activeFilterSpan.innerText = filterDisplayName;
  
  if (filtered.length === 0) {
    gallery.innerHTML = `<div class="empty-state"><i class="fas fa-temple"></i><h3>No temples match this filter</h3><p>Try another beautiful category ✨</p></div>`;
    return;
  }
  
  gallery.innerHTML = '';
  filtered.forEach((temple, idx) => {
    const figure = document.createElement('figure');
    figure.className = 'temple-card';
    figure.style.animation = `fadeInUp 0.5s ease-out ${idx * 0.03}s forwards`;
    figure.style.opacity = '0';
    figure.setAttribute('data-temple-id', temple.id);
    
    const dedicatedDisplay = temple.dedicated;
    const imageSrc = getImageSource(temple);
    
    figure.innerHTML = `
      <div class="image-wrapper">
        <img src="${imageSrc}" 
             alt="${temple.name} Temple" 
             loading="lazy" 
             width="400" 
             height="300"
             onerror="this.onerror=null; this.src='${temple.fallbackUrl}'; this.style.opacity='0.9';">
        <div class="temple-overlay">
          <span class="detail-badge"><i class="fas fa-ruler-combined"></i> ${formatNumber(temple.area)} sq ft</span>
        </div>
      </div>
      <figcaption><i class="fas fa-landmark"></i> ${temple.name}</figcaption>
      <div class="temple-details">
        <p><i class="fas fa-map-pin"></i> <strong>LOCATION:</strong> ${temple.location}</p>
        <p><i class="fas fa-calendar-alt"></i> <strong>DEDICATED:</strong> ${dedicatedDisplay}</p>
        <p><i class="fas fa-expand-alt"></i> <strong>TEMPLE SIZE:</strong> ${formatNumber(temple.area)} sq ft</p>
      </div>
    `;
    
    figure.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentlySelectedImage) {
        temple.customLocalImage = currentlySelectedImage;
        const imgElement = figure.querySelector('img');
        if (imgElement) {
          imgElement.src = currentlySelectedImage;
        }
        const figcaptionElem = figure.querySelector('figcaption');
        const originalText = figcaptionElem.innerHTML;
        figcaptionElem.innerHTML = '<i class="fas fa-check-circle"></i> Image Updated!';
        setTimeout(() => {
          figcaptionElem.innerHTML = originalText;
        }, 1500);
      } else {
        const figcaptionElem = figure.querySelector('figcaption');
        const originalText = figcaptionElem.innerHTML;
        figcaptionElem.innerHTML = '<i class="fas fa-info-circle"></i> Select an image first!';
        setTimeout(() => {
          figcaptionElem.innerHTML = originalText;
        }, 1500);
      }
    });
    
    gallery.appendChild(figure);
  });
}

function initImageUpload() {
  const fileInput = document.getElementById('localImageInput');
  const previewArea = document.getElementById('imagePreviewArea');
  
  if (!fileInput || !previewArea) return;
  
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        currentlySelectedImage = e.target.result;
        previewArea.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,217,102,0.1); padding: 8px 15px; border-radius: 40px;">
            <img src="${currentlySelectedImage}" class="preview-img" alt="preview">
            <span style="color: #FFD966;"><i class="fas fa-check-circle"></i> Image ready!</span>
            <span style="font-size: 0.8rem; color: #94a3b8;">${file.name}</span>
            <button id="clearImageBtn" style="background: none; border: none; color: #FFD966; cursor: pointer;"><i class="fas fa-times"></i></button>
          </div>
        `;
        const clearBtn = document.getElementById('clearImageBtn');
        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            currentlySelectedImage = null;
            fileInput.value = '';
            previewArea.innerHTML = '<span style="color: #94a3b8; font-size: 0.85rem;"><i class="fas fa-image"></i> No image selected</span>';
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, WEBP)');
    }
  });
}

function initNavigation() {
  const filterLinks = document.querySelectorAll('.nav-list li a');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const primaryNav = document.getElementById('primaryNav');
  
  filterLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = link.getAttribute('data-filter') || 'all';
      filterLinks.forEach(l => l.classList.remove('active-nav'));
      link.classList.add('active-nav');
      renderGallery(filterValue);
      
      if (window.innerWidth <= 768) {
        primaryNav.classList.remove('open');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = primaryNav.classList.toggle('open');
      hamburgerBtn.classList.toggle('active');
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });
  }
}

function setFooterDates() {
  const yearSpan = document.getElementById('currentYear');
  const lastModSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.innerText = new Date().getFullYear();
  if (lastModSpan) lastModSpan.innerText = document.lastModified || new Date().toLocaleString();
}

function init() {
  renderGallery('all');
  initNavigation();
  setFooterDates();
  initImageUpload();
}

document.addEventListener('DOMContentLoaded', init);