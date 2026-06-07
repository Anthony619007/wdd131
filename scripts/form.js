const productArray = [
  { id: "ph_001", name: "Galaxy Nexus X" },
  { id: "ph_002", name: "iPhone 15 Pro Max" },
  { id: "ph_003", name: "Pixel 9 Ultra" },
  { id: "ph_004", name: "OnePlus 12T" },
  { id: "ph_005", name: "Xiaomi 14 Pro" },
  { id: "ph_006", name: "Nothing Phone (3)" },
  { id: "ph_007", name: "Sony Xperia 5 V" }
];

const featuresList = [
  { id: "feat_dura", name: "Durability", value: "Durability" },
  { id: "feat_ease", name: "Ease of Use", value: "Ease of Use" },
  { id: "feat_perf", name: "Performance", value: "Performance" },
  { id: "feat_design", name: "Design", value: "Design" }
];

function populateProductSelect() {
  const selectEl = document.getElementById("productName");
  if (!selectEl) return;
  // Keep the disabled placeholder, remove any previous dynamic options
  const options = selectEl.querySelectorAll('option');
  for (let i = options.length - 1; i >= 0; i--) {
    if (options[i].value !== "") options[i].remove();
  }
  productArray.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    selectEl.appendChild(option);
  });
}

function populateStars() {
  const container = document.getElementById("starRatingWidget");
  if (!container) return;
  container.innerHTML = "";
  for (let i = 5; i >= 1; i--) {
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "ratingValue";
    radio.id = `star${i}`;
    radio.value = i;
    radio.required = true;
    const label = document.createElement("label");
    label.htmlFor = `star${i}`;
    label.textContent = "★";
    label.title = `${i} star${i > 1 ? 's' : ''}`;
    container.appendChild(radio);
    container.appendChild(label);
  }
}

function populateCheckboxes() {
  const container = document.getElementById("featuresChecklist");
  if (!container) return;
  container.innerHTML = "";
  featuresList.forEach(feature => {
    const div = document.createElement("div");
    div.className = "checkbox-item";
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.id = feature.id;
    cb.name = "usefulFeatures";
    cb.value = feature.value;
    const label = document.createElement("label");
    label.htmlFor = feature.id;
    label.textContent = feature.name;
    div.appendChild(cb);
    div.appendChild(label);
    container.appendChild(div);
  });
}

function setDateMax() {
  const dateInput = document.getElementById("installDate");
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
  }
}

function updateFooterCount() {
  const count = localStorage.getItem("smartphoneReviewsCount");
  const total = count ? parseInt(count, 10) : 0;
  const span = document.getElementById("reviewCountDisplay");
  if (span) span.textContent = `Reviews: ${total}`;
}

function setupValidation() {
  const form = document.getElementById("phoneReviewForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    const radios = document.querySelectorAll('input[name="ratingValue"]');
    let ratingSelected = false;
    for (let r of radios) if (r.checked) { ratingSelected = true; break; }
    if (!ratingSelected) {
      e.preventDefault();
      alert("Please select an overall rating (1 to 5 stars).");
      return;
    }
    const product = document.getElementById("productName").value;
    if (!product) {
      e.preventDefault();
      alert("Please select a smartphone product.");
      return;
    }
    const date = document.getElementById("installDate").value;
    if (!date) {
      e.preventDefault();
      alert("Please select the date of installation.");
      return;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  populateStars();
  populateCheckboxes();
  setDateMax();
  updateFooterCount();
  setupValidation();
  window.addEventListener("storage", (e) => {
    if (e.key === "smartphoneReviewsCount") updateFooterCount();
  });
});