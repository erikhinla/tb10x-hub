const INTAKE_URL = "https://REPLACE_ME";
const EMAIL_LINE = "Upload assets here: https://REPLACE_ME";

document.addEventListener('DOMContentLoaded', () => {
  // Wire buttons
  const startBtns = [document.getElementById('nav-start'), document.getElementById('hero-start'), document.getElementById('final-start')];
  
  startBtns.forEach(btn => {
    if(btn) {
      btn.addEventListener('click', (e) => {
        if(INTAKE_URL !== "https://REPLACE_ME") {
          btn.href = INTAKE_URL;
        } else {
          e.preventDefault();
          console.log("INTAKE_URL not set");
        }
      });
    }
  });

  // Copy button
  const copyBtn = document.getElementById('copy-btn');
  if(copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(EMAIL_LINE).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      });
    });
  }

  // Intersection Observer for scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('on');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Scroll Rail fill
  const scrollFill = document.getElementById('scroll-fill');
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    let progress = 0;
    if(scrollHeight > 0) {
      progress = (window.scrollY / scrollHeight) * 100;
    }
    if(scrollFill) {
      scrollFill.style.height = `${Math.min(100, Math.max(0, progress))}%`;
    }
  });
});
