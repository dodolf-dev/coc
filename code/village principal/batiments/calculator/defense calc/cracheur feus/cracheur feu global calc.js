import { cracheur_feu1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { cracheur_feu2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerTempsTotalcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerTempsTotalcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerTempsRestantcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";    
import { calculerTempsRestantcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerTempsdepuisHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerTempsdepuisHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerTempsConstructionParHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerTempsConstructionParHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerPrixTotalcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerPrixTotalcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerPrixRestantcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerPrixRestantcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerPrixdepuisHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerPrixdepuisHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerPrixConstructionParHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerPrixConstructionParHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerExperienceTotalcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerExperienceTotalcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerExperienceRestantcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerExperienceRestantcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerExperiencedepuisHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerExperiencedepuisHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { calculerExperienceConstructionParHDVcracheur_feu1 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu1.calc.js";
import { calculerExperienceConstructionParHDVcracheur_feu2 } from "/coc/code/village principal/batiments/calculator/defense calc/cracheur feus/cracheur feu2.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getcracheur_feuLevel(num) {
    return document.getElementById(`cracheur_feu${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let cracheur_feu1level = getcracheur_feuLevel(1);
let cracheur_feu2level = getcracheur_feuLevel(2);

let cracheur_feu1levelmax = cracheur_feu1_nv_max_hdv(hdvlevel);
let cracheur_feu2levelmax = cracheur_feu2_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxcracheur_feus() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(cracheur_feu1level, cracheur_feu1levelmax),
        Math.min(cracheur_feu2level, cracheur_feu2levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        cracheur_feu1levelmax,
        cracheur_feu2levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantcracheur_feus() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const cracheur_feu1level = parseInt(getcracheur_feuLevel(1), 10);
    const cracheur_feu2level = parseInt(getcracheur_feuLevel(2), 10);

    const cracheur_feu1levelmax = cracheur_feu1_nv_max_hdv(hdvlevel);
    const cracheur_feu2levelmax = cracheur_feu2_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantcracheur_feu1(cracheur_feu1level, cracheur_feu1levelmax);
    tempsRestant += calculerTempsRestantcracheur_feu2(cracheur_feu2level, cracheur_feu2levelmax);

    return tempsRestant;
}

export function globalcalculertempsTotalcracheur_feus() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalcracheur_feu1(cracheur_feu1level);
    tempsTotal += calculerTempsTotalcracheur_feu2(cracheur_feu2level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVcracheur_feus() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVcracheur_feu1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVcracheur_feu2(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVcracheur_feus() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVcracheur_feu1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVcracheur_feu2(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempscracheur_feus() {
    const tempsTotal = globalcalculertempsTotalcracheur_feus();
    const tempsRestant = globalcalculertempsRestantcracheur_feus();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVcracheur_feus();

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

export function globalcalculerPrixTotalcracheur_feu() {
    let couttotal = 0;
    couttotal += calculerPrixTotalcracheur_feu1(cracheur_feu1level);
    couttotal += calculerPrixTotalcracheur_feu2(cracheur_feu2level);
    return couttotal;
}

export function globalcalculerPrixRestantcracheur_feu() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const cracheur_feu1level = parseInt(getcracheur_feuLevel(1), 10);
    const cracheur_feu2level = parseInt(getcracheur_feuLevel(2), 10);

    const cracheur_feu1levelmax = cracheur_feu1_nv_max_hdv(hdvlevel);
    const cracheur_feu2levelmax = cracheur_feu2_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantcracheur_feu1(cracheur_feu1level, cracheur_feu1levelmax);
    coutrestant += calculerPrixRestantcracheur_feu2(cracheur_feu2level, cracheur_feu2levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVcracheur_feu() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVcracheur_feu1(hdvlevel);
    couttotal += calculerPrixdepuisHDVcracheur_feu2(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVcracheur_feu() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVcracheur_feu1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVcracheur_feu2(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixcracheur_feus () {
    const prixTotal = globalcalculerprixTotalcracheur_feus();
    const prixRestant = globalcalculerprixRestantcracheur_feus();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVcracheur_feus();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalcracheur_feu() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalcracheur_feu1(cracheur_feu1level);
    expTotal += calculerExperienceTotalcracheur_feu2(cracheur_feu2level);
    return expTotal;
}

export function globalcalculerExperienceRestantcracheur_feu() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantcracheur_feu1(cracheur_feu1level, cracheur_feu1levelmax);
    exprestant += calculerExperienceRestantcracheur_feu2(cracheur_feu2level, cracheur_feu2levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVcracheur_feu() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVcracheur_feu1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVcracheur_feu2(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVcracheur_feu() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVcracheur_feu1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVcracheur_feu2(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpcracheur_feus() {
    const expTotal = globalcalculerExperienceTotalcracheur_feu();
    const expRestant = globalcalculerExperienceRestantcracheur_feu();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVcracheur_feu();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatecracheur_feuProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des cracheur_feus
    cracheur_feu1level = getcracheur_feuLevel(1);
    cracheur_feu2level = getcracheur_feuLevel(2);


    // Recalculer les niveaux maximums des cracheur_feus en fonction du niveau HDV
    cracheur_feu1levelmax = cracheur_feu1_nv_max_hdv(hdvlevel);
    cracheur_feu2levelmax = cracheur_feu2_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxcracheur_feus();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-cracheur_feus');
    const progressText = document.getElementById('progress-cracheur_feus-value');
    const progressTimeText = document.getElementById('progress-cracheur_feus-temps');
    const progressPriceText = document.getElementById('progress-cracheur_feus-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantcracheur_feus();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantcracheur_feu();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const cracheur_feuSelects = [
        document.getElementById('cracheur_feu1'),
        document.getElementById('cracheur_feu2'),
    ];

    // Ajouter un écouteur pour chaque cracheur_feu
    cracheur_feuSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatecracheur_feuProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatecracheur_feuProgress);
    }

    // Initialiser la barre de progression au chargement
    updatecracheur_feuProgress();
});