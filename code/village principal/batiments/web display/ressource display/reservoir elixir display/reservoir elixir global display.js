import { calculerPourcentageNiveauxreservoir_elixirs } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixirs/reservoir elixir global calc.js";

// Fonction pour mettre à jour le pourcentage de progression
function updateProgressPercentage() {
    const progression = calculerPourcentageNiveauxreservoir_elixirs();
    const progressBar = document.getElementById('progress-reservoir_elixirs');
    const progressText = document.getElementById('progress-reservoir_elixirs-value');

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
    // Applique le surlignage à tous les selects de reservoir_elixir
    const reservoir_elixirSelects = document.querySelectorAll('select[id^="reservoir_elixir"]');
  
    reservoir_elixirSelects.forEach(select => {
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
                reservoir_elixirSelects.forEach(select => {
                    updateHighlight(select);
                });
                
                updateProgressPercentage(); // Mettre à jour le pourcentage de progression
            }, 10);
        });
    }

    // Initialiser le temps restant global et le pourcentage au chargement
    updateProgressPercentage();
});