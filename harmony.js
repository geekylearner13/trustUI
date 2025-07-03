
// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Workshop gallery functionality
let activeWorkshop = 0;

function setActiveWorkshop(index) {
    // Remove active class from all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to selected item
    if (galleryItems[index]) {
        galleryItems[index].classList.add('active');
        activeWorkshop = index;
    }
}

// Carousel functionality
let currentSlide = 0;
const totalSlides = 6;

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    
    if (track) {
        const translateX = -currentSlide * (100 / totalSlides);
        track.style.transform = `translateX(${translateX}%)`;
    }
    
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        updateCarousel();
    }
}

// Auto-play carousel
let autoPlayInterval;

function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial active workshop
    setActiveWorkshop(0);
    
    // Initialize carousel
    updateCarousel();
    startAutoPlay();
    
    // Carousel hover controls
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Add click events to carousel buttons
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            previousSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Add click events to indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function(e) {
            e.preventDefault();
            goToSlide(index);
        });
    });
    
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Improved fade-in animation that only triggers once
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                entry.target.classList.add('animated');
                // Stop observing this element after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for animation (excluding static gallery cards)
    const sections = document.querySelectorAll('section:not(.gallery-section)');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Separate observer for gallery section with different behavior
    const galleryObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('gallery-loaded')) {
                const staticCards = entry.target.querySelectorAll('.gallery-card-static');
                staticCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.6s ease-out forwards';
                        card.style.opacity = '1';
                    }, index * 100);
                });
                entry.target.classList.add('gallery-loaded');
                galleryObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
        galleryObserver.observe(gallerySection);
    }
    
    // Add hover effects for interactive elements (excluding static gallery cards)
    const cards = document.querySelectorAll('.team-card, .skill-card, .workshop-item, .gallery-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Touch/swipe support for mobile carousel
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    const trackContainer = document.querySelector('.carousel-track-container');
    if (trackContainer) {
        trackContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoPlay();
        });
        
        trackContainer.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        trackContainer.addEventListener('touchend', function() {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
            
            startAutoPlay();
        });
    }
    
    // Gallery item click handlers
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            setActiveWorkshop(index);
        });
    });
});

// Handle scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add accessibility features
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation for gallery items
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (document.activeElement && document.activeElement.classList.contains('gallery-item')) {
            e.preventDefault();
            
            if (e.key === 'ArrowLeft' && activeWorkshop > 0) {
                setActiveWorkshop(activeWorkshop - 1);
                galleryItems[activeWorkshop].focus();
            } else if (e.key === 'ArrowRight' && activeWorkshop < galleryItems.length - 1) {
                setActiveWorkshop(activeWorkshop + 1);
                galleryItems[activeWorkshop].focus();
            }
        }
    }
    
    // Carousel keyboard navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const carouselContainer = document.querySelector('.carousel-container');
        if (document.activeElement && carouselContainer && carouselContainer.contains(document.activeElement)) {
            e.preventDefault();
            
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    }
});

// Make elements keyboard accessible
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View workshop ${index + 1}`);
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveWorkshop(index);
            }
        });
    });
    
    // Make carousel controls keyboard accessible
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach(btn => {
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('role', 'button');
    });
    
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.setAttribute('tabindex', '0');
        indicator.setAttribute('role', 'button');
        indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
        
        indicator.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToSlide(index);
            }
        });
    });
});
