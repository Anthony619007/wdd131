// filtered-temples.js - External JavaScript file for Temple Album
// Created by Anthony Anusiem

// Temple data
const templesdata = [
  { id: 0, name: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August 7", area: 11500, year: 2005, imageurl: "images/aba-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg" },
  { id: 1, name: "Salt Lake Temple", location: "Salt Lake City, Utah", dedicated: "1893, April 6", area: 253015, year: 1893, imageurl: "images/saltlake-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg" },
  { id: 2, name: "Manti Utah", location: "Manti, Utah", dedicated: "1888, May 21", area: 100000, year: 1888, imageurl: "images/manti-utah-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg" },
  { id: 3, name: "St. George Utah", location: "St. George, Utah", dedicated: "1877, April 6", area: 110000, year: 1877, imageurl: "images/st.-george-utah-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg" },
  { id: 4, name: "Logan Utah", location: "Logan, Utah", dedicated: "1884, May 17", area: 119619, year: 1884, imageurl: "images/logan-utah-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/logan-utah-temple/logan-utah-temple-40550-main.jpg" },
  { id: 5, name: "Rome Italy", location: "Rome, Italy", dedicated: "2019, March 10", area: 41010, year: 2019, imageurl: "images/rome-italy-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg" },
  { id: 6, name: "Gilbert Arizona", location: "Gilbert, Arizona", dedicated: "2014, March 2", area: 85219, year: 2014, imageurl: "images/gilbert-arizona-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/gilbert-arizona-temple/gilbert-arizona-temple-3802-main.jpg" },
  { id: 7, name: "Payson Utah", location: "Payson, Utah", dedicated: "2015, June 7", area: 96630, year: 2015, imageurl: "images/payson-utah-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-62834-main.jpg" },
  { id: 8, name: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May 2", area: 6861, year: 2020, imageurl: "images/yigo-guam-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-26495-main.jpg" },
  { id: 9, name: "Barcelona Spain", location: "Barcelona, Spain", dedicated: "2023, March 19", area: 54300, year: 2023, imageurl: "images/barcelona-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/barcelona-spain-temple/barcelona-spain-temple-43015-main.jpg" },
  { id: 10, name: "Cape Town South Africa", location: "Cape Town, South Africa", dedicated: "2023, July 9", area: 21900, year: 2023, imageurl: "images/cape-town-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/cape-town-south-africa-temple/cape-town-south-africa-temple-64609-main.jpg" },
  { id: 11, name: "Dallas Texas", location: "Dallas, Texas", dedicated: "1984, October 28", area: 44934, year: 1984, imageurl: "images/dallas-texas-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-55240-main.jpg" },
  { id: 12, name: "London England", location: "Surrey, England", dedicated: "1958, September 7", area: 42990, year: 1958, imageurl: "images/london-england-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/london-england-temple/london-england-temple-56886-main.jpg" },
  { id: 13, name: "Kansas City Missouri", location: "Kansas City, Missouri", dedicated: "2012, May 6", area: 32100, year: 2012, imageurl: "images/kansas-city-temple.jpeg", fallbackurl: "https://churchofjesuschristtemples.org/assets/img/temples/kansas-city-missouri-temple/kansas-city-missouri-temple-36983-main.jpg" }
];

let selectedimage = null;
let currentfilter = 'all';

function formatnumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function filtertemples(filtertype) {
  if (filtertype === 'old') return templesdata.filter(function(t) { return t.year < 1900; });
  if (filtertype === 'new') return templesdata.filter(function(t) { return t.year > 2000; });
  if (filtertype === 'large') return templesdata.filter(function(t) { return t.area > 90000; });
  if (filtertype === 'small') return templesdata.filter(function(t) { return t.area < 10000; });
  return templesdata;
}

function getimagesource(temple) {
  if (temple.customimage) return temple.customimage;
  return temple.imageurl;
}

function createtemplecard(temple, idx) {
  var figure = document.createElement('figure');
  figure.className = 'temple-card';
  figure.style.animation = 'fadeInUp 0.5s ease-out ' + (idx * 0.03) + 's forwards';
  figure.style.opacity = '0';
  figure.setAttribute('data-temple-id', temple.id);

  // Image wrapper
  var wrapper = document.createElement('div');
  wrapper.className = 'image-wrapper';

  var img = document.createElement('img');
  img.src = getimagesource(temple);
  img.alt = temple.name + ' Temple';
  img.loading = 'lazy';
  img.width = 400;
  img.height = 300;
  img.onerror = function() {
    this.onerror = null;
    this.src = temple.fallbackurl;
    this.style.opacity = '0.9';
  };

  var overlay = document.createElement('div');
  overlay.className = 'temple-overlay';
  var badge = document.createElement('span');
  badge.className = 'detail-badge';
  badge.innerHTML = '<i class="fas fa-ruler-combined"></i> ' + formatnumber(temple.area) + ' sq ft';
  overlay.appendChild(badge);

  wrapper.appendChild(img);
  wrapper.appendChild(overlay);

  // Caption
  var caption = document.createElement('figcaption');
  caption.innerHTML = '<i class="fas fa-landmark"></i> ' + temple.name;

  // Details
  var details = document.createElement('div');
  details.className = 'temple-details';

  var p1 = document.createElement('p');
  p1.innerHTML = '<i class="fas fa-map-pin"></i> <strong>LOCATION:</strong> ' + temple.location;

  var p2 = document.createElement('p');
  p2.innerHTML = '<i class="fas fa-calendar-alt"></i> <strong>DEDICATED:</strong> ' + temple.dedicated;

  var p3 = document.createElement('p');
  p3.innerHTML = '<i class="fas fa-expand-alt"></i> <strong>TEMPLE SIZE:</strong> ' + formatnumber(temple.area) + ' sq ft';

  details.appendChild(p1);
  details.appendChild(p2);
  details.appendChild(p3);

  figure.appendChild(wrapper);
  figure.appendChild(caption);
  figure.appendChild(details);

  // Click handler for custom image assignment
  figure.addEventListener('click', function(e) {
    e.stopPropagation();
    var captionelem = figure.querySelector('figcaption');
    var originaltext = captionelem.innerHTML;
    if (selectedimage) {
      temple.customimage = selectedimage;
      img.src = selectedimage;
      captionelem.innerHTML = '<i class="fas fa-check-circle"></i> Image Updated!';
      setTimeout(function() { captionelem.innerHTML = originaltext; }, 1500);
    } else {
      captionelem.innerHTML = '<i class="fas fa-info-circle"></i> Select an image first!';
      setTimeout(function() { captionelem.innerHTML = originaltext; }, 1500);
    }
  });

  return figure;
}

function rendergallery(filtertype) {
  currentfilter = filtertype || 'all';
  var filtered = filtertemples(currentfilter);
  var gallery = document.getElementById('templeGallery');
  var templecountspan = document.getElementById('templeCount');
  var activefilterspan = document.getElementById('activeFilterName');

  templecountspan.innerText = filtered.length;

  var filterdisplayname = 'All Sacred Temples';
  if (currentfilter === 'old') filterdisplayname = 'Old Temples (Pre-1900)';
  else if (currentfilter === 'new') filterdisplayname = 'New Temples (Post-2000)';
  else if (currentfilter === 'large') filterdisplayname = 'Large Temples (Over 90k sq ft)';
  else if (currentfilter === 'small') filterdisplayname = 'Small Temples (Under 10k sq ft)';
  activefilterspan.innerText = filterdisplayname;

  gallery.innerHTML = '';

  if (filtered.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = '<i class="fas fa-temple"></i><h3>No temples match this filter</h3><p>Try another beautiful category</p>';
    gallery.appendChild(empty);
    return;
  }

  filtered.forEach(function(temple, idx) {
    gallery.appendChild(createtemplecard(temple, idx));
  });
}

function initimageupload() {
  var fileinput = document.getElementById('localImageInput');
  var previewarea = document.getElementById('imagePreviewArea');
  if (!fileinput || !previewarea) return;

  fileinput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      var reader = new FileReader();
      reader.onload = function(e) {
        selectedimage = e.target.result;

        previewarea.innerHTML = '';

        var wrapper = document.createElement('div');
        wrapper.style.cssText = 'display:flex;align-items:center;gap:12px;background:rgba(255,217,102,0.1);padding:8px 15px;border-radius:40px;';

        var previewimg = document.createElement('img');
        previewimg.src = selectedimage;
        previewimg.className = 'preview-img';
        previewimg.alt = 'preview';

        var statusspan = document.createElement('span');
        statusspan.style.color = '#FFD966';
        statusspan.innerHTML = '<i class="fas fa-check-circle"></i> Image ready!';

        var namespan = document.createElement('span');
        namespan.style.cssText = 'font-size:0.8rem;color:#94a3b8;';
        namespan.textContent = file.name;

        var clearbtn = document.createElement('button');
        clearbtn.style.cssText = 'background:none;border:none;color:#FFD966;cursor:pointer;';
        clearbtn.innerHTML = '<i class="fas fa-times"></i>';
        clearbtn.addEventListener('click', function() {
          selectedimage = null;
          fileinput.value = '';
          previewarea.innerHTML = '<span style="color:#94a3b8;font-size:0.85rem;"><i class="fas fa-image"></i> No image selected</span>';
        });

        wrapper.appendChild(previewimg);
        wrapper.appendChild(statusspan);
        wrapper.appendChild(namespan);
        wrapper.appendChild(clearbtn);
        previewarea.appendChild(wrapper);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file (JPEG, PNG, WEBP)');
    }
  });
}

function initnavigation() {
  var filterlinks = document.querySelectorAll('.nav-list li a');
  var hamburgerbtn = document.getElementById('hamburgerBtn');
  var primarynav = document.getElementById('primaryNav');

  filterlinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      var filtervalue = link.getAttribute('data-filter') || 'all';
      filterlinks.forEach(function(l) { l.classList.remove('active-nav'); });
      link.classList.add('active-nav');
      rendergallery(filtervalue);
      if (window.innerWidth <= 768) {
        primarynav.classList.remove('open');
        hamburgerbtn.classList.remove('active');
        hamburgerbtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (hamburgerbtn) {
    hamburgerbtn.addEventListener('click', function() {
      var isopen = primarynav.classList.toggle('open');
      hamburgerbtn.classList.toggle('active');
      hamburgerbtn.setAttribute('aria-expanded', isopen);
    });
  }
}

function setfooterdates() {
  document.getElementById('currentYear').innerText = new Date().getFullYear();
  document.getElementById('lastModified').innerText = document.lastModified || new Date().toLocaleString();
}

function init() {
  rendergallery('all');
  initnavigation();
  setfooterdates();
  initimageupload();
}

document.addEventListener('DOMContentLoaded', init);