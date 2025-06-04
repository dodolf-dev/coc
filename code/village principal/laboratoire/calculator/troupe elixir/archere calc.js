import { archere } from '/coc/code/village principal/laboratoire/database/data troupe elixir.js';

//général
export function archere_nv_max_laboratoire(laboratoireNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(archere)
        .map(key => parseInt(key.replace("archere_nv_", ""), 10))
        .filter(n => !isNaN(n));

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        const data = archere[`archere_nv_${i}`];
        if (data && data.laboratoirerequis <= laboratoireNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalarchere(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += archere[`archere_nv_${i}`].trecherche;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantarchere(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `archere_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (archere.hasOwnProperty(key)) {
            tempsRestant += archere[key].trecherche;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet archere.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'laboratoire laboratoire pour le canon
export function calculerTempsdepuislaboratoirearchere(laboratoireNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(archere)
        .map(key => parseInt(key.replace("archere_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = archere[`archere_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'laboratoire séléctionner pour le canon
export function calculerTempsConstructionParlaboratoirearchere(laboratoireNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = archere[`archere_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalarchere(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += archere[`archere_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantarchere(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += archere[`archere_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'laboratoire pour le canon
export function calculerPrixdepuislaboratoirearchere(laboratoireNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(archere)
        .map(key => parseInt(key.replace("archere_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = archere[`archere_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'laboratoire séléctionner pour le canon
export function calculerPrixConstructionParlaboratoirearchere(laboratoireNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = archere[`archere_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalarchere(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += archere[`archere_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantarchere(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += archere[`archere_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'laboratoire pour le canon
export function calculerExperiencedepuislaboratoirearchere(laboratoireNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(archere)
        .map(key => parseInt(key.replace("archere_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = archere[`archere_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'laboratoire séléctionner pour le canon
export function calculerExperienceConstructionParlaboratoirearchere(laboratoireNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = archere[`archere_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}