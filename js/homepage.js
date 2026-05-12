document.addEventListener('DOMContentLoaded', () => {
    
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