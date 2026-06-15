document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.querySelector('.header-search-container input');
    const searchIcon = document.querySelector('.search-glass-icon');

    if (searchInput && searchIcon) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                window.location.href = 'results.html';
            }
        });

        searchIcon.addEventListener('click', () => {
            window.location.href = 'search.html';
        });
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    function openMenu() {
        if (sideMenu) sideMenu.classList.add('open');
        if (menuOverlay) menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        if (sideMenu) sideMenu.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (menuToggle) menuToggle.addEventListener('click', openMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    const cartBadge = document.getElementById('cart-badge');

    function updateCartBadge() {
        if (!cartBadge) return;
        
        let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
        let totalItems = 0;
        
        cart.forEach(item => {
            totalItems += parseInt(item.quantity);
        });

        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.add('visible');
            
            cartBadge.classList.add('bump');
            setTimeout(() => {
                cartBadge.classList.remove('bump');
            }, 300);
        } else {
            cartBadge.classList.remove('visible');
        }
    }

    updateCartBadge();

    document.addEventListener('click', (e) => {
        if (e.target.closest('.add-to-cart-btn') || 
            e.target.closest('.qty-btn') || 
            e.target.closest('.quick-add-btn')) { 
            
            setTimeout(updateCartBadge, 50); 
        }
    });

    window.addEventListener('storage', (e) => {
        if (e.key === 'aminoZCart') {
            updateCartBadge();
        }
    });
});