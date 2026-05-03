document.addEventListener('DOMContentLoaded', () => {

    // confirm
    const confirmButtons = document.querySelectorAll('.confirm-btn');

    confirmButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const currentStep = this.closest('.checkout-step');

            const inputs = currentStep.querySelectorAll('input[required], textarea[required]');
            let isSectionValid = true;

            // empty field
            inputs.forEach(input => {
                if (!input.checkValidity()) {
                    input.reportValidity(); 
                    isSectionValid = false;
                }
            });

            // when filled
            if (isSectionValid) {
                
                currentStep.classList.remove('active');
                currentStep.classList.add('completed');

                const nextStep = currentStep.nextElementSibling;
                
                // open next section
                if (nextStep && nextStep.classList.contains('checkout-step')) {
                    nextStep.classList.remove('locked');
                    nextStep.classList.add('active');
                }
            }
        });
    });

    // going back to edit
    const stepHeaders = document.querySelectorAll('.step-header');

    stepHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const clickedStep = this.closest('.checkout-step');
            
            // only let them open it if they've already completed it
            if (clickedStep.classList.contains('completed')) {
                
                document.querySelectorAll('.checkout-step.active').forEach(step => {
                    step.classList.remove('active');
                });

                // open the one they just clicked
                clickedStep.classList.add('active');
                clickedStep.classList.remove('completed'); 
            }
        });
    });

});