document.addEventListener('DOMContentLoaded', () => {
    

    const addToCartForm = document.getElementById('add-to-cart-form');
    

    if (!addToCartForm) return;


    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('quantity-input');
    const priceDisplay = document.getElementById('dynamic-price');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    const basePrice = parseFloat(addToCartForm.dataset.price) || 69.99; 
    const productBaseId = addToCartForm.dataset.productId || 'amino-z-product';


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

    if (addToCartBtn) {
        addToCartForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const productName = document.getElementById('product-name').textContent;
            const flavorDropdown = document.getElementById('flavor-select');
            const flavor = flavorDropdown.options[flavorDropdown.selectedIndex].value;
            const quantity = parseInt(qtyInput.value);
            const imageSrc = document.getElementById('main-product-image').src;
            
            const specificProductId = `${productBaseId}-${flavor.toLowerCase()}`;

            const cartItem = {
                id: specificProductId,
                name: productName,
                flavor: flavor,
                price: basePrice,
                image: imageSrc,
                quantity: quantity
            };

            let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === specificProductId);

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
});