import { aigle_artilleur } from '/coc/code/village principal/batiments/database/data defense/data aigle artilleur.js';

//général
export function aigle_artilleur_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(aigle_artilleur)
        .map(key => parseInt(key.replace("aigle_artilleur_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (aigle_artilleur[`aigle_artilleur_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalaigle_artilleur(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += aigle_artilleur[`aigle_artilleur_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantaigle_artilleur(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `aigle_artilleur_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (aigle_artilleur.hasOwnProperty(key)) {
            tempsRestant += aigle_artilleur[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet aigle_artilleur.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVaigle_artilleur(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(aigle_artilleur)
        .map(key => parseInt(key.replace("aigle_artilleur_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVaigle_artilleur(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalaigle_artilleur(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += aigle_artilleur[`aigle_artilleur_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantaigle_artilleur(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += aigle_artilleur[`aigle_artilleur_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVaigle_artilleur(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(aigle_artilleur)
        .map(key => parseInt(key.replace("aigle_artilleur_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVaigle_artilleur(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalaigle_artilleur(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += aigle_artilleur[`aigle_artilleur_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantaigle_artilleur(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += aigle_artilleur[`aigle_artilleur_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVaigle_artilleur(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(aigle_artilleur)
        .map(key => parseInt(key.replace("aigle_artilleur_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVaigle_artilleur(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = aigle_artilleur[`aigle_artilleur_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}