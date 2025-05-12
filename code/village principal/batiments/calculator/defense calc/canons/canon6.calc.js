import { canon6 } from '/coc/code/village principal/batiments/database/data defense/data canon.js';

let canon6_nv = 1;
let hdv_nv= 1;
let canon6_max = canon6_nv_max_hdv(hdv_nv);

//général
export function canon6_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(canon6)
        .map(key => parseInt(key.replace("canon6_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (canon6[`canon6_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalcanon6(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += canon6[`canon6_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantcanon6(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        tempsRestant += canon6[`canon6_nv_${i}`].tconstru;
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVcanon6(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon6)
        .map(key => parseInt(key.replace("canon6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVcanon6(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}


//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalcanon6(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += canon6[`canon6_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantcanon6(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += canon6[`canon6_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVcanon6(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon6)
        .map(key => parseInt(key.replace("canon6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVcanon6(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalcanon6(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += canon6[`canon6_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantcanon6(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += canon6[`canon6_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVcanon6(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon6)
        .map(key => parseInt(key.replace("canon6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVcanon6(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = canon6[`canon6_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}