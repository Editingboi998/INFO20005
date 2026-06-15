document.addEventListener('DOMContentLoaded', () => {

    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('quantity-input');
    const priceDisplay = document.getElementById('dynamic-price');
    const addToCartForm = document.getElementById('add-to-cart-form');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    // Set to the WPI base price
    const basePrice = 84.99; 

    function updatePrice() {
        if (priceDisplay && qtyInput) {
            const currentQty = parseInt(qtyInput.value) || 1;
            const total = (basePrice * currentQty).toFixed(2); 
            priceDisplay.textContent = `$${total}`;
        }
    }

    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
                updatePrice(); 
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
            updatePrice(); 
        });
        
        qtyInput.addEventListener('input', updatePrice);

        qtyInput.addEventListener('blur', () => {
            let currentValue = parseInt(qtyInput.value);
            if (isNaN(currentValue) || currentValue < 1) {
                qtyInput.value = 1; 
                updatePrice();
            }
        });
    }

    if (addToCartForm && addToCartBtn) {
        addToCartForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const productName = document.getElementById('product-name').textContent;
            const flavorDropdown = document.getElementById('flavor-select');
            const flavor = flavorDropdown.options[flavorDropdown.selectedIndex].value;
            const quantity = parseInt(qtyInput.value);
            const imageSrc = document.getElementById('main-product-image').src;
            
            // Differentiates WPI from regular whey in the cart
            const productId = `amino-z-sig-wpi-${flavor.toLowerCase()}`;

            const cartItem = {
                id: productId,
                name: productName,
                flavor: flavor,
                price: basePrice,
                image: imageSrc,
                quantity: quantity
            };

            let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem('aminoZCart', JSON.stringify(cart));
            
            const originalText = addToCartBtn.textContent;
            addToCartBtn.classList.add('success');
            addToCartBtn.textContent = 'ADDED ✓';
            
            setTimeout(() => {
                addToCartBtn.classList.remove('success');
                addToCartBtn.textContent = originalText;
            }, 2000);
        });
    }
    
    const searchInput = document.querySelector('.header-search-container input');
    const searchIcon = document.querySelector('.search-glass-icon');

    if (searchInput && searchIcon) {
        function executeSearch() {
            window.location.href = 'results.html';
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