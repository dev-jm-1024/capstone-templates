// Header JavaScript for Modern UI Effects
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header-container');
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const userMenu = document.querySelector('.user-menu');
    const loginButton = document.querySelector('.login-button');
    
    // Sticky header with blur effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }, 100));
    
    // Search functionality with modern animations
    if (searchInput) {
        const searchContainer = searchInput.closest('.search-container');
        
        searchInput.addEventListener('focus', () => {
            if (searchContainer) {
                searchContainer.classList.add('focused');
            }
            searchInput.placeholder = '게임, 커뮤니티, 사용자 검색...';
        });
        
        searchInput.addEventListener('blur', () => {
            if (!searchInput.value && searchContainer) {
                searchContainer.classList.remove('focused');
                searchInput.placeholder = '검색...';
            }
        });
        
        // Auto-complete suggestions
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length > 1) {
                searchTimeout = setTimeout(() => {
                    showSearchSuggestions(query);
                }, 300);
            } else {
                hideSearchSuggestions();
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
    }
    
    // User menu dropdown with smooth animations
    if (userMenu) {
        const userMenuButton = userMenu.querySelector('.user-menu-button');
        const userMenuDropdown = userMenu.querySelector('.user-menu-dropdown');
        
        if (userMenuButton && userMenuDropdown) {
            userMenuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                userMenuDropdown.classList.toggle('active');
                
                // Add ripple effect
                createHeaderRipple(e, userMenuButton);
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userMenu.contains(e.target)) {
                    userMenuDropdown.classList.remove('active');
                }
            });
        }
    }
    
    // Login button effects
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            createHeaderRipple(e, loginButton);
            
            // Add loading state
            const originalText = loginButton.textContent;
            loginButton.textContent = '로그인 중...';
            loginButton.disabled = true;
            
            // Simulate loading (remove this in production)
            setTimeout(() => {
                loginButton.textContent = originalText;
                loginButton.disabled = false;
            }, 1000);
        });
    }
    
    // Logo animation on hover
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Notification badge animation
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        // Pulse animation for new notifications
        function pulseNotification() {
            notificationBadge.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                notificationBadge.style.animation = '';
            }, 600);
        }
        
        // Simulate new notification (remove in production)
        setInterval(pulseNotification, 10000);
    }
});

// Search suggestions functionality
function showSearchSuggestions(query) {
    const searchContainer = document.querySelector('.search-container');
    let suggestionsContainer = document.querySelector('.search-suggestions');
    
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        searchContainer.appendChild(suggestionsContainer);
    }
    
    // Mock suggestions (replace with real API call)
    const suggestions = [
        '게임 리뷰',
        '커뮤니티 가이드',
        '최신 게임 소식',
        '게임 공략',
        '유저 랭킹'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = suggestions
            .map(suggestion => `
                <div class="suggestion-item" data-suggestion="${suggestion}">
                    <i class="search-icon">🔍</i>
                    <span>${suggestion}</span>
                </div>
            `).join('');
        
        suggestionsContainer.classList.add('visible');
        
        // Add click handlers for suggestions
        suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                const suggestion = item.dataset.suggestion;
                document.querySelector('.search-input').value = suggestion;
                performSearch(suggestion);
                hideSearchSuggestions();
            });
        });
    } else {
        hideSearchSuggestions();
    }
}

function hideSearchSuggestions() {
    const suggestionsContainer = document.querySelector('.search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.classList.remove('visible');
    }
}

function performSearch(query) {
    if (!query.trim()) return;
    
    // Add loading state to search button
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.innerHTML = '<div class="loading-spinner-small"></div>';
    }
    
    // Simulate search (replace with real search functionality)
    setTimeout(() => {
        console.log('Searching for:', query);
        // Redirect to search results page
        // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        
        if (searchButton) {
            searchButton.innerHTML = '🔍';
        }
    }, 500);
    
    hideSearchSuggestions();
}

// Header-specific ripple effect
function createHeaderRipple(event, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('header-ripple');
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
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