document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img.fade-transition');
  
    images.forEach(img => {
      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.attributeName === 'src') {
            img.classList.add('fade-out');
            setTimeout(() => {
              img.classList.remove('fade-out');
            }, 200); // doit correspondre à la durée CSS
          }
        }
      });
  
      observer.observe(img, { attributes: true });
    });
  });
