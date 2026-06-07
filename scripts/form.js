
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

	const select = document.getElementById("productNameSelect");
	if (select) {
		products.forEach(product => {
			const option = document.createElement("option");
			option.value = product;
			option.textContent = product;
			select.appendChild(option);
		});
	}

	const ratingContainer = document.getElementById("starsRatingContainer");
	if (ratingContainer) {
		for (let i = 1; i <= 5; i++) {
			const input = document.createElement('input');
			input.type = 'radio';
			input.name = 'rating';
			input.id = `star${i}`;
			input.value = String(i);

			const label = document.createElement('label');
			label.htmlFor = input.id;
			label.title = `${i} Star${i > 1 ? 's' : ''}`;
			label.textContent = `${i} Star${i > 1 ? 's' : ''}`;

			ratingContainer.appendChild(input);
			ratingContainer.appendChild(label);
		}
	}

	const features = [
		"Durability",
		"Ease of Use",
		"Performance",
		"Design"
	];

	const checkboxContainer = document.getElementById("featuresChecklist");
	if (checkboxContainer) {
		features.forEach((feature, idx) => {
			const wrapper = document.createElement('div');

			const input = document.createElement('input');
			input.type = 'checkbox';
			input.id = `feature_${idx}`;
			input.name = 'features';
			input.value = feature;

			const label = document.createElement('label');
			label.htmlFor = input.id;
			label.textContent = feature;

			wrapper.appendChild(input);
			wrapper.appendChild(label);
			checkboxContainer.appendChild(wrapper);
		});
	}

	console.log("Form loaded successfully");
});
