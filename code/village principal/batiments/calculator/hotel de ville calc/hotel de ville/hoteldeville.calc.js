import { hoteldeville } from '/coc/code/village principal/batiments/database/data hotel de ville/data hdv.js';
import { convertirSecondes } from '/coc/code/outils/convertisseurtemps.js';

let hoteldeville_nv = 1;
export let hdv_nv = 11;
let hoteldeville_max = hoteldeville_nv_max_hdv(hdv_nv);

//calculer le niveau max du hoteldeville en fonction du niveau de l'hdv
export function hoteldeville_nv_max_hdv(hdvNiveau) {
    let niveauMax = 1;
    for (let i = 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

//calculer le temps total passer à construire le hoteldeville en fonction de son nv
export function calculerTempsTotal(niveauMax) {
    let tempsTotal = 0;

    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += hoteldeville[`hoteldeville_nv_${i}`].tconstru;
    }

    return convertirSecondes(tempsTotal);
}

//calculer le cout total dépenser pour le hoteldeville en fonction de son nv
export function calculerCoutTotal(niveauMax) {
    let coutTotal = 0;

    for (let i = 1; i <= niveauMax; i++) {
        coutTotal += hoteldeville[`hoteldeville_nv_${i}`].prix;
    }

    return coutTotal;
}

//calculer l'expérience total gagner par le hoteldeville en fonction de son nv
export function calculerExpTotal(niveauMax) {
    let expTotal = 0;

    for (let i = 1; i <= niveauMax; i++) {
        expTotal += hoteldeville[`hoteldeville_nv_${i}`].exp_gagner;
    }

    return expTotal;
}

//liste des hoteldevilles disponibles en fonction de l'hdv
export function hoteldevillesDisponibles(hdvNiveau) {
    let disponibles = [];

    for (let i = 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            disponibles.push(`hoteldeville Niveau ${i}`);
        }
    }

    return disponibles;
}

//calcul le temps restant pour construire les hoteldevilles restants en fonction de l'hdv
export function calculerTempsRestant(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        tempsRestant += hoteldeville[`hoteldeville_nv_${i}`].tconstru;
    }
    return tempsRestant === 0 ? 'Complet' : convertirSecondes(tempsRestant);
}

//calcul le cout restant pour construire les hoteldevilles restants en fonction de l'hdv
export function calculerCoutRestant(niveauActuel, niveauMax) {
    let coutRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        coutRestant += hoteldeville[`hoteldeville_nv_${i}`].prix;
    }
    return coutRestant === 0 ? 'Complet' : coutRestant;
}

//calcul l'expérience restant pour construire les hoteldevilles restants en fonction de l'hdv
export function calculerExpRestant(niveauActuel, niveauMax) {
    let expRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        expRestant += hoteldeville[`hoteldeville_nv_${i}`].exp_gagner;
    }
    return expRestant === 0 ? 'Complet' : expRestant;
}

//calcul le temps total pour construire les hoteldevilles en fonction de l'hdv
export function calculerTempsParHDV(hdvNiveau) {
    let tempsTotal = 0;
    for (let i = 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            tempsTotal += hoteldeville[`hoteldeville_nv_${i}`].tconstru;
        }
    }
    return convertirSecondes(tempsTotal);
}

//calcul le cout total pour construire les hoteldevilles en fonction de l'hdv
export function calculerCoutParHDV(hdvNiveau) {
    let coutTotal = 0;
    for (let i = 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            coutTotal += hoteldeville[`hoteldeville_nv_${i}`].prix;
        }
    }
    return coutTotal;
}

//calcul l'expérience total pour avoir construit les hoteldevilles en fonction de l'hdv
export function calculerExpParHDV(hdvNiveau) {
    let expTotal = 0;
    for (let i = 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            expTotal += hoteldeville[`hoteldeville_nv_${i}`].exp_gagner;
        }
    }
    return expTotal;
}

//liste les hoteldevilles restants à construire en fonction de l'hdv
export function hoteldevillesRestants(hdvNiveau, niveauActuel) {
    let restants = [];
    for (let i = niveauActuel + 1; i <= 21; i++) {
        if (hoteldeville[`hoteldeville_nv_${i}`].hdvrequis <= hdvNiveau) {
            restants.push(`hoteldeville Niveau ${i}`);
        }
    }
    return restants.length === 0 ? "Complet" : restants;
}

console.log(hoteldeville_nv_max_hdv(hdv_nv));
console.log(calculerTempsTotal(hoteldeville_nv));
console.log(calculerCoutTotal(hoteldeville_nv));
console.log(calculerExpTotal(hoteldeville_nv));
console.log(hoteldevillesDisponibles(hdv_nv));
console.log(calculerTempsRestant(hoteldeville_nv, hoteldeville_max));
console.log(calculerCoutRestant(hoteldeville_nv, hoteldeville_max));
console.log(calculerExpRestant(hoteldeville_nv, hoteldeville_max));
console.log(calculerTempsParHDV(hdv_nv));
console.log(calculerCoutParHDV(hdv_nv));
console.log(calculerExpParHDV(hdv_nv));
console.log(hoteldevillesRestants(hdv_nv, hoteldeville_nv));