import { aigle_artilleur_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerTempsTotalaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerTempsRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerTempsdepuisHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerTempsConstructionParHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerPrixTotalaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerPrixRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerPrixdepuisHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerPrixConstructionParHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerExperienceTotalaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerExperienceRestantaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerExperiencedepuisHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { calculerExperienceConstructionParHDVaigle_artilleur } from "/coc/code/village principal/batiments/calculator/defense calc/aigle artilleur/aigle artilleur.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getaigle_artilleurLevel(num) {
    return document.getElementById("aigle_artilleur").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let aigle_artilleurlevel = getaigle_artilleurLevel();

let aigle_artilleurlevelmax = aigle_artilleur_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxaigle_artilleur() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(aigle_artilleurlevel, aigle_artilleurlevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        aigle_artilleurlevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantaigle_artilleur() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const aigle_artilleurlevel = parseInt(getaigle_artilleurLevel(1), 10);

    const aigle_artilleurlevelmax = aigle_artilleur_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantaigle_artilleur(aigle_artilleurlevel, aigle_artilleurlevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotalaigle_artilleur() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalaigle_artilleur(aigle_artilleurlevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVaigle_artilleur() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVaigle_artilleur(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVaigle_artilleur() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVaigle_artilleur(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempsaigle_artilleur() {
    const tempsTotal = globalcalculertempsTotalaigle_artilleur();
    const tempsRestant = globalcalculertempsRestantaigle_artilleur();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVaigle_artilleur();

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

export function globalcalculerPrixTotalaigle_artilleur() {
    let couttotal = 0;
    couttotal += calculerPrixTotalaigle_artilleur(aigle_artilleurlevel);
    return couttotal;
}

export function globalcalculerPrixRestantaigle_artilleur() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const aigle_artilleurlevel = parseInt(getaigle_artilleurLevel(1), 10);

    const aigle_artilleurlevelmax = aigle_artilleur_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantaigle_artilleur(aigle_artilleurlevel, aigle_artilleurlevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVaigle_artilleur() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVaigle_artilleur(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVaigle_artilleur() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVaigle_artilleur(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixaigle_artilleur () {
    const prixTotal = globalcalculerprixTotalaigle_artilleur();
    const prixRestant = globalcalculerprixRestantaigle_artilleur();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVaigle_artilleur();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalaigle_artilleur() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalaigle_artilleur(aigle_artilleurlevel);
    return expTotal;
}

export function globalcalculerExperienceRestantaigle_artilleur() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantaigle_artilleur(aigle_artilleurlevel, aigle_artilleurlevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVaigle_artilleur() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVaigle_artilleur(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVaigle_artilleur() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVaigle_artilleur(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpaigle_artilleur() {
    const expTotal = globalcalculerExperienceTotalaigle_artilleur();
    const expRestant = globalcalculerExperienceRestantaigle_artilleur();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVaigle_artilleur();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updateaigle_artilleurProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des aigle_artilleur
    aigle_artilleurlevel = getaigle_artilleurLevel();


    // Recalculer les niveaux maximums des aigle_artilleur en fonction du niveau HDV
    aigle_artilleurlevelmax = aigle_artilleur_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxaigle_artilleur();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-aigle_artilleur');
    const progressText = document.getElementById('progress-aigle_artilleur-value');
    const progressTimeText = document.getElementById('progress-aigle_artilleur-temps');
    const progressPriceText = document.getElementById('progress-aigle_artilleur-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantaigle_artilleur();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantaigle_artilleur();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const aigle_artilleurelects = [
        document.getElementById('aigle_artilleur'),
    ];

    // Ajouter un écouteur pour chaque aigle_artilleur
    aigle_artilleurelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updateaigle_artilleurProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updateaigle_artilleurProgress);
    }

    // Initialiser la barre de progression au chargement
    updateaigle_artilleurProgress();
});