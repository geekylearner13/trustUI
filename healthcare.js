// Global variables
let currentSlideIndex = 0;
let isModalOpen = false;

const galleryImages = [
    {
        url: "assets/healthcare/healthcare-consulting.jpeg",
        caption: "Urology Consultation"
    },
    {
        url: "assets/clinic-logo.jpeg",
        caption: "Clinic"
    },
    {
        url: "assets/healthcare/healthcare-camp.jpeg",
        caption: "Health Awareness Session"
    },
    {
        url: "assets/healthcare/healthcare-pics.jpeg",
        caption: "Community Health Camp - General Checkups"
    },
    {
        url: "assets/healthcare/healtcare-pic.jpeg",
        caption: "Community Engagement"
    },
    {
        url: "assets/healthcare/healthcare-adv.jpeg",
        caption: "Saturday Urology Camp"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    updateCarousel();
    
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);

    // Add scroll effect to navbar
    window.addEventListener('scroll', handleNavbarScroll);

    // Add smooth scroll animation to cards
    observeElements();

    // Handle mobile menu
    setupMobileMenu();

    // Handle form submissions
    setupForms();

    // Keyboard navigation for accessibility
    setupKeyboardNavigation();
});

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Carousel functionality
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    
    // Remove active class from current slide
    slides[currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
    
    // Add active class to new slide
    slides[currentSlideIndex].classList.add('active');
    
    updateCarousel();
}

function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });
}

// Modal functionality
function openModal(imageIndex) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    if (galleryImages[imageIndex]) {
        modalImage.src = galleryImages[imageIndex].url;
        modalImage.alt = galleryImages[imageIndex].caption;
        modalCaption.textContent = galleryImages[imageIndex].caption;
        
        modal.classList.add('active');
        isModalOpen = true;
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    isModalOpen = false;
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

// function setupMobileMenu() {
//     // Close mobile menu when clicking on a link
//     const navLinks = document.querySelectorAll('.nav-link');
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             const navMenu = document.getElementById('navMenu');
//             const toggle = document.querySelector('.mobile-menu-toggle');
//             navMenu.classList.remove('active');
//             toggle.classList.remove('active');
//         });
//     });

//     // Close mobile menu when clicking outside
//     document.addEventListener('click', (e) => {
//         const navMenu = document.getElementById('navMenu');
//         const toggle = document.querySelector('.mobile-menu-toggle');
        
//         if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
//             navMenu.classList.remove('active');
//             toggle.classList.remove('active');
//         }
//     });
// }

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    // if (window.scrollY > 50) {
    //     navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    //     navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    // } else {
    //     navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    //     navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    // }
}

// Intersection Observer for animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animateElements = document.querySelectorAll('.program-card, .doctor-card, .clinic-card, .contact-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Simulate API call
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        event.target.reset();
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Show notification (simple toast)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Setup form handlers
function setupForms() {
    // Handle newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', subscribeNewsletter);
    }

    // Handle consultation button
    const consultationBtn = document.querySelector('.btn-full');
    if (consultationBtn) {
        consultationBtn.addEventListener('click', () => {
            showNotification('Consultation booking feature coming soon!', 'info');
        });
    }
}

// Keyboard navigation for accessibility
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes modal
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
        }
        
        // Arrow keys for carousel navigation
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
    
    // Focus management for modal
    const modal = document.getElementById('galleryModal');
    const modalClose = document.querySelector('.modal-close');
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Focus trap in modal
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            modalClose.focus();
        }
    });
}

// Preload images for better performance
function preloadImages() {
    galleryImages.forEach(image => {
        const img = new Image();
        img.src = image.url;
    });
}

// Initialize preloading
preloadImages();

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        toggle.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll handler
window.removeEventListener('scroll', handleNavbarScroll);
window.addEventListener('scroll', throttle(handleNavbarScroll, 10));

// Error handling for images
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="%236b7280" font-family="Arial" font-size="16">Image not available</text></svg>';
    }
}, true);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});


window.addEventListener("scroll", function() {
    var navbar = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust scroll threshold as needed
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Console greeting
console.log('🏥 Brahamdeo  Sah Memorial Trust Healthcare Website');
console.log('Built with HTML, CSS, and JavaScript');
console.log('For technical support, contact the development team.');