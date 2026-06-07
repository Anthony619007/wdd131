// --------------------------------------------------------------
// Smartphone product array
const pizzaProducts = [
  { id: 101, name: "iPhone 15 Pro" },
  { id: 102, name: "Samsung Galaxy S24 Ultra" },
  { id: 103, name: "Google Pixel 9 Pro" },
  { id: 104, name: "OnePlus 12" },
  { id: 105, name: "Sony Xperia 1 VI" },
  { id: 106, name: "Xiaomi 14 Ultra" },
  { id: 107, name: "Samsung Galaxy A55" },
  { id: 108, name: "Nothing Phone (2a)" }
];

// --------------------------------------------------------------
// localStorage counter
function incrementReviewCounter() {
  let currentCount = localStorage.getItem('smartphoneReviewCount');
  if (currentCount === null) {
    currentCount = 0;
  } else {
    currentCount = parseInt(currentCount, 10);
    if (isNaN(currentCount)) currentCount = 0;
  }
  currentCount++;
  localStorage.setItem('smartphoneReviewCount', currentCount);
  console.log('Review counter incremented to ' + currentCount + '. Total reviews submitted.');
}

// --------------------------------------------------------------
// Form submission validation
const form = document.getElementById('productReviewForm');
if (form) {
  form.addEventListener('submit', function(event) {
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

    const productSelect = document.getElementById('productNameSelect');
    if (productSelect && (!productSelect.value || productSelect.value === "")) {
      event.preventDefault();
      alert('Please choose a smartphone from the list.');
      return;
    }

    const installDate = document.getElementById('installDate');
    if (!installDate.value) {
      event.preventDefault();
      alert('Please select the date of purchase.');
      return;
    }

    incrementReviewCounter();
  });
}

// --------------------------------------------------------------
// On page load: set date limits
document.addEventListener('DOMContentLoaded', function() {
  const dateInput = document.getElementById('installDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.max = yyyy + '-' + mm + '-' + dd;
    dateInput.min = "2020-01-01";
  }
});

console.log("Form ready: All radio rating buttons share name='overallRating' to enforce single selection.");