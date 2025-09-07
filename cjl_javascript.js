// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll('.service-card, .stat, .value, .story-card, .impact-stat, .step');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current + (element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '');
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const text = element.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number) {
                animateCounter(element, number);
                counterObserver.unobserve(element);
            }
        }
    });
}, { threshold: 0.5 });

// Observe all counter elements
document.querySelectorAll('.stat h3, .stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Form Submission Handlers
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.interest) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

const mediationForm = document.getElementById('mediation-inquiry-form');
if (mediationForm) {
    mediationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(mediationForm);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.email || !data.role) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        showNotification('Your inquiry has been submitted. We\'ll contact you within 24 hours.', 'success');
        mediationForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add styles
    const styles = {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '500',
        zIndex: '9999',
        minWidth: '300px',
        maxWidth: '500px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    };
    
    Object.assign(notification.style, styles);
    
    // Set background color based on type
    const colors = {
        success: '#48bb78',
        error: '#f56565',
        warning: '#ed8936',
        info: '#4299e1'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px !important;
            left: 10px !important;
            min-width: auto !important;
            max-width: none !important;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Image placeholder hover effects
document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    placeholder.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    placeholder.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Process step animations
const processSteps = document.querySelectorAll('.step');
processSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
});

const processObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

processSteps.forEach(step => {
    processObserver.observe(step);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.footer-bottom p');
yearElements.forEach(element => {
    element.innerHTML = element.innerHTML.replace('2024', currentYear);
});

// Loading animation for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't add loading state for navigation links
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            return;
        }
        
        // Don't add loading state for external links or page navigation
        if (this.getAttribute('href') && (this.getAttribute('href').startsWith('http') || this.getAttribute('href').endsWith('.html'))) {
            return;
        }
        
        // Only add loading state for form submissions
        if (this.type === 'submit') {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Simulate form processing
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Trigger form submission
                const form = this.closest('form');
                if (form) {
                    const event = new Event('submit', { cancelable: true, bubbles: true });
                    form.dispatchEvent(event);
                }
            }, 1000);
        }
    });
});

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    
    const progressBarStyles = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '0%',
        height: '3px',
        background: 'linear-gradient(90deg, #2b6cb0, #3182ce)',
        zIndex: '9999',
        transition: 'width 0.1s ease'
    };
    
    Object.assign(progressBar.style, progressBarStyles);
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
        
        // Also close any notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Focus management for mobile menu
const navToggle = document.getElementById('nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', function() {
        const navMenu = document.getElementById('nav-menu');
        
        // If menu is now open, focus first link
        setTimeout(() => {
            if (navMenu.classList.contains('active')) {
                const firstLink = navMenu.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }
        }, 300);
    });
}

// Lazy loading for image placeholders (simulated)
const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const placeholder = entry.target;
            placeholder.classList.add('loaded');
            
            // Add a subtle fade-in effect
            placeholder.style.animation = 'fadeIn 0.5s ease';
            
            imageObserver.unobserve(placeholder);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('.image-placeholder').forEach(placeholder => {
    imageObserver.observe(placeholder);
});

// Add fade-in keyframes
const fadeInKeyframes = document.createElement('style');
fadeInKeyframes.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0.7;
            transform: scale(0.98);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .image-placeholder.loaded {
        background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
    }
`;
document.head.appendChild(fadeInKeyframes);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Navbar background
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
}, 10);

// Replace the original scroll event listener
window.removeEventListener('scroll', arguments.callee);
window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

// Console message for developers
console.log(`
🌟 Community Justice League Website
Built with modern web standards and accessibility in mind.
Interested in contributing or learning more about restorative justice?
Contact us at info@communityjusticeleague.org
`);

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize any additional components
    initializeAccessibility();
    initializeAnalytics();
});

// Accessibility enhancements
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    const skipLinkStyles = {
        position: 'absolute',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        zIndex: '10000',
        padding: '8px 16px',
        background: '#2b6cb0',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '0 0 4px 4px'
    };
    
    Object.assign(skipLink.style, skipLinkStyles);
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '0';
        this.style.width = 'auto';
        this.style.height = 'auto';
        this.style.overflow = 'visible';
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
        this.style.width = '1px';
        this.style.height = '1px';
        this.style.overflow = 'hidden';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Analytics placeholder (replace with actual analytics code)
function initializeAnalytics() {
    // Track page views, form submissions, etc.
    // This would be replaced with actual analytics implementation
    console.log('Analytics initialized');
}