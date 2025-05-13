import { tour_enfer1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { tour_enfer2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { tour_enfer3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerTempsTotaltour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerTempsTotaltour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerTempsTotaltour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerTempsRestanttour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";    
import { calculerTempsRestanttour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerTempsRestanttour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerTempsdepuisHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerTempsdepuisHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerTempsdepuisHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerTempsConstructionParHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerTempsConstructionParHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerTempsConstructionParHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerPrixTotaltour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerPrixTotaltour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerPrixTotaltour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerPrixRestanttour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerPrixRestanttour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerPrixRestanttour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerPrixdepuisHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerPrixdepuisHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerPrixdepuisHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerPrixConstructionParHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerPrixConstructionParHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerPrixConstructionParHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerExperienceTotaltour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerExperienceTotaltour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerExperienceTotaltour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerExperienceRestanttour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerExperienceRestanttour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerExperienceRestanttour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerExperiencedepuisHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerExperiencedepuisHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerExperiencedepuisHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { calculerExperienceConstructionParHDVtour_enfer1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer1.calc.js";
import { calculerExperienceConstructionParHDVtour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerExperienceConstructionParHDVtour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function gettour_enferLevel(num) {
    return document.getElementById(`tour_enfer${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let tour_enfer1level = gettour_enferLevel(1);
let tour_enfer2level = gettour_enferLevel(2);
let tour_enfer3level = gettour_enferLevel(3);

let tour_enfer1levelmax = tour_enfer1_nv_max_hdv(hdvlevel);
let tour_enfer2levelmax = tour_enfer2_nv_max_hdv(hdvlevel);
let tour_enfer3levelmax = tour_enfer3_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxtour_enfers() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(tour_enfer1level, tour_enfer1levelmax),
        Math.min(tour_enfer2level, tour_enfer2levelmax),
        Math.min(tour_enfer3level, tour_enfer3levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        tour_enfer1levelmax,
        tour_enfer2levelmax,
        tour_enfer3levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestanttour_enfers() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_enfer1level = parseInt(gettour_enferLevel(1), 10);
    const tour_enfer2level = parseInt(gettour_enferLevel(2), 10);
    const tour_enfer3level = parseInt(gettour_enferLevel(3), 10);

    const tour_enfer1levelmax = tour_enfer1_nv_max_hdv(hdvlevel);
    const tour_enfer2levelmax = tour_enfer2_nv_max_hdv(hdvlevel);
    const tour_enfer3levelmax = tour_enfer3_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestanttour_enfer1(tour_enfer1level, tour_enfer1levelmax);
    tempsRestant += calculerTempsRestanttour_enfer2(tour_enfer2level, tour_enfer2levelmax);
    tempsRestant += calculerTempsRestanttour_enfer3(tour_enfer3level, tour_enfer3levelmax);
    return tempsRestant;
}

export function globalcalculertempsTotaltour_enfers() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotaltour_enfer1(tour_enfer1level);
    tempsTotal += calculerTempsTotaltour_enfer2(tour_enfer2level);
    tempsTotal += calculerTempsTotaltour_enfer3(tour_enfer3level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVtour_enfers() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVtour_enfer1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVtour_enfer2(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVtour_enfer3(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVtour_enfers() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVtour_enfer1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVtour_enfer2(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVtour_enfer3(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempstour_enfers() {
    const tempsTotal = globalcalculertempsTotaltour_enfers();
    const tempsRestant = globalcalculertempsRestanttour_enfers();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVtour_enfers();

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

export function globalcalculerPrixTotaltour_enfer() {
    let couttotal = 0;
    couttotal += calculerPrixTotaltour_enfer1(tour_enfer1level);
    couttotal += calculerPrixTotaltour_enfer2(tour_enfer2level);
    couttotal += calculerPrixTotaltour_enfer3(tour_enfer3level);
    return couttotal;
}

export function globalcalculerPrixRestanttour_enfer() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const tour_enfer1level = parseInt(gettour_enferLevel(1), 10);
    const tour_enfer2level = parseInt(gettour_enferLevel(2), 10);
    const tour_enfer3level = parseInt(gettour_enferLevel(3), 10);

    const tour_enfer1levelmax = tour_enfer1_nv_max_hdv(hdvlevel);
    const tour_enfer2levelmax = tour_enfer2_nv_max_hdv(hdvlevel);
    const tour_enfer3levelmax = tour_enfer3_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestanttour_enfer1(tour_enfer1level, tour_enfer1levelmax);
    coutrestant += calculerPrixRestanttour_enfer2(tour_enfer2level, tour_enfer2levelmax);
    coutrestant += calculerPrixRestanttour_enfer3(tour_enfer3level, tour_enfer3levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVtour_enfer() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVtour_enfer1(hdvlevel);
    couttotal += calculerPrixdepuisHDVtour_enfer2(hdvlevel);
    couttotal += calculerPrixdepuisHDVtour_enfer3(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVtour_enfer() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVtour_enfer1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVtour_enfer2(hdvlevel);
    couttotal += calculerPrixConstructionParHDVtour_enfer3(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixtour_enfers () {
    const prixTotal = globalcalculerprixTotaltour_enfers();
    const prixRestant = globalcalculerprixRestanttour_enfers();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVtour_enfers();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotaltour_enfer() {
    let expTotal = 0;
    expTotal += calculerExperienceTotaltour_enfer1(tour_enfer1level);
    expTotal += calculerExperienceTotaltour_enfer2(tour_enfer2level);
    expTotal += calculerExperienceTotaltour_enfer3(tour_enfer3level);
    return expTotal;
}

export function globalcalculerExperienceRestanttour_enfer() {
    let exprestant = 0;
    exprestant += calculerExperienceRestanttour_enfer1(tour_enfer1level, tour_enfer1levelmax);
    exprestant += calculerExperienceRestanttour_enfer2(tour_enfer2level, tour_enfer2levelmax);
    exprestant += calculerExperienceRestanttour_enfer3(tour_enfer3level, tour_enfer3levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVtour_enfer() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVtour_enfer1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVtour_enfer2(hdvlevel);
    exptotal += calculerExperiencedepuisHDVtour_enfer3(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVtour_enfer() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVtour_enfer1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVtour_enfer2(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVtour_enfer3(hdvlevel);
    return exptotal;
}

export function barredeprogressionexptour_enfers() {
    const expTotal = globalcalculerExperienceTotaltour_enfer();
    const expRestant = globalcalculerExperienceRestanttour_enfer();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVtour_enfer();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatetour_enferProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des tour_enfers
    tour_enfer1level = gettour_enferLevel(1);
    tour_enfer2level = gettour_enferLevel(2);
    tour_enfer3level = gettour_enferLevel(3);

    // Recalculer les niveaux maximums des tour_enfers en fonction du niveau HDV
    tour_enfer1levelmax = tour_enfer1_nv_max_hdv(hdvlevel);
    tour_enfer2levelmax = tour_enfer2_nv_max_hdv(hdvlevel);
    tour_enfer3levelmax = tour_enfer3_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxtour_enfers();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-tour_enfers');
    const progressText = document.getElementById('progress-tour_enfers-value');
    const progressTimeText = document.getElementById('progress-tour_enfers-temps');
    const progressPriceText = document.getElementById('progress-tour_enfers-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression.toFixed(2)}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestanttour_enfers();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestanttour_enfer();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const tour_enferSelects = [
        document.getElementById('tour_enfer1'),
        document.getElementById('tour_enfer2'),
        document.getElementById('tour_enfer3'),
    ];

    // Ajouter un écouteur pour chaque tour_enfer
    tour_enferSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatetour_enferProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatetour_enferProgress);
    }

    // Initialiser la barre de progression au chargement
    updatetour_enferProgress();
});