// Ghana static weather values
const TEMP_C = 28;
const WIND_KMH = 10;

function calculateWindChill(tempCelsius, windKmh) {
    const windPow = Math.pow(windKmh, 0.16);
    const chill = 13.12 + 0.6215 * tempCelsius - 11.37 * windPow + 0.3965 * tempCelsius * windPow;
    return Math.round(chill * 10) / 10;
}

function updateWindChillDisplay() {
    const chillSpan = document.getElementById('windchillVal');
    const chillRowSpan = document.getElementById('chillRowValue');
    let displayText = 'N/A (warm climate)';

    if (TEMP_C <= 10 && WIND_KMH > 4.8) {
        const calculated = calculateWindChill(TEMP_C, WIND_KMH);
        displayText = calculated + ' °C';
    }

    if (chillSpan) chillSpan.textContent = displayText;
    if (chillRowSpan) chillRowSpan.textContent = displayText;
}

function setFooterDynamic() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const modSpan = document.getElementById('lastModify');
    if (modSpan) {
        const lastMod = new Date(document.lastModified);
        modSpan.textContent = lastMod.toLocaleString();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateWindChillDisplay();
    setFooterDynamic();
});