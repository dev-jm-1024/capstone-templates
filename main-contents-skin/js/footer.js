// Footer JavaScript for Modern UI Effects
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer-container');
    const footerLinks = document.querySelectorAll('.footer-link');
    const socialIcons = document.querySelectorAll('.social-icon');
    const backToTopButton = document.querySelector('.back-to-top');
    
    // Initialize footer
    initializeFooter();
    
    function initializeFooter() {
        // Setup footer animations
        setupFooterAnimations();
        
        // Setup social icons
        setupSocialIcons();
        
        // Setup back to top button
        setupBackToTop();
        
        // Setup footer links
        setupFooterLinks();
        
        // Setup newsletter subscription
        setupNewsletterSubscription();
        
        // Setup footer reveal animation
        setupFooterReveal();
    }
    
    function setupFooterAnimations() {
        if (footer) {
            // Intersection Observer for footer reveal
            const footerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footer.classList.add('visible');
                        animateFooterElements();
                    }
                });
            }, {
                threshold: 0.1
            });
            
            footerObserver.observe(footer);
        }
    }
    
    function animateFooterElements() {
        const footerSections = footer.querySelectorAll('.footer-section');
        
        footerSections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.2}s`;
            section.classList.add('slide-in-up');
        });
    }
    
    function setupSocialIcons() {
        socialIcons.forEach(icon => {
            // Hover effect
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.filter = 'brightness(1.2)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.filter = 'brightness(1)';
            });
            
            // Click effect
            icon.addEventListener('click', (e) => {
                createSocialIconEffect(e, icon);
            });
        });
    }
    
    function setupBackToTop() {
        if (backToTopButton) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', throttle(() => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            }, 100));
            
            // Smooth scroll to top
            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                backToTopButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    backToTopButton.style.transform = 'scale(1)';
                }, 150);
                
                // Smooth scroll
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Add progress indicator
                showScrollProgress();
            });
        }
    }
    
    function setupFooterLinks() {
        footerLinks.forEach(link => {
            // Hover effect
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateX(5px)';
                link.style.color = 'var(--primary-color)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateX(0)';
                link.style.color = '';
            });
            
            // Click effect
            link.addEventListener('click', (e) => {
                createLinkClickEffect(e, link);
            });
        });
    }
    
    function setupNewsletterSubscription() {
        const newsletterForm = document.querySelector('.newsletter-form');
        const newsletterInput = document.querySelector('.newsletter-input');
        const newsletterButton = document.querySelector('.newsletter-button');
        
        if (newsletterForm && newsletterInput && newsletterButton) {
            // Form submission
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleNewsletterSubmission(newsletterInput.value);
            });
            
            // Input focus effects
            newsletterInput.addEventListener('focus', () => {
                newsletterInput.parentElement.classList.add('focused');
            });
            
            newsletterInput.addEventListener('blur', () => {
                if (!newsletterInput.value) {
                    newsletterInput.parentElement.classList.remove('focused');
                }
            });
            
            // Button hover effect
            newsletterButton.addEventListener('mouseenter', () => {
                newsletterButton.style.transform = 'scale(1.05)';
            });
            
            newsletterButton.addEventListener('mouseleave', () => {
                newsletterButton.style.transform = 'scale(1)';
            });
        }
    }
    
    function setupFooterReveal() {
        // Parallax effect for footer background
        if (footer) {
            window.addEventListener('scroll', throttle(() => {
                const scrolled = window.pageYOffset;
                const footerTop = footer.offsetTop;
                const windowHeight = window.innerHeight;
                
                if (scrolled + windowHeight > footerTop) {
                    const parallaxValue = (scrolled + windowHeight - footerTop) * 0.3;
                    footer.style.transform = `translateY(-${parallaxValue}px)`;
                }
            }, 16));
        }
    }
    
    // Utility functions
    function handleNewsletterSubmission(email) {
        if (!isValidEmail(email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        const newsletterButton = document.querySelector('.newsletter-button');
        const originalText = newsletterButton.textContent;
        
        // Show loading state
        newsletterButton.textContent = '구독 중...';
        newsletterButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Success animation
            newsletterButton.textContent = '구독 완료!';
            newsletterButton.style.background = 'var(--success-color)';
            
            showNotification('뉴스레터 구독이 완료되었습니다!', 'success');
            
            // Reset form
            setTimeout(() => {
                document.querySelector('.newsletter-input').value = '';
                newsletterButton.textContent = originalText;
                newsletterButton.disabled = false;
                newsletterButton.style.background = '';
            }, 2000);
        }, 1000);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('visible');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('visible');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    function showScrollProgress() {
        const progress = document.createElement('div');
        progress.className = 'scroll-progress';
        progress.innerHTML = '<div class="progress-bar"></div>';
        
        document.body.appendChild(progress);
        
        let currentProgress = 0;
        const targetProgress = 100;
        const duration = 1000;
        const startTime = performance.now();
        
        function updateProgress(currentTime) {
            const elapsed = currentTime - startTime;
            const progressPercent = Math.min(elapsed / duration, 1);
            
            currentProgress = targetProgress * progressPercent;
            progress.querySelector('.progress-bar').style.width = `${currentProgress}%`;
            
            if (progressPercent < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(() => {
                    progress.remove();
                }, 500);
            }
        }
        
        requestAnimationFrame(updateProgress);
    }
    
    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        const languageButton = languageSelector.querySelector('.language-button');
        const languageDropdown = languageSelector.querySelector('.language-dropdown');
        
        if (languageButton && languageDropdown) {
            languageButton.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageSelector.contains(e.target)) {
                    languageDropdown.classList.remove('active');
                }
            });
            
            // Handle language selection
            const languageOptions = languageDropdown.querySelectorAll('.language-option');
            languageOptions.forEach(option => {
                option.addEventListener('click', () => {
                    const selectedLang = option.dataset.lang;
                    const selectedText = option.textContent;
                    
                    languageButton.textContent = selectedText;
                    languageDropdown.classList.remove('active');
                    
                    // Save language preference
                    localStorage.setItem('selectedLanguage', selectedLang);
                    
                    // Add selection animation
                    option.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        option.style.transform = 'scale(1)';
                    }, 150);
                });
            });
        }
    }
    
    // Copyright year auto-update
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
    
    // Footer statistics counter
    const statCounters = document.querySelectorAll('.stat-counter');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    statCounters.forEach(counter => {
        statsObserver.observe(counter);
    });
    
    function animateStatCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const start = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
});

// Effect functions
function createSocialIconEffect(event, icon) {
    // Ripple effect
    const rect = icon.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('social-ripple');
    
    icon.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createLinkClickEffect(event, link) {
    // Underline animation
    const underline = document.createElement('span');
    underline.className = 'link-underline';
    link.appendChild(underline);
    
    setTimeout(() => {
        underline.remove();
    }, 300);
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
        handleNewsletterSubmission,
        showNotification,
        animateStatCounter
    };
} 