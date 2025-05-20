import { giga_bombe } from '/coc/code/village principal/batiments/database/data piege/data giga bombe.js';

//général
export function giga_bombe_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(giga_bombe)
        .map(key => parseInt(key.replace("giga_bombe_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (giga_bombe[`giga_bombe_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le bombe
export function calculerTempsTotalgiga_bombe(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += giga_bombe[`giga_bombe_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le bombe
export function calculerTempsRestantgiga_bombe(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `giga_bombe_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (giga_bombe.hasOwnProperty(key)) {
            tempsRestant += giga_bombe[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet giga_bombe.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le bombe
export function calculerTempsdepuisHDVgiga_bombe(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(giga_bombe)
        .map(key => parseInt(key.replace("giga_bombe_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le bombe
export function calculerTempsConstructionParHDVgiga_bombe(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            tempsTotal += bombe.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le bombe
export function calculerPrixTotalgiga_bombe(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += giga_bombe[`giga_bombe_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le bombe
export function calculerPrixRestantgiga_bombe(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += giga_bombe[`giga_bombe_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le bombe
export function calculerPrixdepuisHDVgiga_bombe(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(giga_bombe)
        .map(key => parseInt(key.replace("giga_bombe_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le bombe
export function calculerPrixConstructionParHDVgiga_bombe(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            prixTotal += bombe.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le bombe
export function calculerExperienceTotalgiga_bombe(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += giga_bombe[`giga_bombe_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le bombe
export function calculerExperienceRestantgiga_bombe(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += giga_bombe[`giga_bombe_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le bombe
export function calculerExperiencedepuisHDVgiga_bombe(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(giga_bombe)
        .map(key => parseInt(key.replace("giga_bombe_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        if (bombe.hdvrequis <= hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le bombe
export function calculerExperienceConstructionParHDVgiga_bombe(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const bombe = giga_bombe[`giga_bombe_nv_${i}`];
        
        if (bombe.hdvrequis === hdvNiveau) {
            experienceTotal += bombe.experience;
        }
    }
    return experienceTotal;
}