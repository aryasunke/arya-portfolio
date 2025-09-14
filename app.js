// Portfolio JavaScript - Arya's Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functions
    initSmoothScrolling();
    initNavbarScroll();
    initScrollAnimations();
    initContactForm();
    initTypewriterEffect();
    
    // Smooth scrolling for navigation links - FIXED
    function initSmoothScrolling() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .hero-buttons .btn');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only prevent default for internal links
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const navbarHeight = 80; // Fixed navbar height
                        const targetPosition = targetSection.offsetTop - navbarHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        const navbarCollapse = document.querySelector('.navbar-collapse');
                        if (navbarCollapse.classList.contains('show')) {
                            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                            bsCollapse.hide();
                        }
                    }
                }
            });
        });
    }
    
    // Navbar scroll effect
    function initNavbarScroll() {
        const navbar = document.querySelector('.custom-navbar');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);
        
        // Add fade-in class to elements
        const animatedElements = document.querySelectorAll(
            '.skill-category, .project-card, .contact-info-item, .about-content'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
    
    // Contact form handling - FIXED
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subjectField = document.getElementById('subject');
        const messageField = document.getElementById('message');
        
        // Ensure form fields are properly enabled
        if (nameField) nameField.removeAttribute('disabled');
        if (emailField) emailField.removeAttribute('disabled');
        if (subjectField) subjectField.removeAttribute('disabled');
        if (messageField) messageField.removeAttribute('disabled');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values directly from elements
                const name = nameField.value.trim();
                const email = emailField.value.trim();
                const subject = subjectField.value.trim();
                const message = messageField.value.trim();
                
                // Clear previous validation states
                clearValidationErrors();
                
                // Validate form
                if (validateForm(name, email, subject, message)) {
                    // Show loading state
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission
                    setTimeout(() => {
                        showSuccessMessage();
                        form.reset();
                        clearValidationErrors();
                        
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    // Show error message
                    showErrorMessage('Please fill in all required fields correctly.');
                }
            });
        }
    }
    
    // Clear validation errors
    function clearValidationErrors() {
        document.querySelectorAll('.form-control').forEach(input => {
            input.classList.remove('is-invalid', 'is-valid');
        });
        
        // Remove any existing alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => alert.remove());
    }
    
    // Form validation - IMPROVED
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Validate name
        if (!name || name.length < 2) {
            setFieldError('name');
            isValid = false;
        } else {
            setFieldValid('name');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setFieldError('email');
            isValid = false;
        } else {
            setFieldValid('email');
        }
        
        // Validate subject
        if (!subject || subject.length < 3) {
            setFieldError('subject');
            isValid = false;
        } else {
            setFieldValid('subject');
        }
        
        // Validate message
        if (!message || message.length < 10) {
            setFieldError('message');
            isValid = false;
        } else {
            setFieldValid('message');
        }
        
        return isValid;
    }
    
    // Set field error state
    function setFieldError(fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        }
    }
    
    // Set field valid state
    function setFieldValid(fieldName) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.classList.add('is-valid');
            field.classList.remove('is-invalid');
        }
    }
    
    // Show success message
    function showSuccessMessage() {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Thank you! Your message has been sent successfully. I'll get back to you soon.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Show error message
    function showErrorMessage(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show mt-3';
        alertDiv.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-remove alert after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
    
    // Typewriter effect for hero section
    function initTypewriterEffect() {
        const textElement = document.querySelector('.hero-title span');
        if (!textElement) return;
        
        const text = 'Arya';
        let index = 0;
        
        // Clear the text first
        textElement.textContent = '';
        
        function typeWriter() {
            if (index < text.length) {
                textElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                // Add cursor blink effect
                textElement.style.borderRight = '3px solid';
                textElement.style.animation = 'blink 1s infinite';
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    textElement.style.borderRight = 'none';
                    textElement.style.animation = 'none';
                }, 3000);
            }
        }
        
        // Start typewriter effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Skills hover effect
    function initSkillsHover() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0) scale(1)';
            });
        });
    }
    
    // Project card animations
    function initProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            // Stagger animation delays
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize additional animations
    initSkillsHover();
    initProjectAnimations();
    
    // Navbar active link highlighting - FIXED
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        function highlightNavLink() {
            let current = '';
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavLink);
        // Initial call
        highlightNavLink();
    }
    
    updateActiveNavLink();
    
    // Email links functionality
    function initEmailLinks() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the default mailto: behavior work
                console.log('Opening email client for:', this.href);
            });
        });
    }
    
    initEmailLinks();
    
    // External links functionality
    function initExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        
        externalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Opening external link:', this.href);
                // Let the default behavior work (opening in new tab)
            });
        });
    }
    
    initExternalLinks();
    
    // Parallax effect for hero section
    function initParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            function updateParallax() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.3;
                
                if (scrolled < heroSection.offsetHeight) {
                    heroSection.style.transform = `translateY(${rate}px)`;
                }
            }
            
            window.addEventListener('scroll', debounce(updateParallax, 10));
        }
    }
    
    initParallaxEffect();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: var(--color-primary); }
        }
        
        .navbar-nav .nav-link.active {
            color: var(--color-primary) !important;
            font-weight: 600;
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .skill-item, .project-card, .contact-info-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .form-control.is-valid {
            border-color: #28a745;
        }
        
        .form-control.is-invalid {
            border-color: #dc3545;
        }
    `;
    
    document.head.appendChild(style);
});

// Utility functions
function debounce(func, wait) {
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

// Performance optimization for scroll events
const debouncedScroll = debounce(() => {
    // Scroll-dependent operations can be placed here
}, 10);

// Window load event
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ensure all form fields are enabled
    const formFields = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formFields.forEach(field => {
        field.removeAttribute('disabled');
        field.removeAttribute('readonly');
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
    });
});