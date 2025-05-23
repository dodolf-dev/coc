import { usine_sorts } from '/coc/code/village principal/ atiments/database/data armee/data usine sorts.js';

//général
export function usine_a_sort_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(usine_a_sort)
        .map(key => parseInt(key.replace("usine_a_sort_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (usine_a_sort[`usine_a_sort_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le usine_a_sort
export function calculerTempsTotalusine_a_sort(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += usine_a_sort[`usine_a_sort_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le usine_a_sort
export function calculerTempsRestantusine_a_sort(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `usine_a_sort_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (usine_a_sort.hasOwnProperty(key)) {
            tempsRestant += usine_a_sort[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet usine_a_sort.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le usine_a_sort
export function calculerTempsdepuisHDVusine_a_sort(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort)
        .map(key => parseInt(key.replace("usine_a_sort_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];
        if (usine_a_sort.hdvrequis <= hdvNiveau) {
            tempsTotal += usine_a_sort.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le usine_a_sort
export function calculerTempsConstructionParHDVusine_a_sort(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];

        if (usine_a_sort.hdvrequis === hdvNiveau) {
            tempsTotal += usine_a_sort.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le usine_a_sort
export function calculerPrixTotalusine_a_sort(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += usine_a_sort[`usine_a_sort_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le usine_a_sort
export function calculerPrixRestantusine_a_sort(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += usine_a_sort[`usine_a_sort_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le usine_a_sort
export function calculerPrixdepuisHDVusine_a_sort(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort)
        .map(key => parseInt(key.replace("usine_a_sort_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];
        if (usine_a_sort.hdvrequis <= hdvNiveau) {
            prixTotal += usine_a_sort.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le usine_a_sort
export function calculerPrixConstructionParHDVusine_a_sort(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];

        if (usine_a_sort.hdvrequis === hdvNiveau) {
            prixTotal += usine_a_sort.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le usine_a_sort
export function calculerExperienceTotalusine_a_sort(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += usine_a_sort[`usine_a_sort_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le usine_a_sort
export function calculerExperienceRestantusine_a_sort(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += usine_a_sort[`usine_a_sort_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le usine_a_sort
export function calculerExperiencedepuisHDVusine_a_sort(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort)
        .map(key => parseInt(key.replace("usine_a_sort_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];
        if (usine_a_sort.hdvrequis <= hdvNiveau) {
            experienceTotal += usine_a_sort.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le usine_a_sort
export function calculerExperienceConstructionParHDVusine_a_sort(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort = usine_a_sort[`usine_a_sort_nv_${i}`];

        if (usine_a_sort.hdvrequis === hdvNiveau) {
            experienceTotal += usine_a_sort.experience;
        }
    }
    return experienceTotal;
}