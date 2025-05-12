import { mortier2 } from '/coc/code/village principal/batiments/database/data defense/data mortier.js';

//général
export function mortier2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(mortier2)
        .map(key => parseInt(key.replace("mortier2_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (mortier2[`mortier2_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalmortier2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += mortier2[`mortier2_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantmortier2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `mortier2_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (mortier2.hasOwnProperty(key)) {
            tempsRestant += mortier2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet mortier2.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVmortier2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(mortier2)
        .map(key => parseInt(key.replace("mortier2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVmortier2(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalmortier2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += mortier2[`mortier2_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantmortier2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += mortier2[`mortier2_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVmortier2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(mortier2)
        .map(key => parseInt(key.replace("mortier2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVmortier2(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalmortier2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += mortier2[`mortier2_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantmortier2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += mortier2[`mortier2_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVmortier2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(mortier2)
        .map(key => parseInt(key.replace("mortier2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVmortier2(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = mortier2[`mortier2_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}