import { souffleur_air1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { souffleur_air2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerTempsTotalsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerTempsTotalsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerTempsRestantsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";    
import { calculerTempsRestantsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerTempsdepuisHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerTempsdepuisHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerTempsConstructionParHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerTempsConstructionParHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerPrixTotalsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerPrixTotalsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerPrixRestantsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerPrixRestantsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerPrixdepuisHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerPrixdepuisHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerPrixConstructionParHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerPrixConstructionParHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerExperienceTotalsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerExperienceTotalsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerExperienceRestantsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerExperienceRestantsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerExperiencedepuisHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerExperiencedepuisHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { calculerExperienceConstructionParHDVsouffleur_air1 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air1.calc.js";
import { calculerExperienceConstructionParHDVsouffleur_air2 } from "/coc/code/village principal/batiments/calculator/defense calc/souffleur airs/souffleur air2.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getsouffleur_airLevel(num) {
    return document.getElementById(`souffleur_air${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let souffleur_air1level = getsouffleur_airLevel(1);
let souffleur_air2level = getsouffleur_airLevel(2);

let souffleur_air1levelmax = souffleur_air1_nv_max_hdv(hdvlevel);
let souffleur_air2levelmax = souffleur_air2_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxsouffleur_airs() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(souffleur_air1level, souffleur_air1levelmax),
        Math.min(souffleur_air2level, souffleur_air2levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        souffleur_air1levelmax,
        souffleur_air2levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantsouffleur_airs() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const souffleur_air1level = parseInt(getsouffleur_airLevel(1), 10);
    const souffleur_air2level = parseInt(getsouffleur_airLevel(2), 10);

    const souffleur_air1levelmax = souffleur_air1_nv_max_hdv(hdvlevel);
    const souffleur_air2levelmax = souffleur_air2_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantsouffleur_air1(souffleur_air1level, souffleur_air1levelmax);
    tempsRestant += calculerTempsRestantsouffleur_air2(souffleur_air2level, souffleur_air2levelmax);

    return tempsRestant;
}

export function globalcalculertempsTotalsouffleur_airs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalsouffleur_air1(souffleur_air1level);
    tempsTotal += calculerTempsTotalsouffleur_air2(souffleur_air2level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVsouffleur_airs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVsouffleur_air1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVsouffleur_air2(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVsouffleur_airs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVsouffleur_air1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVsouffleur_air2(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempssouffleur_airs() {
    const tempsTotal = globalcalculertempsTotalsouffleur_airs();
    const tempsRestant = globalcalculertempsRestantsouffleur_airs();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVsouffleur_airs();

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

export function globalcalculerPrixTotalsouffleur_air() {
    let couttotal = 0;
    couttotal += calculerPrixTotalsouffleur_air1(souffleur_air1level);
    couttotal += calculerPrixTotalsouffleur_air2(souffleur_air2level);
    return couttotal;
}

export function globalcalculerPrixRestantsouffleur_air() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const souffleur_air1level = parseInt(getsouffleur_airLevel(1), 10);
    const souffleur_air2level = parseInt(getsouffleur_airLevel(2), 10);

    const souffleur_air1levelmax = souffleur_air1_nv_max_hdv(hdvlevel);
    const souffleur_air2levelmax = souffleur_air2_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantsouffleur_air1(souffleur_air1level, souffleur_air1levelmax);
    coutrestant += calculerPrixRestantsouffleur_air2(souffleur_air2level, souffleur_air2levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVsouffleur_air() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVsouffleur_air1(hdvlevel);
    couttotal += calculerPrixdepuisHDVsouffleur_air2(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVsouffleur_air() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVsouffleur_air1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVsouffleur_air2(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixsouffleur_airs () {
    const prixTotal = globalcalculerprixTotalsouffleur_airs();
    const prixRestant = globalcalculerprixRestantsouffleur_airs();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVsouffleur_airs();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalsouffleur_air() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalsouffleur_air1(souffleur_air1level);
    expTotal += calculerExperienceTotalsouffleur_air2(souffleur_air2level);
    return expTotal;
}

export function globalcalculerExperienceRestantsouffleur_air() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantsouffleur_air1(souffleur_air1level, souffleur_air1levelmax);
    exprestant += calculerExperienceRestantsouffleur_air2(souffleur_air2level, souffleur_air2levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVsouffleur_air() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVsouffleur_air1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVsouffleur_air2(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVsouffleur_air() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVsouffleur_air1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVsouffleur_air2(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpsouffleur_airs() {
    const expTotal = globalcalculerExperienceTotalsouffleur_air();
    const expRestant = globalcalculerExperienceRestantsouffleur_air();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVsouffleur_air();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatesouffleur_airProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des souffleur_airs
    souffleur_air1level = getsouffleur_airLevel(1);
    souffleur_air2level = getsouffleur_airLevel(2);


    // Recalculer les niveaux maximums des souffleur_airs en fonction du niveau HDV
    souffleur_air1levelmax = souffleur_air1_nv_max_hdv(hdvlevel);
    souffleur_air2levelmax = souffleur_air2_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxsouffleur_airs();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-souffleur_airs');
    const progressText = document.getElementById('progress-souffleur_airs-value');
    const progressTimeText = document.getElementById('progress-souffleur_airs-temps');
    const progressPriceText = document.getElementById('progress-souffleur_airs-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantsouffleur_airs();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantsouffleur_air();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const souffleur_airSelects = [
        document.getElementById('souffleur_air1'),
        document.getElementById('souffleur_air2'),
    ];

    // Ajouter un écouteur pour chaque souffleur_air
    souffleur_airSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatesouffleur_airProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatesouffleur_airProgress);
    }

    // Initialiser la barre de progression au chargement
    updatesouffleur_airProgress();
});