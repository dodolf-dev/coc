import { tour_bombe1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { tour_bombe2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerTempsTotaltour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerTempsTotaltour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerTempsRestanttour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";    
import { calculerTempsRestanttour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerTempsdepuisHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerTempsdepuisHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerTempsConstructionParHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerTempsConstructionParHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerPrixTotaltour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerPrixTotaltour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerPrixRestanttour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerPrixRestanttour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerPrixdepuisHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerPrixdepuisHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerPrixConstructionParHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerPrixConstructionParHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerExperienceTotaltour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerExperienceTotaltour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerExperienceRestanttour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerExperienceRestanttour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerExperiencedepuisHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerExperiencedepuisHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { calculerExperienceConstructionParHDVtour_bombe1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe1.calc.js";
import { calculerExperienceConstructionParHDVtour_bombe2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour bombes/tour bombe2.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function gettour_bombeLevel(num) {
    return document.getElementById(`tour_bombe${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let tour_bombe1level = gettour_bombeLevel(1);
let tour_bombe2level = gettour_bombeLevel(2);

let tour_bombe1levelmax = tour_bombe1_nv_max_hdv(hdvlevel);
let tour_bombe2levelmax = tour_bombe2_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxtour_bombes() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(tour_bombe1level, tour_bombe1levelmax),
        Math.min(tour_bombe2level, tour_bombe2levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        tour_bombe1levelmax,
        tour_bombe2levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestanttour_bombes() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_bombe1level = parseInt(gettour_bombeLevel(1), 10);
    const tour_bombe2level = parseInt(gettour_bombeLevel(2), 10);

    const tour_bombe1levelmax = tour_bombe1_nv_max_hdv(hdvlevel);
    const tour_bombe2levelmax = tour_bombe2_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestanttour_bombe1(tour_bombe1level, tour_bombe1levelmax);
    tempsRestant += calculerTempsRestanttour_bombe2(tour_bombe2level, tour_bombe2levelmax);

    return tempsRestant;
}

export function globalcalculertempsTotaltour_bombes() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotaltour_bombe1(tour_bombe1level);
    tempsTotal += calculerTempsTotaltour_bombe2(tour_bombe2level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVtour_bombes() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVtour_bombe1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVtour_bombe2(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVtour_bombes() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVtour_bombe1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVtour_bombe2(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempstour_bombes() {
    const tempsTotal = globalcalculertempsTotaltour_bombes();
    const tempsRestant = globalcalculertempsRestanttour_bombes();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVtour_bombes();

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

export function globalcalculerPrixTotaltour_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixTotaltour_bombe1(tour_bombe1level);
    couttotal += calculerPrixTotaltour_bombe2(tour_bombe2level);
    return couttotal;
}

export function globalcalculerPrixRestanttour_bombe() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_bombe1level = parseInt(gettour_bombeLevel(1), 10);
    const tour_bombe2level = parseInt(gettour_bombeLevel(2), 10);

    const tour_bombe1levelmax = tour_bombe1_nv_max_hdv(hdvlevel);
    const tour_bombe2levelmax = tour_bombe2_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestanttour_bombe1(tour_bombe1level, tour_bombe1levelmax);
    coutrestant += calculerPrixRestanttour_bombe2(tour_bombe2level, tour_bombe2levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVtour_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVtour_bombe1(hdvlevel);
    couttotal += calculerPrixdepuisHDVtour_bombe2(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVtour_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVtour_bombe1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVtour_bombe2(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixtour_bombes () {
    const prixTotal = globalcalculerprixTotaltour_bombes();
    const prixRestant = globalcalculerprixRestanttour_bombes();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVtour_bombes();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotaltour_bombe() {
    let expTotal = 0;
    expTotal += calculerExperienceTotaltour_bombe1(tour_bombe1level);
    expTotal += calculerExperienceTotaltour_bombe2(tour_bombe2level);
    return expTotal;
}

export function globalcalculerExperienceRestanttour_bombe() {
    let exprestant = 0;
    exprestant += calculerExperienceRestanttour_bombe1(tour_bombe1level, tour_bombe1levelmax);
    exprestant += calculerExperienceRestanttour_bombe2(tour_bombe2level, tour_bombe2levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVtour_bombe() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVtour_bombe1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVtour_bombe2(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVtour_bombe() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVtour_bombe1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVtour_bombe2(hdvlevel);
    return exptotal;
}

export function barredeprogressionexptour_bombes() {
    const expTotal = globalcalculerExperienceTotaltour_bombe();
    const expRestant = globalcalculerExperienceRestanttour_bombe();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVtour_bombe();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatetour_bombeProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des tour_bombes
    tour_bombe1level = gettour_bombeLevel(1);
    tour_bombe2level = gettour_bombeLevel(2);

    // Recalculer les niveaux maximums des tour_bombes en fonction du niveau HDV
    tour_bombe1levelmax = tour_bombe1_nv_max_hdv(hdvlevel);
    tour_bombe2levelmax = tour_bombe2_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxtour_bombes();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-tour_bombes');
    const progressText = document.getElementById('progress-tour_bombes-value');
    const progressTimeText = document.getElementById('progress-tour_bombes-temps');
    const progressPriceText = document.getElementById('progress-tour_bombes-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression.toFixed(2)}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestanttour_bombes();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestanttour_bombe();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const tour_bombeSelects = [
        document.getElementById('tour_bombe1'),
        document.getElementById('tour_bombe2'),
    ];

    // Ajouter un écouteur pour chaque tour_bombe
    tour_bombeSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatetour_bombeProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatetour_bombeProgress);
    }

    // Initialiser la barre de progression au chargement
    updatetour_bombeProgress();
});