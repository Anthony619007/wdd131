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

// 8 useful features checkboxes
const featuresList = [
  { id: "feat_cam", label: "Camera Quality" },
  { id: "feat_batt", label: "Battery Life" },
  { id: "feat_disp", label: "Display Quality" },
  { id: "feat_perf", label: "Performance" },
  { id: "feat_design", label: "Design & Build" },
  { id: "feat_soft", label: "Software Experience" },
  { id: "feat_audio", label: "Audio Quality" },
  { id: "feat_conn", label: "Connectivity" }
];

// 4 additional preferences checkboxes
const additionalPrefs = [
  { id: "pref_recommend", label: "Would recommend to others" },
  { id: "pref_repurchase", label: "Would purchase again" },
  { id: "pref_value", label: "Good value for money" },
  { id: "pref_durable", label: "Durable and reliable" }
];

// Populate product dropdown
function populateProductSelect() {
  const selectEl = document.getElementById("productName");
  if (!selectEl) return;
  // Keep only the disabled placeholder
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

// Create exactly 5 radio inputs for rating
function createRatingRadios() {
  const container = document.getElementById("ratingGroup");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const div = document.createElement("div");
    div.className = "rating-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "overallRating";
    radio.id = `rating_${i}`;
    radio.value = i;
    radio.required = true;

    const label = document.createElement("label");
    label.htmlFor = `rating_${i}`;
    const stars = "★".repeat(i);
    label.textContent = `${i} ★ (${stars})`;

    div.appendChild(radio);
    div.appendChild(label);
    container.appendChild(div);
  }
}

// Populate checkboxes in a given container
function populateCheckboxes(containerId, items, nameAttr) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "checkbox-item";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = item.id;
    cb.name = nameAttr;
    cb.value = item.label;

    const label = document.createElement("label");
    label.htmlFor = item.id;
    label.textContent = item.label;

    div.appendChild(cb);
    div.appendChild(label);
    container.appendChild(div);
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
  createRatingRadios();                     // 5 radios
  populateCheckboxes("featuresChecklist", featuresList, "usefulFeatures");    // 8 checkboxes
  populateCheckboxes("additionalChecklist", additionalPrefs, "additionalPrefs"); // 4 checkboxes
  setDateMax();
  updateFooterCount();
  setupValidation();

  // Optional: sync count across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "smartphoneReviewsCount") updateFooterCount();
  });
});