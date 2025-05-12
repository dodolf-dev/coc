import { canon2 } from '/coc/code/village principal/batiments/database/data defense/data canon.js';

let canon2_nv = 1;
let hdv_nv = 1;
let canon2_max = canon2_nv_max_hdv(hdv_nv);

// Général
export function canon2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(canon2)
        .map(key => parseInt(key.replace("canon2_nv_", ""), 10))
        .filter(n => !isNaN(n));

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (canon2[`canon2_nv_${i}`]?.hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

// Calcul de temps

// Temps passé à construire le canon
export function calculerTempsTotalcanon2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            tempsTotal += canon2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return tempsTotal;
}

// Calcul du temps de construction restant pour le canon
export function calculerTempsRestantcanon2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            tempsRestant += canon2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return tempsRestant;
}

// Calcul du temps de construction par rapport au niveau HDV pour le canon
export function calculerTempsdepuisHDVcanon2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon2)
        .map(key => parseInt(key.replace("canon2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis <= hdvNiveau) {
            tempsTotal += canon2[key].tconstru;
        }
    }
    return tempsTotal;
}

// Calcul du temps de construction pour le niveau HDV sélectionné pour le canon
export function calculerTempsConstructionParHDVcanon2(hdvNiveau) {
    let tempsTotal = 0;
    for (let i = 1; i <= 21; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis === hdvNiveau) {
            tempsTotal += canon2[key].tconstru;
        }
    }
    return tempsTotal;
}

// Calcul de prix

// Prix déjà payé pour le canon
export function calculerPrixTotalcanon2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            prixTotal += canon2[key].prix;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return prixTotal;
}

// Calcul du prix restant pour le canon
export function calculerPrixRestantcanon2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            prixRestant += canon2[key].prix;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return prixRestant;
}

// Calcul du prix de construction par rapport au niveau HDV pour le canon
export function calculerPrixdepuisHDVcanon2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon2)
        .map(key => parseInt(key.replace("canon2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis <= hdvNiveau) {
            prixTotal += canon2[key].prix;
        }
    }
    return prixTotal;
}

// Calcul du prix de construction pour le niveau HDV sélectionné pour le canon
export function calculerPrixConstructionParHDVcanon2(hdvNiveau) {
    let prixTotal = 0;
    for (let i = 1; i <= 21; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis === hdvNiveau) {
            prixTotal += canon2[key].prix;
        }
    }
    return prixTotal;
}

// Calcul d'expérience

// Expérience déjà gagnée pour le canon
export function calculerExperienceTotalcanon2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            experienceTotal += canon2[key].exp_gagner;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return experienceTotal;
}

// Calcul de l'expérience restante pour le canon
export function calculerExperienceRestantcanon2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key)) {
            experienceRestant += canon2[key].exp_gagner;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon2.`);
        }
    }
    return experienceRestant;
}

// Calcul de l'expérience de construction par rapport au niveau HDV pour le canon
export function calculerExperiencedepuisHDVcanon2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon2)
        .map(key => parseInt(key.replace("canon2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis <= hdvNiveau) {
            experienceTotal += canon2[key].exp_gagner;
        }
    }
    return experienceTotal;
}

// Calcul de l'expérience de construction pour le niveau HDV sélectionné pour le canon
export function calculerExperienceConstructionParHDVcanon2(hdvNiveau) {
    let experienceTotal = 0;
    for (let i = 1; i <= 21; i++) {
        const key = `canon2_nv_${parseInt(i, 10)}`;
        if (canon2.hasOwnProperty(key) && canon2[key].hdvrequis === hdvNiveau) {
            experienceTotal += canon2[key].exp_gagner;
        }
    }
    return experienceTotal;
}