import { bombe2 } from '/coc/code/village principal/batiments/database/data piege/data bombe.js';

//général
export function bombe2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(bombe2)
        .map(key => parseInt(key.replace("bombe2_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (bombe2[`bombe2_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe
export function calculerTempsTotalbombe2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += bombe2[`bombe2_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe
export function calculerTempsRestantbombe2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `bombe2_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (bombe2.hasOwnProperty(key)) {
            tempsRestant += bombe2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet bombe2.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe
export function calculerTempsdepuisHDVbombe2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe2)
        .map(key => parseInt(key.replace("bombe2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe
export function calculerTempsConstructionParHDVbombe2(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe
export function calculerPrixTotalbombe2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += bombe2[`bombe2_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe
export function calculerPrixRestantbombe2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += bombe2[`bombe2_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe
export function calculerPrixdepuisHDVbombe2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe2)
        .map(key => parseInt(key.replace("bombe2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe
export function calculerPrixConstructionParHDVbombe2(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe
export function calculerExperienceTotalbombe2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += bombe2[`bombe2_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe
export function calculerExperienceRestantbombe2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += bombe2[`bombe2_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe
export function calculerExperiencedepuisHDVbombe2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe2)
        .map(key => parseInt(key.replace("bombe2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe
export function calculerExperienceConstructionParHDVbombe2(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = bombe2[`bombe2_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}