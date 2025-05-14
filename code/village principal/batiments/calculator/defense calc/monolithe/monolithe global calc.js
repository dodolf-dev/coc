import { monolithe_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerTempsTotalmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerTempsRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerTempsdepuisHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerTempsConstructionParHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerPrixTotalmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerPrixRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerPrixdepuisHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerPrixConstructionParHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerExperienceTotalmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerExperienceRestantmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerExperiencedepuisHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { calculerExperienceConstructionParHDVmonolithe } from "/coc/code/village principal/batiments/calculator/defense calc/monolithe/monolithe.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getmonolitheLevel(num) {
    return document.getElementById("monolithe").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let monolithelevel = getmonolitheLevel();

let monolithelevelmax = monolithe_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxmonolithe() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(monolithelevel, monolithelevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        monolithelevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantmonolithe() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const monolithelevel = parseInt(getmonolitheLevel(1), 10);

    const monolithelevelmax = monolithe_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantmonolithe(monolithelevel, monolithelevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotalmonolithe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalmonolithe(monolithelevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVmonolithe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVmonolithe(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVmonolithe() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVmonolithe(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempsmonolithe() {
    const tempsTotal = globalcalculertempsTotalmonolithe();
    const tempsRestant = globalcalculertempsRestantmonolithe();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVmonolithe();

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

export function globalcalculerPrixTotalmonolithe() {
    let couttotal = 0;
    couttotal += calculerPrixTotalmonolithe(monolithelevel);
    return couttotal;
}

export function globalcalculerPrixRestantmonolithe() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const monolithelevel = parseInt(getmonolitheLevel(1), 10);

    const monolithelevelmax = monolithe_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantmonolithe(monolithelevel, monolithelevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVmonolithe() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVmonolithe(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVmonolithe() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVmonolithe(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixmonolithe () {
    const prixTotal = globalcalculerprixTotalmonolithe();
    const prixRestant = globalcalculerprixRestantmonolithe();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVmonolithe();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalmonolithe() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalmonolithe(monolithelevel);
    return expTotal;
}

export function globalcalculerExperienceRestantmonolithe() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantmonolithe(monolithelevel, monolithelevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVmonolithe() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVmonolithe(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVmonolithe() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVmonolithe(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpmonolithe() {
    const expTotal = globalcalculerExperienceTotalmonolithe();
    const expRestant = globalcalculerExperienceRestantmonolithe();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVmonolithe();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatemonolitheProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des monolithe
    monolithelevel = getmonolitheLevel();


    // Recalculer les niveaux maximums des monolithe en fonction du niveau HDV
    monolithelevelmax = monolithe_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxmonolithe();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-monolithe');
    const progressText = document.getElementById('progress-monolithe-value');
    const progressTimeText = document.getElementById('progress-monolithe-temps');
    const progressPriceText = document.getElementById('progress-monolithe-prix-elixir-noir');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantmonolithe();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantmonolithe();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/elixir-noir.png" alt="elixir noir" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const monolitheelects = [
        document.getElementById('monolithe'),
    ];

    // Ajouter un écouteur pour chaque monolithe
    monolitheelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatemonolitheProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatemonolitheProgress);
    }

    // Initialiser la barre de progression au chargement
    updatemonolitheProgress();
});