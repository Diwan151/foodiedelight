// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Modal Functionality
const modal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');

function openLoginModal() {
    modal.style.display = "block";
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeLoginModal() {
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

closeBtn.onclick = closeLoginModal;

window.onclick = function(event) {
    if (event.target == modal) {
        closeLoginModal();
    }
}

// Login Form Submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempted');
});

// Price Formatter
function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(price);
}

// Add to Cart Functionality with Animation
const addToCartButtons = document.querySelectorAll('.add-to-cart, .food-card button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
            alert('Item added to cart!');
        }, 100);
    });
});

// Smooth Scroll for Navigation Links
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

// Show/Hide Navigation on Scroll with Smooth Transition
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-80px';
    } else {
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .food-card').forEach(element => {
    observer.observe(element);
});

// Stagger animation for menu items
document.querySelectorAll('.menu-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Form Validation with Animation
function validateForm() {
    const email = document.querySelector('#loginForm input[type="email"]');
    const password = document.querySelector('#loginForm input[type="password"]');
    
    let isValid = true;
    
    if (!email.value || !email.value.includes('@')) {
        shakefield(email);
        isValid = false;
    }
    
    if (!password.value) {
        shakefield(password);
        isValid = false;
    }
    
    return isValid;
}

function shakefield(field) {
    field.style.animation = 'none';
    field.offsetHeight; // Trigger reflow
    field.style.animation = 'shake 0.5s ease';
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Add form validation to login form
loginForm.onsubmit = function(e) {
    e.preventDefault();
    if (validateForm()) {
        // Proceed with login
        console.log('Form is valid, proceeding with login');
    }
};