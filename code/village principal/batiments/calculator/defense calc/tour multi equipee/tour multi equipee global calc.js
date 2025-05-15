import { tour_multi_equipee_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerTempsTotaltour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerTempsRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerTempsdepuisHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerTempsConstructionParHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerPrixTotaltour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerPrixRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerPrixdepuisHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerPrixConstructionParHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerExperienceTotaltour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerExperienceRestanttour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerExperiencedepuisHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { calculerExperienceConstructionParHDVtour_multi_equipee } from "/coc/code/village principal/batiments/calculator/defense calc/tour multi equipee/tour multi equipee.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function gettour_multi_equipeeLevel(num) {
    return document.getElementById("tour_multi_equipee").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let tour_multi_equipeelevel = gettour_multi_equipeeLevel();

let tour_multi_equipeelevelmax = tour_multi_equipee_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxtour_multi_equipee() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(tour_multi_equipeelevel, tour_multi_equipeelevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        tour_multi_equipeelevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestanttour_multi_equipee() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_multi_equipeelevel = parseInt(gettour_multi_equipeeLevel(1), 10);

    const tour_multi_equipeelevelmax = tour_multi_equipee_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestanttour_multi_equipee(tour_multi_equipeelevel, tour_multi_equipeelevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotaltour_multi_equipee() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotaltour_multi_equipee(tour_multi_equipeelevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVtour_multi_equipee() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVtour_multi_equipee(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVtour_multi_equipee() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVtour_multi_equipee(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempstour_multi_equipee() {
    const tempsTotal = globalcalculertempsTotaltour_multi_equipee();
    const tempsRestant = globalcalculertempsRestanttour_multi_equipee();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVtour_multi_equipee();

    if (tempsTotal === 0) {
        return 0; // Évite la division par zéro
    }

    if (tempsTotal >= tempsConstructionHDV) {
        const progression = ((tempsTotal - tempsRestant) / tempsTotal) * 100;
        return progression.toFixed(2);
    } else {
        // Ajout d'une tolérance pour éviter des valeurs négatives excessives
        const difference = tempsConstructionHDV - tempsTotal;
        if (difference < 0.01 * tempsConstructionHDV) { // Tolérance de 1%
            return 0; // Considérer comme aucune progression négative
        }
        const retard = (difference / tempsConstructionHDV) * 100;
        return (-retard).toFixed(2);
    }
}

export function globalcalculerPrixTotaltour_multi_equipee() {
    let couttotal = 0;
    couttotal += calculerPrixTotaltour_multi_equipee(tour_multi_equipeelevel);
    return couttotal;
}

export function globalcalculerPrixRestanttour_multi_equipee() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_multi_equipeelevel = parseInt(gettour_multi_equipeeLevel(1), 10);

    const tour_multi_equipeelevelmax = tour_multi_equipee_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestanttour_multi_equipee(tour_multi_equipeelevel, tour_multi_equipeelevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVtour_multi_equipee() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVtour_multi_equipee(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVtour_multi_equipee() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVtour_multi_equipee(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixtour_multi_equipee () {
    const prixTotal = globalcalculerprixTotaltour_multi_equipee();
    const prixRestant = globalcalculerprixRestanttour_multi_equipee();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVtour_multi_equipee();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotaltour_multi_equipee() {
    let expTotal = 0;
    expTotal += calculerExperienceTotaltour_multi_equipee(tour_multi_equipeelevel);
    return expTotal;
}

export function globalcalculerExperienceRestanttour_multi_equipee() {
    let exprestant = 0;
    exprestant += calculerExperienceRestanttour_multi_equipee(tour_multi_equipeelevel, tour_multi_equipeelevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVtour_multi_equipee() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVtour_multi_equipee(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVtour_multi_equipee() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVtour_multi_equipee(hdvlevel);
    return exptotal;
}

export function barredeprogressionexptour_multi_equipee() {
    const expTotal = globalcalculerExperienceTotaltour_multi_equipee();
    const expRestant = globalcalculerExperienceRestanttour_multi_equipee();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVtour_multi_equipee();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatetour_multi_equipeeProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des tour_multi_equipee
    tour_multi_equipeelevel = gettour_multi_equipeeLevel();


    // Recalculer les niveaux maximums des tour_multi_equipee en fonction du niveau HDV
    tour_multi_equipeelevelmax = tour_multi_equipee_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxtour_multi_equipee();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-tour_multi_equipee');
    const progressText = document.getElementById('progress-tour_multi_equipee-value');
    const progressTimeText = document.getElementById('progress-tour_multi_equipee-temps');
    const progressPriceText = document.getElementById('progress-tour_multi_equipee-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestanttour_multi_equipee();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestanttour_multi_equipee();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const tour_multi_equipeeelects = [
        document.getElementById('tour_multi_equipee'),
    ];

    // Ajouter un écouteur pour chaque tour_multi_equipee
    tour_multi_equipeeelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatetour_multi_equipeeProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatetour_multi_equipeeProgress);
    }

    // Initialiser la barre de progression au chargement
    updatetour_multi_equipeeProgress();
});