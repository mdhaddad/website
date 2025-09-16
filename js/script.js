(async function logVisit() {
  try {
    // cheap session limit: only log once per session
    //if (sessionStorage.getItem('logged_ip')) return;

    // 1) get public IP from ipify (or similar)
    //const ipRes = await fetch('https://api.ipify.org?format=json');
    //const ipJson = await ipRes.json();
    //const ip = ipJson.ip || 'unknown';

    // 2) prepare form-encoded data to avoid preflight
    const params = new URLSearchParams();
    params.append('ip', 'unknown'/*ip*/);
    params.append('path', location.pathname + location.search);
    params.append('ua', navigator.userAgent);
    params.append('referer', document.referrer || '');
    params.append('secret', 'NOCOFFEE');

    // 3) POST to your Apps Script Web App URL (no custom headers)
    fetch('https://script.google.com/macros/s/AKfycbzP2-A4mquQLlNzgaN86HnHOR-vGz_SzKzX6L03figFJyuFUvdtKiNtkO30C1EC4JuuRg/exec', {
      method: 'POST',
      body: params
      // do NOT set Content-Type manually; using URLSearchParams will set a simple content-type and avoid preflight
    }).catch(()=>{/* ignore errors so user isn't affected */});

    //sessionStorage.setItem('logged_ip', '1');

  } catch (err) {
    console.error('logging failed', err);
  }
})();

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Reveal Elements on Scroll ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, {
        root: null, // relative to the viewport
        threshold: 0.1 // 10% of the item must be visible
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
