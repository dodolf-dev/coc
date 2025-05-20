import { bombe_aerienne5 } from '/coc/code/village principal/batiments/database/data piege/data bombe aerienne.js';

//général
export function bombe_aerienne5_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(bombe_aerienne5)
        .map(key => parseInt(key.replace("bombe_aerienne5_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (bombe_aerienne5[`bombe_aerienne5_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe_aerienne
export function calculerTempsTotalbombe_aerienne5(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += bombe_aerienne5[`bombe_aerienne5_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe_aerienne
export function calculerTempsRestantbombe_aerienne5(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `bombe_aerienne5_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (bombe_aerienne5.hasOwnProperty(key)) {
            tempsRestant += bombe_aerienne5[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet bombe_aerienne5.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe_aerienne
export function calculerTempsdepuisHDVbombe_aerienne5(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_aerienne5)
        .map(key => parseInt(key.replace("bombe_aerienne5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        if (bombe_aerienne.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe_aerienne.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe_aerienne
export function calculerTempsConstructionParHDVbombe_aerienne5(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        
        if (bombe_aerienne.hdvrequis === hdvNiveau) {
            tempsTotal += bombe_aerienne.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe_aerienne
export function calculerPrixTotalbombe_aerienne5(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += bombe_aerienne5[`bombe_aerienne5_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe_aerienne
export function calculerPrixRestantbombe_aerienne5(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += bombe_aerienne5[`bombe_aerienne5_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe_aerienne
export function calculerPrixdepuisHDVbombe_aerienne5(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_aerienne5)
        .map(key => parseInt(key.replace("bombe_aerienne5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        if (bombe_aerienne.hdvrequis <= hdvNiveau) {
            prixTotal += bombe_aerienne.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe_aerienne
export function calculerPrixConstructionParHDVbombe_aerienne5(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        
        if (bombe_aerienne.hdvrequis === hdvNiveau) {
            prixTotal += bombe_aerienne.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe_aerienne
export function calculerExperienceTotalbombe_aerienne5(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += bombe_aerienne5[`bombe_aerienne5_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe_aerienne
export function calculerExperienceRestantbombe_aerienne5(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += bombe_aerienne5[`bombe_aerienne5_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe_aerienne
export function calculerExperiencedepuisHDVbombe_aerienne5(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_aerienne5)
        .map(key => parseInt(key.replace("bombe_aerienne5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        if (bombe_aerienne.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe_aerienne.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe_aerienne
export function calculerExperienceConstructionParHDVbombe_aerienne5(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_aerienne = bombe_aerienne5[`bombe_aerienne5_nv_${i}`];
        
        if (bombe_aerienne.hdvrequis === hdvNiveau) {
            experienceTotal += bombe_aerienne.experience;
        }
    }
    return experienceTotal;
}