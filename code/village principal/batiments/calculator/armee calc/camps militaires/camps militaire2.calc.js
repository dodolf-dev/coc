import { camps_militaire2 } from '/coc/code/village principal/batiments/database/data armee/data camps militaire.js';

//général
export function camps_militaire2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(camps_militaire2)
        .map(key => parseInt(key.replace("camps_militaire2_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (camps_militaire2[`camps_militaire2_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le camps_militaire
export function calculerTempsTotalcamps_militaire2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += camps_militaire2[`camps_militaire2_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le camps_militaire
export function calculerTempsRestantcamps_militaire2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `camps_militaire2_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (camps_militaire2.hasOwnProperty(key)) {
            tempsRestant += camps_militaire2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet camps_militaire2.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le camps_militaire
export function calculerTempsdepuisHDVcamps_militaire2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(camps_militaire2)
        .map(key => parseInt(key.replace("camps_militaire2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];
        if (camps_militaire.hdvrequis <= hdvNiveau) {
            tempsTotal += camps_militaire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le camps_militaire
export function calculerTempsConstructionParHDVcamps_militaire2(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];

        if (camps_militaire.hdvrequis === hdvNiveau) {
            tempsTotal += camps_militaire.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le camps_militaire
export function calculerPrixTotalcamps_militaire2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += camps_militaire2[`camps_militaire2_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le camps_militaire
export function calculerPrixRestantcamps_militaire2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += camps_militaire2[`camps_militaire2_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le camps_militaire
export function calculerPrixdepuisHDVcamps_militaire2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(camps_militaire2)
        .map(key => parseInt(key.replace("camps_militaire2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];
        if (camps_militaire.hdvrequis <= hdvNiveau) {
            prixTotal += camps_militaire.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le camps_militaire
export function calculerPrixConstructionParHDVcamps_militaire2(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];

        if (camps_militaire.hdvrequis === hdvNiveau) {
            prixTotal += camps_militaire.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le camps_militaire
export function calculerExperienceTotalcamps_militaire2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += camps_militaire2[`camps_militaire2_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le camps_militaire
export function calculerExperienceRestantcamps_militaire2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += camps_militaire2[`camps_militaire2_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le camps_militaire
export function calculerExperiencedepuisHDVcamps_militaire2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(camps_militaire2)
        .map(key => parseInt(key.replace("camps_militaire2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];
        if (camps_militaire.hdvrequis <= hdvNiveau) {
            experienceTotal += camps_militaire.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le camps_militaire
export function calculerExperienceConstructionParHDVcamps_militaire2(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const camps_militaire = camps_militaire2[`camps_militaire2_nv_${i}`];

        if (camps_militaire.hdvrequis === hdvNiveau) {
            experienceTotal += camps_militaire.experience;
        }
    }
    return experienceTotal;
}