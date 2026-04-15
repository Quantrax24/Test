// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    const span = themeToggle.querySelector('span');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
        span.textContent = 'Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        span.textContent = 'Dark Mode';
    }
}

// Active Navigation Link
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Command Category Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const categories = document.querySelectorAll('.commands-category');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        
        // Update active button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show selected category
        categories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === category) {
                cat.classList.add('active');
            }
        });
    });
});

// Animated Stats Counter (with random realistic numbers)
function animateStats() {
    const serverCount = document.getElementById('serverCount');
    const userCount = document.getElementById('userCount');
    
    let serverTarget = 14892;
    let userTarget = 2.4;
    
    let serverCurrent = 0;
    let userCurrent = 0;
    
    const interval = setInterval(() => {
        if (serverCurrent < serverTarget) {
            serverCurrent += Math.ceil(serverTarget / 50);
            if (serverCurrent > serverTarget) serverCurrent = serverTarget;
            serverCount.textContent = serverCurrent.toLocaleString();
        }
        
        if (userCurrent < userTarget) {
            userCurrent += userTarget / 50;
            if (userCurrent > userTarget) userCurrent = userTarget;
            userCount.textContent = userCurrent.toFixed(1) + 'M';
        }
        
        if (serverCurrent >= serverTarget && userCurrent >= userTarget) {
            clearInterval(interval);
        }
    }, 30);
}

// Trigger animation when stats section is visible
const statsSection = document.getElementById('stats');
let animated = false;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateStats();
            animated = true;
        }
    });
}, { threshold: 0.5 });

observer.observe(statsSection);

// Add floating animation to feature cards
const cards = document.querySelectorAll('.feature-card');
cards.forEach((card, index) => {
    card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
    card.style.opacity = '0';
    setTimeout(() => {
        card.style.opacity = '1';
    }, index * 100);
});

// Mobile Menu Toggle (add hamburger menu for mobile)
if (window.innerWidth <= 768) {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.position = 'fixed';
    hamburger.style.top = '1rem';
    hamburger.style.left = '1rem';
    hamburger.style.zIndex = '101';
    hamburger.style.background = 'var(--purple-primary)';
    hamburger.style.border = 'none';
    hamburger.style.color = 'white';
    hamburger.style.padding = '0.75rem';
    hamburger.style.borderRadius = '0.5rem';
    hamburger.style.cursor = 'pointer';
    hamburger.style.zIndex = '200';
    
    document.body.appendChild(hamburger);
    
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}

// Console log to confirm script loaded
console.log('Quantrex Documentation Website Loaded! 🚀');