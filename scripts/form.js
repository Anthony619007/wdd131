const products = [
    "iPhone 15 Pro",
    "Samsung Galaxy S24 Ultra",
    "Google Pixel 9 Pro",
    "OnePlus 12",
    "Sony Xperia 1 VI",
    "Xiaomi 14 Ultra",
    "Samsung Galaxy A55",
    "Nothing Phone (2a)"
];

document.addEventListener("DOMContentLoaded", () => {

    // Populate product select dropdown
    const select = document.getElementById("productNameSelect");
    if (select) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product;
            option.textContent = product;
            select.appendChild(option);
        });
    }

    // Create 5 radio inputs for star rating
    const ratingContainer = document.getElementById("starsRatingContainer");
    if (ratingContainer) {
        ratingContainer.innerHTML = "";
        for (let i = 5; i >= 1; i--) {
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'rating';
            radio.id = `star${i}`;
            radio.value = String(i);
            radio.required = (i === 5);

            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.title = `${i} Star${i > 1 ? 's' : ''}`;
            label.setAttribute('aria-label', `${i} Star${i > 1 ? 's' : ''}`);

            ratingContainer.appendChild(radio);
            ratingContainer.appendChild(label);
        }
    }

    // Create at least 4 checkboxes for useful features
    const features = [
        "Durability",
        "Ease of Use",
        "Performance",
        "Design"
    ];

    const checkboxContainer = document.getElementById("featuresChecklist");
    if (checkboxContainer) {
        checkboxContainer.innerHTML = "";
        features.forEach((feature, idx) => {
            const wrapper = document.createElement('div');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `feature_${idx}`;
            checkbox.name = 'features';
            checkbox.value = feature;
            
            const label = document.createElement('label');
            label.htmlFor = checkbox.id;
            label.textContent = feature;
            
            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);
            checkboxContainer.appendChild(wrapper);
        });
    }

    // Set max date for installation date picker
    const installDateInput = document.getElementById("installDate");
    if (installDateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        installDateInput.max = `${yyyy}-${mm}-${dd}`;
    }

    // Form validation
    const form = document.getElementById("productReviewForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            const ratingRadios = document.querySelectorAll('input[name="rating"]');
            let ratingSelected = false;
            for (let radio of ratingRadios) {
                if (radio.checked) {
                    ratingSelected = true;
                    break;
                }
            }
            
            if (!ratingSelected) {
                event.preventDefault();
                alert("Please select an overall rating (1 to 5 stars).");
                return false;
            }
            
            const productValue = select.value;
            if (!productValue) {
                event.preventDefault();
                alert("Please select a product.");
                return false;
            }
            
            const installDate = installDateInput.value;
            if (!installDate) {
                event.preventDefault();
                alert("Please enter the date of installation.");
                return false;
            }
            
            return true;
        });
    }

    console.log("Form loaded successfully");
});