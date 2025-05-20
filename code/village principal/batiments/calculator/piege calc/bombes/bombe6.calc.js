import { bombe6 } from '/coc/code/village principal/batiments/database/data piege/data bombe.js';

//général
export function bombe6_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(bombe6)
        .map(key => parseInt(key.replace("bombe6_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (bombe6[`bombe6_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe
export function calculerTempsTotalbombe6(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += bombe6[`bombe6_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe
export function calculerTempsRestantbombe6(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `bombe6_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (bombe6.hasOwnProperty(key)) {
            tempsRestant += bombe6[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet bombe6.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe
export function calculerTempsdepuisHDVbombe6(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe6)
        .map(key => parseInt(key.replace("bombe6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe
export function calculerTempsConstructionParHDVbombe6(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe
export function calculerPrixTotalbombe6(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += bombe6[`bombe6_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe
export function calculerPrixRestantbombe6(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += bombe6[`bombe6_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe
export function calculerPrixdepuisHDVbombe6(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe6)
        .map(key => parseInt(key.replace("bombe6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe
export function calculerPrixConstructionParHDVbombe6(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe
export function calculerExperienceTotalbombe6(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += bombe6[`bombe6_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe
export function calculerExperienceRestantbombe6(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += bombe6[`bombe6_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe
export function calculerExperiencedepuisHDVbombe6(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe6)
        .map(key => parseInt(key.replace("bombe6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe
export function calculerExperienceConstructionParHDVbombe6(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe6[`bombe6_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}