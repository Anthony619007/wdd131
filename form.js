const smartphoneProducts = [
  { id: 101, name: "iPhone 15 Pro" },
  { id: 102, name: "Samsung Galaxy S24 Ultra" },
  { id: 103, name: "Google Pixel 9 Pro" },
  { id: 104, name: "OnePlus 12" },
  { id: 105, name: "Sony Xperia 1 VI" },
  { id: 106, name: "Xiaomi 14 Ultra" },
  { id: 107, name: "Samsung Galaxy A55" },
  { id: 108, name: "Nothing Phone (2a)" }
];

function incrementReviewCounter() {
  let count = localStorage.getItem('smartphoneReviewCount');
  count = count ? parseInt(count, 10) : 0;
  if (isNaN(count)) count = 0;
  count++;
  localStorage.setItem('smartphoneReviewCount', count);
  console.log('Review counter: ' + count);
}

const form = document.getElementById('productReviewForm');
if (form) {
  form.addEventListener('submit', function(event) {
    const radios = document.querySelectorAll('input[name="overallRating"]');
    const rated = Array.from(radios).some(r => r.checked);
    if (!rated) {
      event.preventDefault();
      alert('Please select an overall rating (1 to 5 stars).');
      return;
    }
    const product = document.getElementById('productNameSelect');
    if (!product.value) {
      event.preventDefault();
      alert('Please choose a smartphone from the list.');
      return;
    }
    const date = document.getElementById('installDate');
    if (!date.value) {
      event.preventDefault();
      alert('Please select the date of purchase.');
      return;
    }
    incrementReviewCounter();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const dateInput = document.getElementById('installDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.max = yyyy + '-' + mm + '-' + dd;
    dateInput.min = '2020-01-01';
  }
});