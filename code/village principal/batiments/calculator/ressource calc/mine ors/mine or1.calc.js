import { mine_or1 } from '/coc/code/village principal/batiments/database/data ressource/data mine or.js';

//général
export function mine_or1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(mine_or1)
        .map(key => parseInt(key.replace("mine_or1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (mine_or1[`mine_or1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le mine_or
export function calculerTempsTotalmine_or1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += mine_or1[`mine_or1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le mine_or
export function calculerTempsRestantmine_or1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `mine_or1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (mine_or1.hasOwnProperty(key)) {
            tempsRestant += mine_or1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet mine_or1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le mine_or
export function calculerTempsdepuisHDVmine_or1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_or1)
        .map(key => parseInt(key.replace("mine_or1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        if (mine_or.hdvrequis <= hdvNiveau) {
            tempsTotal += mine_or.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le mine_or
export function calculerTempsConstructionParHDVmine_or1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        
        if (mine_or.hdvrequis === hdvNiveau) {
            tempsTotal += mine_or.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le mine_or
export function calculerPrixTotalmine_or1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += mine_or1[`mine_or1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le mine_or
export function calculerPrixRestantmine_or1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += mine_or1[`mine_or1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le mine_or
export function calculerPrixdepuisHDVmine_or1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_or1)
        .map(key => parseInt(key.replace("mine_or1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        if (mine_or.hdvrequis <= hdvNiveau) {
            prixTotal += mine_or.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le mine_or
export function calculerPrixConstructionParHDVmine_or1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        
        if (mine_or.hdvrequis === hdvNiveau) {
            prixTotal += mine_or.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le mine_or
export function calculerExperienceTotalmine_or1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += mine_or1[`mine_or1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le mine_or
export function calculerExperienceRestantmine_or1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += mine_or1[`mine_or1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le mine_or
export function calculerExperiencedepuisHDVmine_or1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_or1)
        .map(key => parseInt(key.replace("mine_or1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        if (mine_or.hdvrequis <= hdvNiveau) {
            experienceTotal += mine_or.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le mine_or
export function calculerExperienceConstructionParHDVmine_or1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_or = mine_or1[`mine_or1_nv_${i}`];
        
        if (mine_or.hdvrequis === hdvNiveau) {
            experienceTotal += mine_or.experience;
        }
    }
    return experienceTotal;
}