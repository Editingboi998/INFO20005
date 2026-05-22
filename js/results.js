document.addEventListener('DOMContentLoaded', () => {

    const sortFilter = document.getElementById('sort-filter');
    
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            const originalColor = sortFilter.style.backgroundColor;
            
            sortFilter.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                sortFilter.style.backgroundColor = originalColor;
            }, 300);
        });
    }

    const interactiveElements = document.querySelectorAll('.page-text, .product-card');

    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.classList.add('is-touched');
        }, {passive: true});

        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('is-touched');
            }, 150);
        });
    });
});