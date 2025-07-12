// Main Content JavaScript for Modern UI Effects
document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.querySelector('.main-content');
    const contentCards = document.querySelectorAll('.content-card');
    const welcomeSection = document.querySelector('.welcome-section');
    const newsSection = document.querySelector('.news-section');
    const gameSection = document.querySelector('.game-section');
    
    // Initialize main content
    initializeMainContent();
    
    function initializeMainContent() {
        // Setup welcome section animations
        setupWelcomeSection();
        
        // Setup content cards
        setupContentCards();
        
        // Setup news section
        setupNewsSection();
        
        // Setup game section
        setupGameSection();
        
        // Setup infinite scroll
        setupInfiniteScroll();
        
        // Setup content filters
        setupContentFilters();
        
        // Setup masonry layout
        setupMasonryLayout();
    }
    
    function setupWelcomeSection() {
        if (welcomeSection) {
            // Typewriter effect for welcome text
            const welcomeText = welcomeSection.querySelector('.welcome-text');
            if (welcomeText) {
                const text = welcomeText.textContent;
                welcomeText.textContent = '';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        welcomeText.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 50);
                    }
                };
                
                // Start typewriter after a delay
                setTimeout(typeWriter, 1000);
            }
            
            // Floating particles background
            createFloatingParticles();
            
            // Interactive welcome buttons
            const welcomeButtons = welcomeSection.querySelectorAll('.welcome-button');
            welcomeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    createWelcomeButtonEffect(e, button);
                });
            });
        }
    }
    
    function setupContentCards() {
        contentCards.forEach((card, index) => {
            // Stagger animation on load
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in-up');
            
            // Add 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
            
            // Add click animation
            card.addEventListener('click', (e) => {
                createCardClickEffect(e, card);
            });
            
            // Lazy load images
            const images = card.querySelectorAll('img');
            images.forEach(img => {
                if (img.dataset.src) {
                    const imageObserver = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                img.src = img.dataset.src;
                                img.classList.add('loaded');
                                imageObserver.unobserve(img);
                            }
                        });
                    });
                    imageObserver.observe(img);
                }
            });
        });
    }
    
    function setupNewsSection() {
        if (newsSection) {
            // Auto-refresh news
            setInterval(() => {
                refreshNews();
            }, 300000); // Refresh every 5 minutes
            
            // News ticker
            const newsTicker = newsSection.querySelector('.news-ticker');
            if (newsTicker) {
                startNewsTicker(newsTicker);
            }
            
            // News categories filter
            const categoryFilters = newsSection.querySelectorAll('.category-filter');
            categoryFilters.forEach(filter => {
                filter.addEventListener('click', () => {
                    filterNewsByCategory(filter.dataset.category);
                });
            });
        }
    }
    
    function setupGameSection() {
        if (gameSection) {
            // Game cards carousel
            const gameCarousel = gameSection.querySelector('.game-carousel');
            if (gameCarousel) {
                setupGameCarousel(gameCarousel);
            }
            
            // Game rating interactions
            const ratingStars = gameSection.querySelectorAll('.rating-star');
            ratingStars.forEach(star => {
                star.addEventListener('click', (e) => {
                    handleRatingClick(e, star);
                });
            });
            
            // Game search functionality
            const gameSearch = gameSection.querySelector('.game-search');
            if (gameSearch) {
                setupGameSearch(gameSearch);
            }
        }
    }
    
    function setupInfiniteScroll() {
        let loading = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading) {
                    loading = true;
                    loadMoreContent();
                }
            });
        });
        
        const loadTrigger = document.querySelector('.load-more-trigger');
        if (loadTrigger) {
            observer.observe(loadTrigger);
        }
        
        function loadMoreContent() {
            // Show loading spinner
            const spinner = document.querySelector('.loading-spinner');
            if (spinner) {
                spinner.classList.add('visible');
            }
            
            // Simulate API call
            setTimeout(() => {
                // Add new content (mock data)
                const newContent = createMockContent();
                const contentContainer = document.querySelector('.content-container');
                if (contentContainer) {
                    contentContainer.appendChild(newContent);
                }
                
                // Hide loading spinner
                if (spinner) {
                    spinner.classList.remove('visible');
                }
                
                loading = false;
            }, 1000);
        }
    }
    
    function setupContentFilters() {
        const filterButtons = document.querySelectorAll('.filter-button');
        const contentItems = document.querySelectorAll('.content-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                
                // Update active filter
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter content
                contentItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                        item.classList.add('visible');
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('visible');
                    }
                });
            });
        });
    }
    
    function setupMasonryLayout() {
        const masonryContainer = document.querySelector('.masonry-container');
        if (masonryContainer) {
            // Simple masonry layout
            const items = masonryContainer.querySelectorAll('.masonry-item');
            const columns = 3;
            const columnHeights = new Array(columns).fill(0);
            
            items.forEach(item => {
                const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
                item.style.left = `${(shortestColumn * 100) / columns}%`;
                item.style.top = `${columnHeights[shortestColumn]}px`;
                
                columnHeights[shortestColumn] += item.offsetHeight + 20;
            });
            
            masonryContainer.style.height = `${Math.max(...columnHeights)}px`;
        }
    }
    
    // Utility functions
    function createFloatingParticles() {
        if (!welcomeSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        welcomeSection.appendChild(particlesContainer);
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    
    function startNewsTicker(ticker) {
        const newsItems = ticker.querySelectorAll('.news-item');
        let currentIndex = 0;
        
        function showNextNews() {
            newsItems.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            currentIndex = (currentIndex + 1) % newsItems.length;
        }
        
        // Start ticker
        showNextNews();
        setInterval(showNextNews, 5000);
    }
    
    function setupGameCarousel(carousel) {
        const track = carousel.querySelector('.carousel-track');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        
        let currentIndex = 0;
        const itemWidth = items[0].offsetWidth + 20;
        
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = Math.max(0, currentIndex - 1);
                updateCarousel();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = Math.min(items.length - 3, currentIndex + 1);
                updateCarousel();
            });
        }
        
        // Auto-play carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % (items.length - 2);
            updateCarousel();
        }, 5000);
    }
    
    function refreshNews() {
        // Simulate news refresh
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach(item => {
            item.classList.add('refreshing');
            setTimeout(() => {
                item.classList.remove('refreshing');
            }, 1000);
        });
    }
    
    function createMockContent() {
        const content = document.createElement('div');
        content.className = 'content-card fade-in-up';
        content.innerHTML = `
            <div class="card-image">
                <img src="https://via.placeholder.com/300x200" alt="Mock Content">
            </div>
            <div class="card-content">
                <h3>새로운 콘텐츠</h3>
                <p>동적으로 로드된 콘텐츠입니다.</p>
            </div>
        `;
        return content;
    }
});

// Effect functions
function createCardClickEffect(event, card) {
    // Scale animation
    card.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    // Ripple effect
    const rect = card.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('card-ripple');
    
    card.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createWelcomeButtonEffect(event, button) {
    // Magnetic effect
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
    
    setTimeout(() => {
        button.style.transform = 'translate(0, 0) scale(1)';
    }, 200);
}

function filterNewsByCategory(category) {
    const newsItems = document.querySelectorAll('.news-item');
    
    newsItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            item.classList.add('visible');
        } else {
            item.classList.add('hidden');
            item.classList.remove('visible');
        }
    });
}

function handleRatingClick(event, star) {
    const rating = parseInt(star.dataset.rating);
    const ratingGroup = star.closest('.rating-group');
    const stars = ratingGroup.querySelectorAll('.rating-star');
    
    stars.forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    
    // Add click animation
    star.style.transform = 'scale(1.2)';
    setTimeout(() => {
        star.style.transform = 'scale(1)';
    }, 150);
}

function setupGameSearch(searchInput) {
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase();
        
        searchTimeout = setTimeout(() => {
            const gameCards = document.querySelectorAll('.game-card');
            
            gameCards.forEach(card => {
                const title = card.querySelector('.game-title').textContent.toLowerCase();
                const description = card.querySelector('.game-description').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                }
            });
        }, 300);
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createCardClickEffect,
        filterNewsByCategory,
        handleRatingClick
    };
} 