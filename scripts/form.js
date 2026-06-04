// --------------------------------------------------------------
// PRODUCT ARRAY (pizza products)
// Value attribute = product name as required.
// --------------------------------------------------------------
const pizzaProducts = [
  { id: 101, name: "Margherita Classic" },
  { id: 102, name: "Pepperoni Blaze" },
  { id: 103, name: "Quattro Formaggi" },
  { id: 104, name: "Diavola Inferno" },
  { id: 105, name: "Veggie Supreme" },
  { id: 106, name: "BBQ Chicken Crunch" },
  { id: 107, name: "Pesto Genovese" },
  { id: 108, name: "Hawaiian Luau" }
];

// --------------------------------------------------------------
// USEFUL FEATURES CHECKBOXES DATA
// --------------------------------------------------------------
const featuresList = [
  { id: "featureDurability", name: "durability", label: "Durability", value: "Durability" },
  { id: "featureEase", name: "easeOfUse", label: "Ease of Use", value: "Ease of Use" },
  { id: "featurePerformance", name: "performance", label: "Performance", value: "Performance" },
  { id: "featureDesign", name: "design", label: "Design", value: "Design" }
];

// --------------------------------------------------------------
// 1. POPULATE PRODUCT NAME SELECT (dynamic options)
// --------------------------------------------------------------
function populateProductSelect() {
  const selectEl = document.getElementById('productNameSelect');
  if (!selectEl) return;

  selectEl.innerHTML = '';

  // Placeholder option: disabled, selected, instructional text
  const placeholderOption = document.createElement('option');
  placeholderOption.textContent = "Select a Product ...";
  placeholderOption.value = "";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  selectEl.appendChild(placeholderOption);

  // Dynamic options from product array: value = product name
  pizzaProducts.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.textContent = product.name;
    selectEl.appendChild(option);
  });
}

// --------------------------------------------------------------
// 2. POPULATE STARS RATING (radio buttons, 1-5)
//    All radios share the same name "overallRating" for mutual exclusivity.
//    Why same name? Radio buttons with the same name attribute form a group,
//    allowing only one selection at a time so only one rating value is submitted.
// --------------------------------------------------------------
function populateStarsRating() {
  const container = document.getElementById('starsRatingContainer');
  if (!container) return;

  container.innerHTML = '';
  const ratingName = "overallRating";

  for (let i = 1; i <= 5; i++) {
    const starWrapper = document.createElement('label');
    starWrapper.className = 'star-option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = ratingName;
    radio.value = i;
    radio.id = `rating_${i}`;
    radio.required = true;

    const starSpan = document.createElement('span');
    starSpan.textContent = '★'.repeat(i) + '☆'.repeat(5 - i);

    starWrapper.appendChild(radio);
    starWrapper.appendChild(starSpan);
    container.appendChild(starWrapper);
  }
}

// --------------------------------------------------------------
// 3. POPULATE USEFUL FEATURES CHECKBOXES
// --------------------------------------------------------------
function populateCheckboxes() {
  const container = document.getElementById('featuresChecklist');
  if (!container) return;

  container.innerHTML = '';

  featuresList.forEach(feature => {
    const checkboxItem = document.createElement('label');
    checkboxItem.className = 'checkbox-item';

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = feature.id;
    cb.name = feature.name;
    cb.value = feature.value;

    const textSpan = document.createElement('span');
    textSpan.textContent = feature.label;

    checkboxItem.appendChild(cb);
    checkboxItem.appendChild(textSpan);
    container.appendChild(checkboxItem);
  });
}

// --------------------------------------------------------------
// 4. LOCALSTORAGE REVIEW COUNTER
//    Increments each time the form is successfully submitted.
// --------------------------------------------------------------
function incrementReviewCounter() {
  let currentCount = localStorage.getItem('pizzaReviewCount');
  if (currentCount === null) {
    currentCount = 0;
  } else {
    currentCount = parseInt(currentCount, 10);
    if (isNaN(currentCount)) currentCount = 0;
  }
  currentCount++;
  localStorage.setItem('pizzaReviewCount', currentCount);
  console.log(`Review counter incremented to ${currentCount}. Total reviews submitted.`);
}

// --------------------------------------------------------------
// 5. FORM VALIDATION & SUBMIT HANDLER
// --------------------------------------------------------------
function setupFormHandler() {
  const form = document.getElementById('productReviewForm');
  if (!form) return;

  form.addEventListener('submit', function(event) {
    // Validate radio rating group
    const radioGroup = document.querySelectorAll('input[name="overallRating"]');
    let ratingSelected = false;
    for (let radio of radioGroup) {
      if (radio.checked) {
        ratingSelected = true;
        break;
      }
    }
    if (!ratingSelected) {
      event.preventDefault();
      alert('Please select an overall rating (1 to 5 stars).');
      return;
    }

    // Validate product selection (not placeholder)
    const productSelect = document.getElementById('productNameSelect');
    if (productSelect && (!productSelect.value || productSelect.value === "")) {
      event.preventDefault();
      alert('Please choose a pizza product from the list.');
      return;
    }

    // Validate date
    const installDate = document.getElementById('installDate');
    if (!installDate.value) {
      event.preventDefault();
      alert('Please select the date of installation.');
      return;
    }

    // All validations passed — increment counter before redirect
    incrementReviewCounter();
  });
}

// --------------------------------------------------------------
// 6. SETUP DATE INPUT CONSTRAINTS
// --------------------------------------------------------------
function setupDateConstraints() {
  const dateInput = document.getElementById('installDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.max = `${yyyy}-${mm}-${dd}`;
    dateInput.min = "2020-01-01";
  }
}

// --------------------------------------------------------------
// 7. INITIALIZE EVERYTHING ON DOM READY
// --------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  populateProductSelect();
  populateStarsRating();
  populateCheckboxes();
  setupDateConstraints();
  setupFormHandler();

  console.log("Form ready: All radio rating buttons share name='overallRating' to enforce single selection and proper form data submission.");
});