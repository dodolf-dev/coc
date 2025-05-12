import { tour_archere3 } from '/coc/code/village principal/batiments/database/data defense/data tour archere.js';

//général
export function tour_archere3_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(tour_archere3)
        .map(key => parseInt(key.replace("tour_archere3_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (tour_archere3[`tour_archere3_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotaltour_archere3(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += tour_archere3[`tour_archere3_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestanttour_archere3(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `tour_archere3_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (tour_archere3.hasOwnProperty(key)) {
            tempsRestant += tour_archere3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet tour_archere3.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVtour_archere3(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(tour_archere3)
        .map(key => parseInt(key.replace("tour_archere3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVtour_archere3(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotaltour_archere3(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += tour_archere3[`tour_archere3_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestanttour_archere3(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += tour_archere3[`tour_archere3_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVtour_archere3(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(tour_archere3)
        .map(key => parseInt(key.replace("tour_archere3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVtour_archere3(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotaltour_archere3(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += tour_archere3[`tour_archere3_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestanttour_archere3(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += tour_archere3[`tour_archere3_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVtour_archere3(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(tour_archere3)
        .map(key => parseInt(key.replace("tour_archere3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVtour_archere3(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = tour_archere3[`tour_archere3_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}