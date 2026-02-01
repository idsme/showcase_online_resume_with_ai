// ========================================
// Smooth Scrolling for Navigation Links
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    updateActiveLink(this);
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        updateActiveLinkOnScroll();
    });
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize mouse spotlight effect
    initSpotlightEffect();
});

// ========================================
// Update Active Navigation Link
// ========================================

function updateActiveLink(clickedLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

function updateActiveLinkOnScroll() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes(currentSection)) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Skill Bars Animation
// ========================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // Observe each skill bar
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ========================================
// Add fade-in animation on scroll
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.experience-item, .project-item, .cert-item');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
});

// ========================================
// WhatsApp CTA Tracking (Optional)
// ========================================

const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp contact initiated');
        // You can add analytics tracking here if needed
    });
});

// ========================================
// External Link Handling
// ========================================

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========================================
// Mouse Spotlight Effect
// ========================================

function initSpotlightEffect() {
    // Create the spotlight element
    const spotlight = document.createElement('div');
    spotlight.className = 'spotlight';
    document.body.insertBefore(spotlight, document.body.firstChild);
    
    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update spotlight position
        spotlight.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 80%)`;
    });
    
    // Handle touch devices (optional - shows spotlight at touch point)
    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
            
            spotlight.style.background = `radial-gradient(600px at ${mouseX}px ${mouseY}px, var(--spotlight-color), transparent 80%)`;
        }
    });
}
