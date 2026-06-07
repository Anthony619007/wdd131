// Product array (provided in assignment)
const productArray = [
  { id: "ph_001", name: "Galaxy Nexus X" },
  { id: "ph_002", name: "iPhone 15 Pro Max" },
  { id: "ph_003", name: "Pixel 9 Ultra" },
  { id: "ph_004", name: "OnePlus 12T" },
  { id: "ph_005", name: "Xiaomi 14 Pro" },
  { id: "ph_006", name: "Nothing Phone (3)" },
  { id: "ph_007", name: "Sony Xperia 5 V" }
];

// Populate product select options dynamically
function populateProductSelect() {
  const selectEl = document.getElementById("productName");
  if (!selectEl) return;

  // Remove any existing dynamic options (keep the disabled placeholder)
  const options = selectEl.querySelectorAll('option');
  for (let i = options.length - 1; i >= 0; i--) {
    if (options[i].value !== "") {
      options[i].remove();
    }
  }

  productArray.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    selectEl.appendChild(option);
  });
}

// Set max date for installation (cannot be future)
function setDateMax() {
  const dateInput = document.getElementById("installDate");
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
  }
}

// Update review counter display on main form
function updateReviewCounterDisplay() {
  const count = localStorage.getItem("smartphoneReviewsCount");
  const displaySpan = document.getElementById("reviewCountDisplay");
  if (displaySpan) {
    const total = count ? parseInt(count, 10) : 0;
    displaySpan.textContent = `Reviews: ${total}`;
  }
}

// Increment counter ONLY when on review.html (after form submission)
function handleReviewPageCounter() {
  const path = window.location.pathname;
  const isReviewPage = path.endsWith("review.html") || path.includes("review.html");
  if (isReviewPage) {
    let currentCount = localStorage.getItem("smartphoneReviewsCount");
    let count = currentCount ? parseInt(currentCount, 10) : 0;
    count += 1;
    localStorage.setItem("smartphoneReviewsCount", count);

    // Show a non-intrusive banner using class (no inline style)
    const banner = document.createElement('div');
    banner.className = 'review-banner';
    banner.textContent = `📱 Review recorded! Total submitted: ${count}`;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 4000);
  }
}

// Form validation (ensures star rating is selected and required fields filled)
function setupFormValidation() {
  const form = document.getElementById("phoneReviewForm");
  if (!form) return;

  form.addEventListener("submit", function(e) {
    // Check star rating
    const starRadios = document.querySelectorAll('input[name="ratingValue"]');
    let ratingSelected = false;
    for (let radio of starRadios) {
      if (radio.checked) ratingSelected = true;
    }
    if (!ratingSelected) {
      e.preventDefault();
      alert("⭐ Please select an overall rating (1 to 5 stars).");
      return;
    }

    // Check product selection
    const productSelect = document.getElementById("productName");
    if (!productSelect.value) {
      e.preventDefault();
      alert("Please select a smartphone product.");
      return;
    }

    // Check installation date
    const installDate = document.getElementById("installDate").value;
    if (!installDate) {
      e.preventDefault();
      alert("Please select the date of installation.");
      return;
    }

    // If all valid, form submits to review.html (GET)
  });
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  setDateMax();
  updateReviewCounterDisplay();
  handleReviewPageCounter();  // increments if on review.html
  setupFormValidation();

  // Optional: listen for storage changes to update counter across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "smartphoneReviewsCount") {
      updateReviewCounterDisplay();
    }
  });
});

// Add banner styles dynamically (so no inline style is used)
const styleForBanner = document.createElement('style');
styleForBanner.textContent = `
  .review-banner {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #0f2c3b;
    color: #ffb347;
    padding: 8px 16px;
    border-radius: 40px;
    font-weight: bold;
    z-index: 999;
    font-size: 14px;
    font-family: monospace;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: opacity 0.2s;
  }
`;
document.head.appendChild(styleForBanner);