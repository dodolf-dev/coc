import { caserne_noir } from '/coc/code/village principal/batiments/database/data armee/data caserne noir.js';

//général
export function caserne_noir_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(caserne_noir)
        .map(key => parseInt(key.replace("caserne_noir_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (caserne_noir[`caserne_noir_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le caserne_noir
export function calculerTempsTotalcaserne_noir(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += caserne_noir[`caserne_noir_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le caserne_noir
export function calculerTempsRestantcaserne_noir(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `caserne_noir_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (caserne_noir.hasOwnProperty(key)) {
            tempsRestant += caserne_noir[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet caserne_noir.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le caserne_noir
export function calculerTempsdepuisHDVcaserne_noir(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne_noir)
        .map(key => parseInt(key.replace("caserne_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];
        if (caserne_noir.hdvrequis <= hdvNiveau) {
            tempsTotal += caserne_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le caserne_noir
export function calculerTempsConstructionParHDVcaserne_noir(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];

        if (caserne_noir.hdvrequis === hdvNiveau) {
            tempsTotal += caserne_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le caserne_noir
export function calculerPrixTotalcaserne_noir(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += caserne_noir[`caserne_noir_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le caserne_noir
export function calculerPrixRestantcaserne_noir(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += caserne_noir[`caserne_noir_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le caserne_noir
export function calculerPrixdepuisHDVcaserne_noir(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne_noir)
        .map(key => parseInt(key.replace("caserne_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];
        if (caserne_noir.hdvrequis <= hdvNiveau) {
            prixTotal += caserne_noir.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le caserne_noir
export function calculerPrixConstructionParHDVcaserne_noir(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];

        if (caserne_noir.hdvrequis === hdvNiveau) {
            prixTotal += caserne_noir.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le caserne_noir
export function calculerExperienceTotalcaserne_noir(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += caserne_noir[`caserne_noir_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le caserne_noir
export function calculerExperienceRestantcaserne_noir(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += caserne_noir[`caserne_noir_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le caserne_noir
export function calculerExperiencedepuisHDVcaserne_noir(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(caserne_noir)
        .map(key => parseInt(key.replace("caserne_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];
        if (caserne_noir.hdvrequis <= hdvNiveau) {
            experienceTotal += caserne_noir.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le caserne_noir
export function calculerExperienceConstructionParHDVcaserne_noir(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const caserne_noir = caserne_noir[`caserne_noir_nv_${i}`];

        if (caserne_noir.hdvrequis === hdvNiveau) {
            experienceTotal += caserne_noir.experience;
        }
    }
    return experienceTotal;
}