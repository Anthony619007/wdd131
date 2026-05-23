// External JavaScript file - required by audit
// This adds dynamic elements and confirms Ghana focus

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ghana - Gold & Cocoa Heritage Site Loaded | Created by Anthony Anusiem');
    
    // Add gold and cocoa facts dynamically
    addDynamicContent();
    
    // Add smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Display greeting related to Ghana
    displayGreeting();
});

function addDynamicContent() {
    // Create a small dynamic facts bar
    const mainElement = document.querySelector('main');
    const factsBar = document.createElement('div');
    factsBar.className = 'dynamic-facts';
    factsBar.style.cssText = `
        background: linear-gradient(90deg, #FFD700, #8B4513);
        color: white;
        padding: 15px;
        border-radius: 10px;
        margin-bottom: 30px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
    
    const factsList = [
        "🇬🇭 Ghana means 'Warrior King'",
        "🏅 The Golden Stool is a sacred symbol of the Ashanti Kingdom",
        "🍫 Ghanaian cocoa is used in 1 out of 5 chocolate bars worldwide",
        "⭐ Ghana was the first African country to gain independence",
        "💰 Gold Coast was the former name of Ghana before independence",
        "🌱 Ghana produces some of the world's most premium cocoa beans"
    ];
    
    let factIndex = 0;
    factsBar.innerHTML = `✨ Did you know? ${factsList[0]} ✨`;
    
    // Insert at the beginning of main
    if (mainElement.firstChild) {
        mainElement.insertBefore(factsBar, mainElement.firstChild);
    } else {
        mainElement.appendChild(factsBar);
    }
    
    // Rotate facts every 5 seconds
    setInterval(() => {
        factIndex = (factIndex + 1) % factsList.length;
        factsBar.innerHTML = `✨ Did you know? ${factsList[factIndex]} ✨`;
    }, 5000);
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.textContent.toLowerCase();
            let targetSection = null;
            
            if (targetId === 'gold') {
                targetSection = document.querySelector('.gold-section');
            } else if (targetId === 'cocoa') {
                targetSection = document.querySelector('.cocoa-section');
            } else if (targetId === 'home') {
                targetSection = document.querySelector('header');
            } else if (targetId === 'culture') {
                targetSection = document.querySelector('.facts-grid');
            } else if (targetId === 'history') {
                targetSection = document.querySelector('.gold-section');
            }
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function displayGreeting() {
    const header = document.querySelector('header');
    const greeting = document.createElement('div');
    greeting.style.cssText = `
        margin-top: 20px;
        font-size: 1rem;
        opacity: 0.9;
        font-weight: 500;
    `;
    
    const hour = new Date().getHours();
    let timeGreeting = '';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    greeting.innerHTML = `${timeGreeting} to Ghana 🇬🇭 - Home of Gold and Cocoa!`;
    header.appendChild(greeting);
}

// Add a gold and cocoa counter effect on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const nav = document.querySelector('nav');
    if (scrollPosition > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    } else {
        nav.style.boxShadow = 'none';
    }
});