document.addEventListener('DOMContentLoaded', () => {
    
    const interactiveElements = document.querySelectorAll('.search-suggestions-list a, .search-icon, .back-arrow');

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


    const searchInput = document.getElementById('main-search-bar');
    const clearBtn = document.getElementById('clear-btn');

    if(searchInput && searchInput.value === "") {
        searchInput.focus();
    }

    if (searchInput && clearBtn) {
        
        searchInput.addEventListener('input', () => {

            if (searchInput.value.length > 0) {
                clearBtn.style.display = 'block';
            } else {
                clearBtn.style.display = 'none';
            }
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';          
            clearBtn.style.display = 'none';  
            searchInput.focus();              
        });
    }

    if (searchInput) {

        const suggestions = [
            "Search 'Whey Protein'...",
            "Search 'Pre-workout'...",
            "Search 'Creatine'...",
            "Search 'Vitamins'...",
            "Search 'Shaker Bottle'..."
        ];
        
        let currentIndex = 0;


        setInterval(() => {
            if (searchInput.value === "") {
                currentIndex++;
                
                if (currentIndex >= suggestions.length) {
                    currentIndex = 0;
                }
                
                searchInput.placeholder = suggestions[currentIndex];
            }
        }, 2500);
    }
});