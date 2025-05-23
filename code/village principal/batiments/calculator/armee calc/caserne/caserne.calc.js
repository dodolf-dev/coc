import { caserne } from '/coc/code/village principal/batiments/database/data armee/data caserne.js';

//général
export function caserne_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(caserne)
        .map(key => parseInt(key.replace("caserne_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (caserne[`caserne_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le caserne
export function calculerTempsTotalcaserne(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += caserne[`caserne_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le caserne
export function calculerTempsRestantcaserne(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `caserne_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (caserne.hasOwnProperty(key)) {
            tempsRestant += caserne[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet caserne.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le caserne
export function calculerTempsdepuisHDVcaserne(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne)
        .map(key => parseInt(key.replace("caserne_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne = caserne[`caserne_nv_${i}`];
        if (caserne.hdvrequis <= hdvNiveau) {
            tempsTotal += caserne.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le caserne
export function calculerTempsConstructionParHDVcaserne(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne = caserne[`caserne_nv_${i}`];

        if (caserne.hdvrequis === hdvNiveau) {
            tempsTotal += caserne.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le caserne
export function calculerPrixTotalcaserne(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += caserne[`caserne_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le caserne
export function calculerPrixRestantcaserne(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += caserne[`caserne_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le caserne
export function calculerPrixdepuisHDVcaserne(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne)
        .map(key => parseInt(key.replace("caserne_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne = caserne[`caserne_nv_${i}`];
        if (caserne.hdvrequis <= hdvNiveau) {
            prixTotal += caserne.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le caserne
export function calculerPrixConstructionParHDVcaserne(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne = caserne[`caserne_nv_${i}`];

        if (caserne.hdvrequis === hdvNiveau) {
            prixTotal += caserne.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le caserne
export function calculerExperienceTotalcaserne(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += caserne[`caserne_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le caserne
export function calculerExperienceRestantcaserne(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += caserne[`caserne_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le caserne
export function calculerExperiencedepuisHDVcaserne(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne)
        .map(key => parseInt(key.replace("caserne_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne = caserne[`caserne_nv_${i}`];
        if (caserne.hdvrequis <= hdvNiveau) {
            experienceTotal += caserne.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le caserne
export function calculerExperienceConstructionParHDVcaserne(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne = caserne[`caserne_nv_${i}`];

        if (caserne.hdvrequis === hdvNiveau) {
            experienceTotal += caserne.experience;
        }
    }
    return experienceTotal;
}