// Complete temple data with images from specifications + Accra Temple
const temples = [
    {
        name: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        year: 2005,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-lds-1024x768.jpg"
    },
    {
        name: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        year: 1888,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-lds-1024x768.jpg"
    },
    {
        name: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        year: 2015,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-lds-1024x768.jpg"
    },
    {
        name: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        year: 2020,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/yigo-guam-temple/yigo-guam-temple-lds-1024x768.jpg"
    },
    {
        name: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        year: 2004,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-lds-1024x768.jpg"
    },
    {
        name: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        year: 1893,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-lds-1024x768.jpg"
    },
    {
        name: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        year: 2019,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-lds-1024x768.jpg"
    },
    {
        name: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        year: 1974,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/washington-dc-temple/washington-dc-temple-lds-1024x768.jpg"
    },
    {
        name: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        year: 1983,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/mexico-city-mexico-temple/mexico-city-mexico-temple-lds-1024x768.jpg"
    },
    {
        name: "São Paulo Brazil",
        location: "São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        year: 1978,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-lds-1024x768.jpg"
    },
    {
        name: "Hong Kong China",
        location: "Hong Kong, China",
        dedicated: "1996, May, 26",
        area: 21966,
        year: 1996,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/hong-kong-china-temple/hong-kong-china-temple-lds-1024x768.jpg"
    },
    {
        name: "Paris France",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 44175,
        year: 2017,
        image: "https://churchofjesuschristtemples.org/assets/img/temples/paris-france-temple/paris-france-temple-lds-1024x768.jpg"
    }
];

// Format area with commas
function formatArea(area) {
    return area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Update stats display
function updateStats(filteredCount, totalCount) {
    const statsDiv = document.getElementById('temple-stats');
    statsDiv.innerHTML = `Showing ${filteredCount} of ${totalCount} temples`;
}

// Display temples based on filter
function displayTemples(filter) {
    const gallery = document.getElementById('temple-gallery');
    const filterTitle = document.getElementById('filter-title');
    let filteredTemples = [];
    
    // Apply filter based on criteria
    switch(filter) {
        case 'old':
            filteredTemples = temples.filter(temple => temple.year < 1900);
            filterTitle.textContent = '🏛️ Old Temples (Built before 1900)';
            break;
        case 'new':
            filteredTemples = temples.filter(temple => temple.year > 2000);
            filterTitle.textContent = '✨ New Temples (Built after 2000)';
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area > 90000);
            filterTitle.textContent = '📐 Large Temples (Larger than 90,000 sq ft)';
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area < 10000);
            filterTitle.textContent = '🔍 Small Temples (Smaller than 10,000 sq ft)';
            break;
        default:
            filteredTemples = temples;
            filterTitle.textContent = '🏠 All Temples';
    }
    
    // Update stats
    updateStats(filteredTemples.length, temples.length);
    
    // Clear gallery
    gallery.innerHTML = '';
    
    // Display filtered temples
    if (filteredTemples.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: white; font-size: 1.2rem;">No temples found matching this filter. 🙏</p>';
        return;
    }
    
    filteredTemples.forEach((temple, index) => {
        const card = document.createElement('div');
        card.className = 'temple-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.style.opacity = '0';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
        
        // Determine size badge
        let sizeBadge = '';
        if (temple.area > 90000) sizeBadge = '<span class="badge">Large</span>';
        else if (temple.area < 10000) sizeBadge = '<span class="badge">Small</span>';
        
        card.innerHTML = `
            <div class="image-container">
                <img class="temple-image" 
                     src="${temple.image}" 
                     alt="${temple.name} Temple" 
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x250?text=Image+Coming+Soon'">
            </div>
            <h3>${temple.name} ${sizeBadge}</h3>
            <div class="temple-info">
                <p><strong>📍 Location:</strong> ${temple.location}</p>
                <p><strong>📅 Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>📏 Size:</strong> ${formatArea(temple.area)} sq ft</p>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// Set up filter navigation
function setupFilters() {
    const filterLinks = document.querySelectorAll('nav a');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active class
            filterLinks.forEach(l => l.classList.remove('filter-active'));
            link.classList.add('filter-active');
            
            // Get filter value and display temples
            const filter = link.getAttribute('data-filter');
            
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
            }, 150);
            
            displayTemples(filter);
            
            // Smooth scroll to top of gallery
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Update footer with current year and last modified date
function updateFooter() {
    const yearSpan = document.getElementById('current-year');
    const modifiedSpan = document.getElementById('last-modified');
    
    yearSpan.textContent = new Date().getFullYear();
    modifiedSpan.textContent = new Date().toLocaleDateString();
}

// Initialize the page
function init() {
    displayTemples('all');
    setupFilters();
    updateFooter();
}

// Run when page loads
init();
