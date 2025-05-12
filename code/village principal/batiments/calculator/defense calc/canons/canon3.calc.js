import { canon3 } from '/coc/code/village principal/batiments/database/data defense/data canon.js';

let canon3_nv = 1;
let hdv_nv = 1;
let canon3_max = canon3_nv_max_hdv(hdv_nv);

// Général
export function canon3_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(canon3)
        .map(key => parseInt(key.replace("canon3_nv_", ""), 10))
        .filter(n => !isNaN(n));

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (canon3[`canon3_nv_${i}`]?.hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

// Calcul de temps

export function calculerTempsTotalcanon3(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        const key = `canon3_nv_${parseInt(i, 10)}`;
        if (canon3.hasOwnProperty(key)) {
            tempsTotal += canon3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon3.`);
        }
    }
    return tempsTotal;
}

export function calculerTempsRestantcanon3(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon3_nv_${parseInt(i, 10)}`;
        if (canon3.hasOwnProperty(key)) {
            tempsRestant += canon3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon3.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVcanon3(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon3)
        .map(key => parseInt(key.replace("canon3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVcanon3(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}


//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalcanon3(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += canon3[`canon3_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantcanon3(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += canon3[`canon3_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVcanon3(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon3)
        .map(key => parseInt(key.replace("canon3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVcanon3(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalcanon3(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += canon3[`canon3_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantcanon3(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += canon3[`canon3_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVcanon3(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon3)
        .map(key => parseInt(key.replace("canon3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVcanon3(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon3[`canon3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}