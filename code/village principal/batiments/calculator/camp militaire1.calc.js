import { camp_militaire1 } from '/coc/code/village principal/batiments/database/data armee/data camp militaire.js';

//général
export function camp_militaire1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(camp_militaire1)
        .map(key => parseInt(key.replace("camp_militaire1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (camp_militaire1[`camp_militaire1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le camp_militaire
export function calculerTempsTotalcamp_militaire1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += camp_militaire1[`camp_militaire1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le camp_militaire
export function calculerTempsRestantcamp_militaire1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `camp_militaire1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (camp_militaire1.hasOwnProperty(key)) {
            tempsRestant += camp_militaire1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet camp_militaire1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le camp_militaire
export function calculerTempsdepuisHDVcamp_militaire1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(camp_militaire1)
        .map(key => parseInt(key.replace("camp_militaire1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];
        if (camp_militaire.hdvrequis <= hdvNiveau) {
            tempsTotal += camp_militaire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le camp_militaire
export function calculerTempsConstructionParHDVcamp_militaire1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];

        if (camp_militaire.hdvrequis === hdvNiveau) {
            tempsTotal += camp_militaire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le camp_militaire
export function calculerPrixTotalcamp_militaire1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += camp_militaire1[`camp_militaire1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le camp_militaire
export function calculerPrixRestantcamp_militaire1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += camp_militaire1[`camp_militaire1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le camp_militaire
export function calculerPrixdepuisHDVcamp_militaire1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(camp_militaire1)
        .map(key => parseInt(key.replace("camp_militaire1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];
        if (camp_militaire.hdvrequis <= hdvNiveau) {
            prixTotal += camp_militaire.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le camp_militaire
export function calculerPrixConstructionParHDVcamp_militaire1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];

        if (camp_militaire.hdvrequis === hdvNiveau) {
            prixTotal += camp_militaire.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le camp_militaire
export function calculerExperienceTotalcamp_militaire1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += camp_militaire1[`camp_militaire1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le camp_militaire
export function calculerExperienceRestantcamp_militaire1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += camp_militaire1[`camp_militaire1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le camp_militaire
export function calculerExperiencedepuisHDVcamp_militaire1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(camp_militaire1)
        .map(key => parseInt(key.replace("camp_militaire1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];
        if (camp_militaire.hdvrequis <= hdvNiveau) {
            experienceTotal += camp_militaire.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le camp_militaire
export function calculerExperienceConstructionParHDVcamp_militaire1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camp_militaire = camp_militaire1[`camp_militaire1_nv_${i}`];

        if (camp_militaire.hdvrequis === hdvNiveau) {
            experienceTotal += camp_militaire.experience;
        }
    }
    return experienceTotal;
}