document.addEventListener('DOMContentLoaded', () => {

    const shippingCost = 10.00; 

    const itemsListContainer = document.getElementById('checkout-items-list');
    const subtotalDisplay = document.getElementById('summary-subtotal');
    const shippingDisplay = document.getElementById('summary-shipping');
    const grandTotalDisplay = document.getElementById('summary-grand-total');

    function renderOrderSummary() {
        let cart = JSON.parse(localStorage.getItem('aminoZCart')) || [];
        let subtotal = 0;

        if (cart.length === 0 && itemsListContainer) {
            itemsListContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        if (itemsListContainer) {
            itemsListContainer.innerHTML = ''; 

            cart.forEach(item => {
                const lineTotal = item.price * item.quantity;
                subtotal += lineTotal;

                const itemHTML = `
                    <div class="summary-item">
                        <div class="summary-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="summary-item-info">
                            <h3 class="summary-item-title">${item.name}</h3>
                            <p class="summary-item-variant">${item.flavor} x ${item.quantity}</p>
                        </div>
                        <div class="summary-item-price">$${lineTotal.toFixed(2)}</div>
                    </div>
                `;
                itemsListContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        let grandTotal = subtotal + shippingCost;

        if (subtotalDisplay) subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingDisplay) shippingDisplay.textContent = `$${shippingCost.toFixed(2)}`;
        if (grandTotalDisplay) grandTotalDisplay.textContent = `$${grandTotal.toFixed(2)}`;
    }

    const confirmButtons = document.querySelectorAll('.confirm-btn');

    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.checkout-step');
            const inputs = currentStep.querySelectorAll('input[required], textarea[required]');
            let isSectionValid = true;

            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); 
                    isSectionValid = false;
                }
            });

            if (isSectionValid) {
                currentStep.classList.remove('active');
                currentStep.classList.add('completed');

                const nextStep = currentStep.nextElementSibling;
                
                if (nextStep && nextStep.classList.contains('checkout-step')) {
                    nextStep.classList.remove('locked');
                    nextStep.classList.add('active');
                }
            }
        });
    });

    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const clickedStep = this.closest('.checkout-step');
            
            if (clickedStep.classList.contains('completed')) {
                document.querySelectorAll('.checkout-step.active').forEach(step => {
                    step.classList.remove('active');
                });

                clickedStep.classList.add('active');
                clickedStep.classList.remove('completed'); 
            }
        });
    });

    renderOrderSummary();

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', () => {
            localStorage.removeItem('aminoZCart');
        });
    }
});

    const cardInput = document.getElementById('card');
    const expiryInput = document.getElementById('expiry');

    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            let formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            e.target.value = formattedValue;
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', function (e) {

            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 2) {
                e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                e.target.value = value;
            }
        });
    }