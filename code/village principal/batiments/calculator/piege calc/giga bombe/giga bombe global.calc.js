import { giga_bombe_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerTempsTotalgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerTempsRestantgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerTempsdepuisHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerTempsConstructionParHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerPrixTotalgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerPrixRestantgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerPrixdepuisHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerPrixConstructionParHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerExperienceTotalgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerExperienceRestantgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerExperiencedepuisHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { calculerExperienceConstructionParHDVgiga_bombe } from "/coc/code/village principal/batiments/calculator/piege calc/giga bombe/giga bombe.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getgiga_bombeLevel(num) {
    return document.getElementById("giga_bombe").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let giga_bombelevel = getgiga_bombeLevel();

let giga_bombelevelmax = giga_bombe_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxgiga_bombe() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(giga_bombelevel, giga_bombelevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        giga_bombelevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantgiga_bombe() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const giga_bombelevel = parseInt(getgiga_bombeLevel(1), 10);

    const giga_bombelevelmax = giga_bombe_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantgiga_bombe(giga_bombelevel, giga_bombelevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotalgiga_bombe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalgiga_bombe(giga_bombelevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVgiga_bombe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVgiga_bombe(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVgiga_bombe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVgiga_bombe(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempsgiga_bombe() {
    const tempsTotal = globalcalculertempsTotalgiga_bombe();
    const tempsRestant = globalcalculertempsRestantgiga_bombe();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVgiga_bombe();

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

export function globalcalculerPrixTotalgiga_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixTotalgiga_bombe(giga_bombelevel);
    return couttotal;
}

export function globalcalculerPrixRestantgiga_bombe() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const giga_bombelevel = parseInt(getgiga_bombeLevel(1), 10);

    const giga_bombelevelmax = giga_bombe_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantgiga_bombe(giga_bombelevel, giga_bombelevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVgiga_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVgiga_bombe(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVgiga_bombe() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVgiga_bombe(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixgiga_bombe () {
    const prixTotal = globalcalculerprixTotalgiga_bombe();
    const prixRestant = globalcalculerprixRestantgiga_bombe();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVgiga_bombe();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalgiga_bombe() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalgiga_bombe(giga_bombelevel);
    return expTotal;
}

export function globalcalculerExperienceRestantgiga_bombe() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantgiga_bombe(giga_bombelevel, giga_bombelevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVgiga_bombe() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVgiga_bombe(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVgiga_bombe() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVgiga_bombe(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpgiga_bombe() {
    const expTotal = globalcalculerExperienceTotalgiga_bombe();
    const expRestant = globalcalculerExperienceRestantgiga_bombe();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVgiga_bombe();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updategiga_bombeProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des giga_bombe
    giga_bombelevel = getgiga_bombeLevel();


    // Recalculer les niveaux maximums des giga_bombe en fonction du niveau HDV
    giga_bombelevelmax = giga_bombe_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxgiga_bombe();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-giga_bombe');
    const progressText = document.getElementById('progress-giga_bombe-value');
    const progressTimeText = document.getElementById('progress-giga_bombe-temps');
    const progressPriceText = document.getElementById('progress-giga_bombe-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantgiga_bombe();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantgiga_bombe();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const giga_bombeelects = [
        document.getElementById('giga_bombe'),
    ];

    // Ajouter un écouteur pour chaque giga_bombe
    giga_bombeelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updategiga_bombeProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updategiga_bombeProgress);
    }

    // Initialiser la barre de progression au chargement
    updategiga_bombeProgress();
});