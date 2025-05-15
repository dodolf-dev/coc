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

    // Ajoute les écouteurs pour HDV, canons et tours d'archères
const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updateDefensePrixOr);
    }

    // Canons
    for (let i = 1; i <= 7; i++) {
        const canonSelect = document.getElementById(`canon${i}`);
        if (canonSelect) {
            canonSelect.addEventListener('change', updateDefensePrixOr);
        }
    }

    // Tours d'archères
    for (let i = 1; i <= 9; i++) {
        const tourArchereSelect = document.getElementById(`tour_archere${i}`);
        if (tourArchereSelect) {
            tourArchereSelect.addEventListener('change', updateDefensePrixOr);
        }
    }

    // Appel initial
    updateDefensePrixOr();
});

import { globalcalculerPrixRestantcanon } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon_global_calc.js";
import { globalcalculerPrixRestanttour_archere } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere global calc.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

function updateDefensePrixOr() {
    const progressDefensePrixOr = document.getElementById('progress-defense-prix-or');
    if (!progressDefensePrixOr) return;

    // Additionne le coût restant des canons et des tours d'archères
    const prixRestantCanons = globalcalculerPrixRestantcanon();
    const prixRestantTourArchere = globalcalculerPrixRestanttour_archere();
    const totalPrixRestant = prixRestantCanons + prixRestantTourArchere;

    if (totalPrixRestant === 0) {
        progressDefensePrixOr.style.display = "none";
    } else {
        progressDefensePrixOr.style.display = "";
        progressDefensePrixOr.innerHTML = `${formatPrix(totalPrixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}
updateDefensePrixOr();