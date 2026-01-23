let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item'); 

function updateSlides() {
  slides.forEach((slide, index) => {
    slide.className = 'carousel-item'; 
    
    if (index === currentSlide) {
      slide.classList.add('active');
    } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (index === (currentSlide + 1) % slides.length) {
      slide.classList.add('next'); 
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlides();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlides();
}
// ftuyuidrtfyugyiuhsetdrftyguyihuo
const cookieBtn = document.getElementById("acceptCookies");
const cookieBanner = document.getElementById("cookieNotlol");

// Only run the code if BOTH elements actually exist in your HTML
if (cookieBtn && cookieBanner) {
    cookieBtn.addEventListener("click", function() {
        cookieBanner.classList.add("hidden");
    });
}
// -----------------------
const loginForm = document.getElementById('loginForm');
const user = document.getElementById('user');
const pass = document.getElementById('pass');
const loginWrapper = document.querySelector('.login-wrapper');

// Only run if all elements exist on the page
if (loginForm && user && pass && loginWrapper) {
    loginForm.addEventListener('submit', (e) => {  
        e.preventDefault();
        
        const userValue = user.value;
        const passValue = pass.value;
      
        if (userValue === '') {
            showLoginError(user, "Username is empty");
        } else {
            showLoginSuccess(user);
        }
        
        if (passValue === '') {
            showLoginError(pass, "Password is empty");
        } else {
            showLoginSuccess(pass);
        }
        
        if (user.parentElement.classList.contains('valid') && pass.parentElement.classList.contains('valid')) {
            loginWrapper.classList.add('authenticated');
        }
         if (
      user.parentElement.classList.contains("valid") &&
      pass.parentElement.classList.contains("valid")
    ) {
      loginWrapper.classList.add("authenticated");

      // redirect to user page
      window.location.href = "../lohinuser/user.html";
    }
        
    });
}

function showLoginError(field, message) {
    const inputGroup = field.parentElement;
    if (inputGroup.classList.contains('valid')) {
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
    } else {
        inputGroup.classList.add('invalid');
    }
    const validationText = inputGroup.querySelector('.validation-text');
    if (validationText) {
        validationText.textContent = message;
    }
}

function showLoginSuccess(field) {
    const inputGroup = field.parentElement;
    if (inputGroup.classList.contains('invalid')) {
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
    } else {
        inputGroup.classList.add('valid');
    }
}
// scroll to top------------------------------------------------------
// Get the button:

let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 100|| document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// contact page
// --- CONTACT PAGE LOGIC ---
const contactForm = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

      
        checkRequired([username, email, password, password2]);
        
        checkLength(username, 3, 15);
        checkLength(password, 6, 25);
        checkEmail(email);
    });
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    if (small) small.innerText = message;
}

// Helper: Show success
function showSucces(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Helper: Email Validation
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSucces(input);
    } else {
        showError(input, 'Email is invalid');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input && input.value.trim() === '') {
            showError(input, `Question is required`);
        } else if (input) {
            showSucces(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `Phone number is required`);
    } else if (input.value.length > max) {
        showError(input, `It must be less than ${max} characters`);
    } else {
        showSucces(input);
    }
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// burger bar
let burger = document.getElementById('burgerbar');
let menu = document.querySelector('.menu');

console.log('Burger:', burger); 
console.log('Menu:', menu); 

burger.addEventListener('click', () => {
    console.log('Clicked!'); 
    menu.classList.toggle('active');
    console.log('Menu classes:', menu.classList); 
});



// Favorites and Filter Functionality
class FavoritesManager {
    constructor() {
        this.favorites = this.loadFavorites();
        this.showingFavorites = false;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.updateFavoritesCount();
        this.restoreFavoriteStates();
    }

    loadFavorites() {
        const stored = localStorage.getItem('clothingFavorites');
        return stored ? JSON.parse(stored) : [];
    }

    saveFavorites() {
        localStorage.setItem('clothingFavorites', JSON.stringify(this.favorites));
    }

    attachEventListeners() {
        // Favorite hearts
        document.querySelectorAll('.favorite-heart').forEach(heart => {
            heart.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleFavorite(heart);
            });
        });

        // Favorites button
        const favBtn = document.getElementById('favorites-btn');
        if (favBtn) {
            favBtn.addEventListener('click', () => this.toggleFavoritesView());
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }

        // Price filter
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.applyFilters());
        }

        // Reset filters
        const resetBtn = document.getElementById('reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetFilters());
        }
    }

    toggleFavorite(heartBtn) {
        const itemId = heartBtn.dataset.itemId;
        const card = heartBtn.closest('.card');
        
        if (this.favorites.includes(itemId)) {
            // Remove from favorites
            this.favorites = this.favorites.filter(id => id !== itemId);
            heartBtn.classList.remove('active');
        } else {
            // Add to favorites
            this.favorites.push(itemId);
            heartBtn.classList.add('active');
            this.animateHeart(heartBtn);
        }

        this.saveFavorites();
        this.updateFavoritesCount();
    }

    animateHeart(heartBtn) {
        heartBtn.style.animation = 'heartPulse 0.3s ease';
        setTimeout(() => {
            heartBtn.style.animation = '';
        }, 300);
    }

    restoreFavoriteStates() {
        document.querySelectorAll('.favorite-heart').forEach(heart => {
            const itemId = heart.dataset.itemId;
            if (this.favorites.includes(itemId)) {
                heart.classList.add('active');
            }
        });
    }

    updateFavoritesCount() {
    const countEl = document.getElementById('favorites-count');
    if (countEl) {
        // If favorites is empty, show 0, otherwise show the length
        countEl.textContent = this.favorites ? this.favorites.length : 0;
    }
}

    toggleFavoritesView() {
        const favBtn = document.getElementById('favorites-btn');
        this.showingFavorites = !this.showingFavorites;

        if (this.showingFavorites) {
            favBtn.classList.add('active');
            favBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Show All (<span id="favorites-count">${this.favorites.length}</span>)
            `;
            this.showOnlyFavorites();
        } else {
            favBtn.classList.remove('active');
            favBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                Favorites (<span id="favorites-count">${this.favorites.length}</span>)
            `;
            this.applyFilters();
        }
    }

    showOnlyFavorites() {
    const carousels = document.querySelectorAll('.carousel');
    const allCards = document.querySelectorAll('.card');
    let visibleCount = 0;

    // Stop the carousel immediately
    carousels.forEach(c => c.classList.add('grid-mode'));

    allCards.forEach(card => {
        const heart = card.querySelector('.favorite-heart');
        const itemId = heart ? heart.dataset.itemId : null;

        if (itemId && this.favorites.includes(itemId)) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    this.showEmptyState(visibleCount === 0, 'No favorites yet! Add some items to see them here.');
}
    applyFilters() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const carousels = document.querySelectorAll('.carousel');
    const allCards = document.querySelectorAll('.card');
    
    // STOP CAROUSEL LOGIC:
    // If user picks a category OR is looking at favorites, stop the movement
    if (categoryFilter !== 'all' || priceFilter !== 'all' || this.showingFavorites) {
        carousels.forEach(c => c.classList.add('grid-mode'));
    } else {
        carousels.forEach(c => c.classList.remove('grid-mode'));
    }

    let visibleCount = 0;

    allCards.forEach(card => {
        const category = card.dataset.category;
        const price = parseInt(card.dataset.price);

        let matchesCategory = categoryFilter === 'all' || category === categoryFilter;
        let matchesPrice = true;

        if (priceFilter !== 'all') {
            if (priceFilter === '0-20') matchesPrice = price <= 20;
            else if (priceFilter === '20-50') matchesPrice = price > 20 && price <= 50;
            else if (priceFilter === '50+') matchesPrice = price > 50;
        }

        // Final visibility check
        if (matchesCategory && matchesPrice) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    this.showEmptyState(visibleCount === 0, 'No items match your filters.');
}

    resetFilters() {
        document.getElementById('category-filter').value = 'all';
        document.getElementById('price-filter').value = 'all';
        
        if (this.showingFavorites) {
            this.toggleFavoritesView();
        } else {
            this.applyFilters();
        }
    }

    showEmptyState(show, message) {
        let emptyState = document.querySelector('.empty-state');
        
        if (show) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                const carousel = document.querySelector('.carousel');
                carousel.parentNode.insertBefore(emptyState, carousel);
            }
            emptyState.textContent = message;
            emptyState.classList.remove('hidden');
        } else {
            if (emptyState) {
                emptyState.classList.add('hidden');
            }
        }
    }
}

// Add heart pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FavoritesManager();
});
