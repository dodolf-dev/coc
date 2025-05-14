import { batisseur1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { batisseur2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { batisseur3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { batisseur4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { batisseur5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerTempsTotalbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerTempsTotalbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerTempsTotalbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerTempsTotalbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerTempsTotalbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerTempsRestantbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";    
import { calculerTempsRestantbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerTempsRestantbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerTempsRestantbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerTempsRestantbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerTempsdepuisHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerTempsdepuisHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerTempsdepuisHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerTempsdepuisHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerTempsdepuisHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerTempsConstructionParHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerTempsConstructionParHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerTempsConstructionParHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerTempsConstructionParHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerTempsConstructionParHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerPrixTotalbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerPrixTotalbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerPrixTotalbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerPrixTotalbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerPrixTotalbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerPrixRestantbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerPrixRestantbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerPrixRestantbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerPrixRestantbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerPrixRestantbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerPrixdepuisHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerPrixdepuisHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerPrixdepuisHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerPrixdepuisHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerPrixdepuisHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerPrixConstructionParHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerPrixConstructionParHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerPrixConstructionParHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerPrixConstructionParHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerPrixConstructionParHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerExperienceTotalbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerExperienceTotalbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerExperienceTotalbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerExperienceTotalbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerExperienceTotalbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerExperienceRestantbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerExperienceRestantbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerExperienceRestantbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerExperienceRestantbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerExperienceRestantbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerExperiencedepuisHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerExperiencedepuisHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerExperiencedepuisHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerExperiencedepuisHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerExperiencedepuisHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { calculerExperienceConstructionParHDVbatisseur1 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur1.calc.js";
import { calculerExperienceConstructionParHDVbatisseur2 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur2.calc.js";
import { calculerExperienceConstructionParHDVbatisseur3 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur3.calc.js";
import { calculerExperienceConstructionParHDVbatisseur4 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur4.calc.js";
import { calculerExperienceConstructionParHDVbatisseur5 } from "/coc/code/village principal/batiments/calculator/defense calc/batisseurs/batisseur5.calc.js";

import { formatPrix } from "/coc/code/outils/affichge nombre.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";

function getHDVLevel() {
    return document.getElementById("hdv").value;
}

function getbatisseurLevel(num) {
    return document.getElementById(`batisseur${num}`).value;
}

let hdvlevel = getHDVLevel(); // Récupérer le niveau de l'Hôtel de Ville

let batisseur1level = getbatisseurLevel(1);
let batisseur2level = getbatisseurLevel(2);
let batisseur3level = getbatisseurLevel(3);
let batisseur4level = getbatisseurLevel(4);
let batisseur5level = getbatisseurLevel(5);

let batisseur1levelmax = batisseur1_nv_max_hdv(hdvlevel);
let batisseur2levelmax = batisseur2_nv_max_hdv(hdvlevel);
let batisseur3levelmax = batisseur3_nv_max_hdv(hdvlevel);
let batisseur4levelmax = batisseur4_nv_max_hdv(hdvlevel);
let batisseur5levelmax = batisseur5_nv_max_hdv(hdvlevel);

export function calculerPourcentageNiveauxbatisseurs() {
    // Niveaux actuels
    const niveauxActuels = [
        Math.min(batisseur1level, batisseur1levelmax),
        Math.min(batisseur2level, batisseur2levelmax),
        Math.min(batisseur3level, batisseur3levelmax),
        Math.min(batisseur4level, batisseur4levelmax),
        Math.min(batisseur5level, batisseur5levelmax)
    ];

    // Niveaux max possibles selon HDV
    const niveauxMax = [
        batisseur1levelmax,
        batisseur2levelmax,
        batisseur3levelmax,
        batisseur4levelmax,
        batisseur5levelmax
    ];

    // Calcul des totaux
    const totalMax = niveauxMax.reduce((a, b) => a + b, 0);
    const totalActuel = niveauxActuels.reduce((a, b) => a + b, 0);

    if (totalMax === 0) return 0; // Évite la division par zéro

    const progression = (totalActuel / totalMax) * 100;
    return parseFloat(progression.toFixed(2)); // Limite a 2 décimales
}

export function globalcalculertempsRestantbatisseurs() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const batisseur1level = parseInt(getbatisseurLevel(1), 10);
    const batisseur2level = parseInt(getbatisseurLevel(2), 10);
    const batisseur3level = parseInt(getbatisseurLevel(3), 10);
    const batisseur4level = parseInt(getbatisseurLevel(4), 10);
    const batisseur5level = parseInt(getbatisseurLevel(5), 10);

    const batisseur1levelmax = batisseur1_nv_max_hdv(hdvlevel);
    const batisseur2levelmax = batisseur2_nv_max_hdv(hdvlevel);
    const batisseur3levelmax = batisseur3_nv_max_hdv(hdvlevel);
    const batisseur4levelmax = batisseur4_nv_max_hdv(hdvlevel);
    const batisseur5levelmax = batisseur5_nv_max_hdv(hdvlevel);

    let tempsRestant = 0;
    tempsRestant += calculerTempsRestantbatisseur1(batisseur1level, batisseur1levelmax);
    tempsRestant += calculerTempsRestantbatisseur2(batisseur2level, batisseur2levelmax);
    tempsRestant += calculerTempsRestantbatisseur3(batisseur3level, batisseur3levelmax);
    tempsRestant += calculerTempsRestantbatisseur4(batisseur4level, batisseur4levelmax);
    tempsRestant += calculerTempsRestantbatisseur5(batisseur5level, batisseur5levelmax);

    return tempsRestant;
}

export function globalcalculertempsTotalbatisseurs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsTotalbatisseur1(batisseur1level);
    tempsTotal += calculerTempsTotalbatisseur2(batisseur2level);
    tempsTotal += calculerTempsTotalbatisseur3(batisseur3level);
    tempsTotal += calculerTempsTotalbatisseur4(batisseur4level);
    tempsTotal += calculerTempsTotalbatisseur5(batisseur5level);
    return tempsTotal;
}

export function globalcalculertempsdepuisHDVbatisseurs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsdepuisHDVbatisseur1(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVbatisseur2(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVbatisseur3(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVbatisseur4(hdvlevel);
    tempsTotal += calculerTempsdepuisHDVbatisseur5(hdvlevel);
    return tempsTotal;
}

export function globalcalculertempsConstructionParHDVbatisseurs() {
    let tempsTotal = 0;
    tempsTotal += calculerTempsConstructionParHDVbatisseur1(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVbatisseur2(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVbatisseur3(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVbatisseur4(hdvlevel);
    tempsTotal += calculerTempsConstructionParHDVbatisseur5(hdvlevel);
    return tempsTotal;
}

export function barredeprogressiontempsbatisseurs() {
    const tempsTotal = globalcalculertempsTotalbatisseurs();
    const tempsRestant = globalcalculertempsRestantbatisseurs();
    const tempsConstructionHDV = globalcalculertempsConstructionParHDVbatisseurs();

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

export function globalcalculerPrixTotalbatisseur() {
    let couttotal = 0;
    couttotal += calculerPrixTotalbatisseur1(batisseur1level);
    couttotal += calculerPrixTotalbatisseur2(batisseur2level);
    couttotal += calculerPrixTotalbatisseur3(batisseur3level);
    couttotal += calculerPrixTotalbatisseur4(batisseur4level);
    couttotal += calculerPrixTotalbatisseur5(batisseur5level);
    return couttotal;
}

export function globalcalculerPrixRestantbatisseur() {
    const hdvlevel = parseInt(getHDVLevel(), 10);

    const batisseur1level = parseInt(getbatisseurLevel(1), 10);
    const batisseur2level = parseInt(getbatisseurLevel(2), 10);
    const batisseur3level = parseInt(getbatisseurLevel(3), 10);
    const batisseur4level = parseInt(getbatisseurLevel(4), 10);
    const batisseur5level = parseInt(getbatisseurLevel(5), 10);

    const batisseur1levelmax = batisseur1_nv_max_hdv(hdvlevel);
    const batisseur2levelmax = batisseur2_nv_max_hdv(hdvlevel);
    const batisseur3levelmax = batisseur3_nv_max_hdv(hdvlevel);
    const batisseur4levelmax = batisseur4_nv_max_hdv(hdvlevel);
    const batisseur5levelmax = batisseur5_nv_max_hdv(hdvlevel);

    let coutrestant = 0;
    coutrestant += calculerPrixRestantbatisseur1(batisseur1level, batisseur1levelmax);
    coutrestant += calculerPrixRestantbatisseur2(batisseur2level, batisseur2levelmax);
    coutrestant += calculerPrixRestantbatisseur3(batisseur3level, batisseur3levelmax);
    coutrestant += calculerPrixRestantbatisseur4(batisseur4level, batisseur4levelmax);
    coutrestant += calculerPrixRestantbatisseur5(batisseur5level, batisseur5levelmax);
    return coutrestant;
}

export function globalcalculerPrixdepuisHDVbatisseur() {
    let couttotal = 0;
    couttotal += calculerPrixdepuisHDVbatisseur1(hdvlevel);
    couttotal += calculerPrixdepuisHDVbatisseur2(hdvlevel);
    couttotal += calculerPrixdepuisHDVbatisseur3(hdvlevel);
    couttotal += calculerPrixdepuisHDVbatisseur4(hdvlevel);
    couttotal += calculerPrixdepuisHDVbatisseur5(hdvlevel);
    return couttotal;
}

export function globalcalculerPrixConstructionParHDVbatisseur() {
    let couttotal = 0;
    couttotal += calculerPrixConstructionParHDVbatisseur1(hdvlevel);
    couttotal += calculerPrixConstructionParHDVbatisseur2(hdvlevel);
    couttotal += calculerPrixConstructionParHDVbatisseur3(hdvlevel);
    couttotal += calculerPrixConstructionParHDVbatisseur4(hdvlevel);
    couttotal += calculerPrixConstructionParHDVbatisseur5(hdvlevel);
    return couttotal;
}

export function barredeprogrssionprixbatisseurs () {
    const prixTotal = globalcalculerprixTotalbatisseurs();
    const prixRestant = globalcalculerprixRestantbatisseurs();
    const prixConstructionHDV = globalcalculerprixConstructionParHDVbatisseurs();
    if (prixTotal > prixConstructionHDV) {
        let progression = ((prixTotal - prixRestant) / prixTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((prixConstructionHDV - prixTotal) / prixTotal) * 100;
        return (-retard).toFixed(2);
    }
}


export function globalcalculerExperienceTotalbatisseur() {
    let expTotal = 0;
    expTotal += calculerExperienceTotalbatisseur1(batisseur1level);
    expTotal += calculerExperienceTotalbatisseur2(batisseur2level);
    expTotal += calculerExperienceTotalbatisseur3(batisseur3level);
    expTotal += calculerExperienceTotalbatisseur4(batisseur4level);
    expTotal += calculerExperienceTotalbatisseur5(batisseur5level);
    return expTotal;
}

export function globalcalculerExperienceRestantbatisseur() {
    let exprestant = 0;
    exprestant += calculerExperienceRestantbatisseur1(batisseur1level, batisseur1levelmax);
    exprestant += calculerExperienceRestantbatisseur2(batisseur2level, batisseur2levelmax);
    exprestant += calculerExperienceRestantbatisseur3(batisseur3level, batisseur3levelmax);
    exprestant += calculerExperienceRestantbatisseur4(batisseur4level, batisseur4levelmax);
    exprestant += calculerExperienceRestantbatisseur5(batisseur5level, batisseur5levelmax);
    return exprestant;
}

export function globalcalculerExperiencedepuisHDVbatisseur() {
    let exptotal = 0;
    exptotal += calculerExperiencedepuisHDVbatisseur1(hdvlevel);
    exptotal += calculerExperiencedepuisHDVbatisseur2(hdvlevel);
    exptotal += calculerExperiencedepuisHDVbatisseur3(hdvlevel);
    exptotal += calculerExperiencedepuisHDVbatisseur4(hdvlevel);
    exptotal += calculerExperiencedepuisHDVbatisseur5(hdvlevel);
    return exptotal;
}

export function globalcalculerExperienceConstructionParHDVbatisseur() {
    let exptotal = 0;
    exptotal += calculerExperienceConstructionParHDVbatisseur1(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVbatisseur2(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVbatisseur3(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVbatisseur4(hdvlevel);
    exptotal += calculerExperienceConstructionParHDVbatisseur5(hdvlevel);
    return exptotal;
}

export function barredeprogressionexpbatisseurs() {
    const expTotal = globalcalculerExperienceTotalbatisseur();
    const expRestant = globalcalculerExperienceRestantbatisseur();
    const expConstructionHDV = globalcalculerExperienceConstructionParHDVbatisseur();
    if (expTotal > expConstructionHDV) {
        let progression = ((expTotal - expRestant) / expTotal) * 100;
        return progression.toFixed(2);
    } else {
        let retard = ((expConstructionHDV - expTotal) / expTotal) * 100;
        return (-retard).toFixed(2);
    }
}

// Fonction pour mettre à jour la barre de progression
function updatebatisseurProgress() {
    // Recalculer le niveau de l'Hôtel de Ville
    hdvlevel = getHDVLevel();

    // Recalculer les niveaux des batisseurs
    batisseur1level = getbatisseurLevel(1);
    batisseur2level = getbatisseurLevel(2);
    batisseur3level = getbatisseurLevel(3);
    batisseur4level = getbatisseurLevel(4);
    batisseur5level = getbatisseurLevel(5);

    // Recalculer les niveaux maximums des batisseurs en fonction du niveau HDV
    batisseur1levelmax = batisseur1_nv_max_hdv(hdvlevel);
    batisseur2levelmax = batisseur2_nv_max_hdv(hdvlevel);
    batisseur3levelmax = batisseur3_nv_max_hdv(hdvlevel);
    batisseur4levelmax = batisseur4_nv_max_hdv(hdvlevel);
    batisseur5levelmax = batisseur5_nv_max_hdv(hdvlevel);
    // Calculer le pourcentage de progression
    const progression = calculerPourcentageNiveauxbatisseurs();

    // Mettre à jour la barre de progression et le texte
    const progressBar = document.getElementById('progress-batisseurs');
    const progressText = document.getElementById('progress-batisseurs-value');
    const progressTimeText = document.getElementById('progress-batisseurs-temps');
    const progressPriceText = document.getElementById('progress-batisseurs-prix-or');

    if (progressBar && progressText) {
        progressBar.value = progression;
        progressText.textContent = `${progression}%`; // Limiter à 2 décimales
    }
    if (progressTimeText) {
        const tempsRestant = globalcalculertempsRestantbatisseurs();
        progressTimeText.innerHTML = `${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    if (progressPriceText) {
        const prixRestant = globalcalculerPrixRestantbatisseur();
        progressPriceText.innerHTML = `${formatPrix(prixRestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
}

// Ajouter des écouteurs d'événements pour détecter les changements
document.addEventListener('DOMContentLoaded', () => {
    const batisseurSelects = [
        document.getElementById('batisseur1'),
        document.getElementById('batisseur2'),
        document.getElementById('batisseur3'),
        document.getElementById('batisseur4'),
        document.getElementById('batisseur5'),
    ];

    // Ajouter un écouteur pour chaque batisseur
    batisseurSelects.forEach(select => {
        if (select) {
            select.addEventListener('change', updatebatisseurProgress);
        }
    });

    // Ajouter un écouteur pour le changement du niveau HDV
    const hdvSelect = document.getElementById('hdv');
    if (hdvSelect) {
        hdvSelect.addEventListener('change', updatebatisseurProgress);
    }

    // Initialiser la barre de progression au chargement
    updatebatisseurProgress();
});