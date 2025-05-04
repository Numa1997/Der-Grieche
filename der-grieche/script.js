// DOM Elements
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.section');
const galleryGrid = document.getElementById('gallery-grid');

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links and sections
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get the target section and activate it
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.classList.add('active');
        
        // Smooth scroll to target section
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Dynamic gallery functionality
function createGalleryItems() {
    // This function will dynamically create gallery items when images are added
    // The gallery uses placeholder elements until real images are added
    
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

// Function to load and display real images
function loadGalleryImages() {
    // This function can be used to load actual images when they are available
    // It should replace the placeholders with real images
    
    // Example of adding a real image (uncomment when images are available)
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

// Initialize gallery only if the element exists
if (galleryGrid) {
    createGalleryItems();
}

// Handle page load and refresh
window.addEventListener('load', () => {
    // Check if URL has a hash
    const hash = window.location.hash;
    if (hash) {
        // Find the link with matching hash
        const activeLink = document.querySelector(`nav a[href="${hash}"]`);
        if (activeLink) {
            // Activate the correct section
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            activeLink.classList.add('active');
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }
    }
}); 
