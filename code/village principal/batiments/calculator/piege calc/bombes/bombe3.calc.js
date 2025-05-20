import { bombe3 } from '/coc/code/village principal/batiments/database/data piege/data bombe.js';

//général
export function bombe3_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(bombe3)
        .map(key => parseInt(key.replace("bombe3_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (bombe3[`bombe3_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe
export function calculerTempsTotalbombe3(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += bombe3[`bombe3_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe
export function calculerTempsRestantbombe3(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `bombe3_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (bombe3.hasOwnProperty(key)) {
            tempsRestant += bombe3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet bombe3.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe
export function calculerTempsdepuisHDVbombe3(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe3)
        .map(key => parseInt(key.replace("bombe3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe
export function calculerTempsConstructionParHDVbombe3(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe
export function calculerPrixTotalbombe3(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += bombe3[`bombe3_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe
export function calculerPrixRestantbombe3(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += bombe3[`bombe3_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe
export function calculerPrixdepuisHDVbombe3(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe3)
        .map(key => parseInt(key.replace("bombe3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe
export function calculerPrixConstructionParHDVbombe3(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe
export function calculerExperienceTotalbombe3(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += bombe3[`bombe3_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe
export function calculerExperienceRestantbombe3(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += bombe3[`bombe3_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe
export function calculerExperiencedepuisHDVbombe3(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe3)
        .map(key => parseInt(key.replace("bombe3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe
export function calculerExperienceConstructionParHDVbombe3(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe3[`bombe3_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}