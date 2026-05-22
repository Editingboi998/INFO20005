document.addEventListener('DOMContentLoaded', () => {

    const cartItems = document.querySelectorAll('.cart-item');
    const grandTotalDisplay = document.getElementById('grand-total');

    function updateCartTotals() {
        let currentGrandTotal = 0;

        cartItems.forEach(item => {
            const basePrice = parseFloat(item.getAttribute('data-price'));
            const qtyInput = item.querySelector('.qty-input');
            const lineTotalDisplay = item.querySelector('.line-total');
            
            let qty = parseInt(qtyInput.value);
            if (isNaN(qty) || qty < 1) {
                qty = 1;
                qtyInput.value = 1;
            }

            const lineTotal = basePrice * qty;
            
            if (lineTotalDisplay) {
                lineTotalDisplay.textContent = lineTotal.toFixed(2);
            }

            currentGrandTotal += lineTotal;
        });

        if (grandTotalDisplay) {
            grandTotalDisplay.textContent = currentGrandTotal.toFixed(2);
        }
    }

    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.minus-btn');
        const plusBtn = item.querySelector('.plus-btn');
        const qtyInput = item.querySelector('.qty-input');

        if (minusBtn && plusBtn && qtyInput) {
            minusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value);
                if (currentVal > 1) {
                    qtyInput.value = currentVal - 1;
                    updateCartTotals();
                }
            });

            plusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value);
                qtyInput.value = currentVal + 1;
                updateCartTotals();
            });

            qtyInput.addEventListener('input', () => {
                updateCartTotals();
            });

            qtyInput.addEventListener('blur', () => {
                updateCartTotals(); 
            });
        }
    });

    const closeBtn = document.querySelector('.close-cart-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.textContent = '✓';
            this.style.backgroundColor = '#27ae60';
            this.style.borderColor = '#27ae60';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = '+';
                this.style.backgroundColor = 'transparent';
                this.style.borderColor = '#ff6a00';
                this.style.color = '#ff6a00';
            }, 1500);
        });
    });

    updateCartTotals();
});