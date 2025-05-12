import { calculerPourcentageNiveauxdef_anti_airs } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air global.calc.js";

// Fonction pour mettre à jour le pourcentage de progression
function updateProgressPercentage() {
    const progression = calculerPourcentageNiveauxdef_anti_airs();
    const progressBar = document.getElementById('progress-def_anti_airs');
    const progressText = document.getElementById('progress-def_anti_airs-value');

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
    // Applique le surlignage à tous les selects de def_anti_air
    const def_anti_airSelects = document.querySelectorAll('select[id^="def_anti_air"]');
  
    def_anti_airSelects.forEach(select => {
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
                def_anti_airSelects.forEach(select => {
                    updateHighlight(select);
                });
                
                updateProgressPercentage(); // Mettre à jour le pourcentage de progression
            }, 10);
        });
    }

    // Initialiser le temps restant global et le pourcentage au chargement
    updateProgressPercentage();
});