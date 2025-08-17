// Lumière Patisserie - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Initializing Bread N\' Br☕︎w website...');

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

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
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

        // Fallback: show element after a short delay if observer doesn't trigger
        setTimeout(() => {
            if (element.style.opacity === '0') {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
            }
        }, 1000 + (index * 100));
    });
}

// Form handling
function initForms() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thank you for subscribing! We\'ll keep you updated on our latest offerings.', 'success');
                this.reset();
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
                message: formData.get('message'),
                to_email: 'breadnbrew512@gmail.com'
            };

            // Send email using EmailJS (you'll need to set up EmailJS service)
            // For now, simulate the email sending
            setTimeout(() => {
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours at breadnbrew512@gmail.com', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Log the form data that would be sent
                console.log('Contact form data:', templateParams);
            }, 1500);
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
                details: formData.get('details'),
                to_email: 'breadnbrew512@gmail.com'
            };

            // Send email using EmailJS (you'll need to set up EmailJS service)
            // For now, simulate the email sending
            setTimeout(() => {
                showNotification('Thank you for your catering inquiry! Our team will contact you within 24 hours at breadnbrew512@gmail.com to discuss your event.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Log the form data that would be sent
                console.log('Catering form data:', templateParams);
            }, 2000);
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
            this.alt = 'Lumière Patisserie';
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

// Cursor trail effect for luxury feel
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #E91E63, #d29f51);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: opacity 0.2s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].style.left = trail[i - 1].style.left;
            trail[i].style.top = trail[i - 1].style.top;
        }
        
        trail[0].style.left = mouseX + 'px';
        trail[0].style.top = mouseY + 'px';
        
        requestAnimationFrame(updateTrail);
    }
    
    updateTrail();
}

// Initialize cursor trail on desktop
if (window.innerWidth > 768) {
    initCursorTrail();
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

// Loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FAF9F6;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        transition: opacity 0.5s ease;
    `;
    
    loadingScreen.innerHTML = `
        <div style="font-family: 'Playfair Display', serif; font-size: 2.5rem; color: #E91E63; margin-bottom: 1rem;">Bread N' Br☕︎w</div>
        <div style="font-family: 'Inter', sans-serif; font-size: 0.8rem; color: #d29f51; letter-spacing: 0.2em;">COFFEE • BREAD • PATISSERIES</div>
        <div style="margin-top: 2rem; width: 50px; height: 4px; background: linear-gradient(45deg, #E91E63, #d29f51); animation: loading 1.5s ease-in-out infinite;"></div>
    `;
    
    // Add loading animation
    const loadingCSS = `
        @keyframes loading {
            0%, 100% { transform: scaleX(1); }
            50% { transform: scaleX(0.5); }
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingCSS;
    document.head.appendChild(loadingStyle);
    
    document.body.appendChild(loadingScreen);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
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
        }
    }
});

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            // Home page specific functionality
            initHomePageEffects();
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
    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle');
    heroElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });
    
    // Add float animation CSS
    const floatCSS = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = floatCSS;
    document.head.appendChild(floatStyle);
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
