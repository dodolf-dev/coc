import { reserve_or3 } from '/coc/code/village principal/batiments/database/data ressource/data reserve or.js';

//général
export function reserve_or3_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(reserve_or3)
        .map(key => parseInt(key.replace("reserve_or3_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (reserve_or3[`reserve_or3_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le reserve_or
export function calculerTempsTotalreserve_or3(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += reserve_or3[`reserve_or3_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le reserve_or
export function calculerTempsRestantreserve_or3(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `reserve_or3_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (reserve_or3.hasOwnProperty(key)) {
            tempsRestant += reserve_or3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet reserve_or3.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le reserve_or
export function calculerTempsdepuisHDVreserve_or3(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(reserve_or3)
        .map(key => parseInt(key.replace("reserve_or3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        if (reserve_or.hdvrequis <= hdvNiveau) {
            tempsTotal += reserve_or.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le reserve_or
export function calculerTempsConstructionParHDVreserve_or3(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        
        if (reserve_or.hdvrequis === hdvNiveau) {
            tempsTotal += reserve_or.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le reserve_or
export function calculerPrixTotalreserve_or3(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += reserve_or3[`reserve_or3_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le reserve_or
export function calculerPrixRestantreserve_or3(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += reserve_or3[`reserve_or3_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le reserve_or
export function calculerPrixdepuisHDVreserve_or3(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(reserve_or3)
        .map(key => parseInt(key.replace("reserve_or3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        if (reserve_or.hdvrequis <= hdvNiveau) {
            prixTotal += reserve_or.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le reserve_or
export function calculerPrixConstructionParHDVreserve_or3(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        
        if (reserve_or.hdvrequis === hdvNiveau) {
            prixTotal += reserve_or.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le reserve_or
export function calculerExperienceTotalreserve_or3(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += reserve_or3[`reserve_or3_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le reserve_or
export function calculerExperienceRestantreserve_or3(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += reserve_or3[`reserve_or3_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le reserve_or
export function calculerExperiencedepuisHDVreserve_or3(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(reserve_or3)
        .map(key => parseInt(key.replace("reserve_or3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        if (reserve_or.hdvrequis <= hdvNiveau) {
            experienceTotal += reserve_or.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le reserve_or
export function calculerExperienceConstructionParHDVreserve_or3(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reserve_or = reserve_or3[`reserve_or3_nv_${i}`];
        
        if (reserve_or.hdvrequis === hdvNiveau) {
            experienceTotal += reserve_or.experience;
        }
    }
    return experienceTotal;
}