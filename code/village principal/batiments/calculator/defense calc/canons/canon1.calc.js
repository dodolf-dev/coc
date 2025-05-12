import { canon1 } from '/coc/code/village principal/batiments/database/data defense/data canon.js';

//général
export function canon1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(canon1)
        .map(key => parseInt(key.replace("canon1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (canon1[`canon1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalcanon1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += canon1[`canon1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantcanon1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (canon1.hasOwnProperty(key)) {
            tempsRestant += canon1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVcanon1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon1)
        .map(key => parseInt(key.replace("canon1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVcanon1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalcanon1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += canon1[`canon1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantcanon1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += canon1[`canon1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVcanon1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon1)
        .map(key => parseInt(key.replace("canon1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVcanon1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalcanon1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += canon1[`canon1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantcanon1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += canon1[`canon1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVcanon1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon1)
        .map(key => parseInt(key.replace("canon1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVcanon1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon1[`canon1_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}