// Sidebar JavaScript for Modern UI Effects
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar-container');
    const rankingItems = document.querySelectorAll('.ranking-item');
    const eventBanners = document.querySelectorAll('.event-banner');
    const collapsibleSections = document.querySelectorAll('.collapsible-section');
    
    // Initialize sidebar
    initializeSidebar();
    
    function initializeSidebar() {
        // Animate sidebar on load
        if (sidebar) {
            sidebar.classList.add('loaded');
        }
        
        // Setup ranking animations
        setupRankingAnimations();
        
        // Setup event banner interactions
        setupEventBanners();
        
        // Setup collapsible sections
        setupCollapsibleSections();
        
        // Setup real-time updates
        setupRealTimeUpdates();
        
        // Setup sidebar scroll effects
        setupScrollEffects();
    }
    
    function setupRankingAnimations() {
        rankingItems.forEach((item, index) => {
            // Stagger animation on load
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-up');
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                item.classList.add('ranking-hover');
                
                // Add glow effect to rank number
                const rankNumber = item.querySelector('.rank-number');
                if (rankNumber) {
                    rankNumber.classList.add('glow');
                }
                
                // Show additional info
                const additionalInfo = item.querySelector('.additional-info');
                if (additionalInfo) {
                    additionalInfo.classList.add('visible');
                }
            });
            
            item.addEventListener('mouseleave', () => {
                item.classList.remove('ranking-hover');
                
                const rankNumber = item.querySelector('.rank-number');
                if (rankNumber) {
                    rankNumber.classList.remove('glow');
                }
                
                const additionalInfo = item.querySelector('.additional-info');
                if (additionalInfo) {
                    additionalInfo.classList.remove('visible');
                }
            });
            
            // Add click animation
            item.addEventListener('click', (e) => {
                createRankingClickEffect(e, item);
            });
        });
    }
    
    function setupEventBanners() {
        eventBanners.forEach((banner, index) => {
            // Auto-rotate banners
            banner.style.animationDelay = `${index * 2}s`;
            
            // Add parallax effect
            banner.addEventListener('mousemove', (e) => {
                const rect = banner.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const moveX = (x - 0.5) * 10;
                const moveY = (y - 0.5) * 10;
                
                banner.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            banner.addEventListener('mouseleave', () => {
                banner.style.transform = 'translate(0, 0) scale(1)';
            });
            
            // Add click effect
            banner.addEventListener('click', (e) => {
                createBannerClickEffect(e, banner);
            });
        });
    }
    
    function setupCollapsibleSections() {
        collapsibleSections.forEach(section => {
            const header = section.querySelector('.section-header');
            const content = section.querySelector('.section-content');
            const toggle = section.querySelector('.toggle-button');
            
            if (header && content) {
                header.addEventListener('click', () => {
                    toggleSection(section, content, toggle);
                });
                
                // Add keyboard support
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleSection(section, content, toggle);
                    }
                });
                
                // Make header focusable
                header.setAttribute('tabindex', '0');
                header.setAttribute('role', 'button');
            }
        });
    }
    
    function toggleSection(section, content, toggle) {
        const isExpanded = section.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse
            content.style.maxHeight = content.scrollHeight + 'px';
            content.offsetHeight; // Force reflow
            content.style.maxHeight = '0';
            section.classList.remove('expanded');
            
            if (toggle) {
                toggle.style.transform = 'rotate(0deg)';
            }
        } else {
            // Expand
            content.style.maxHeight = content.scrollHeight + 'px';
            section.classList.add('expanded');
            
            if (toggle) {
                toggle.style.transform = 'rotate(180deg)';
            }
            
            // Reset max-height after animation
            setTimeout(() => {
                content.style.maxHeight = 'none';
            }, 300);
        }
    }
    
    function setupRealTimeUpdates() {
        // Simulate real-time ranking updates
        setInterval(() => {
            updateRankings();
        }, 30000); // Update every 30 seconds
        
        // Simulate new event notifications
        setInterval(() => {
            showNewEventNotification();
        }, 60000); // Show notification every minute
    }
    
    function updateRankings() {
        const rankings = document.querySelectorAll('.ranking-item');
        
        rankings.forEach(item => {
            const changeIndicator = item.querySelector('.rank-change');
            if (changeIndicator && Math.random() > 0.7) {
                // 30% chance of rank change
                const change = Math.random() > 0.5 ? 'up' : 'down';
                changeIndicator.className = `rank-change ${change}`;
                changeIndicator.textContent = change === 'up' ? '↑' : '↓';
                
                // Add pulse animation
                item.classList.add('rank-updated');
                setTimeout(() => {
                    item.classList.remove('rank-updated');
                }, 1000);
            }
        });
    }
    
    function showNewEventNotification() {
        const eventSection = document.querySelector('.event-section');
        if (eventSection && Math.random() > 0.8) {
            // 20% chance of new event
            const notification = document.createElement('div');
            notification.className = 'event-notification';
            notification.innerHTML = `
                <span class="notification-icon">🔥</span>
                <span class="notification-text">새로운 이벤트!</span>
            `;
            
            eventSection.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }
    }
    
    function setupScrollEffects() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    
                    // Parallax effect for sidebar sections
                    if (sidebar) {
                        const parallaxElements = sidebar.querySelectorAll('.parallax-sidebar');
                        parallaxElements.forEach(element => {
                            const speed = element.dataset.speed || 0.3;
                            element.style.transform = `translateY(${scrollY * speed}px)`;
                        });
                        
                        // Sticky sidebar behavior
                        if (scrollY > 100) {
                            sidebar.classList.add('sticky');
                        } else {
                            sidebar.classList.remove('sticky');
                        }
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Interactive statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                }
            });
        });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateNumber(element) {
        if (!element || !element.textContent) return;
        
        const target = parseInt(element.textContent.replace(/,/g, ''));
        if (isNaN(target)) return;
        
        const duration = 2000;
        const start = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            if (element) {
                element.textContent = current.toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Dark mode toggle for sidebar
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            
            // Add toggle animation
            darkModeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                darkModeToggle.style.transform = 'rotate(0deg)';
            }, 300);
        });
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
});

// Sidebar-specific effects
function createRankingClickEffect(event, element) {
    // Scale animation
    element.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
    
    // Ripple effect
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ranking-ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createBannerClickEffect(event, banner) {
    // Create expanding circle effect
    const rect = banner.getBoundingClientRect();
    const circle = document.createElement('div');
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
    circle.classList.add('banner-click-effect');
    
    banner.appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 600);
}

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

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateRankings,
        toggleSection,
        animateNumber
    };
} 