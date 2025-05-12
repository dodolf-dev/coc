import { def_anti_air1 } from '/coc/code/village principal/batiments/database/data defense/data def anti air.js';

//général
export function def_anti_air1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(def_anti_air1)
        .map(key => parseInt(key.replace("def_anti_air1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (def_anti_air1[`def_anti_air1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le def_anti_air
export function calculerTempsTotaldef_anti_air1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += def_anti_air1[`def_anti_air1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le def_anti_air
export function calculerTempsRestantdef_anti_air1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `def_anti_air1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (def_anti_air1.hasOwnProperty(key)) {
            tempsRestant += def_anti_air1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet def_anti_air1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le def_anti_air
export function calculerTempsdepuisHDVdef_anti_air1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(def_anti_air1)
        .map(key => parseInt(key.replace("def_anti_air1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        if (def_anti_air.hdvrequis <= hdvNiveau) {
            tempsTotal += def_anti_air.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le def_anti_air
export function calculerTempsConstructionParHDVdef_anti_air1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        
        if (def_anti_air.hdvrequis === hdvNiveau) {
            tempsTotal += def_anti_air.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le def_anti_air
export function calculerPrixTotaldef_anti_air1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += def_anti_air1[`def_anti_air1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le def_anti_air
export function calculerPrixRestantdef_anti_air1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += def_anti_air1[`def_anti_air1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le def_anti_air
export function calculerPrixdepuisHDVdef_anti_air1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(def_anti_air1)
        .map(key => parseInt(key.replace("def_anti_air1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        if (def_anti_air.hdvrequis <= hdvNiveau) {
            prixTotal += def_anti_air.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le def_anti_air
export function calculerPrixConstructionParHDVdef_anti_air1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        
        if (def_anti_air.hdvrequis === hdvNiveau) {
            prixTotal += def_anti_air.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le def_anti_air
export function calculerExperienceTotaldef_anti_air1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += def_anti_air1[`def_anti_air1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le def_anti_air
export function calculerExperienceRestantdef_anti_air1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += def_anti_air1[`def_anti_air1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le def_anti_air
export function calculerExperiencedepuisHDVdef_anti_air1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(def_anti_air1)
        .map(key => parseInt(key.replace("def_anti_air1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        if (def_anti_air.hdvrequis <= hdvNiveau) {
            experienceTotal += def_anti_air.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le def_anti_air
export function calculerExperienceConstructionParHDVdef_anti_air1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const def_anti_air = def_anti_air1[`def_anti_air1_nv_${i}`];
        
        if (def_anti_air.hdvrequis === hdvNiveau) {
            experienceTotal += def_anti_air.experience;
        }
    }
    return experienceTotal;
}