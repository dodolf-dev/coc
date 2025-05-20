import { piege_squelettique2 } from '/coc/code/village principal/batiments/database/data piege/data piege squelettique.js';

//général
export function piege_squelettique2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(piege_squelettique2)
        .map(key => parseInt(key.replace("piege_squelettique2_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (piege_squelettique2[`piege_squelettique2_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le piege_squelettique
export function calculerTempsTotalpiege_squelettique2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += piege_squelettique2[`piege_squelettique2_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le piege_squelettique
export function calculerTempsRestantpiege_squelettique2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `piege_squelettique2_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (piege_squelettique2.hasOwnProperty(key)) {
            tempsRestant += piege_squelettique2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet piege_squelettique2.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le piege_squelettique
export function calculerTempsdepuisHDVpiege_squelettique2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_squelettique2)
        .map(key => parseInt(key.replace("piege_squelettique2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        if (piege_squelettique.hdvrequis <= hdvNiveau) {
            tempsTotal += piege_squelettique.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le piege_squelettique
export function calculerTempsConstructionParHDVpiege_squelettique2(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        
        if (piege_squelettique.hdvrequis === hdvNiveau) {
            tempsTotal += piege_squelettique.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le piege_squelettique
export function calculerPrixTotalpiege_squelettique2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += piege_squelettique2[`piege_squelettique2_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le piege_squelettique
export function calculerPrixRestantpiege_squelettique2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += piege_squelettique2[`piege_squelettique2_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le piege_squelettique
export function calculerPrixdepuisHDVpiege_squelettique2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_squelettique2)
        .map(key => parseInt(key.replace("piege_squelettique2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        if (piege_squelettique.hdvrequis <= hdvNiveau) {
            prixTotal += piege_squelettique.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le piege_squelettique
export function calculerPrixConstructionParHDVpiege_squelettique2(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        
        if (piege_squelettique.hdvrequis === hdvNiveau) {
            prixTotal += piege_squelettique.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le piege_squelettique
export function calculerExperienceTotalpiege_squelettique2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += piege_squelettique2[`piege_squelettique2_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le piege_squelettique
export function calculerExperienceRestantpiege_squelettique2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += piege_squelettique2[`piege_squelettique2_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le piege_squelettique
export function calculerExperiencedepuisHDVpiege_squelettique2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_squelettique2)
        .map(key => parseInt(key.replace("piege_squelettique2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        if (piege_squelettique.hdvrequis <= hdvNiveau) {
            experienceTotal += piege_squelettique.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le piege_squelettique
export function calculerExperienceConstructionParHDVpiege_squelettique2(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_squelettique = piege_squelettique2[`piege_squelettique2_nv_${i}`];
        
        if (piege_squelettique.hdvrequis === hdvNiveau) {
            experienceTotal += piege_squelettique.experience;
        }
    }
    return experienceTotal;
}