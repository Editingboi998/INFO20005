/*document.addEventListener('DOMContentLoaded', () => {
    
    const interactiveElements = document.querySelectorAll('a, button, .search-input');

    interactiveElements.forEach(el => {

        el.addEventListener('touchstart', function() {
            this.classList.add('is-touched');
            
            if(this.classList.contains('search-input')) {
                this.querySelector('input').focus();
            }
        }, {passive: true});

        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('is-touched');
            }, 150); 
        });
    });

});

*/
document.addEventListener('DOMContentLoaded', () => {

    // --- Fade Animations ---
    const fadeItems = document.querySelectorAll('.fade-up-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeItems.forEach(item => {
        fadeObserver.observe(item);
    });

    // --- Touch Interactions ---
    const interactiveElements = document.querySelectorAll('a, button, .search-input');

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('is-touched');
            
            if(this.classList.contains('search-input')) {
                this.querySelector('input').focus();
            }
        }, {passive: true});

        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('is-touched');
            }, 150); 
        });
    });

    // --- Search Bar Functionality ---
    const searchInput = document.querySelector('.header-search-container input');
    const searchIcon = document.querySelector('.search-glass-icon');

    if (searchInput && searchIcon) {
        
        function executeSearch() {

            const query = searchInput.value.trim();
            window.location.href = 'search.html';
        }

        searchIcon.addEventListener('click', executeSearch);


        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                executeSearch();
            }
        });
    }

});