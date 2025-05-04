// DOM Elements
const navLinks = document.querySelectorAll('.side-nav a');
const sections = document.querySelectorAll('.section');
const galleryGrid = document.getElementById('gallery-grid');

// Navigation functionality
navLinks.forEach(link => {
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
                top: targetSection.offsetTop - 30,
                behavior: 'smooth'
            });
        }
    });
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
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
});

// Dynamic gallery functionality
function createGalleryItems() {
    // This function will dynamically create gallery items
    // The gallery uses placeholder elements initially
    
    // Create placeholder gallery items
    const placeholderItems = [
        { icon: 'utensils', title: 'Gyros Teller' },
        { icon: 'wine-glass-alt', title: 'Unser Restaurant' },
        { icon: 'lemon', title: 'Griechischer Salat' },
        { icon: 'fish', title: 'Fischspezialitäten' },
        { icon: 'cheese', title: 'Käseauswahl' },
        { icon: 'glass-cheers', title: 'Terrasse' }
    ];
    
    // Clear gallery grid
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        
        // Create gallery items
        placeholderItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-image';
            
            const icon = document.createElement('i');
            icon.className = `fas fa-${item.icon}`;
            
            const title = document.createElement('p');
            title.textContent = item.title;
            
            placeholder.appendChild(icon);
            placeholder.appendChild(title);
            galleryItem.appendChild(placeholder);
            galleryGrid.appendChild(galleryItem);
        });
    }
}

// Function to load and display real images when they become available
function loadGalleryImages() {
    // This function can be used to load actual images when they are available
    // For now, we're using placeholders
    
    // When real images are available, uncomment this code:
    /*
    const imageFiles = ['dish1.jpg', 'restaurant.jpg', 'salad.jpg', 'seafood.jpg', 'cheese.jpg', 'terrace.jpg'];
    
    if (galleryGrid) {
        imageFiles.forEach((image, index) => {
            // Check if gallery item exists
            const galleryItem = galleryGrid.children[index];
            if (galleryItem) {
                // Replace placeholder with image
                galleryItem.innerHTML = '';
                const img = document.createElement('img');
                img.src = `images/${image}`;
                img.alt = `Gallery image ${index + 1}`;
                img.loading = 'lazy';
                galleryItem.appendChild(img);
            }
        });
    }
    */
}

// Initialize gallery
if (galleryGrid) {
    createGalleryItems();
}

// Handle page load and refresh
window.addEventListener('load', () => {
    // Check if URL has a hash
    const hash = window.location.hash;
    if (hash) {
        // Find the link with matching hash
        const activeLink = document.querySelector(`.side-nav a[href="${hash}"]`);
        if (activeLink) {
            // Activate the correct section and scroll to it
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            activeLink.classList.add('active');
            
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 30,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }
});
