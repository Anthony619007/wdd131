// Static weather values for Ghana (warm tropical climate)
const temperature = 28;  // °C
const windSpeed = 10;    // km/h

// Wind Chill calculation function (Metric: °C, km/h)
// Formula: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
function calculateWindChill(tempC, windKmh) {
    const windPower = Math.pow(windKmh, 0.16);
    const windChill = 13.12 + 0.6215 * tempC - 11.37 * windPower + 0.3965 * tempC * windPower;
    return Math.round(windChill * 10) / 10;
}

// Update wind chill display based on conditions
function updateWindChill() {
    const chillSpan = document.getElementById('windchillValue');
    const chillDisplaySpan = document.getElementById('windchillDisplay');

    let result = 'N/A';
    // Conditions for valid wind chill calculation (Metric)
    // Temperature <= 10°C AND Wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const calculated = calculateWindChill(temperature, windSpeed);
        result = calculated + ' °C';
    } else {
        result = 'N/A';
    }

    if (chillSpan) chillSpan.textContent = result;
    if (chillDisplaySpan) chillDisplaySpan.textContent = result;
}

// Update footer with current year and last modified date
function updateFooter() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const modSpan = document.getElementById('lastModified');
    if (modSpan) {
        const lastMod = new Date(document.lastModified);
        const formatted = lastMod.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        modSpan.textContent = formatted;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateWindChill();
    updateFooter();
});