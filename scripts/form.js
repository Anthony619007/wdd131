// ─── Star Rating ────────────────────────────────────────────────────────────
(function buildStars() {
  const container = document.getElementById("starsRatingContainer");
  if (!container) return;

  for (let i = 1; i <= 5; i++) {
    // Radio input
    const input = document.createElement("input");
    input.type  = "radio";
    input.name  = "overallRating";
    input.id    = "star" + i;
    input.value = i;
    input.required = true;

    // Label with star emoji
    const label = document.createElement("label");
    label.htmlFor   = "star" + i;
    label.textContent = "★";
    label.setAttribute("aria-label", i + " star" + (i > 1 ? "s" : ""));

    container.appendChild(input);
    container.appendChild(label);
  }
})();

// ─── Features Checklist ──────────────────────────────────────────────────────
(function buildFeatures() {
  const container = document.getElementById("featuresChecklist");
  if (!container) return;

  const features = [
    { value: "crispy-crust",     label: "Crispy Crust"       },
    { value: "rich-sauce",       label: "Rich Sauce"         },
    { value: "fresh-toppings",   label: "Fresh Toppings"     },
    { value: "generous-cheese",  label: "Generous Cheese"    },
    { value: "good-value",       label: "Good Value"         },
    { value: "fast-delivery",    label: "Fast Delivery"      },
    { value: "great-packaging",  label: "Great Packaging"    },
  ];

  features.forEach(function (feat) {
    const wrapper = document.createElement("div");
    wrapper.className = "checkbox-item";

    const input = document.createElement("input");
    input.type  = "checkbox";
    input.name  = "features";
    input.id    = feat.value;
    input.value = feat.value;

    const label = document.createElement("label");
    label.htmlFor     = feat.value;
    label.textContent = feat.label;

    wrapper.appendChild(input);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
})();