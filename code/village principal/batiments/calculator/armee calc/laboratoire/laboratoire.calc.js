import { laboratoire } from '/coc/code/village principal/batiments/database/data armee/data laboratoire.js';

//général
export function laboratoire_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(laboratoire)
        .map(key => parseInt(key.replace("laboratoire_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (laboratoire[`laboratoire_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le laboratoire
export function calculerTempsTotallaboratoire(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += laboratoire[`laboratoire_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le laboratoire
export function calculerTempsRestantlaboratoire(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `laboratoire_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (laboratoire.hasOwnProperty(key)) {
            tempsRestant += laboratoire[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet laboratoire.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le laboratoire
export function calculerTempsdepuisHDVlaboratoire(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(laboratoire)
        .map(key => parseInt(key.replace("laboratoire_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];
        if (laboratoire.hdvrequis <= hdvNiveau) {
            tempsTotal += laboratoire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le laboratoire
export function calculerTempsConstructionParHDVlaboratoire(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];

        if (laboratoire.hdvrequis === hdvNiveau) {
            tempsTotal += laboratoire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le laboratoire
export function calculerPrixTotallaboratoire(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += laboratoire[`laboratoire_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le laboratoire
export function calculerPrixRestantlaboratoire(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += laboratoire[`laboratoire_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le laboratoire
export function calculerPrixdepuisHDVlaboratoire(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(laboratoire)
        .map(key => parseInt(key.replace("laboratoire_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];
        if (laboratoire.hdvrequis <= hdvNiveau) {
            prixTotal += laboratoire.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le laboratoire
export function calculerPrixConstructionParHDVlaboratoire(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];

        if (laboratoire.hdvrequis === hdvNiveau) {
            prixTotal += laboratoire.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le laboratoire
export function calculerExperienceTotallaboratoire(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += laboratoire[`laboratoire_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le laboratoire
export function calculerExperienceRestantlaboratoire(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += laboratoire[`laboratoire_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le laboratoire
export function calculerExperiencedepuisHDVlaboratoire(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(laboratoire)
        .map(key => parseInt(key.replace("laboratoire_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];
        if (laboratoire.hdvrequis <= hdvNiveau) {
            experienceTotal += laboratoire.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le laboratoire
export function calculerExperienceConstructionParHDVlaboratoire(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const laboratoire = laboratoire[`laboratoire_nv_${i}`];

        if (laboratoire.hdvrequis === hdvNiveau) {
            experienceTotal += laboratoire.experience;
        }
    }
    return experienceTotal;
}