// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    

    // Hero Book Interactive Features
function initHeroBook() {
    const heroBook = document.querySelector('.hero-book-mockup');
    const childCharacter = document.querySelector('.child-character');
    const bookTitle = document.querySelector('.cover-title');
    
    if (!heroBook) return;
    
    // Add click to open animation
    heroBook.addEventListener('click', function() {
        const bookContainer = this.querySelector('.book-container');
        bookContainer.style.transition = 'transform 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        if (this.classList.contains('opened')) {
            bookContainer.style.transform = 'rotateY(25deg)';
            this.classList.remove('opened');
        } else {
            bookContainer.style.transform = 'rotateY(180deg)';
            this.classList.add('opened');
        }
        
        // Reset transition after animation
        setTimeout(() => {
            bookContainer.style.transition = '';
        }, 1000);
    });
    
    // Random expressions for character
    const expressions = ['😊', '😄', '🤩', '😎', '🧒', '👧', '🌟', '✨'];
    let currentExpression = 0;
    
    if (childCharacter) {
        // Change expression on hover
        childCharacter.addEventListener('mouseenter', function() {
            currentExpression = (currentExpression + 1) % expressions.length;
            this.style.setProperty('--expression', expressions[currentExpression]);
            this.style.animation = 'none';
            this.offsetHeight; // Trigger reflow
            this.style.animation = 'bounceCharacter 4s infinite';
        });
        
        // Add CSS variable for expression
        childCharacter.style.setProperty('--expression', '😊');
        childCharacter.innerHTML = '<span class="expression">😊</span>';
        
        // Update expression every 3 seconds
        setInterval(() => {
            if (!childCharacter.matches(':hover')) {
                currentExpression = (currentExpression + 1) % expressions.length;
                const expressionEl = childCharacter.querySelector('.expression');
                if (expressionEl) {
                    expressionEl.textContent = expressions[currentExpression];
                }
            }
        }, 3000);
    }
    
    // Sample book titles that rotate
    const bookTitles = [
        "My Adventure Book",
        "Journey to Dreamland",
        "The Magical Forest",
        "Under the Sea",
        "Space Explorer",
        "Dinosaur Discovery"
    ];
    
    if (bookTitle) {
        let titleIndex = 0;
        
        // Change title every 5 seconds
        setInterval(() => {
            titleIndex = (titleIndex + 1) % bookTitles.length;
            
            // Fade out
            bookTitle.style.opacity = '0';
            
            setTimeout(() => {
                bookTitle.textContent = bookTitles[titleIndex];
                bookTitle.style.opacity = '1';
            }, 500);
        }, 5000);
    }
    
    // Add mouse move parallax effect (Desktop only)
    document.addEventListener('mousemove', function(e) {
        // Skip parallax on mobile devices
        if (window.innerWidth <= 768) return;
        
        if (!heroBook.classList.contains('opened')) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            heroBook.style.transform = `
                perspective(1000px)
                rotateX(${yAxis}deg)
                rotateY(${xAxis}deg)
                translateY(var(--float-y, 0px))
            `;
        }
    });
    
    // Reset on mouse leave
    heroBook.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initHeroBook);

    // Color picker for coloring book mockup
    const coloringBook = document.querySelector('.coloring-book');
    if (coloringBook) {
        // Change coloring book colors on hover
        coloringBook.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #fff5f7 100%)';
        });
        
        coloringBook.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)';
        });
    }
    
    // Randomize mini book colors
    const miniBooks = document.querySelectorAll('.mini-book');
    const colors = [
        { light: '#ffb6c1', dark: '#ff8fa3' },
        { light: '#a6d0e4', dark: '#8bc5e3' },
        { light: '#ffd166', dark: '#ffc233' },
        { light: '#b5e7a0', dark: '#9bd684' },
        { light: '#d8b4fe', dark: '#c084fc' },
        { light: '#fecaca', dark: '#fca5a5' }
    ];
    
    miniBooks.forEach(book => {
        book.addEventListener('mouseenter', function() {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.style.setProperty('--book-color', randomColor.light);
            this.style.setProperty('--book-color-dark', randomColor.dark);
        });
    });
    
    // Add child name to storybook mockup
    function updateStorybookName(name = 'Your Child') {
        const storybookTitle = document.querySelector('.storybook .subtitle');
        if (storybookTitle) {
            storybookTitle.textContent = `with ${name}`;
        }
    }
    
    // Example: Update with visitor's name from form
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.trim().length > 0) {
                updateStorybookName(this.value);
            }
        });
    }

    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Update the form submission in script.js
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Clear previous messages
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        formMessage.style.display = 'block';
        
        // Get form data
        const formData = new FormData(contactForm);
        
        try {
            // Send to Formspree endpoint
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                formMessage.textContent = '✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon!';
                formMessage.className = 'form-message success';
                contactForm.reset();
                console.log('Form submitted to Formspree');
            } else {
                // Non-OK response
                throw new Error(`Form submission failed with status: ${response.status}`);
            }

        } catch (error) {
            // Show a friendly error message but don't block user
            formMessage.textContent = '⚠️ There was a problem sending your message. Please try again or email us directly.';
            formMessage.className = 'form-message error';
            console.error('Netlify form submission error:', error);
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Hide message after 8 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.style.opacity = '1';
                }, 500);
            }, 8000);
        }

        // Enhanced validation function
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Clear previous error styles
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        // Validate name
        if (name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (message.length < 10) {
            showError('message', 'Please provide more details (at least 10 characters)');
            isValid = false;
        }
        
        return isValid;
    }

    });
}

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
    
    // Product card animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card, .about-card, .value-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
});