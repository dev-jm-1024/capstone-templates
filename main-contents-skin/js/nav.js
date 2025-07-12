// Navigation JavaScript for Modern UI Effects
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav-container');
    const navItems = document.querySelectorAll('.nav-item');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    // Initialize navigation
    initializeNavigation();
    
    function initializeNavigation() {
        // Add smooth hover effects to navigation items
        navItems.forEach(item => {
            const link = item.querySelector('a');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (link) {
                // Add magnetic effect
                link.addEventListener('mouseenter', (e) => {
                    link.classList.add('nav-hover');
                    createNavRipple(e, link);
                });
                
                link.addEventListener('mouseleave', () => {
                    link.classList.remove('nav-hover');
                });
                
                // Add click animation
                link.addEventListener('click', (e) => {
                    if (!dropdown) {
                        createNavClickEffect(e, link);
                    }
                });
            }
            
            // Dropdown functionality
            if (dropdown) {
                let hoverTimeout;
                
                item.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    showDropdown(dropdown);
                });
                
                item.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        hideDropdown(dropdown);
                    }, 300);
                });
                
                // Prevent dropdown from closing when hovering over it
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        hideDropdown(dropdown);
                    }, 300);
                });
            }
        });
        
        // Mobile menu functionality
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', toggleMobileMenu);
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!nav.contains(e.target) && mobileMenu.classList.contains('active')) {
                    closeMobileMenu();
                }
            });
        }
        
        // Active page highlighting
        highlightActivePage();
        
        // Smooth scrolling for anchor links
        setupSmoothScrolling();
    }
    
    function showDropdown(dropdown) {
        // Close other dropdowns first
        dropdownMenus.forEach(menu => {
            if (menu !== dropdown) {
                hideDropdown(menu);
            }
        });
        
        dropdown.classList.add('active');
        
        // Animate dropdown items
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.05}s`;
            item.classList.add('animate-in');
        });
    }
    
    function hideDropdown(dropdown) {
        dropdown.classList.remove('active');
        
        // Reset animation classes
        const items = dropdown.querySelectorAll('.dropdown-item');
        items.forEach(item => {
            item.classList.remove('animate-in');
        });
    }
    
    function toggleMobileMenu() {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileMenuButton.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        const menuItems = mobileMenu.querySelectorAll('.mobile-nav-item');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('slide-in');
        });
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animation classes
        const menuItems = mobileMenu.querySelectorAll('.mobile-nav-item');
        menuItems.forEach(item => {
            item.classList.remove('slide-in');
        });
    }
    
    function highlightActivePage() {
        const currentPath = window.location.pathname;
        
        navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });
    }
    
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = nav.offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Breadcrumb functionality
    const breadcrumbContainer = document.querySelector('.breadcrumb-container');
    if (breadcrumbContainer) {
        generateBreadcrumb();
    }
    
    function generateBreadcrumb() {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment);
        const breadcrumbItems = [];
        
        // Add home
        breadcrumbItems.push({
            text: '홈',
            href: '/'
        });
        
        // Add path segments
        let currentPath = '';
        pathSegments.forEach(segment => {
            currentPath += '/' + segment;
            breadcrumbItems.push({
                text: formatBreadcrumbText(segment),
                href: currentPath
            });
        });
        
        renderBreadcrumb(breadcrumbItems);
    }
    
    function formatBreadcrumbText(segment) {
        const translations = {
            'board': '게시판',
            'community': '커뮤니티',
            'game': '게임',
            'user': '사용자',
            'profile': '프로필',
            'settings': '설정'
        };
        
        return translations[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    }
    
    function renderBreadcrumb(items) {
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        if (!breadcrumbContainer) return;
        
        const breadcrumbHTML = items.map((item, index) => {
            const isLast = index === items.length - 1;
            return `
                <span class="breadcrumb-item ${isLast ? 'active' : ''}">
                    ${isLast ? item.text : `<a href="${item.href}">${item.text}</a>`}
                </span>
                ${!isLast ? '<span class="breadcrumb-separator">›</span>' : ''}
            `;
        }).join('');
        
        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }
    
    // Navigation progress indicator
    if (nav) {
        const progressBar = document.createElement('div');
        progressBar.className = 'nav-progress-bar';
        nav.appendChild(progressBar);
        
        window.addEventListener('scroll', throttle(() => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / scrollHeight) * 100;
            
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        }, 16));
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.closest('.nav-item')) {
                focusedElement.classList.add('keyboard-focus');
            }
        }
    });
    
    // Remove keyboard focus class on mouse interaction
    document.addEventListener('mousedown', () => {
        document.querySelectorAll('.keyboard-focus').forEach(el => {
            el.classList.remove('keyboard-focus');
        });
    });
});

// Navigation-specific effects
function createNavRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('nav-ripple');
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createNavClickEffect(event, element) {
    element.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 150);
    
    // Add pulse effect
    const pulse = document.createElement('div');
    pulse.className = 'nav-pulse';
    element.appendChild(pulse);
    
    setTimeout(() => {
        pulse.remove();
    }, 600);
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showDropdown,
        hideDropdown,
        toggleMobileMenu
    };
} 