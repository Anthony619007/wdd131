// Ghana Weather Static values (Celsius and km/h)
const temperatureC = 26;
const windSpeedKmph = 12;

// Calculate wind chill using metric formula
// Formula: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
// Where T in °C, V in km/h
function calculateWindChill(tempC, windKmh) {
    const windPower = Math.pow(windKmh, 0.16);
    const windChill = 13.12 + 0.6215 * tempC - 11.37 * windPower + 0.3965 * tempC * windPower;
    return Math.round(windChill * 10) / 10;
}

// Display wind chill value (only if temp <= 10°C AND wind > 4.8 km/h)
function displayWindChill() {
    const windChillElement = document.getElementById('windchill-value');
    const windChillRowElement = document.getElementById('windchill-value-row');
    
    let chillDisplay = 'N/A';
    
    if (temperatureC <= 10 && windSpeedKmph > 4.8) {
        const chillValue = calculateWindChill(temperatureC, windSpeedKmph);
        chillDisplay = `${chillValue} °C`;
    } else {
        chillDisplay = 'N/A (conditions not met)';
    }
    
    if (windChillElement) windChillElement.textContent = chillDisplay;
    if (windChillRowElement) windChillRowElement.textContent = chillDisplay;
}

// Update footer with current year and last modified date
function setFooterDates() {
    const yearSpan = document.getElementById('current-year');
    const modifiedSpan = document.getElementById('last-modified');
    
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    if (modifiedSpan) {
        const lastMod = new Date(document.lastModified);
        const formatted = lastMod.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
        modifiedSpan.textContent = formatted;
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    displayWindChill();
    setFooterDates();
});
