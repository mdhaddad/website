document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body;

    navToggle.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });

    // Fade-in effect on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation a bit later
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Impact Number Counter
    const statsSection = document.querySelector('.impact-section');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    function animateCounters() {
        statNumbers.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const speed = 200; // Lower number is faster
            
            const updateCount = () => {
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = Math.min(count + increment, target);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString(); // Add commas
                }
            };
            updateCount();
        });
        hasCounted = true;
    }

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    // Only observe if the stats section exists on the page
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

});
