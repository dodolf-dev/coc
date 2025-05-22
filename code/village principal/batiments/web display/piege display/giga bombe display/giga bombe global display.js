import { calculerPourcentageNiveauxgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe global.calc.js";

// Fonction pour mettre à jour le pourcentage de progression
function updateProgressPercentage() {
    const progression = calculerPourcentageNiveauxgiga_bombe();
    const progressBar = document.getElementById('progress-giga_bombes');
    const progressText = document.getElementById('progress-giga_bombes-value');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`;
    }
}

function updateHighlight(selectElement) {
    const maxValue = Array.from(selectElement.options)
      .map(opt => parseInt(opt.value))
      .filter(v => !isNaN(v))
      .reduce((a, b) => Math.max(a, b), 0);
  
    if (parseInt(selectElement.value) === maxValue) {
      selectElement.classList.add('select-max-level');
    } else {
      selectElement.classList.remove('select-max-level');
    }
}
  
// Quand la page est chargée
window.addEventListener('DOMContentLoaded', () => {
    // Applique le surlignage à tous les selects de giga_bombe
    const giga_bombeSelects = document.querySelectorAll('select[id^="giga_bombe"]');
  
    giga_bombeSelects.forEach(select => {
        updateHighlight(select);

        select.addEventListener('change', () => {
            updateHighlight(select);
            updateProgressPercentage(); // Mettre à jour le pourcentage de progression
        });
    });

    // Re-vérifie après changement de HDV
    const selectHdv = document.getElementById('hdv');
    if (selectHdv) {
        selectHdv.addEventListener('change', () => {
            setTimeout(() => {
                giga_bombeSelects.forEach(select => {
                    updateHighlight(select);
                });
                
                updateProgressPercentage(); // Mettre à jour le pourcentage de progression
            }, 10);
        });
    }

    // Initialiser le temps restant global et le pourcentage au chargement
    updateProgressPercentage();
});