import { canon_ricochet2 } from '/coc/code/village principal/batiments/database/data defense/data canon ricochet.js';

//général
export function canon_ricochet2_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(canon_ricochet2)
        .map(key => parseInt(key.replace("canon_ricochet2_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (canon_ricochet2[`canon_ricochet2_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon_ricochet
export function calculerTempsTotalcanon_ricochet2(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += canon_ricochet2[`canon_ricochet2_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon_ricochet
export function calculerTempsRestantcanon_ricochet2(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `canon_ricochet2_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (canon_ricochet2.hasOwnProperty(key)) {
            tempsRestant += canon_ricochet2[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet canon_ricochet2.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon_ricochet
export function calculerTempsdepuisHDVcanon_ricochet2(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon_ricochet2)
        .map(key => parseInt(key.replace("canon_ricochet2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        if (canon_ricochet.hdvrequis <= hdvNiveau) {
            tempsTotal += canon_ricochet.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon_ricochet
export function calculerTempsConstructionParHDVcanon_ricochet2(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        
        if (canon_ricochet.hdvrequis === hdvNiveau) {
            tempsTotal += canon_ricochet.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon_ricochet
export function calculerPrixTotalcanon_ricochet2(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += canon_ricochet2[`canon_ricochet2_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon_ricochet
export function calculerPrixRestantcanon_ricochet2(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += canon_ricochet2[`canon_ricochet2_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon_ricochet
export function calculerPrixdepuisHDVcanon_ricochet2(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon_ricochet2)
        .map(key => parseInt(key.replace("canon_ricochet2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        if (canon_ricochet.hdvrequis <= hdvNiveau) {
            prixTotal += canon_ricochet.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon_ricochet
export function calculerPrixConstructionParHDVcanon_ricochet2(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        
        if (canon_ricochet.hdvrequis === hdvNiveau) {
            prixTotal += canon_ricochet.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon_ricochet
export function calculerExperienceTotalcanon_ricochet2(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += canon_ricochet2[`canon_ricochet2_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon_ricochet
export function calculerExperienceRestantcanon_ricochet2(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += canon_ricochet2[`canon_ricochet2_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon_ricochet
export function calculerExperiencedepuisHDVcanon_ricochet2(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(canon_ricochet2)
        .map(key => parseInt(key.replace("canon_ricochet2_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        if (canon_ricochet.hdvrequis <= hdvNiveau) {
            experienceTotal += canon_ricochet.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon_ricochet
export function calculerExperienceConstructionParHDVcanon_ricochet2(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon_ricochet = canon_ricochet2[`canon_ricochet2_nv_${i}`];
        
        if (canon_ricochet.hdvrequis === hdvNiveau) {
            experienceTotal += canon_ricochet.experience;
        }
    }
    return experienceTotal;
}