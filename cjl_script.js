// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Service Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Story Card Animations
document.addEventListener('DOMContentLoaded', function() {
    const storyCards = document.querySelectorAll('.story-card');
    
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
    
    storyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Stats Animation
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stat-number, .impact-stat .stat-number');
    
    const animateNumber = (element, target, duration = 2000) => {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Extract number from text
                const match = text.match(/(\d+)/);
                if (match) {
                    const target = parseInt(match[1]);
                    element.textContent = '0' + (text.includes('%') ? '%' : '');
                    animateNumber(element, target);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => {
        observer.observe(stat);
    });
});

// Button Click Animations
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Form Handling (if forms are added later)
document.addEventListener('DOMContentLoaded', function() {
    const volunteerButtons = document.querySelectorAll('.btn-volunteer, .btn-primary');
    
    volunteerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default if it's a form submission
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('volunteer') || buttonText.includes('get involved') || buttonText.includes('become')) {
                // Simulate form opening or redirect
                console.log('Opening volunteer form...');
                
                // You can replace this with actual form handling
                alert('Thank you for your interest in volunteering! Our team will contact you soon.');
            }
        });
    });
});

// Image Placeholder Interaction
document.addEventListener('DOMContentLoaded', function() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        
        // Add transition for smooth scaling
        placeholder.style.transition = 'transform 0.2s ease';
    });
});

// Scroll-triggered Animations for Service Cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger animation
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Process Steps Animation (for mentorship page)
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step');
    
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Animate the step number
                    const stepNumber = entry.target.querySelector('.step-number');
                    if (stepNumber) {
                        stepNumber.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            stepNumber.style.transform = 'scale(1)';
                        }, 200);
                    }
                }, index * 200);
            }
        });
    }, observerOptions);
    
    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        const stepNumber = step.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.style.transition = 'transform 0.2s ease';
        }
        
        observer.observe(step);
    });
});

// Quote Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const quoteSection = document.querySelector('.quote-section blockquote');
    
    if (quoteSection) {
        const observerOptions = {
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        quoteSection.style.opacity = '0';
        quoteSection.style.transform = 'translateY(30px)';
        quoteSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(quoteSection);
    }
});

// Mission/Vision Cards Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const missionVisionCards = document.querySelectorAll('.mission, .vision');
    
    missionVisionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add transition
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Principle Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    const principleCards = document.querySelectorAll('.principle');
    
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    principleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// Option Cards (Mentor/Mentee) Interaction
document.addEventListener('DOMContentLoaded', function() {
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
        });
        
        // Add transition
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
});

// Impact Stats Counter with Percentage Support
document.addEventListener('DOMContentLoaded', function() {
    const impactStats = document.querySelectorAll('.impact-stat .stat-number');
    
    const animateImpactNumber = (element, targetText, duration = 2500) => {
        const hasPercent = targetText.includes('%');
        const target = parseInt(targetText.match(/\d+/)[0]);
        let current = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (hasPercent ? '%' : '');
                clearInterval(timer);
                
                // Add a bounce effect when complete
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = Math.floor(current) + (hasPercent ? '%' : '');
            }
        }, 16);
    };
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    const element = entry.target;
                    const targetText = element.textContent;
                    element.textContent = '0' + (targetText.includes('%') ? '%' : '');
                    animateImpactNumber(element, targetText);
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    impactStats.forEach(stat => {
        stat.style.transition = 'transform 0.2s ease';
        observer.observe(stat);
    });
});

// Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-green), var(--primary-blue));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
});

// Enhanced Button Feedback
document.addEventListener('DOMContentLoaded', function() {
    const allButtons = document.querySelectorAll('button, .btn, a[href*="mentorship"]');
    
    allButtons.forEach(button => {
        // Add loading state for action buttons
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('apply') || buttonText.includes('request') || buttonText.includes('volunteer')) {
                const originalText = this.textContent;
                const originalWidth = this.offsetWidth;
                
                this.style.width = originalWidth + 'px';
                this.textContent = 'Loading...';
                this.disabled = true;
                this.style.opacity = '0.7';
                
                // Simulate async operation
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                    this.style.opacity = '1';
                    this.style.width = 'auto';
                }, 1500);
            }
        });
        
        // Add focus states for accessibility
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-blue)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Dynamic Logo Color Change on Scroll
/*document.addEventListener('DOMContentLoaded', function() {
    const logos = document.querySelectorAll('.nav-logo .logo, .footer-logo .logo');
    
    window.addEventListener('scroll', function() {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        logos.forEach(logo => {
            if (scrollPercent < 25) {
                logo.style.background = 'linear-gradient(135deg, var(--primary-green), var(--primary-orange))';
            } else if (scrollPercent < 50) {
                logo.style.background = 'linear-gradient(135deg, var(--primary-orange), var(--primary-blue))';
            } else if (scrollPercent < 75) {
                logo.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--primary-pink))';
            } else {
                logo.style.background = 'linear-gradient(135deg, var(--primary-pink), var(--primary-green))';
            }
        });
    });
});*/

// Service Card Learn More Button Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const learnMoreButtons = document.querySelectorAll('.btn-learn-more');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3').textContent;
            
            // Simulate modal or detailed view
            console.log('Opening details for:', serviceTitle);
            
            // You can replace this with actual modal functionality
            alert(`Learn more about ${serviceTitle} - detailed information coming soon!`);
        });
    });
});

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard navigation for service cards
    const focusableElements = document.querySelectorAll('.service-card, .story-card, .option-card');
    
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-blue)';
            this.style.outlineOffset = '4px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    console.log('Community Justice League website loaded successfully!');
    
    // Add a subtle entrance animation to the entire page
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});
