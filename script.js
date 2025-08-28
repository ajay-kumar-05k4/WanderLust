// Custom JavaScript for Travel Agency Website

// Smooth scrolling
document.addEventListener('DOMContentLoaded', function() {
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

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('mainNavbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Form validation
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const destination = document.getElementById('destination').value;
            const date = document.getElementById('date').value;
            const travelers = document.getElementById('travelers').value;
            
            if (!name || !email || !destination || !date || !travelers) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Date validation (future date)
            const selectedDate = new Date(date);
            const today = new Date();
            if (selectedDate <= today) {
                alert('Please select a future date for travel.');
                return;
            }
            
            // Travelers validation
            if (travelers < 1 || travelers > 10) {
                alert('Number of travelers must be between 1 and 10.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your booking! We will contact you shortly to confirm your travel details.');
            this.reset();
        });
    }

    // Initialize Bootstrap Scrollspy
    const scrollSpy = new bootstrap.ScrollSpy(document.body, {
        target: '#mainNavbar',
        offset: 100
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });

    // Auto-advance carousel
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // Wire up "Book Now" buttons to prefill destination and scroll to booking
    document.querySelectorAll('.destination-card').forEach(card => {
        const titleEl = card.querySelector('.card-title');
        const btn = card.querySelector('button.btn');
        if (!titleEl || !btn) return;
        const destinationName = titleEl.textContent || '';
        btn.addEventListener('click', () => {
            const select = document.getElementById('destination');
            if (select) {
                // Map visible name to value keys used in select options
                const nameToValue = {
                    'Bali, Indonesia': 'bali',
                    'Santorini, Greece': 'santorini',
                    'Swiss Alps': 'swiss-alps'
                };
                const value = nameToValue[destinationName.trim()] || '';
                if (value) select.value = value;
            }
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Set min date to tomorrow for the date picker
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // Contact form submission (simple simulation)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const msg = document.getElementById('contactMsg').value.trim();
            if (!name || !email || !msg) {
                alert('Please complete all contact fields.');
                return;
            }
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            alert('Thanks for reaching out! We will get back to you shortly.');
            this.reset();
        });
    }
});

// Additional utility functions
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Price calculation function (can be extended)
function calculatePrice(destination, travelers, duration) {
    const prices = {
        'bali': 899,
        'santorini': 1299,
        'swiss-alps': 1499,
        'paris': 1099,
        'tokyo': 1399
    };
    
    const basePrice = prices[destination] || 1000;
    return basePrice * travelers;
}
