document.addEventListener('DOMContentLoaded', () => {

    const cartContainer = document.querySelector('.cart-items-container');
    const grandTotalDisplay = document.getElementById('grand-total');

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
        

        cartContainer.innerHTML = '';
        let currentGrandTotal = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p style="color: white; font-family: Montserrat; font-weight: 600; text-align: center; padding: 40px;">Your cart is empty.</p>';
            if(grandTotalDisplay) grandTotalDisplay.textContent = '0.00';
            return;
        }

        cart.forEach((item, index) => {
            const lineTotal = item.price * item.quantity;
            currentGrandTotal += lineTotal;

            const article = document.createElement('article');
            article.className = 'cart-item';
            
            article.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                
                <div class="cart-item-details">
                    <h3 class="item-title"><a href="product.html">${item.name} - ${item.flavor}</a></h3>
                    
                    <div class="item-bottom-row">
                        <div class="qty-wrapper">
                            <span class="qty-label">Quantity:</span>
                            <div class="quantity-controls" data-index="${index}">
                                <button type="button" class="qty-btn minus-btn">-</button>
                                <input type="number" class="qty-input" value="${item.quantity}" min="1">
                                <button type="button" class="qty-btn plus-btn">+</button>
                            </div>
                        </div>
                        <div class="item-total">Total: $<span class="line-total">${lineTotal.toFixed(2)}</span></div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(article);
        });

        if (grandTotalDisplay) {
            grandTotalDisplay.textContent = currentGrandTotal.toFixed(2);
        }

        attachCartEventListeners();
    }

    function attachCartEventListeners() {
        let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
        const quantityControls = document.querySelectorAll('.quantity-controls');

        quantityControls.forEach(control => {
            const index = control.getAttribute('data-index');
            const minusBtn = control.querySelector('.minus-btn');
            const plusBtn = control.querySelector('.plus-btn');
            const qtyInput = control.querySelector('.qty-input');

            minusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value);
                if (currentVal > 1) {
                    cart[index].quantity = currentVal - 1;
                } else {

                    cart.splice(index, 1); 
                }
                localStorage.setItem('aminoZCart', JSON.stringify(cart));
                renderCart(); 
            });

            plusBtn.addEventListener('click', () => {
                let currentVal = parseInt(qtyInput.value);
                cart[index].quantity = currentVal + 1;
                localStorage.setItem('aminoZCart', JSON.stringify(cart));
                renderCart();
            });

            qtyInput.addEventListener('blur', () => {
                let currentVal = parseInt(qtyInput.value);
                if (isNaN(currentVal) || currentVal < 1) {
                    cart[index].quantity = 1;
                } else {
                    cart[index].quantity = currentVal;
                }
                localStorage.setItem('aminoZCart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    const closeBtn = document.querySelector('.close-cart-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = '../index.html';
            }
        });
    }


    renderCart();
});