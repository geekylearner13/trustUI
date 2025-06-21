// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for impact section
            if (entry.target.classList.contains('impact-card')) {
                animateCounter(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animatable elements
document.addEventListener('DOMContentLoaded', () => {
    const workCards = document.querySelectorAll('.work-card');
    const impactCards = document.querySelectorAll('.impact-card');
    const ctaCards = document.querySelectorAll('.cta-card');
    
    [...workCards, ...impactCards, ...ctaCards].forEach(card => {
        observer.observe(card);
    });
    
    // Add staggered animation delays
    workCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 200}ms`;
    });
    
    impactCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 150}ms`;
    });
    
    ctaCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 200}ms`;
    });
});

// Counter animation function
function animateCounter(card) {
    const numberElement = card.querySelector('.impact-number');
    const target = parseInt(numberElement.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current = Math.floor(increment * step);
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas
        numberElement.textContent = current.toLocaleString() + '+';
    }, stepDuration);
}

// Smooth scrolling for CTA button
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('.work-section').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add hover effects for work cards
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Button click handlers
document.querySelectorAll('.cta-card-button, .final-cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add click animation
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
        
        // Log button click (replace with actual functionality)
        console.log(`Button clicked: ${e.target.textContent}`);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.background-pattern');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
});

// Initialize
document.body.style.opacity = '0';


const menuBtn= document.querySelector(".menu-btn");
        const navigation = document.querySelector(".navigation");


        menuBtn.addEventListener("click",()=>{
            menuBtn.classList.toggle("active");
            navigation.classList.toggle("active");
        });

window.addEventListener("scroll", function() {
    var navbar = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust scroll threshold as needed
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


function redirect() {
    window.location.href = "donate.html";
  }
