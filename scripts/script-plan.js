/**
 * eWiseHome - Website Planning Document
 * Interactive JavaScript for enhanced user experience
 * Includes dynamic messages, decision tree preview, timestamp, and interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. EXTRA TIP TOGGLE (dynamic message)
    // ============================================
    const toggleBtn = document.getElementById('toggleMessageBtn');
    const extraTipSpan = document.getElementById('extraTipMessage');
    
    if (toggleBtn && extraTipSpan) {
        toggleBtn.addEventListener('click', function() {
            if (extraTipSpan.style.display === 'none' || extraTipSpan.style.display === '') {
                extraTipSpan.style.display = 'block';
                extraTipSpan.innerHTML = '✨ Extra tip: Did you know? Extending the life of your phone by just one year reduces its carbon footprint by 30%! 🌍';
                toggleBtn.textContent = '🙌 Hide tip';
            } else {
                extraTipSpan.style.display = 'none';
                toggleBtn.textContent = '💡 Show extra tip';
            }
        });
    }
    
    // ============================================
    // 2. DECISION TREE PREVIEW (interactive demo)
    // ============================================
    const demoTreeBtn = document.getElementById('demoTreeBtn');
    const treeResultDiv = document.getElementById('treeDemoResult');
    
    if (demoTreeBtn && treeResultDiv) {
        demoTreeBtn.addEventListener('click', function() {
            if (treeResultDiv.style.display === 'none' || treeResultDiv.style.display === '') {
                treeResultDiv.style.display = 'block';
                treeResultDiv.innerHTML = `
                    <strong>🌳 Decision Tree Preview:</strong><br>
                    ┌─────────────────────────────────┐<br>
                    │ 1️⃣ Is the device still working? │<br>
                    └─────────────┬───────────────────┘<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── ✅ YES → Keep / Donate / Sell<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ❌ NO → Can it be repaired?<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 🔧 YES → Find repair guide<br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ♻️ NO → Recycle responsibly<br>
                    <br><span style="color:#2B6E3C;">👉 Final website will have full interactive flowchart!</span>
                `;
                demoTreeBtn.textContent = '🔽 Hide decision tree';
            } else {
                treeResultDiv.style.display = 'none';
                demoTreeBtn.textContent = '🔍 Preview decision logic';
            }
        });
        // Initially hidden
        treeResultDiv.style.display = 'none';
    }
    
    // ============================================
    // 3. RESOURCE SAMPLE (show sample recycling resource)
    // ============================================
    const resourceBtn = document.getElementById('showResourceTip');
    const resourceSampleDiv = document.getElementById('resourceSample');
    
    if (resourceBtn && resourceSampleDiv) {
        resourceBtn.addEventListener('click', function() {
            if (resourceSampleDiv.style.display === 'none' || resourceSampleDiv.style.display === '') {
                resourceSampleDiv.style.display = 'block';
                resourceSampleDiv.innerHTML = `
                    📍 <strong>Certified E-waste Recycler Example:</strong><br>
                    • <strong>Call2Recycle</strong> - Battery & cell phone recycling drop-off locator<br>
                    • <strong>Best Buy Electronics Recycling</strong> - Free recycling for most electronics<br>
                    • <strong>Local E-Stewards</strong> - Find certified responsible recyclers near you<br>
                    <em>All resources will be linked on the final website with interactive maps.</em>
                `;
                resourceBtn.textContent = '📖 Hide resource sample';
            } else {
                resourceSampleDiv.style.display = 'none';
                resourceBtn.textContent = '📘 Show sample resource';
            }
        });
        resourceSampleDiv.style.display = 'none';
    }
    
    // ============================================
    // 4. LIVE TIMESTAMP (dynamic date & time)
    // ============================================
    const timestampSpan = document.getElementById('liveTimestamp');
    
    function updateTimestamp() {
        if (timestampSpan) {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            const formattedDate = now.toLocaleDateString('en-US', options);
            timestampSpan.innerHTML = `📅 Planning document last refreshed: ${formattedDate}`;
        }
    }
    
    updateTimestamp();
    // Update every minute (optional, keeps it fresh)
    setInterval(updateTimestamp, 60000);
    
    // ============================================
    // 5. ADD SMOOTH SCROLLING FOR BETTER UX
    // ============================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ============================================
    // 6. CONSOLE LOG TO CONFIRM JS LOADED
    // ============================================
    console.log('✅ eWiseHome site plan JS loaded successfully | Interactive features active');
    
    // ============================================
    // 7. ADD KEYBOARD ACCESSIBILITY TO BUTTONS
    // ============================================
    const interactiveButtons = document.querySelectorAll('.demo-interact, .toggle-message-btn');
    interactiveButtons.forEach(btn => {
        btn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        btn.setAttribute('tabindex', '0');
    });
    
    // ============================================
    // 8. SCENARIO HOVER EFFECT (subtle enhancement)
    // ============================================
    const scenarioCards = document.querySelectorAll('.scenario-card');
    scenarioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
    
    // ============================================
    // 9. COLOR SCHEMA INTERACTIVE DEMO (optional)
    // ============================================
    const colorSwatches = document.querySelectorAll('.swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const bgColor = this.style.backgroundColor;
            if (bgColor) {
                // Just a fun little feedback - copy color to clipboard?
                const tempDiv = document.createElement('div');
                tempDiv.textContent = `Color: ${bgColor}`;
                tempDiv.style.position = 'fixed';
                tempDiv.style.bottom = '20px';
                tempDiv.style.right = '20px';
                tempDiv.style.backgroundColor = '#1E2F2F';
                tempDiv.style.color = 'white';
                tempDiv.style.padding = '8px 16px';
                tempDiv.style.borderRadius = '40px';
                tempDiv.style.fontSize = '12px';
                tempDiv.style.zIndex = '9999';
                tempDiv.style.opacity = '0.9';
                document.body.appendChild(tempDiv);
                setTimeout(() => {
                    tempDiv.remove();
                }, 1500);
            }
        });
    });
    
    // ============================================
    // 10. ADD WIREFRAME TOOLTIP (simple helper)
    // ============================================
    const wireframeItems = document.querySelectorAll('.wireframe-item');
    wireframeItems.forEach(item => {
        item.addEventListener('focusin', () => {});
    });
    
    // ============================================
    // 11. DARK MODE ALERT (just for fun - not stored)
    // ============================================
    // Not implementing full dark mode but showing readiness
    
    // ============================================
    // 12. ACCESSIBILITY: ARIA labels enhancement
    // ============================================
    const buttonsWithoutLabel = document.querySelectorAll('button:not([aria-label])');
    buttonsWithoutLabel.forEach(btn => {
        if (btn.textContent.includes('Show') || btn.textContent.includes('Preview')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    console.log('🎨 Color schema and typography applied | Interactive widgets ready');
});