/* product form */
document.addEventListener('DOMContentLoaded', () => {
    
    // select the quantity elements
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const qtyInput = document.getElementById('quantity-input');

    // decrease quantity
    minusBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        // Prevent quantity from dropping below the min attribute (1)
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });

    // increase quantity
    plusBtn.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });

    const form = document.getElementById('add-to-cart-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Added ${qtyInput.value} item(s) to cart!`);
    });
});