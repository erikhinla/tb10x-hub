// BBM Site Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Lead Loss Calculator Logic
  const visitorsInput = document.getElementById('monthly-visitors');
  const conversionInput = document.getElementById('conversion-rate');
  const valueInput = document.getElementById('customer-value');
  const resultDisplay = document.getElementById('lost-revenue');
  
  function calculateLoss() {
    const visitors = parseFloat(visitorsInput.value) || 0;
    const currentConv = parseFloat(conversionInput.value) || 0;
    const ltv = parseFloat(valueInput.value) || 0;
    
    // Assume an optimized funnel improves conversion by absolute 1.5%
    // The "loss" is the difference between optimized vs current.
    const optimizedConv = currentConv + 1.5;
    const currentCust = (visitors * currentConv) / 100;
    const optimizedCust = (visitors * optimizedConv) / 100;
    
    const diff = Math.max(0, optimizedCust - currentCust);
    const lostRev = diff * ltv;
    
    // Format as currency
    resultDisplay.textContent = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(lostRev);
    
    // Add a tiny animation to the result via scale to fulfill MOTION_INTENSITY
    resultDisplay.style.transform = 'scale(0.95)';
    resultDisplay.style.opacity = '0.5';
    setTimeout(() => {
      resultDisplay.style.transform = 'scale(1)';
      resultDisplay.style.opacity = '1';
      resultDisplay.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 50);
  }
  
  visitorsInput.addEventListener('input', calculateLoss);
  conversionInput.addEventListener('input', calculateLoss);
  valueInput.addEventListener('input', calculateLoss);

  // Initial calculation
  calculateLoss();

  // Rev-Anew Form Handler
  const revanewForm = document.querySelector('.revanew-form');
  if (revanewForm) {
    revanewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const youtubeUrl = document.getElementById('youtube-url').value;

      if (youtubeUrl) {
        // Show success message
        const button = revanewForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = '✓ Analyzing...';
        button.style.opacity = '0.6';

        // Simulate processing, then show success
        setTimeout(() => {
          button.textContent = '✓ Check your email for your analysis!';
          button.style.backgroundColor = 'rgba(148, 163, 184, 0.2)';
          button.style.cursor = 'default';
          button.disabled = true;

          // Reset after 4 seconds
          setTimeout(() => {
            button.textContent = originalText;
            button.style.opacity = '1';
            button.style.backgroundColor = '';
            button.style.cursor = 'pointer';
            button.disabled = false;
            revanewForm.reset();
          }, 4000);
        }, 800);
      }
    });
  }
});
