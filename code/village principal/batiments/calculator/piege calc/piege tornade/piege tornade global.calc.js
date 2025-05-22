import { piege_tornade_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerTempsTotalpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerTempsRestantpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerTempsdepuisHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerTempsConstructionParHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerPrixTotalpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerPrixRestantpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerPrixdepuisHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerPrixConstructionParHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerExperienceTotalpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerExperienceRestantpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerExperiencedepuisHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { calculerExperienceConstructionParHDVpiege_tornade } from "/coc/code/village principal/batiments/calculator/piege calc/piege tornade/piege tornade.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getpiege_tornadeLevel(num) {
    return document.getElementById("piege_tornade").value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let piege_tornadelevel = getpiege_tornadeLevel();

let piege_tornadelevelmax = piege_tornade_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxpiege_tornade() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(piege_tornadelevel, piege_tornadelevelmax),
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        piege_tornadelevelmax,
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantpiege_tornade() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const piege_tornadelevel = parseInt(getpiege_tornadeLevel(1), 10);

    const piege_tornadelevelmax = piege_tornade_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantpiege_tornade(piege_tornadelevel, piege_tornadelevelmax);
    return tempsRestant;
}

export function globalcalculertempsTotalpiege_tornade() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalpiege_tornade(piege_tornadelevel);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVpiege_tornade() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVpiege_tornade(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVpiege_tornade() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVpiege_tornade(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempspiege_tornade() {
    const tempsTotal = globalcalculertempsTotalpiege_tornade();
    const tempsRestant = globalcalculertempsRestantpiege_tornade();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVpiege_tornade();

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

export function globalcalculerPrixTotalpiege_tornade() {
    let couttotal = 0;
    couttotal += calculerPrixTotalpiege_tornade(piege_tornadelevel);
    return couttotal;
}

export function globalcalculerPrixRestantpiege_tornade() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const piege_tornadelevel = parseInt(getpiege_tornadeLevel(1), 10);

    const piege_tornadelevelmax = piege_tornade_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantpiege_tornade(piege_tornadelevel, piege_tornadelevelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVpiege_tornade() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVpiege_tornade(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVpiege_tornade() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVpiege_tornade(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixpiege_tornade () {
    const prixTotal = globalcalculerprixTotalpiege_tornade();
    const prixRestant = globalcalculerprixRestantpiege_tornade();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVpiege_tornade();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalpiege_tornade() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalpiege_tornade(piege_tornadelevel);
    return expTotal;
}

export function globalcalculerExperienceRestantpiege_tornade() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantpiege_tornade(piege_tornadelevel, piege_tornadelevelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVpiege_tornade() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVpiege_tornade(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVpiege_tornade() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVpiege_tornade(hdvlevel);
    return exptotal;
}

export function barredeprogressionexppiege_tornade() {
    const expTotal = globalcalculerExperienceTotalpiege_tornade();
    const expRestant = globalcalculerExperienceRestantpiege_tornade();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVpiege_tornade();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatepiege_tornadeProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des piege_tornade
    piege_tornadelevel = getpiege_tornadeLevel();


    // Recalculer les niveaux maximums des piege_tornade en fonction du niveau HDV
    piege_tornadelevelmax = piege_tornade_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxpiege_tornade();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-piege_tornade');
    const progressText = document.getElementById('progress-piege_tornade-value');
    const progressTimeText = document.getElementById('progress-piege_tornade-temps');
    const progressPriceText = document.getElementById('progress-piege_tornade-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantpiege_tornade();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantpiege_tornade();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const piege_tornadeelects = [
        document.getElementById('piege_tornade'),
    ];

    // Ajouter un écouteur pour chaque piege_tornade
    piege_tornadeelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatepiege_tornadeProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatepiege_tornadeProgress);
    }

    // Initialiser la barre de progression au chargement
    updatepiege_tornadeProgress();
});