import { ballon } from '/coc/code/village principal/laboratoire/database/data troupe elixir.js';

//général
export function ballon_nv_max_laboratoire(laboratoireNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(ballon)
        .map(key => parseInt(key.replace("ballon_nv_", ""), 10))
        .filter(n => !isNaN(n));

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        const data = ballon[`ballon_nv_${i}`];
        if (data && data.laboratoirerequis <= laboratoireNiveau) {
            niveauMax = i;
        }
    }
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalballon(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += ballon[`ballon_nv_${i}`].trecherche;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantballon(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `ballon_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (ballon.hasOwnProperty(key)) {
            tempsRestant += ballon[key].trecherche;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet ballon.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'laboratoire laboratoire pour le canon
export function calculerTempsdepuislaboratoireballon(laboratoireNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(ballon)
        .map(key => parseInt(key.replace("ballon_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'laboratoire séléctionner pour le canon
export function calculerTempsConstructionParlaboratoireballon(laboratoireNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            tempsTotal += canon.trecherche;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalballon(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += ballon[`ballon_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantballon(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += ballon[`ballon_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'laboratoire pour le canon
export function calculerPrixdepuislaboratoireballon(laboratoireNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(ballon)
        .map(key => parseInt(key.replace("ballon_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'laboratoire séléctionner pour le canon
export function calculerPrixConstructionParlaboratoireballon(laboratoireNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalballon(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += ballon[`ballon_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantballon(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += ballon[`ballon_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'laboratoire pour le canon
export function calculerExperiencedepuislaboratoireballon(laboratoireNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(ballon)
        .map(key => parseInt(key.replace("ballon_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        if (canon.laboratoirerequis <= laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'laboratoire séléctionner pour le canon
export function calculerExperienceConstructionParlaboratoireballon(laboratoireNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = ballon[`ballon_nv_${i}`];
        
        if (canon.laboratoirerequis === laboratoireNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}