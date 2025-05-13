import { catapulte_erratique1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { catapulte_erratique2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerTempsTotalcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerTempsTotalcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerTempsRestantcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";    
import { calculerTempsRestantcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerTempsdepuisHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerTempsdepuisHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerTempsConstructionParHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerTempsConstructionParHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerPrixTotalcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerPrixTotalcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerPrixRestantcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerPrixRestantcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerPrixdepuisHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerPrixdepuisHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerPrixConstructionParHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerPrixConstructionParHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerExperienceTotalcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerExperienceTotalcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerExperienceRestantcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerExperienceRestantcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerExperiencedepuisHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerExperiencedepuisHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { calculerExperienceConstructionParHDVcatapulte_erratique1 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique1.calc.js";
import { calculerExperienceConstructionParHDVcatapulte_erratique2 } from "/coc/code/village principal/batiments/calculator/defense calc/catapulte erratiques/catapulte erratique2.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getcatapulte_erratiqueLevel(num) {
    return document.getElementById(`catapulte_erratique${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let catapulte_erratique1level = getcatapulte_erratiqueLevel(1);
let catapulte_erratique2level = getcatapulte_erratiqueLevel(2);

let catapulte_erratique1levelmax = catapulte_erratique1_nv_max_hdv(hdvlevel);
let catapulte_erratique2levelmax = catapulte_erratique2_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxcatapulte_erratiques() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(catapulte_erratique1level, catapulte_erratique1levelmax),
        Math.min(catapulte_erratique2level, catapulte_erratique2levelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        catapulte_erratique1levelmax,
        catapulte_erratique2levelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantcatapulte_erratiques() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const catapulte_erratique1level = parseInt(getcatapulte_erratiqueLevel(1), 10);
    const catapulte_erratique2level = parseInt(getcatapulte_erratiqueLevel(2), 10);

    const catapulte_erratique1levelmax = catapulte_erratique1_nv_max_hdv(hdvlevel);
    const catapulte_erratique2levelmax = catapulte_erratique2_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantcatapulte_erratique1(catapulte_erratique1level, catapulte_erratique1levelmax);
    tempsRestant += calculerTempsRestantcatapulte_erratique2(catapulte_erratique2level, catapulte_erratique2levelmax);

    return tempsRestant;
}

export function globalcalculertempsTotalcatapulte_erratiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalcatapulte_erratique1(catapulte_erratique1level);
    tempsTotal += calculerTempsTotalcatapulte_erratique2(catapulte_erratique2level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVcatapulte_erratiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVcatapulte_erratique1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVcatapulte_erratique2(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVcatapulte_erratiques() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVcatapulte_erratique1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVcatapulte_erratique2(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempscatapulte_erratiques() {
    const tempsTotal = globalcalculertempsTotalcatapulte_erratiques();
    const tempsRestant = globalcalculertempsRestantcatapulte_erratiques();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVcatapulte_erratiques();

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

export function globalcalculerPrixTotalcatapulte_erratique() {
    let couttotal = 0;
    couttotal += calculerPrixTotalcatapulte_erratique1(catapulte_erratique1level);
    couttotal += calculerPrixTotalcatapulte_erratique2(catapulte_erratique2level);
    return couttotal;
}

export function globalcalculerPrixRestantcatapulte_erratique() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const catapulte_erratique1level = parseInt(getcatapulte_erratiqueLevel(1), 10);
    const catapulte_erratique2level = parseInt(getcatapulte_erratiqueLevel(2), 10);

    const catapulte_erratique1levelmax = catapulte_erratique1_nv_max_hdv(hdvlevel);
    const catapulte_erratique2levelmax = catapulte_erratique2_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantcatapulte_erratique1(catapulte_erratique1level, catapulte_erratique1levelmax);
    coutrestant += calculerPrixRestantcatapulte_erratique2(catapulte_erratique2level, catapulte_erratique2levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVcatapulte_erratique() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVcatapulte_erratique1(hdvlevel);
    couttotal += calculerPrixdepuisHDVcatapulte_erratique2(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVcatapulte_erratique() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVcatapulte_erratique1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVcatapulte_erratique2(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixcatapulte_erratiques () {
    const prixTotal = globalcalculerprixTotalcatapulte_erratiques();
    const prixRestant = globalcalculerprixRestantcatapulte_erratiques();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVcatapulte_erratiques();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalcatapulte_erratique() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalcatapulte_erratique1(catapulte_erratique1level);
    expTotal += calculerExperienceTotalcatapulte_erratique2(catapulte_erratique2level);
    return expTotal;
}

export function globalcalculerExperienceRestantcatapulte_erratique() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantcatapulte_erratique1(catapulte_erratique1level, catapulte_erratique1levelmax);
    exprestant += calculerExperienceRestantcatapulte_erratique2(catapulte_erratique2level, catapulte_erratique2levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVcatapulte_erratique() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVcatapulte_erratique1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVcatapulte_erratique2(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVcatapulte_erratique() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVcatapulte_erratique1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVcatapulte_erratique2(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpcatapulte_erratiques() {
    const expTotal = globalcalculerExperienceTotalcatapulte_erratique();
    const expRestant = globalcalculerExperienceRestantcatapulte_erratique();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVcatapulte_erratique();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatecatapulte_erratiqueProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des catapulte_erratiques
    catapulte_erratique1level = getcatapulte_erratiqueLevel(1);
    catapulte_erratique2level = getcatapulte_erratiqueLevel(2);

    // Recalculer les niveaux maximums des catapulte_erratiques en fonction du niveau HDV
    catapulte_erratique1levelmax = catapulte_erratique1_nv_max_hdv(hdvlevel);
    catapulte_erratique2levelmax = catapulte_erratique2_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxcatapulte_erratiques();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-catapulte_erratiques');
    const progressText = document.getElementById('progress-catapulte_erratiques-value');
    const progressTimeText = document.getElementById('progress-catapulte_erratiques-temps');
    const progressPriceText = document.getElementById('progress-catapulte_erratiques-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression.toFixed(2)}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantcatapulte_erratiques();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantcatapulte_erratique();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const catapulte_erratiqueSelects = [
        document.getElementById('catapulte_erratique1'),
        document.getElementById('catapulte_erratique2'),
    ];

    // Ajouter un écouteur pour chaque catapulte_erratique
    catapulte_erratiqueSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatecatapulte_erratiqueProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatecatapulte_erratiqueProgress);
    }

    // Initialiser la barre de progression au chargement
    updatecatapulte_erratiqueProgress();
});