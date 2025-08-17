// Bread N' Br☕︎w Patisserie - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Initializing Bread N\' Br☕︎w website...');

        // Initialize EmailJS
        initEmailJS();

        // IMMEDIATE FIX: Force all content to be visible
        forceContentVisible();

        // Navigation functionality
        initNavigation();

        // Smooth scrolling for anchor links
        initSmoothScrolling();

        // Intersection Observer for animations
        initScrollAnimations();

        // Form handling
        initForms();

        // Image lazy loading and hover effects
        initImageEffects();

        // Luxury hover effects
        initLuxuryEffects();

        // Newsletter modal - DISABLED
        // initNewsletterModal();

        // Order Online functionality
        initOrderOnline();

        console.log('☕ Bread N\' Br☕︎w - All features initialized successfully!');

    } catch (error) {
        console.error('Error during initialization:', error);
        // Fallback: ensure content is visible even if other features fail
        setTimeout(forceContentVisible, 1000);
    }
});

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('21LVan48_eVuxeqqS');
        console.log('EmailJS initialized successfully');
        console.log('Service ID: service_aw0glyl');
        console.log('Contact Template: template_wvgv8q5');
        console.log('Catering Template: template_jt6z1vk');
    } else {
        console.warn('EmailJS not loaded - forms will show simulation messages');
    }
}

// Test function for EmailJS (for debugging)
function testEmailJS() {
    if (typeof emailjs !== 'undefined') {
        console.log('EmailJS is loaded and ready');
        console.log('Public Key: 21LVan48_eVuxeqqS');
        console.log('Service ID: service_aw0glyl');
        return true;
    } else {
        console.error('EmailJS is not loaded');
        return false;
    }
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        // Toggle menu function with debouncing
        let isToggling = false;
        function toggleMobileMenu() {
            if (isToggling) return;
            isToggling = true;

            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Better scroll prevention for mobile devices
            if (navMenu.classList.contains('active')) {
                document.body.classList.add('menu-open');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }

            // Add ARIA attributes for accessibility
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            navMenu.setAttribute('aria-hidden', !navMenu.classList.contains('active'));

            // Reset debouncing after animation completes
            setTimeout(() => {
                isToggling = false;
            }, 300);
        }

        // Close menu function
        function closeMobileMenu() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }

        // Handle click and touch events for the toggle button
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Handle touch events for better mobile support (especially iOS Safari)
        let touchStarted = false;

        navToggle.addEventListener('touchstart', function(e) {
            touchStarted = true;
            e.stopPropagation();
        });

        navToggle.addEventListener('touchend', function(e) {
            if (touchStarted) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobileMenu();
                touchStarted = false;
            }
        });

        navToggle.addEventListener('touchcancel', function(e) {
            touchStarted = false;
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default for external links
                if (!this.href.includes('#')) {
                    closeMobileMenu();
                }
            });

            // Touch support for nav links
            link.addEventListener('touchend', function(e) {
                if (!this.href.includes('#')) {
                    closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on touch outside
        document.addEventListener('touchstart', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Handle window resize and orientation change
        function handleScreenChange() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }

        window.addEventListener('resize', handleScreenChange);
        window.addEventListener('orientationchange', function() {
            setTimeout(handleScreenChange, 500); // Delay to allow for orientation change
        });

        // Initialize ARIA attributes
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-controls', 'navigation-menu');
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navMenu.setAttribute('id', 'navigation-menu');
        navMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(250, 249, 246, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(250, 249, 246, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        // Keep navbar always visible - removed auto-hide behavior
    navbar.style.transform = 'translateY(0)';
        
        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('highlight-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 300);
                }
                
                if (entry.target.classList.contains('package-card')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 200);
                }
                
                if (entry.target.classList.contains('gallery-item')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'scale(1)';
                        entry.target.style.opacity = '1';
                    }, Math.random() * 250);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation - Fixed to show content immediately if observer fails
    const animatedElements = document.querySelectorAll(`
        .highlight-card,
        .package-card,
        .gallery-item,
        .value-item,
        .service-item,
        .order-item,
        .menu-category,
        .about-text,
        .catering-text,
        .story-content
    `);

    animatedElements.forEach((element, index) => {
        // Set initial state but with fallback visibility
        element.style.opacity = '0';
        element.style.transform = element.classList.contains('gallery-item') ? 'scale(0.8)' : 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        observer.observe(element);

        // Fallback: show element immediately to prevent reappearing buttons
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(element); // Stop observing once visible
        }, 500); // Reduced delay
    });
}

// Form handling
function initForms() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            if (email) {
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;

                // For newsletter, we'll just show success message since no specific template
                setTimeout(() => {
                    showNotification('Thank you for subscribing! We\'ll keep you updated on our latest offerings.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }
    
    // Contact form with EmailJS
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                phone: formData.get('phone') || 'Not provided',
                subject: formData.get('subject') || 'General Inquiry',
                message: formData.get('message')
            };

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_aw0glyl', 'template_wvgv8q5', templateParams)
                    .then(function(response) {
                        console.log('Contact email sent successfully:', response);
                        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Failed to send contact email:', error);
                        showNotification('Sorry, there was an error sending your message. Please try calling us at (908) 933-0123.', 'error');
                    })
                    .finally(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback if EmailJS isn't loaded
                setTimeout(() => {
                    showNotification('EmailJS not available. Please call us at (908) 933-0123 or email breadnbrew512@gmail.com', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }
    
    // Catering form with EmailJS
    const cateringForm = document.getElementById('cateringForm');
    if (cateringForm) {
        cateringForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(this);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                phone: formData.get('phone') || 'Not provided',
                event_date: formData.get('eventDate'),
                event_type: formData.get('eventType') || 'Not specified',
                guest_count: formData.get('guestCount'),
                package_interest: formData.get('packageInterest') || 'Not specified',
                details: formData.get('details') || 'No additional details provided'
            };

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_aw0glyl', 'template_jt6z1vk', templateParams)
                    .then(function(response) {
                        console.log('Catering email sent successfully:', response);
                        showNotification('Thank you for your catering inquiry! Our team will contact you within 24 hours to discuss your event.', 'success');
                        cateringForm.reset();
                    })
                    .catch(function(error) {
                        console.error('Failed to send catering email:', error);
                        showNotification('Sorry, there was an error sending your inquiry. Please call us at (908) 933-0123 for catering requests.', 'error');
                    })
                    .finally(function() {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback if EmailJS isn't loaded
                setTimeout(() => {
                    showNotification('EmailJS not available. Please call us at (908) 933-0123 for catering inquiries.', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }
}

// Image effects and lazy loading
function initImageEffects() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Error handling - use placeholder
        img.addEventListener('error', function() {
            this.style.opacity = '1';
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRkFGOUY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2QyOWY1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkx1bWnDqHJlIFBhdGlzc2VyaWU8L3RleHQ+PC9zdmc+';
            this.alt = 'Bread N\' Br☕︎w';
        });
    });
    
    // Parallax effect for hero images
    const heroImages = document.querySelectorAll('.hero-image, .page-hero .hero-image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroImages.forEach(img => {
            const rate = scrolled * -0.5;
            img.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Luxury hover effects
function initLuxuryEffects() {
    // Add sparkle effect to buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });
    
    // Elegant hover effect for cards
    const cards = document.querySelectorAll('.highlight-card, .package-card, .gallery-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1.1)';
                price.style.color = '#E91E63';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const price = this.querySelector('.price');
            if (price) {
                price.style.transform = 'scale(1)';
                price.style.color = '#d29f51';
            }
        });
    });
    
    // Add golden glow effect to nav logo on hover
    const navLogo = document.querySelector('.nav-logo');
    if (navLogo) {
        navLogo.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(210, 159, 81, 0.6)';
            this.style.transform = 'scale(1.05)';
        });
        
        navLogo.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    }
}

// Create sparkle effect
function createSparkles(element) {
    const sparkleCount = 8;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #d29f51;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnimation 1s ease-out forwards;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            z-index: 1000;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
    @keyframes sparkleAnimation {
        0% {
            opacity: 1;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Newsletter modal functionality - DISABLED
function initNewsletterModal() {
    // Newsletter modal completely disabled per user request
    console.log('Newsletter modal disabled');
}

function showNewsletterModal() {
    // Newsletter modal completely disabled - this function does nothing
    console.log('Newsletter modal disabled by user request');
    return;
}

// Order Online functionality
function initOrderOnline() {
    // Handle order online buttons that don't already have the correct href
    document.addEventListener('click', function(e) {
        const target = e.target;

        // Check if clicked element is an order online button without proper href
        if ((target.textContent.includes('Order Online') && target.tagName === 'A' &&
             target.href && !target.href.includes('skytab.com')) ||
            target.id === 'order-online-main') {

            e.preventDefault();

            // Redirect to the actual ordering system
            window.open('https://online.skytab.com/s/breadnbrew', '_blank');
        }
    });

    // Find and update any order buttons that don't have the correct URL
    const allLinks = document.querySelectorAll('a');
    let orderButtonCount = 0;

    allLinks.forEach(link => {
        if (link.textContent.includes('Order Online') &&
            !link.href.includes('skytab.com')) {
            orderButtonCount++;
            link.href = 'https://online.skytab.com/s/breadnbrew';
            link.target = '_blank';
            link.classList.add('order-online-btn');
        }
    });

    console.log(`Order Online functionality initialized - Updated ${orderButtonCount} order buttons`);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d29f51' : type === 'error' ? '#E91E63' : '#1A1A1A'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const notificationCSS = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);

// Cursor trail effect disabled to fix laggy cursor
function initCursorTrail() {
    // Disabled - was causing cursor lag
}

// Cursor trail initialization disabled
if (window.innerWidth > 768) {
    // initCursorTrail() - disabled to fix cursor issues
}

// Performance optimization: Debounce scroll events
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

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Any heavy scroll operations go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Loading screen disabled to prevent buttons reappearing
window.addEventListener('load', function() {
    // Loading screen removed to fix button reappearing issue
    console.log('Page loaded - loading screen disabled');
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        const modal = document.querySelector('.newsletter-modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }

        const navMenu = document.querySelector('.nav-menu.active');
        const navToggle = document.querySelector('.nav-toggle.active');
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
        }
    }

    // Enable keyboard navigation for mobile menu toggle
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('nav-toggle')) {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            // Home page specific functionality - animations removed
            break;
        case 'menu.html':
            // Menu page specific functionality
            initMenuPageEffects();
            break;
        case 'catering.html':
            // Catering page specific functionality
            initCateringPageEffects();
            break;
        case 'contact.html':
            // Contact page specific functionality
            initContactPageEffects();
            break;
    }
}

function initHomePageEffects() {
    // Removed floating animations that were causing issues
}

function initMenuPageEffects() {
    // Add stagger animation to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

function initCateringPageEffects() {
    // Add package cards reveal animation
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 150);
    });
}

function initContactPageEffects() {
    // Add form field focus effects
    const formFields = document.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

// Initialize page-specific functionality
initPageSpecific();

// Force all content to be visible immediately
function forceContentVisible() {
    try {
        const hiddenElements = document.querySelectorAll(`
            .highlight-card,
            .package-card,
            .gallery-item,
            .value-item,
            .service-item,
            .order-item,
            .menu-category,
            .about-text,
            .catering-text,
            .story-content,
            .menu-items,
            .menu-item
        `);

        hiddenElements.forEach(element => {
            if (element) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
                element.style.visibility = 'visible';
            }
        });

        // Fix navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.visibility = 'visible';
        }

        console.log('Content visibility forced - all elements should now be visible');
    } catch (error) {
        console.warn('Error in forceContentVisible:', error);
    }
}

console.log('☕ Bread N\' Br☕︎w - Interactive features loaded successfully!');
