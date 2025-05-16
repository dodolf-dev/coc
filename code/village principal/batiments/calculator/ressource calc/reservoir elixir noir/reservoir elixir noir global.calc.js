import { reservoir_elixir_noir_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerTempsTotalreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerTempsRestantreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerTempsdepuisHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerTempsConstructionParHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerPrixTotalreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerPrixRestantreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerPrixdepuisHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerPrixConstructionParHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerExperienceTotalreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerExperienceRestantreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerExperiencedepuisHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { calculerExperienceConstructionParHDVreservoir_elixir_noir } from "/coc/code/village principal/batiments/calculator/ressource calc/reservoir elixir noir/reservoir elixir noir.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getreservoir_elixir_noirLevel(num) {
    return document.getElementById("reservoir_elixir_noir").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let reservoir_elixir_noirlevel = getreservoir_elixir_noirLevel();

let reservoir_elixir_noirlevelmax = reservoir_elixir_noir_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxreservoir_elixir_noir() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(reservoir_elixir_noirlevel, reservoir_elixir_noirlevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        reservoir_elixir_noirlevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantreservoir_elixir_noir() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const reservoir_elixir_noirlevel = parseInt(getreservoir_elixir_noirLevel(1), 10);

    const reservoir_elixir_noirlevelmax = reservoir_elixir_noir_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantreservoir_elixir_noir(reservoir_elixir_noirlevel, reservoir_elixir_noirlevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotalreservoir_elixir_noir() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalreservoir_elixir_noir(reservoir_elixir_noirlevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVreservoir_elixir_noir() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVreservoir_elixir_noir(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVreservoir_elixir_noir() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVreservoir_elixir_noir(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempsreservoir_elixir_noir() {
    const tempsTotal = globalcalculertempsTotalreservoir_elixir_noir();
    const tempsRestant = globalcalculertempsRestantreservoir_elixir_noir();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVreservoir_elixir_noir();

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

export function globalcalculerPrixTotalreservoir_elixir_noir() {
    let couttotal = 0;
    couttotal += calculerPrixTotalreservoir_elixir_noir(reservoir_elixir_noirlevel);
    return couttotal;
}

export function globalcalculerPrixRestantreservoir_elixir_noir() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const reservoir_elixir_noirlevel = parseInt(getreservoir_elixir_noirLevel(1), 10);

    const reservoir_elixir_noirlevelmax = reservoir_elixir_noir_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantreservoir_elixir_noir(reservoir_elixir_noirlevel, reservoir_elixir_noirlevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVreservoir_elixir_noir() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVreservoir_elixir_noir(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVreservoir_elixir_noir() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVreservoir_elixir_noir(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixreservoir_elixir_noir () {
    const prixTotal = globalcalculerprixTotalreservoir_elixir_noir();
    const prixRestant = globalcalculerprixRestantreservoir_elixir_noir();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVreservoir_elixir_noir();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalreservoir_elixir_noir() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalreservoir_elixir_noir(reservoir_elixir_noirlevel);
    return expTotal;
}

export function globalcalculerExperienceRestantreservoir_elixir_noir() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantreservoir_elixir_noir(reservoir_elixir_noirlevel, reservoir_elixir_noirlevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVreservoir_elixir_noir() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVreservoir_elixir_noir(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVreservoir_elixir_noir() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVreservoir_elixir_noir(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpreservoir_elixir_noir() {
    const expTotal = globalcalculerExperienceTotalreservoir_elixir_noir();
    const expRestant = globalcalculerExperienceRestantreservoir_elixir_noir();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVreservoir_elixir_noir();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatereservoir_elixir_noirProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des reservoir_elixir_noir
    reservoir_elixir_noirlevel = getreservoir_elixir_noirLevel();


    // Recalculer les niveaux maximums des reservoir_elixir_noir en fonction du niveau HDV
    reservoir_elixir_noirlevelmax = reservoir_elixir_noir_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxreservoir_elixir_noir();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-reservoir_elixir_noir');
    const progressText = document.getElementById('progress-reservoir_elixir_noir-value');
    const progressTimeText = document.getElementById('progress-reservoir_elixir_noir-temps');
    const progressPriceText = document.getElementById('progress-reservoir_elixir_noir-prix-elixir');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantreservoir_elixir_noir();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantreservoir_elixir_noir();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/elixir village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const reservoir_elixir_noirelects = [
        document.getElementById('reservoir_elixir_noir'),
    ];

    // Ajouter un écouteur pour chaque reservoir_elixir_noir
    reservoir_elixir_noirelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatereservoir_elixir_noirProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatereservoir_elixir_noirProgress);
    }

    // Initialiser la barre de progression au chargement
    updatereservoir_elixir_noirProgress();
});