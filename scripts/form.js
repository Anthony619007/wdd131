// Product data
const productArray = [
  { id: "ph_001", name: "Galaxy Nexus X" },
  { id: "ph_002", name: "iPhone 15 Pro Max" },
  { id: "ph_003", name: "Pixel 9 Ultra" },
  { id: "ph_004", name: "OnePlus 12T" },
  { id: "ph_005", name: "Xiaomi 14 Pro" },
  { id: "ph_006", name: "Nothing Phone (3)" },
  { id: "ph_007", name: "Sony Xperia 5 V" }
];

// Populate product dropdown
function populateProductSelect() {
  const selectEl = document.getElementById("productName");
  if (!selectEl) return;
  // Remove all options except the disabled placeholder
  for (let i = selectEl.options.length - 1; i >= 0; i--) {
    if (selectEl.options[i].value !== "") selectEl.options[i].remove();
  }
  productArray.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    selectEl.appendChild(option);
  });
}

// Set max date to today (cannot be in future)
function setDateMax() {
  const dateInput = document.getElementById("installDate");
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
  }
}

// LocalStorage review counter
function getReviewCount() {
  const stored = localStorage.getItem("smartphoneReviewsCount");
  return stored ? parseInt(stored, 10) : 0;
}

function updateFooterCount() {
  const span = document.getElementById("reviewCountDisplay");
  if (span) span.textContent = `Reviews: ${getReviewCount()}`;
}

function incrementReviewCount() {
  const current = getReviewCount();
  localStorage.setItem("smartphoneReviewsCount", current + 1);
  updateFooterCount();
}

// Form validation and submission
function setupValidation() {
  const form = document.getElementById("phoneReviewForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    // Validate product
    const product = document.getElementById("productName").value;
    if (!product) {
      e.preventDefault();
      alert("Please select a smartphone product.");
      return;
    }

    // Validate rating (one radio must be checked)
    const selectedRating = document.querySelector('input[name="overallRating"]:checked');
    if (!selectedRating) {
      e.preventDefault();
      alert("Please select an overall rating (1 to 5 stars).");
      return;
    }

    // Validate installation date
    const installDate = document.getElementById("installDate").value;
    if (!installDate) {
      e.preventDefault();
      alert("Please select the date of installation.");
      return;
    }

    // All valid: increment review counter
    incrementReviewCount();
    // Form will now submit to review.html via GET
  });
}

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  setDateMax();
  updateFooterCount();
  setupValidation();

  // Sync count across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "smartphoneReviewsCount") updateFooterCount();
  });
});