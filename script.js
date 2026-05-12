// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content, .github-project-item, .github-profile-card');
    
    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // Animate stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(el => {
        observer.observe(el);
    });

    // Animate GitHub project items
    const githubProjects = document.querySelectorAll('.github-project-item');
    githubProjects.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Parallax effect for floating icons
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        icon.style.transform = `translateY(${yPos}px)`;
    });
});

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Trigger skill bar animation when skills section is visible
const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Particle background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float-particle ${3 + Math.random() * 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-particle {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
window.addEventListener('load', createParticles);

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

const cursorTrailElement = createCursorTrail();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorTrailElement.style.left = mouseX - 3 + 'px';
    cursorTrailElement.style.top = mouseY - 3 + 'px';
});

// Hide cursor trail when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorTrailElement.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorTrailElement.style.opacity = '1';
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add preloader styles
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }
    
    .preloader::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(preloaderStyles);

// Create preloader element
const preloader = document.createElement('div');
preloader.className = 'preloader';
document.body.appendChild(preloader);

// Remove preloader after page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Smooth reveal animations for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Add reveal styles
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    section:first-child {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Listen for scroll events
window.addEventListener('scroll', revealOnScroll);

// Initialize reveal on load
window.addEventListener('load', revealOnScroll);

// GitHub API Integration
async function fetchGitHubRepositories() {
    const githubProjectsContainer = document.querySelector('.github-projects');
    
    if (!githubProjectsContainer) return;
    
    try {
        // Show loading state
        githubProjectsContainer.className = 'github-projects loading';
        githubProjectsContainer.innerHTML = `
            <div class="loading-message">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading your GitHub repositories...</p>
            </div>
        `;
        
        const username = 'Sahil9817';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();
        
        if (response.ok) {
            displayGitHubRepositories(repositories);
        } else {
            showGitHubError('Failed to fetch repositories: ' + repositories.message);
        }
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        showGitHubError('Unable to load repositories. Please check your internet connection.');
    }
}

function displayGitHubRepositories(repositories) {
    const githubProjectsContainer = document.querySelector('.github-projects');
    
    if (!githubProjectsContainer) return;
    
    // Remove loading state
    githubProjectsContainer.className = 'github-projects';
    
    // Clear existing content
    githubProjectsContainer.innerHTML = '';
    
    if (repositories.length === 0) {
        githubProjectsContainer.innerHTML = `
            <div class="no-repos">
                <i class="fas fa-folder-open"></i>
                <p>No repositories found.</p>
            </div>
        `;
        return;
    }
    
    // Sort repositories by updated date (most recent first)
    repositories.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    repositories.forEach(repo => {
        const repoItem = createRepositoryItem(repo);
        githubProjectsContainer.appendChild(repoItem);
    });
    
    // Update repository count
    updateRepositoryCount(repositories.length);
}

function showGitHubError(message) {
    const githubProjectsContainer = document.querySelector('.github-projects');
    
    if (!githubProjectsContainer) return;
    
    githubProjectsContainer.className = 'github-projects error';
    githubProjectsContainer.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="fetchGitHubRepositories()" class="btn btn-small">
                <i class="fas fa-redo"></i> Try Again
            </button>
        </div>
    `;
}

function createRepositoryItem(repo) {
    const repoItem = document.createElement('div');
    repoItem.className = 'github-project-item';
    
    // Get primary language or default to 'Other'
    const language = repo.language || 'Other';
    const languageIcon = getLanguageIcon(language);
    
    repoItem.innerHTML = `
        <div class="project-header">
            <h4><i class="fab fa-github"></i> ${repo.name}</h4>
            <span class="repo-type ${repo.private ? 'private' : 'public'}">${repo.private ? 'Private' : 'Public'}</span>
        </div>
        <p class="project-description">${repo.description || 'No description available.'}</p>
        <div class="project-meta">
            <span class="tech-tag">
                <i class="${languageIcon}"></i> ${language}
            </span>
            ${repo.topics && repo.topics.length > 0 ? repo.topics.slice(0, 3).map(topic => 
                `<span class="tech-tag">${topic}</span>`
            ).join('') : ''}
        </div>
        <div class="repo-stats">
            <span class="stat-item">
                <i class="fas fa-star"></i> ${repo.stargazers_count}
            </span>
            <span class="stat-item">
                <i class="fas fa-code-branch"></i> ${repo.forks_count}
            </span>
            <span class="stat-item">
                <i class="fas fa-eye"></i> ${repo.watchers_count}
            </span>
        </div>
        <div class="project-actions">
            <a href="${repo.html_url}" target="_blank" class="btn btn-small">
                <i class="fab fa-github"></i> View Repository
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="btn btn-small btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            ` : ''}
        </div>
    `;
    
    return repoItem;
}

function getLanguageIcon(language) {
    const languageIcons = {
        'JavaScript': 'fab fa-js',
        'TypeScript': 'fab fa-js',
        'HTML': 'fab fa-html5',
        'CSS': 'fab fa-css3-alt',
        'Python': 'fab fa-python',
        'Java': 'fab fa-java',
        'C++': 'fas fa-code',
        'C#': 'fas fa-code',
        'PHP': 'fab fa-php',
        'Ruby': 'fas fa-gem',
        'Go': 'fas fa-code',
        'Rust': 'fas fa-code',
        'Swift': 'fab fa-swift',
        'Kotlin': 'fas fa-code',
        'Scala': 'fas fa-code',
        'R': 'fas fa-chart-bar',
        'MATLAB': 'fas fa-chart-line',
        'Shell': 'fas fa-terminal',
        'Dockerfile': 'fab fa-docker',
        'Vue': 'fab fa-vuejs',
        'React': 'fab fa-react',
        'Angular': 'fab fa-angular',
        'Node.js': 'fab fa-node',
        'Other': 'fas fa-code'
    };
    
    return languageIcons[language] || 'fas fa-code';
}

function updateRepositoryCount(count) {
    const statNumber = document.querySelector('.github-stats .stat:first-child .stat-number');
    if (statNumber) {
        statNumber.textContent = count;
    }
}

// Fetch repositories when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub repositories
    fetchGitHubRepositories();
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content, .github-project-item, .github-profile-card');
    
    animateElements.forEach((el, index) => {
        if (index % 2 === 0) {
            el.classList.add('slide-in-left');
        } else {
            el.classList.add('slide-in-right');
        }
        observer.observe(el);
    });

    // Animate stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(el => {
        observer.observe(el);
    });

    // Animate GitHub project items
    const githubProjects = document.querySelectorAll('.github-project-item');
    githubProjects.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });
});

console.log('Portfolio website loaded successfully! 🚀'); 