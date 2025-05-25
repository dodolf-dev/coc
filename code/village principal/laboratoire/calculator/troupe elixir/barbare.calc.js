import { barbare } from '/coc/code/village principal/laboratoire/database/data troupe elixir.js';

//général
export function barbare_nv_max_laboratoire(laboratoireNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(barbare)
        .map(key => parseInt(key.replace("barbare_nv_", ""), 10))
        .filter(n => !isNaN(n));

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        const data = barbare[`barbare_nv_${i}`];
        if (data && data.laboratoirerequis <= laboratoireNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalbarbare(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += barbare[`barbare_nv_${i}`].trecherche;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantbarbare(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `barbare_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (barbare.hasOwnProperty(key)) {
            tempsRestant += barbare[key].trecherche;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet barbare.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'laboratoire laboratoire pour le canon
export function calculerTempsdepuislaboratoirebarbare(laboratoireNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(barbare)
        .map(key => parseInt(key.replace("barbare_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'laboratoire séléctionner pour le canon
export function calculerTempsConstructionParlaboratoirebarbare(laboratoireNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalbarbare(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += barbare[`barbare_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantbarbare(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += barbare[`barbare_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'laboratoire pour le canon
export function calculerPrixdepuislaboratoirebarbare(laboratoireNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(barbare)
        .map(key => parseInt(key.replace("barbare_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'laboratoire séléctionner pour le canon
export function calculerPrixConstructionParlaboratoirebarbare(laboratoireNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalbarbare(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += barbare[`barbare_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantbarbare(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += barbare[`barbare_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'laboratoire pour le canon
export function calculerExperiencedepuislaboratoirebarbare(laboratoireNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(barbare)
        .map(key => parseInt(key.replace("barbare_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'laboratoire séléctionner pour le canon
export function calculerExperienceConstructionParlaboratoirebarbare(laboratoireNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = barbare[`barbare_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}