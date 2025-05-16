import { globalcalculerPrixRestantcanon } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon_global_calc.js";
import { globalcalculerPrixRestanttour_archere } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere global calc.js";
import { globalcalculerPrixRestantmortiers } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier_global_calc.js";
import { globalcalculerPrixRestantanti_aeriens } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def_anti_air_global_calc.js";
import { globalcalculerPrixRestanttours_sorcier } from "/coc/code/village principal/batiments/calculator/defense calc/tours sorcier/tour_sorcier_global_calc.js";
import { globalcalculerPrixRestantsouffleurs } from "/coc/code/village principal/batiments/calculator/defense calc/souffleurs/souffleur_air_global_calc.js";
import { globalcalculerPrixRestanttours_tesla } from "/coc/code/village principal/batiments/calculator/defense calc/tours tesla/tour_tesla_global_calc.js";
import { globalcalculerPrixRestanttours_bombe } from "/coc/code/village principal/batiments/calculator/defense calc/tours bombes/tour_bombe_global_calc.js";
import { globalcalculerPrixRestanttours_arc_x } from "/coc/code/village principal/batiments/calculator/defense calc/tours arc-x/tour_arcx_global_calc.js";
import { globalcalculerPrixRestanttours_enfer } from "/coc/code/village principal/batiments/calculator/defense calc/tours enfer/tour_enfer_global_calc.js";
import { globalcalculerPrixRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle_artilleur_global_calc.js";
import { globalcalculerPrixRestantcatapulte_erratique } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratique/catapulte_erratique_global_calc.js";
import { globalcalculerPrixRestantbatisseurs } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur_global_calc.js";
import { globalcalculerPrixRestanttours_runique } from "/coc/code/village principal/batiments/calculator/defense calc/tours runiques/tour_runique_global_calc.js";
import { globalcalculerPrixRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe_global_calc.js";
import { globalcalculerPrixRestantmulti_tour_archere } from "/coc/code/village principal/batiments/calculator/defense calc/multi tours archere/multi_tour_archere_global_calc.js";
import { globalcalculerPrixRestantcanon_ricochet } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochet/canon_ricochet_global_calc.js";
import { globalcalculerPrixRestanttours_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tours multi equipees/tour_multi_equipee_global_calc.js";
import { globalcalculerPrixRestantcracheur_de_feu } from "/coc/code/village principal/batiments/calculator/defense calc/cracheurs de feu/cracheur_de_feu_global_calc.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";

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

  // hdv
  const hdvSelect = document.getElementById('hdv');
  if (hdvSelect) {
    hdvSelect.addEventListener('change', updateDefensePrixOr);
  }

  // canons
  for (let i = 1; i <= 7; i++) {
    const canonSelect = document.getElementById(`canon${i}`);
    if (canonSelect) {
      canonSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours d'archeres
  for (let i = 1; i <= 9; i++) {
    const tourArchereSelect = document.getElementById(`tour_archere${i}`);
    if (tourArchereSelect) {
      tourArchereSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // mortiers
  for (let i = 1; i <= 4; i++) {
    const mortierSelect = document.getElementById(`mortier${i}`);
    if (mortierSelect) {
      mortierSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // anti aériens
  for (let i = 1; i <= 4; i++) {
    const antiAirSelect = document.getElementById(`def_anti_air${i}`);
    if (antiAirSelect) {
      antiAirSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours de sorcier
  for (let i = 1; i <= 5; i++) {
    const tourSorcierSelect = document.getElementById(`tour_sorcier${i}`);
    if (tourSorcierSelect) {
      tourSorcierSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // souffleurs d'air
  for (let i = 1; i <= 2; i++) {
    const souffleurSelect = document.getElementById(`souffleur_air${i}`);
    if (souffleurSelect) {
      souffleurSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // teslas
  for (let i = 1; i <= 5; i++) {
    const teslaSelect = document.getElementById(`tesla${i}`);
    if (teslaSelect) {
      teslaSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours à bombes
  for (let i = 1; i <= 2; i++) {
    const tourBombeSelect = document.getElementById(`tour_bombe${i}`);
    if (tourBombeSelect) {
      tourBombeSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // arc-x
  for (let i = 1; i <= 4; i++) {
    const arcxSelect = document.getElementById(`arcx${i}`);
    if (arcxSelect) {
      arcxSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours de l'enfer
  for (let i = 1; i <= 3; i++) {
    const tourEnferSelect = document.getElementById(`tour_enfer${i}`);
    if (tourEnferSelect) {
      tourEnferSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // aigle artilleur
  const aigleArtilleurSelect = document.getElementById('aigle_artilleur');
  if (aigleArtilleurSelect) {
    aigleArtilleurSelect.addEventListener('change', updateDefensePrixOr);
  }

  // catapultes erratiques
  for (let i = 1; i <= 2; i++) {
    const catapulteSelect = document.getElementById(`catapulte_erratique${i}`);
    if (catapulteSelect) {
      catapulteSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // bâtisseurs
  for (let i = 1; i <= 5; i++) {
    const batisseurSelect = document.getElementById(`batisseur${i}`);
    if (batisseurSelect) {
      batisseurSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours runiques
  for (let i = 1; i <= 2; i++) {
    const tourRuniqueSelect = document.getElementById(`tour_runique${i}`);
    if (tourRuniqueSelect) {
      tourRuniqueSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // monolithe
  const monolitheSelect = document.getElementById('monolithe');
  if (monolitheSelect) {
    monolitheSelect.addEventListener('change', updateDefensePrixOr);
  }

  // multi tours d'archere
  for (let i = 1; i <= 3; i++) {
    const multiTourArchereSelect = document.getElementById(`multi_tour_archere${i}`);
    if (multiTourArchereSelect) {
      multiTourArchereSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // canons ricochet
  for (let i = 1; i <= 3; i++) {
    const canonRicochetSelect = document.getElementById(`canon_ricochet${i}`);
    if (canonRicochetSelect) {
      canonRicochetSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  // tours multi équipée
  const tourMultiEquipeeSelect = document.getElementById('tour_multi_equipee');
  if (tourMultiEquipeeSelect) {
    tourMultiEquipeeSelect.addEventListener('change', updateDefensePrixOr);
  }

  // cracheurs de feu
  for (let i = 1; i <= 2; i++) {
    const cracheurFeuSelect = document.getElementById(`cracheur_feu${i}`);
    if (cracheurFeuSelect) {
      cracheurFeuSelect.addEventListener('change', updateDefensePrixOr);
    }
  }

  updateDefensePrixOr();
});

function updateDefensePrixOr() {
    const progressDefensePrixOr = document.getElementById('progress-defense-prix-or');
    if (!progressDefensePrixOr) return;

    // Additionne le coût restant des canons et des tours d'archères
    const prixRestantCanons = globalcalculerPrixRestantcanon();
    const prixRestantTourArchere = globalcalculerPrixRestanttour_archere();
    const prixrestantMortiers = globalcalculerPrixRestantmortiers();
    const prixrestantAntiAeriens = globalcalculerPrixRestantanti_aeriens();
    const prixrestantToursSorcier = globalcalculerPrixRestanttours_sorcier();
    const prixrestantSouffleurs = globalcalculerPrixRestantsouffleurs();
    const prixrestantTesla = globalcalculerPrixRestanttours_tesla();
    const prixrestantToursBombe = globalcalculerPrixRestanttours_bombe();
    const prixrestantArcX = globalcalculerPrixRestanttours_arc_x();
    const prixrestantToursEnfer = globalcalculerPrixRestanttours_enfer();
    const prixrestantAigleArtilleur = globalcalculerPrixRestantaigle_artilleur();
    const prixrestantCatapultesErratiques = globalcalculerPrixRestantcatapulte_erratique();
    const prixrestantBatisseurs = globalcalculerPrixRestantbatisseurs();
    const prixrestantToursRunique = globalcalculerPrixRestanttours_runique();
    const prixrestantMultiToursArchere = globalcalculerPrixRestantmulti_tour_archere();
    const prixrestantCanonRicochet = globalcalculerPrixRestantcanon_ricochet();
    const prixrestantToursMultiEquipee = globalcalculerPrixRestanttours_multi_equipee();
    const prixrestantCracheursDeFeu = globalcalculerPrixRestantcracheur_de_feu();
    const totalPrixRestant = prixRestantCanons + prixRestantTourArchere + prixrestantMortiers + prixrestantAntiAeriens + prixrestantToursSorcier + prixrestantSouffleurs + prixrestantTesla + prixrestantToursBombe + prixrestantArcX + prixrestantToursEnfer + prixrestantAigleArtilleur + prixrestantCatapultesErratiques + prixrestantBatisseurs + prixrestantToursRunique + prixrestantMultiToursArchere + prixrestantCanonRicochet + prixrestantToursMultiEquipee + prixrestantCracheursDeFeu;

    if (totalPrixRestant === 0) {
        progressDefensePrixOr.style.display = "none";
    } else {
        progressDefensePrixOr.style.display = "";
        progressDefensePrixOr.innerHTML = `${formatPrix(totalPrixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}
updateDefensePrixOr();