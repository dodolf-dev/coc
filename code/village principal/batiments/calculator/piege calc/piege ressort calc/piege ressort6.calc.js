import { piege_ressort6 } from '/coc/code/village principal/batiments/database/data piege/data piege ressort.js';

//général
export function piege_ressort6_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(piege_ressort6)
        .map(key => parseInt(key.replace("piege_ressort6_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (piege_ressort6[`piege_ressort6_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le piege_ressort
export function calculerTempsTotalpiege_ressort6(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += piege_ressort6[`piege_ressort6_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le piege_ressort
export function calculerTempsRestantpiege_ressort6(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `piege_ressort6_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (piege_ressort6.hasOwnProperty(key)) {
            tempsRestant += piege_ressort6[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet piege_ressort6.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le piege_ressort
export function calculerTempsdepuisHDVpiege_ressort6(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_ressort6)
        .map(key => parseInt(key.replace("piege_ressort6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        if (piege_ressort.hdvrequis <= hdvNiveau) {
            tempsTotal += piege_ressort.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le piege_ressort
export function calculerTempsConstructionParHDVpiege_ressort6(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        
        if (piege_ressort.hdvrequis === hdvNiveau) {
            tempsTotal += piege_ressort.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le piege_ressort
export function calculerPrixTotalpiege_ressort6(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += piege_ressort6[`piege_ressort6_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le piege_ressort
export function calculerPrixRestantpiege_ressort6(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += piege_ressort6[`piege_ressort6_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le piege_ressort
export function calculerPrixdepuisHDVpiege_ressort6(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_ressort6)
        .map(key => parseInt(key.replace("piege_ressort6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        if (piege_ressort.hdvrequis <= hdvNiveau) {
            prixTotal += piege_ressort.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le piege_ressort
export function calculerPrixConstructionParHDVpiege_ressort6(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        
        if (piege_ressort.hdvrequis === hdvNiveau) {
            prixTotal += piege_ressort.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le piege_ressort
export function calculerExperienceTotalpiege_ressort6(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += piege_ressort6[`piege_ressort6_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le piege_ressort
export function calculerExperienceRestantpiege_ressort6(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += piege_ressort6[`piege_ressort6_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le piege_ressort
export function calculerExperiencedepuisHDVpiege_ressort6(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_ressort6)
        .map(key => parseInt(key.replace("piege_ressort6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        if (piege_ressort.hdvrequis <= hdvNiveau) {
            experienceTotal += piege_ressort.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le piege_ressort
export function calculerExperienceConstructionParHDVpiege_ressort6(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_ressort = piege_ressort6[`piege_ressort6_nv_${i}`];
        
        if (piege_ressort.hdvrequis === hdvNiveau) {
            experienceTotal += piege_ressort.experience;
        }
    }
    return experienceTotal;
}