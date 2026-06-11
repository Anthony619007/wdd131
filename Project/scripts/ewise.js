const STORAGE_KEYS = {
  impact: `ewise-impact`,
  center: `ewise-center`,
  requests: `ewise-requests`
};

const actionPaths = [
  {
    icon: `R`,
    title: `Repair first`,
    text: `Fixing a screen, battery, keyboard, or charger can extend a device's useful life and reduce replacement waste.`,
    link: `guide.html`
  },
  {
    icon: `D`,
    title: `Donate working devices`,
    text: `A device that still powers on may help a student, small business, or community group before it needs recycling.`,
    link: `connect.html`
  },
  {
    icon: `C`,
    title: `Recycle certified`,
    text: `End-of-life electronics should go to trained handlers who can recover metals and manage hazardous parts safely.`,
    link: `guide.html`
  }
];

const deviceImpacts = {
  phone: {
    label: `Smartphone`,
    emissions: 7,
    materials: 0.04,
    action: `remove accounts, reset the phone, then donate or recycle it`
  },
  laptop: {
    label: `Laptop`,
    emissions: 55,
    materials: 1.6,
    action: `try repair or certified refurbishment before recycling`
  },
  tablet: {
    label: `Tablet`,
    emissions: 22,
    materials: 0.45,
    action: `erase personal data and look for a reuse program`
  },
  monitor: {
    label: `Monitor`,
    emissions: 38,
    materials: 3.2,
    action: `use a certified recycler that accepts screens`
  }
};

const centers = [
  {
    id: `accra-repair`,
    name: `Accra Repair Bench`,
    region: `accra`,
    services: [`repair`, `donation`],
    hours: `Mon-Sat, 9:00 AM-5:00 PM`,
    note: `Best for phones, laptops, chargers, and data wipe support.`
  },
  {
    id: `kumasi-loop`,
    name: `Kumasi Circular Hub`,
    region: `kumasi`,
    services: [`recycling`, `donation`],
    hours: `Tue-Fri, 10:00 AM-4:00 PM`,
    note: `Accepts bulk school devices and reusable computer equipment.`
  },
  {
    id: `tema-battery`,
    name: `Tema Battery Safety Desk`,
    region: `tema`,
    services: [`battery`, `recycling`],
    hours: `Wed-Sat, 8:00 AM-3:00 PM`,
    note: `Handles swollen batteries, power banks, tablets, and damaged phones.`
  },
  {
    id: `accra-dropoff`,
    name: `Accra Community Drop-off`,
    region: `accra`,
    services: [`recycling`],
    hours: `Saturday events, 8:30 AM-1:00 PM`,
    note: `Good for mixed small electronics, cords, keyboards, and accessories.`
  }
];

const htmlEntities = {
  "&": `&amp;`,
  "<": `&lt;`,
  ">": `&gt;`,
  "\"": `&quot;`,
  "'": `&#039;`
};

function selectElement(selector) {
  return document.querySelector(selector);
}

function selectElements(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(value) {
  return `${value}`.replace(/[&<>"']/g, (character) => htmlEntities[character]);
}

function getStoredValue(key, fallback) {
  const storedValue = localStorage.getItem(key);

  if (!storedValue) {
    return fallback;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    return fallback;
  }
}

function saveStoredValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function setFooterDates() {
  const currentYear = selectElement(`#currentYear`);
  const lastModified = selectElement(`#lastModified`);

  if (currentYear) {
    currentYear.textContent = `${new Date().getFullYear()}`;
  }

  if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
  }
}

function getCurrentPageName() {
  const pageName = window.location.pathname.split(`/`).pop();
  return pageName || `index.html`;
}

function setActiveNavigation() {
  const currentPage = getCurrentPageName();

  selectElements(`.nav-list a`).forEach((link) => {
    const linkPage = new URL(link.href).pathname.split(`/`).pop();

    if (linkPage === currentPage) {
      link.setAttribute(`aria-current`, `page`);
    }
  });
}

function initNavigation() {
  const menuButton = selectElement(`.menu-toggle`);
  const navigation = selectElement(`#primary-navigation`);

  if (!menuButton || !navigation) {
    return;
  }

  menuButton.addEventListener(`click`, () => {
    const isOpen = navigation.classList.toggle(`is-open`);
    menuButton.setAttribute(`aria-expanded`, `${isOpen}`);
  });

  navigation.addEventListener(`click`, (event) => {
    if (event.target.matches(`a`)) {
      navigation.classList.remove(`is-open`);
      menuButton.setAttribute(`aria-expanded`, `false`);
    }
  });
}

function renderPathCards() {
  const pathCards = selectElement(`#pathCards`);

  if (!pathCards) {
    return;
  }

  pathCards.innerHTML = actionPaths.map((path) => `
    <article class="path-card">
      <span class="path-icon" aria-hidden="true">${path.icon}</span>
      <h3>${path.title}</h3>
      <p>${path.text}</p>
      <a class="button button-secondary" href="${path.link}">Explore ${path.title.toLowerCase()}</a>
    </article>
  `).join(``);
}

function displayImpactResult(result) {
  const resultPanel = selectElement(`#impactResult`);

  if (!resultPanel) {
    return;
  }

  if (!result) {
    resultPanel.innerHTML = `
      <h3>Saved estimate</h3>
      <p>Choose a device and run the calculator to see your result.</p>
    `;
    return;
  }

  resultPanel.innerHTML = `
    <h3>${result.count} ${result.label}${result.count > 1 ? `s` : ``}</h3>
    <p>${result.summary}</p>
    <div class="metric-row">
      <p><strong>${result.emissions} kg</strong> estimated emissions avoided</p>
      <p><strong>${result.materials} kg</strong> materials kept in recovery</p>
    </div>
    <p class="status-pill">Next step: ${result.action}</p>
  `;
}

function calculateImpact(deviceType, count) {
  const device = deviceImpacts[deviceType];
  const safeCount = Number.isNaN(count) || count < 1 ? 1 : count;
  const emissions = Math.round(device.emissions * safeCount);
  const materials = Number((device.materials * safeCount).toFixed(2));

  return {
    label: device.label,
    count: safeCount,
    emissions,
    materials,
    action: device.action,
    summary: `Responsible handling gives each ${device.label.toLowerCase()} a better path than storage or landfill disposal.`
  };
}

function initImpactForm() {
  const impactForm = selectElement(`#impactForm`);

  if (!impactForm) {
    return;
  }

  displayImpactResult(getStoredValue(STORAGE_KEYS.impact, null));

  impactForm.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const deviceType = selectElement(`#deviceType`).value;
    const count = parseInt(selectElement(`#deviceCount`).value, 10);
    const result = calculateImpact(deviceType, count);

    saveStoredValue(STORAGE_KEYS.impact, result);
    displayImpactResult(result);
  });
}

function getRecommendation(condition, dataStatus) {
  let title = `Use a certified recycler`;
  let steps = [`Remove accessories and keep batteries visible for staff.`, `Choose a recycler that documents safe handling.`];
  let isWarning = false;

  if (condition === `working`) {
    title = `Donate or resell the device`;
    steps = [`Confirm the device powers on and charges.`, `Include only safe chargers and accessories.`, `Ask for a donation receipt if available.`];
  } else if (condition === `repairable`) {
    title = `Try repair before recycling`;
    steps = [`Check whether the battery, screen, charger, or keyboard can be replaced.`, `Compare repair cost with the value of extended use.`, `Recycle only if repair is not practical.`];
  } else if (condition === `battery`) {
    title = `Handle the battery as a safety risk`;
    steps = [`Do not charge, press, or puncture the device.`, `Keep it cool and away from flammable items.`, `Take it to a battery-trained collection desk.`];
    isWarning = true;
  }

  if (dataStatus === `not-wiped`) {
    steps.unshift(`Back up files and erase personal data before the device leaves your hands.`);
  }

  return { title, steps, isWarning };
}

function displayRecommendation(recommendation) {
  const output = selectElement(`#recommendationOutput`);

  if (!output) {
    return;
  }

  output.classList.toggle(`warning`, recommendation.isWarning);
  output.innerHTML = `
    <h3>${recommendation.title}</h3>
    <ul class="check-list">
      ${recommendation.steps.map((step) => `<li>${step}</li>`).join(``)}
    </ul>
  `;
}

function initDecisionForm() {
  const decisionForm = selectElement(`#decisionForm`);

  if (!decisionForm) {
    return;
  }

  decisionForm.addEventListener(`submit`, (event) => {
    event.preventDefault();

    const condition = selectElement(`#condition`).value;
    const dataStatus = selectElement(`#dataStatus`).value;
    const recommendation = getRecommendation(condition, dataStatus);

    displayRecommendation(recommendation);
  });
}

function displaySavedCenter() {
  const note = selectElement(`#savedCenterNote`);
  const savedCenter = getStoredValue(STORAGE_KEYS.center, null);

  if (!note) {
    return;
  }

  note.textContent = savedCenter ? `Saved partner: ${savedCenter.name} in ${savedCenter.region}.` : `No partner saved yet.`;
}

function renderCenters() {
  const list = selectElement(`#centerList`);
  const regionFilter = selectElement(`#regionFilter`);
  const serviceFilter = selectElement(`#serviceFilter`);

  if (!list || !regionFilter || !serviceFilter) {
    return;
  }

  const region = regionFilter.value;
  const service = serviceFilter.value;
  const filteredCenters = centers.filter((center) => {
    const matchesRegion = region === `all` || center.region === region;
    const matchesService = service === `all` || center.services.includes(service);
    return matchesRegion && matchesService;
  });

  if (filteredCenters.length === 0) {
    list.innerHTML = `<p class="empty-state">No partners match those filters. Try another region or service.</p>`;
    return;
  }

  list.innerHTML = filteredCenters.map((center) => `
    <article class="partner-card">
      <h3>${center.name}</h3>
      <p class="mini-meta">${center.region.toUpperCase()} | ${center.hours}</p>
      <p>${center.note}</p>
      <ul class="tag-list">
        ${center.services.map((serviceName) => `<li>${serviceName}</li>`).join(``)}
      </ul>
      <button class="button button-secondary favorite-button" type="button" data-center-id="${center.id}">Save partner</button>
    </article>
  `).join(``);
}

function initCenterFilters() {
  const list = selectElement(`#centerList`);
  const regionFilter = selectElement(`#regionFilter`);
  const serviceFilter = selectElement(`#serviceFilter`);

  if (!list || !regionFilter || !serviceFilter) {
    return;
  }

  regionFilter.addEventListener(`change`, renderCenters);
  serviceFilter.addEventListener(`change`, renderCenters);

  list.addEventListener(`click`, (event) => {
    const button = event.target.closest(`.favorite-button`);

    if (!button) {
      return;
    }

    const selectedCenter = centers.find((center) => center.id === button.dataset.centerId);

    if (selectedCenter) {
      saveStoredValue(STORAGE_KEYS.center, selectedCenter);
      displaySavedCenter();
    }
  });

  renderCenters();
  displaySavedCenter();
}

function createRequestFromForm(form) {
  const formData = new FormData(form);

  return {
    id: Date.now(),
    name: formData.get(`fullName`),
    email: formData.get(`email`),
    phone: formData.get(`phone`) || `Not provided`,
    type: formData.get(`requestType`),
    details: formData.get(`deviceDetails`),
    community: formData.get(`community`),
    date: formData.get(`preferredDate`) || `Flexible`,
    created: new Date().toLocaleDateString()
  };
}

function renderRequests() {
  const requestList = selectElement(`#requestList`);
  const clearButton = selectElement(`#clearRequests`);
  const requests = getStoredValue(STORAGE_KEYS.requests, []);

  if (!requestList || !clearButton) {
    return;
  }

  if (requests.length === 0) {
    requestList.innerHTML = `<p>No requests saved yet.</p>`;
    clearButton.hidden = true;
    return;
  }

  clearButton.hidden = false;
  requestList.innerHTML = requests.map((request) => `
    <article class="saved-item">
      <h3>${escapeHtml(request.name)} - ${escapeHtml(request.type)}</h3>
      <p class="saved-detail">${escapeHtml(request.community)} | Preferred date: ${escapeHtml(request.date)}</p>
      <p>${escapeHtml(request.details)}</p>
      <p class="mini-meta">Saved ${escapeHtml(request.created)} | ${escapeHtml(request.email)} | ${escapeHtml(request.phone)}</p>
    </article>
  `).join(``);
}

function initSupportForm() {
  const supportForm = selectElement(`#supportForm`);
  const clearButton = selectElement(`#clearRequests`);

  if (!supportForm || !clearButton) {
    return;
  }

  supportForm.addEventListener(`submit`, (event) => {
    event.preventDefault();

    if (!supportForm.checkValidity()) {
      supportForm.reportValidity();
      return;
    }

    const savedRequests = getStoredValue(STORAGE_KEYS.requests, []);
    const request = createRequestFromForm(supportForm);
    const updatedRequests = [request, ...savedRequests].slice(0, 4);

    saveStoredValue(STORAGE_KEYS.requests, updatedRequests);
    supportForm.reset();
    renderRequests();
  });

  clearButton.addEventListener(`click`, () => {
    localStorage.removeItem(STORAGE_KEYS.requests);
    renderRequests();
  });

  renderRequests();
}

setFooterDates();
setActiveNavigation();
initNavigation();
renderPathCards();
initImpactForm();
initDecisionForm();
initCenterFilters();
initSupportForm();
