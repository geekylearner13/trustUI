
// EmailJS Configuration
(function() {
    // Initialize EmailJS - Replace 'your_public_key' with your actual EmailJS public key
    emailjs.init('your_public_key');
})();

// Form elements
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toastIcon');
const toastMessage = document.getElementById('toastMessage');

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous error messages
    clearErrors();
    
    // Validate name
    if (!name.value.trim()) {
        showError('nameError', 'Name is required');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

// Clear all error messages
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20,6 9,17 4,12"/></svg>';
        toastIcon.className = 'toast-icon success';
    } else {
        toastIcon.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        toastIcon.className = 'toast-icon error';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Handle form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value.trim(),
        from_email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        to_email: 'bdsmt2022@gmail.com'
    };
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Send email using EmailJS
        // Replace 'your_service_id' and 'your_template_id' with your actual EmailJS service and template IDs
        const response = await emailjs.send('your_service_id', 'your_template_id', formData);
        
        console.log('Email sent successfully:', response);
        
        // Show success message
        showToast('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
    } catch (error) {
        console.error('Email send failed:', error);
        
        // Show error message
        showToast('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Close toast when clicked
toast.addEventListener('click', function() {
    toast.classList.remove('show');
});

// Real-time validation
document.getElementById('name').addEventListener('input', function() {
    if (this.value.trim()) {
        document.getElementById('nameError').textContent = '';
    }
});

document.getElementById('email').addEventListener('input', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() && emailRegex.test(this.value)) {
        document.getElementById('emailError').textContent = '';
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.value.trim().length >= 10) {
        document.getElementById('messageError').textContent = '';
    }
});

// Smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add subtle animations on scroll
function handleScrollAnimations() {
    const cards = document.querySelectorAll('.showcase-card, .contact-card, .form-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 150;
        
        if (cardTop < window.innerHeight - cardVisible) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.showcase-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    handleScrollAnimations();
});