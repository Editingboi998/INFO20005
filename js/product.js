document.addEventListener('DOMContentLoaded', () => {

    const minusBtn = document.getElementById('qty-minus');
    const plusBtn = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('quantity-input');
    const priceDisplay = document.getElementById('dynamic-price');
    
    const basePrice = 69.99; 

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
        
        qtyInput.addEventListener('input', () => {
            updatePrice(); 
        });

        qtyInput.addEventListener('blur', () => {
            let currentValue = parseInt(qtyInput.value);
            if (isNaN(currentValue) || currentValue < 1) {
                qtyInput.value = 1; 
                updatePrice();
            }
        });
    }

    const addToCartForm = document.getElementById('add-to-cart-form');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');

    if (addToCartForm && addToCartBtn) {
        addToCartForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const originalText = addToCartBtn.textContent;
            
            addToCartBtn.classList.add('success');
            addToCartBtn.textContent = 'ADDED TO CART ✓';
            
            setTimeout(() => {
                addToCartBtn.classList.remove('success');
                addToCartBtn.textContent = originalText;
            }, 2000);
        });
    }

    const interactiveElements = document.querySelectorAll('summary, .add-to-cart-btn, .qty-btn, select');

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