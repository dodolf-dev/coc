import { bombe_geante6 } from '/coc/code/village principal/batiments/database/data piege/data bombe geante.js';

//général
export function bombe_geante6_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(bombe_geante6)
        .map(key => parseInt(key.replace("bombe_geante6_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (bombe_geante6[`bombe_geante6_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe_geante
export function calculerTempsTotalbombe_geante6(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += bombe_geante6[`bombe_geante6_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe_geante
export function calculerTempsRestantbombe_geante6(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `bombe_geante6_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (bombe_geante6.hasOwnProperty(key)) {
            tempsRestant += bombe_geante6[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet bombe_geante6.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe_geante
export function calculerTempsdepuisHDVbombe_geante6(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_geante6)
        .map(key => parseInt(key.replace("bombe_geante6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        if (bombe_geante.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe_geante.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe_geante
export function calculerTempsConstructionParHDVbombe_geante6(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        
        if (bombe_geante.hdvrequis === hdvNiveau) {
            tempsTotal += bombe_geante.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe_geante
export function calculerPrixTotalbombe_geante6(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += bombe_geante6[`bombe_geante6_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe_geante
export function calculerPrixRestantbombe_geante6(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += bombe_geante6[`bombe_geante6_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe_geante
export function calculerPrixdepuisHDVbombe_geante6(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_geante6)
        .map(key => parseInt(key.replace("bombe_geante6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        if (bombe_geante.hdvrequis <= hdvNiveau) {
            prixTotal += bombe_geante.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe_geante
export function calculerPrixConstructionParHDVbombe_geante6(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        
        if (bombe_geante.hdvrequis === hdvNiveau) {
            prixTotal += bombe_geante.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe_geante
export function calculerExperienceTotalbombe_geante6(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += bombe_geante6[`bombe_geante6_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe_geante
export function calculerExperienceRestantbombe_geante6(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += bombe_geante6[`bombe_geante6_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe_geante
export function calculerExperiencedepuisHDVbombe_geante6(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(bombe_geante6)
        .map(key => parseInt(key.replace("bombe_geante6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        if (bombe_geante.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe_geante.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe_geante
export function calculerExperienceConstructionParHDVbombe_geante6(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe_geante = bombe_geante6[`bombe_geante6_nv_${i}`];
        
        if (bombe_geante.hdvrequis === hdvNiveau) {
            experienceTotal += bombe_geante.experience;
        }
    }
    return experienceTotal;
}