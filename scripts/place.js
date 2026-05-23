// External JavaScript file - required by audit
// Ghana - Land of Gold and Cocoa
// Created by Anthony Anusiem

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Ghana - Gold & Cocoa Heritage Site Loaded | Created by Anthony Anusiem');
    
    // Add dynamic facts bar
    addDynamicContent();
    
    // Add smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Display greeting related to Ghana
    displayGreeting();
    
    // Add scroll shadow effect
    setupScrollEffect();
});

function addDynamicContent() {
    const mainElement = document.querySelector('main');
    const factsBar = document.createElement('div');
    factsBar.className = 'dynamic-facts';
    
    const factsList = [
        "🇬🇭 Ghana means 'Warrior King'",
        "🏅 The Golden Stool is a sacred symbol of the Ashanti Kingdom",
        "🍫 Ghanaian cocoa is used in 1 out of 5 chocolate bars worldwide",
        "⭐ Ghana was the first African country to gain independence",
        "💰 Gold Coast was the former name of Ghana before independence",
        "🌱 Ghana produces some of the world's most premium cocoa beans"
    ];
    
    let factIndex = 0;
    factsBar.innerHTML = '✨ Did you know? ' + factsList[0] + ' ✨';
    
    if (mainElement.firstChild) {
        mainElement.insertBefore(factsBar, mainElement.firstChild);
    } else {
        mainElement.appendChild(factsBar);
    }
    
    setInterval(function() {
        factIndex = (factIndex + 1) % factsList.length;
        factsBar.innerHTML = '✨ Did you know? ' + factsList[factIndex] + ' ✨';
    }, 5000);
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.textContent.toLowerCase();
            var targetSection = null;
            
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
    var header = document.querySelector('header');
    var greeting = document.createElement('div');
    greeting.style.cssText = 'margin-top: 20px; font-size: 1rem; opacity: 0.9; font-weight: 500;';
    
    var hour = new Date().getHours();
    var timeGreeting = '';
    if (hour < 12) {
        timeGreeting = 'Good morning';
    } else if (hour < 18) {
        timeGreeting = 'Good afternoon';
    } else {
        timeGreeting = 'Good evening';
    }
    
    greeting.innerHTML = timeGreeting + ' to Ghana 🇬🇭 - Home of Gold and Cocoa!';
    header.appendChild(greeting);
}

function setupScrollEffect() {
    window.addEventListener('scroll', function() {
        var nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}