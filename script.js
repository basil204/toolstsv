// Student Card Generator - JavaScript for PHP Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    console.log('🎓 Student Card Generator - PHP Version initialized');
    
    // Add event listeners
    setupEventListeners();
    
    // Add animations
    addAnimations();
    
    // Setup form validation
    setupFormValidation();
}

function setupEventListeners() {
    // Form submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Special card toggle
    const specialCardToggle = document.getElementById('use_special_card');
    if (specialCardToggle) {
        specialCardToggle.addEventListener('change', handleSpecialCardToggle);
    }
    
    // Country selection
    const countrySelect = document.querySelector('select[name="country"]');
    if (countrySelect) {
        countrySelect.addEventListener('change', handleCountryChange);
    }
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('button[type="submit"]');
    downloadButtons.forEach(button => {
        if (button.name === 'action') {
            button.addEventListener('click', handleDownloadClick);
        }
    });
}

function handleFormSubmit(event) {
    const form = event.target;
    const action = form.querySelector('input[name="action"]')?.value;
    
    if (action === 'generate_card') {
        event.preventDefault();
        generateNewCard();
    }
}

function handleSpecialCardToggle(event) {
    const isChecked = event.target.checked;
    console.log('🎨 Special card toggle:', isChecked ? 'enabled' : 'disabled');
    
    // Add visual feedback
    const cardPreview = document.querySelector('.bg-white.rounded-2xl.p-6.card-shadow');
    if (cardPreview) {
        if (isChecked) {
            cardPreview.classList.add('border-red-300');
        } else {
            cardPreview.classList.remove('border-red-300');
        }
    }
}

function handleCountryChange(event) {
    const country = event.target.value;
    console.log('🌍 Country changed to:', country);
    
    // Update labels if needed
    updateLabels(country);
}

function handleDownloadClick(event) {
    const button = event.target;
    const action = button.value;
    
    console.log('📥 Download requested:', action);
    
    // Add loading state
    addLoadingState(button);
    
    // Remove loading state after a delay
    setTimeout(() => {
        removeLoadingState(button);
    }, 2000);
}

function generateNewCard() {
    console.log('🔄 Generating new card...');
    
    // Show loading animation
    showLoadingAnimation();
    
    // Simulate card generation (in real app, this would be an AJAX call)
    setTimeout(() => {
        hideLoadingAnimation();
        console.log('✅ New card generated');
    }, 1000);
}

function updateLabels(country) {
    // This would update the form labels based on country
    // For now, just log the change
    console.log('🏷️ Labels updated for country:', country);
}

function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Processing...';
    button.disabled = true;
    
    // Store original text for restoration
    button.dataset.originalText = originalText;
}

function removeLoadingState(button) {
    const originalText = button.dataset.originalText;
    if (originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
        delete button.dataset.originalText;
    }
}

function showLoadingAnimation() {
    const cardPreview = document.querySelector('.bg-white.rounded-2xl.p-6.card-shadow');
    if (cardPreview) {
        cardPreview.style.opacity = '0.5';
        cardPreview.style.pointerEvents = 'none';
    }
}

function hideLoadingAnimation() {
    const cardPreview = document.querySelector('.bg-white.rounded-2xl.p-6.card-shadow');
    if (cardPreview) {
        cardPreview.style.opacity = '1';
        cardPreview.style.pointerEvents = 'auto';
    }
}

function addAnimations() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.bg-white.rounded-2xl');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease-in-out';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    field.classList.remove('border-red-500', 'bg-red-50');
    
    // Basic validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500', 'bg-red-50');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('border-red-500', 'bg-red-50');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
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
    };
}

// Image loading utilities
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

function loadImageWithFallback(imgElement, primaryUrl, fallbackUrl) {
    imgElement.src = primaryUrl;
    imgElement.onerror = function() {
        console.warn('⚠️ Primary image failed to load, using fallback');
        this.src = fallbackUrl;
    };
}

// Card generation utilities
function generateCardId() {
    return 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function formatStudentId(country, id) {
    const prefixes = {
        'South Korea': 'KR',
        'Japan': 'JP',
        'United States': 'US',
        'India': 'IN'
    };
    
    const prefix = prefixes[country] || 'XX';
    return prefix + id.toString().padStart(6, '0');
}

// Export functions for global use
window.StudentCardGenerator = {
    generateNewCard,
    addLoadingState,
    removeLoadingState,
    showLoadingAnimation,
    hideLoadingAnimation,
    preloadImage,
    loadImageWithFallback,
    generateCardId,
    formatStudentId,
    debounce,
    throttle
};

// Console welcome message
console.log(`
🎓 Student Card Generator - PHP Version
=====================================
Version: 2.0.0
Features:
- Generate student cards with AI faces
- Multiple country support
- Special card design
- Download as PNG/PDF
- Responsive design
- Form validation

Available functions:
- StudentCardGenerator.generateNewCard()
- StudentCardGenerator.addLoadingState()
- StudentCardGenerator.removeLoadingState()
- StudentCardGenerator.preloadImage()
- StudentCardGenerator.loadImageWithFallback()

Happy coding! 🚀
`);
