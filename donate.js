// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Donation Form Functionality
const donationForm = document.getElementById('donationForm');
const amountInput = document.getElementById('amount');
const amountButtons = document.querySelectorAll('.amount-btn');

// Handle preset amount buttons
amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Set the amount input value
        const amount = button.getAttribute('data-amount');
        amountInput.value = amount;
        
        // Add animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });
});

// Clear active button when custom amount is entered
amountInput.addEventListener('input', () => {
    amountButtons.forEach(btn => btn.classList.remove('active'));
});

// Toast notification function
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Close toast button
document.getElementById('toast-close').addEventListener('click', () => {
    document.getElementById('toast').classList.remove('show');
});

// Form validation and submission
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(donationForm);
    const amount = formData.get('amount');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
        showToast('Please enter a valid donation amount.', 'error');
        amountInput.focus();
        return;
    }
    
    // Validate email format if provided
    if (email && !isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        document.getElementById('email').focus();
        return;
    }
    
    // Validate phone format if provided
    if (phone && !isValidPhone(phone)) {
        showToast('Please enter a valid phone number.', 'error');
        document.getElementById('phone').focus();
        return;
    }
    
    // Simulate processing
    const submitButton = donationForm.querySelector('.donate-btn');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span class="btn-icon">⏳</span> Processing...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showToast(`Thank you${name ? ', ' + name : ''}! Your donation of ₹${amount} is being processed. You will be redirected to the payment gateway shortly.`);
        
        // Log donation data (in real app, this would be sent to server)
        console.log('Donation Data:', {
            amount: parseFloat(amount),
            name: name || 'Anonymous',
            email: email || 'Not provided',
            phone: phone || 'Not provided',
            timestamp: new Date().toISOString()
        });
        
        // Reset form
        donationForm.reset();
        amountButtons.forEach(btn => btn.classList.remove('active'));
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // In a real application, you would redirect to Razorpay here
        // window.location.href = 'razorpay-payment-url';
        
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (basic Indian phone number format)
function isValidPhone(phone) {
    const phoneRegex = /^[+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.impact-card, .about-text, .about-image');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Counter animation for impact numbers
function animateCounters() {
    const counters = document.querySelectorAll('.impact-card h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace('+', ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when impact section is visible
const impactSection = document.querySelector('.impact');
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

impactObserver.observe(impactSection);

// Add hover effects to cards
document.querySelectorAll('.impact-card, .donation-form-container').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close toast
        document.getElementById('toast').classList.remove('show');
    }
});

// Form input enhancements
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
});


// Donation Process
        function donate() {
            var userAmount = document.getElementById("amount").value;

            if (!userAmount || userAmount <= 0) {
                alert("Please enter a valid donation amount.");
                return;
            }
            // var options = {
    //     "key": "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
    //     "amount": 50000, // Amount in paise (e.g., ₹500)
    //     "currency": "INR",
    //     "name": "Bramhdeo Sah Memorial Trust",
    //     "description": "Donation",
    //     "image": "https://yourtrust.org/logo.png", // optional
    //     "handler": function (response){
    //         alert("Donation successful! Payment ID: " + response.razorpay_payment_id);
    //     },
    //     "prefill": {
    //         "name": "",
    //         "email": "",
    //         "contact": ""
    //     },
    //     "theme": {
    //         "color": "#3399cc"
    //     },
    //     "method": {
    //         "upi": true,
    //         "card": false,
    //         "netbanking": false
    //     }
    // };
    // var rzp = new Razorpay(options);
    // rzp.open();
    // e.preventDefault();

            var options = {
                "key": "rzp_test_qR7WCfWyGVdGiJ", // Replace with your Razorpay API key
                "amount": userAmount * 100, // Convert INR to paise
                "currency": "INR",
                "name": "Brahamdeo Sah Memorial Trust",
                "description": "Support our cause",
                "image": "https://geekylearner13.github.io/trustUI/assets/Brahamdeo_Sah_Memorial_Trust-removebg-preview.png", // Optional
                
                "handler": function (response){
                    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                },
                "prefill": {
                    "name": document.getElementById("name").value,
                    "email": document.getElementById("email").value,
                    "contact": document.getElementById("phone").value
                },
                "method": {
                    "upi": true,
                    "card": true,
                    "netbanking": true
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

            var rzp = new Razorpay(options);
            rzp.open();
        }

//         window.addEventListener("scroll", function() {
//     var navbar = document.querySelector("header");
//     if (window.scrollY > 50) { // Adjust scroll threshold as needed
//         navbar.classList.add("scrolled");
//     } else {
//         navbar.classList.remove("scrolled");
//     }
// });