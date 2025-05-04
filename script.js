// DOM Elements
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');

// Navigation functionality
navLinks.forEach(link => {
    // Only apply scroll behavior to links that are not the gallery
    if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active class for navigation
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Get target section and smooth scroll to it
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Add scroll event listener to update active nav based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
        }
    });
    
    // Only update in-page navigation items
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            link.classList.remove('active');
            if (href === current) {
                link.classList.add('active');
            }
        }
    });
});

// Handle page load and refresh
window.addEventListener('load', () => {
    // Check if URL has a hash
    const hash = window.location.hash;
    if (hash) {
        // Find the link with matching hash
        const activeLink = document.querySelector(`nav a[href="${hash}"]`);
        if (activeLink) {
            // Activate the correct section and scroll to it
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            activeLink.classList.add('active');
            
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
});
