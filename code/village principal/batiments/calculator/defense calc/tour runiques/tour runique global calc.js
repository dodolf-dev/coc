import { tour_runique1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { tour_runique2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerTempsTotaltour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerTempsTotaltour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerTempsRestanttour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";    
import { calculerTempsRestanttour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerTempsdepuisHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerTempsdepuisHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerTempsConstructionParHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerTempsConstructionParHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerPrixTotaltour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerPrixTotaltour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerPrixRestanttour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerPrixRestanttour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerPrixdepuisHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerPrixdepuisHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerPrixConstructionParHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerPrixConstructionParHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerExperienceTotaltour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerExperienceTotaltour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerExperienceRestanttour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerExperienceRestanttour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerExperiencedepuisHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerExperiencedepuisHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { calculerExperienceConstructionParHDVtour_runique1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique1.calc.js";
import { calculerExperienceConstructionParHDVtour_runique2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour runiques/tour runique2.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function gettour_runiqueLevel(num) {
    return document.getElementById(`tour_runique${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let tour_runique1level = gettour_runiqueLevel(1);
let tour_runique2level = gettour_runiqueLevel(2);

let tour_runique1levelmax = tour_runique1_nv_max_hdv(hdvlevel);
let tour_runique2levelmax = tour_runique2_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxtour_runiques() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(tour_runique1level, tour_runique1levelmax),
        Math.min(tour_runique2level, tour_runique2levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        tour_runique1levelmax,
        tour_runique2levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestanttour_runiques() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_runique1level = parseInt(gettour_runiqueLevel(1), 10);
    const tour_runique2level = parseInt(gettour_runiqueLevel(2), 10);

    const tour_runique1levelmax = tour_runique1_nv_max_hdv(hdvlevel);
    const tour_runique2levelmax = tour_runique2_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestanttour_runique1(tour_runique1level, tour_runique1levelmax);
    tempsRestant += calculerTempsRestanttour_runique2(tour_runique2level, tour_runique2levelmax);
    return tempsRestant;
}

export function globalcalculertempsTotaltour_runiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotaltour_runique1(tour_runique1level);
    tempsTotal += calculerTempsTotaltour_runique2(tour_runique2level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVtour_runiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVtour_runique1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVtour_runique2(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVtour_runiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVtour_runique1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVtour_runique2(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempstour_runiques() {
    const tempsTotal = globalcalculertempsTotaltour_runiques();
    const tempsRestant = globalcalculertempsRestanttour_runiques();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVtour_runiques();

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

export function globalcalculerPrixTotaltour_runique() {
    let couttotal = 0;
    couttotal += calculerPrixTotaltour_runique1(tour_runique1level);
    couttotal += calculerPrixTotaltour_runique2(tour_runique2level);
    return couttotal;
}

export function globalcalculerPrixRestanttour_runique() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_runique1level = parseInt(gettour_runiqueLevel(1), 10);
    const tour_runique2level = parseInt(gettour_runiqueLevel(2), 10);

    const tour_runique1levelmax = tour_runique1_nv_max_hdv(hdvlevel);
    const tour_runique2levelmax = tour_runique2_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestanttour_runique1(tour_runique1level, tour_runique1levelmax);
    coutrestant += calculerPrixRestanttour_runique2(tour_runique2level, tour_runique2levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVtour_runique() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVtour_runique1(hdvlevel);
    couttotal += calculerPrixdepuisHDVtour_runique2(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVtour_runique() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVtour_runique1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVtour_runique2(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixtour_runiques () {
    const prixTotal = globalcalculerprixTotaltour_runiques();
    const prixRestant = globalcalculerprixRestanttour_runiques();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVtour_runiques();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotaltour_runique() {
    let expTotal = 0;
    expTotal += calculerExperienceTotaltour_runique1(tour_runique1level);
    expTotal += calculerExperienceTotaltour_runique2(tour_runique2level);
    return expTotal;
}

export function globalcalculerExperienceRestanttour_runique() {
    let exprestant = 0;
    exprestant += calculerExperienceRestanttour_runique1(tour_runique1level, tour_runique1levelmax);
    exprestant += calculerExperienceRestanttour_runique2(tour_runique2level, tour_runique2levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVtour_runique() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVtour_runique1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVtour_runique2(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVtour_runique() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVtour_runique1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVtour_runique2(hdvlevel);
    return exptotal;
}

export function barredeprogressionexptour_runiques() {
    const expTotal = globalcalculerExperienceTotaltour_runique();
    const expRestant = globalcalculerExperienceRestanttour_runique();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVtour_runique();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatetour_runiqueProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des tour_runiques
    tour_runique1level = gettour_runiqueLevel(1);
    tour_runique2level = gettour_runiqueLevel(2);

    // Recalculer les niveaux maximums des tour_runiques en fonction du niveau HDV
    tour_runique1levelmax = tour_runique1_nv_max_hdv(hdvlevel);
    tour_runique2levelmax = tour_runique2_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxtour_runiques();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-tour_runiques');
    const progressText = document.getElementById('progress-tour_runiques-value');
    const progressTimeText = document.getElementById('progress-tour_runiques-temps');
    const progressPriceText = document.getElementById('progress-tour_runiques-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression.toFixed(2)}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestanttour_runiques();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestanttour_runique();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const tour_runiqueSelects = [
        document.getElementById('tour_runique1'),
        document.getElementById('tour_runique2'),
    ];

    // Ajouter un écouteur pour chaque tour_runique
    tour_runiqueSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatetour_runiqueProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatetour_runiqueProgress);
    }

    // Initialiser la barre de progression au chargement
    updatetour_runiqueProgress();
});