import { calculerPourcentageNiveauxcatapulte_erratiques } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique global calc.js";

// Fonction pour mettre à jour le pourcentage de progression
function updateProgressPercentage() {
    const progression = calculerPourcentageNiveauxcatapulte_erratiques();
    const progressBar = document.getElementById('progress-catapulte_erratiques');
    const progressText = document.getElementById('progress-catapulte_erratiques-value');

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
    // Applique le surlignage à tous les selects de catapulte_erratique
    const catapulte_erratiqueSelects = document.querySelectorAll('select[id^="catapulte_erratique"]');
  
    catapulte_erratiqueSelects.forEach(select => {
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
                catapulte_erratiqueSelects.forEach(select => {
                    updateHighlight(select);
                });
                
                updateProgressPercentage(); // Mettre à jour le pourcentage de progression
            }, 10);
        });
    }

    // Initialiser le temps restant global et le pourcentage au chargement
    updateProgressPercentage();
});