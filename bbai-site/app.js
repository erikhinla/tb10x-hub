// BBAI Multi-step Form Logic
document.addEventListener('DOMContentLoaded', () => {
    const steps = Array.from(document.querySelectorAll('.form-step:not(#stepSuccess)'));
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const form = document.getElementById('auditForm');
    const progressFill = document.getElementById('progressFill');
    const successStep = document.getElementById('stepSuccess');

    let currentStep = 0;

    // Smooth scroll to form
    window.scrollToAudit = () => {
        document.getElementById('audit').scrollIntoView({ behavior: 'smooth' });
    };

    function updateForm() {
        // Hide all steps
        steps.forEach(step => step.classList.remove('active'));
        
        // Show current step
        steps[currentStep].classList.add('active');
        
        // Update progress bar
        const progress = ((currentStep + 1) / steps.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    function validateStep() {
        const inputs = steps[currentStep].querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#EF4444'; // Red border
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        return isValid;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep()) {
                currentStep++;
                if (currentStep < steps.length) {
                    updateForm();
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateForm();
        });
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateStep()) {
                // If using actual Netlify forms, we would submit it here via fetch or let it run
                // For demo/prototype flow, we instantly show success
                
                // Hide inputs
                steps.forEach(step => step.classList.remove('active'));
                document.querySelector('.progress-bar').style.display = 'none';
                
                // Show success
                successStep.classList.add('active');
            }
        });
    }

    // Reset styles on actual typing/change
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = 'var(--border-color)';
        });
        input.addEventListener('change', () => {
            input.style.borderColor = 'var(--border-color)';
        });
    });
});
