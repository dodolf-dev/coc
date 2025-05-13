import { catapulte_erratique1 } from '/coc/code/village principal/batiments/database/data defense/data catapulte erratique.js';

//général
export function catapulte_erratique1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(catapulte_erratique1)
        .map(key => parseInt(key.replace("catapulte_erratique1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (catapulte_erratique1[`catapulte_erratique1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le catapulte_erratique
export function calculerTempsTotalcatapulte_erratique1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += catapulte_erratique1[`catapulte_erratique1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le catapulte_erratique
export function calculerTempsRestantcatapulte_erratique1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `catapulte_erratique1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (catapulte_erratique1.hasOwnProperty(key)) {
            tempsRestant += catapulte_erratique1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet catapulte_erratique1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le catapulte_erratique
export function calculerTempsdepuisHDVcatapulte_erratique1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(catapulte_erratique1)
        .map(key => parseInt(key.replace("catapulte_erratique1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        if (catapulte_erratique.hdvrequis <= hdvNiveau) {
            tempsTotal += catapulte_erratique.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le catapulte_erratique
export function calculerTempsConstructionParHDVcatapulte_erratique1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        
        if (catapulte_erratique.hdvrequis === hdvNiveau) {
            tempsTotal += catapulte_erratique.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le catapulte_erratique
export function calculerPrixTotalcatapulte_erratique1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += catapulte_erratique1[`catapulte_erratique1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le catapulte_erratique
export function calculerPrixRestantcatapulte_erratique1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += catapulte_erratique1[`catapulte_erratique1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le catapulte_erratique
export function calculerPrixdepuisHDVcatapulte_erratique1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(catapulte_erratique1)
        .map(key => parseInt(key.replace("catapulte_erratique1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        if (catapulte_erratique.hdvrequis <= hdvNiveau) {
            prixTotal += catapulte_erratique.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le catapulte_erratique
export function calculerPrixConstructionParHDVcatapulte_erratique1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        
        if (catapulte_erratique.hdvrequis === hdvNiveau) {
            prixTotal += catapulte_erratique.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le catapulte_erratique
export function calculerExperienceTotalcatapulte_erratique1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += catapulte_erratique1[`catapulte_erratique1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le catapulte_erratique
export function calculerExperienceRestantcatapulte_erratique1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += catapulte_erratique1[`catapulte_erratique1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le catapulte_erratique
export function calculerExperiencedepuisHDVcatapulte_erratique1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(catapulte_erratique1)
        .map(key => parseInt(key.replace("catapulte_erratique1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        if (catapulte_erratique.hdvrequis <= hdvNiveau) {
            experienceTotal += catapulte_erratique.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le catapulte_erratique
export function calculerExperienceConstructionParHDVcatapulte_erratique1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const catapulte_erratique = catapulte_erratique1[`catapulte_erratique1_nv_${i}`];
        
        if (catapulte_erratique.hdvrequis === hdvNiveau) {
            experienceTotal += catapulte_erratique.experience;
        }
    }
    return experienceTotal;
}