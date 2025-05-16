//DEFENSE
import { globalcalculerPrixRestantcanon, globalcalculertempsRestantcanons } from "/coc/code/village principal/batiments/calculator/defense calc/canons/canon_global_calc.js";
import { globalcalculerPrixRestanttour_archere, globalcalculertempsRestanttour_archeres } from "/coc/code/village principal/batiments/calculator/defense calc/tour archeres/tour archere global calc.js";
import { globalcalculerPrixRestantmortier, globalcalculertempsRestantmortiers } from "/coc/code/village principal/batiments/calculator/defense calc/mortiers/mortier global calc.js";
import { globalcalculerPrixRestantdef_anti_air, globalcalculertempsRestantdef_anti_airs } from "/coc/code/village principal/batiments/calculator/defense calc/anti aeriens/def anti air global.calc.js";
import { globalcalculerPrixRestanttour_sorcier, globalcalculertempsRestanttour_sorciers } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier global calc.js";
import { globalcalculerPrixRestantsouffleur_air, globalcalculertempsRestantsouffleur_airs } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air global calc.js";
import { globalcalculerPrixRestanttesla, globalcalculertempsRestantteslas } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla global calc.js";
import { globalcalculerPrixRestanttour_bombe, globalcalculertempsRestanttour_bombes } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe global calc.js";
import { globalcalculerPrixRestantarcx, globalcalculertempsRestantarcxs } from "/coc/code/village principal/batiments/calculator/defense calc/arcxs/arcx global calc.js";
import { globalcalculerPrixRestanttour_enfer, globalcalculertempsRestanttour_enfers } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer global calc.js";
import { globalcalculerPrixRestantaigle_artilleur, globalcalculertempsRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur global calc.Js";
import { globalcalculerPrixRestantcatapulte_erratique, globalcalculertempsRestantcatapulte_erratiques } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique global calc.js";
import { globalcalculerPrixRestantbatisseur, globalcalculertempsRestantbatisseurs } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur global calc.js";
import { globalcalculerPrixRestanttour_runique, globalcalculertempsRestanttour_runiques } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique global calc.js";
import { globalcalculerPrixRestantmonolithe, globalcalculertempsRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe global calc.js";
import { globalcalculerPrixRestantmulti_tour_archere, globalcalculertempsRestantmulti_tour_archeres } from "/coc/code/village principal/batiments/calculator/defense calc/multi tour archeres/multi tour archere global calc.js";
import { globalcalculerPrixRestantcanon_ricochet, globalcalculertempsRestantcanon_ricochets } from "/coc/code/village principal/batiments/calculator/defense calc/canon ricochets/canon ricochet global calc.js";
import { globalcalculerPrixRestanttour_multi_equipee, globalcalculertempsRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee global calc.js";
import { globalcalculerPrixRestantcracheur_feu, globalcalculertempsRestantcracheur_feus } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu global calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

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
    const progressdefenseprixelixir = document.getElementById('progress-defense-prix-elixir-noir');
    const progressDefensePrixOr = document.getElementById('progress-defense-prix-or');
    const progressDefensetemps = document.getElementById('progress-defense-temps');
    if (!progressDefensePrixOr || !progressDefensetemps) return;

    // Additionne le coût restant et le temps restant de chaque défense
    const prixRestantCanons = globalcalculerPrixRestantcanon();
    const tempsRestantCanons = globalcalculertempsRestantcanons();
    const prixRestantTourArchere = globalcalculerPrixRestanttour_archere();
    const tempsRestantTourArchere = globalcalculertempsRestanttour_archeres();
    const prixrestantMortiers = globalcalculerPrixRestantmortier();
    const tempsrestantMortiers = globalcalculertempsRestantmortiers();
    const prixrestantAntiAeriens = globalcalculerPrixRestantdef_anti_air();
    const tempsrestantAntiAeriens = globalcalculertempsRestantdef_anti_airs();
    const prixrestantToursSorcier = globalcalculerPrixRestanttour_sorcier();
    const tempsrestantToursSorcier = globalcalculertempsRestanttour_sorciers();
    const prixrestantSouffleurs = globalcalculerPrixRestantsouffleur_air();
    const tempsrestantSouffleurs = globalcalculertempsRestantsouffleur_airs();
    const prixrestantTesla = globalcalculerPrixRestanttesla();
    const tempsrestantTesla = globalcalculertempsRestantteslas();
    const prixrestantToursBombe = globalcalculerPrixRestanttour_bombe();
    const tempsrestantToursBombe = globalcalculertempsRestanttour_bombes();
    const prixrestantArcX = globalcalculerPrixRestantarcx();
    const tempsrestantArcX = globalcalculertempsRestantarcxs();
    const prixrestantToursEnfer = globalcalculerPrixRestanttour_enfer();
    const tempsrestantToursEnfer = globalcalculertempsRestanttour_enfers();
    const prixrestantAigleArtilleur = globalcalculerPrixRestantaigle_artilleur();
    const tempsrestantAigleArtilleur = globalcalculertempsRestantaigle_artilleur();
    const prixrestantCatapultesErratiques = globalcalculerPrixRestantcatapulte_erratique();
    const tempsrestantCatapultesErratiques = globalcalculertempsRestantcatapulte_erratiques();
    const prixrestantBatisseurs = globalcalculerPrixRestantbatisseur();
    const tempsrestantBatisseurs = globalcalculertempsRestantbatisseurs();
    const prixrestantToursRunique = globalcalculerPrixRestanttour_runique();
    const tempsrestantToursRunique = globalcalculertempsRestanttour_runiques();
    const prixrestantMultiToursArchere = globalcalculerPrixRestantmulti_tour_archere();
    const tempsrestantMultiToursArchere = globalcalculertempsRestantmulti_tour_archeres();
    const prixrestantCanonRicochet = globalcalculerPrixRestantcanon_ricochet();
    const tempsrestantCanonRicochet = globalcalculertempsRestantcanon_ricochets();
    const prixrestantToursMultiEquipee = globalcalculerPrixRestanttour_multi_equipee();
    const tempsrestantToursMultiEquipee = globalcalculertempsRestanttour_multi_equipee();
    const prixrestantCracheursDeFeu = globalcalculerPrixRestantcracheur_feu();
    const tempsrestantCracheursDeFeu = globalcalculertempsRestantcracheur_feus();
    const prixrestantmonolithe = globalcalculerPrixRestantmonolithe();
    const tempsrestantmonolithe = globalcalculertempsRestantmonolithe();

    const totalPrixRestant =
        prixRestantCanons + prixRestantTourArchere + prixrestantMortiers + prixrestantAntiAeriens +
        prixrestantToursSorcier + prixrestantSouffleurs + prixrestantTesla + prixrestantToursBombe +
        prixrestantArcX + prixrestantToursEnfer + prixrestantAigleArtilleur + prixrestantCatapultesErratiques +
        prixrestantBatisseurs + prixrestantToursRunique + prixrestantMultiToursArchere +
        prixrestantCanonRicochet + prixrestantToursMultiEquipee + prixrestantCracheursDeFeu;

    const totalprixelixirnoirrestant = 
        prixrestantmonolithe;

    const totaltempsRestant =
        tempsRestantCanons + tempsRestantTourArchere + tempsrestantMortiers + tempsrestantAntiAeriens +
        tempsrestantToursSorcier + tempsrestantSouffleurs + tempsrestantTesla + tempsrestantToursBombe +
        tempsrestantArcX + tempsrestantToursEnfer + tempsrestantAigleArtilleur + tempsrestantCatapultesErratiques +
        tempsrestantBatisseurs + tempsrestantToursRunique + tempsrestantMultiToursArchere +
        tempsrestantCanonRicochet + tempsrestantToursMultiEquipee + tempsrestantCracheursDeFeu + tempsrestantmonolithe;

    if (totalprixelixirnoirrestant == 0){
        progressdefenseprixelixir.style.display = "none";
    }
    else {
      progressdefenseprixelixir.style.display = "";
      progressdefenseprixelixir.innerHTML = `${formatPrix(totalprixelixirnoirrestant)} <img src="/coc/image/village principal/ressource/elixir-noir village-p.png" alt="or" class="icone-ressource">`

    }

    if (totalPrixRestant === 0) {
        progressDefensePrixOr.style.display = "none";
    } else {
        progressDefensePrixOr.style.display = "";
        progressDefensePrixOr.innerHTML = `${formatPrix(totalPrixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (totaltempsRestant === 0) {
        progressDefensetemps.style.display = "none";
    } else {
        progressDefensetemps.style.display = "";
        progressDefensetemps.innerHTML = `${convertirSecondescompact(totaltempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
updateDefensePrixOr();