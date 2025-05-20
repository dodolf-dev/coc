import { mine_chercheuse6 } from '/coc/code/village principal/batiments/database/data piege/data mine chercheuse.js';

//général
export function mine_chercheuse6_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(mine_chercheuse6)
        .map(key => parseInt(key.replace("mine_chercheuse6_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (mine_chercheuse6[`mine_chercheuse6_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le mine_chercheuse
export function calculerTempsTotalmine_chercheuse6(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += mine_chercheuse6[`mine_chercheuse6_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le mine_chercheuse
export function calculerTempsRestantmine_chercheuse6(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `mine_chercheuse6_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (mine_chercheuse6.hasOwnProperty(key)) {
            tempsRestant += mine_chercheuse6[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet mine_chercheuse6.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le mine_chercheuse
export function calculerTempsdepuisHDVmine_chercheuse6(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_chercheuse6)
        .map(key => parseInt(key.replace("mine_chercheuse6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        if (mine_chercheuse.hdvrequis <= hdvNiveau) {
            tempsTotal += mine_chercheuse.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le mine_chercheuse
export function calculerTempsConstructionParHDVmine_chercheuse6(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        
        if (mine_chercheuse.hdvrequis === hdvNiveau) {
            tempsTotal += mine_chercheuse.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le mine_chercheuse
export function calculerPrixTotalmine_chercheuse6(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += mine_chercheuse6[`mine_chercheuse6_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le mine_chercheuse
export function calculerPrixRestantmine_chercheuse6(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += mine_chercheuse6[`mine_chercheuse6_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le mine_chercheuse
export function calculerPrixdepuisHDVmine_chercheuse6(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_chercheuse6)
        .map(key => parseInt(key.replace("mine_chercheuse6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        if (mine_chercheuse.hdvrequis <= hdvNiveau) {
            prixTotal += mine_chercheuse.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le mine_chercheuse
export function calculerPrixConstructionParHDVmine_chercheuse6(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        
        if (mine_chercheuse.hdvrequis === hdvNiveau) {
            prixTotal += mine_chercheuse.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le mine_chercheuse
export function calculerExperienceTotalmine_chercheuse6(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += mine_chercheuse6[`mine_chercheuse6_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le mine_chercheuse
export function calculerExperienceRestantmine_chercheuse6(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += mine_chercheuse6[`mine_chercheuse6_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le mine_chercheuse
export function calculerExperiencedepuisHDVmine_chercheuse6(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(mine_chercheuse6)
        .map(key => parseInt(key.replace("mine_chercheuse6_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        if (mine_chercheuse.hdvrequis <= hdvNiveau) {
            experienceTotal += mine_chercheuse.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le mine_chercheuse
export function calculerExperienceConstructionParHDVmine_chercheuse6(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const mine_chercheuse = mine_chercheuse6[`mine_chercheuse6_nv_${i}`];
        
        if (mine_chercheuse.hdvrequis === hdvNiveau) {
            experienceTotal += mine_chercheuse.experience;
        }
    }
    return experienceTotal;
}