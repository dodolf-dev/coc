import { usine_sorts_noir } from '/coc/code/village principal/ atiments/database/data armee/data usine sorts noir.js';

//général
export function usine_a_sort_noir_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(usine_a_sort_noir)
        .map(key => parseInt(key.replace("usine_a_sort_noir_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le usine_a_sort_noir
export function calculerTempsTotalusine_a_sort_noir(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le usine_a_sort_noir
export function calculerTempsRestantusine_a_sort_noir(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `usine_a_sort_noir_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (usine_a_sort_noir.hasOwnProperty(key)) {
            tempsRestant += usine_a_sort_noir[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet usine_a_sort_noir.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le usine_a_sort_noir
export function calculerTempsdepuisHDVusine_a_sort_noir(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort_noir)
        .map(key => parseInt(key.replace("usine_a_sort_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];
        if (usine_a_sort_noir.hdvrequis <= hdvNiveau) {
            tempsTotal += usine_a_sort_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le usine_a_sort_noir
export function calculerTempsConstructionParHDVusine_a_sort_noir(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];

        if (usine_a_sort_noir.hdvrequis === hdvNiveau) {
            tempsTotal += usine_a_sort_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le usine_a_sort_noir
export function calculerPrixTotalusine_a_sort_noir(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le usine_a_sort_noir
export function calculerPrixRestantusine_a_sort_noir(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le usine_a_sort_noir
export function calculerPrixdepuisHDVusine_a_sort_noir(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort_noir)
        .map(key => parseInt(key.replace("usine_a_sort_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];
        if (usine_a_sort_noir.hdvrequis <= hdvNiveau) {
            prixTotal += usine_a_sort_noir.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le usine_a_sort_noir
export function calculerPrixConstructionParHDVusine_a_sort_noir(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];

        if (usine_a_sort_noir.hdvrequis === hdvNiveau) {
            prixTotal += usine_a_sort_noir.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le usine_a_sort_noir
export function calculerExperienceTotalusine_a_sort_noir(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le usine_a_sort_noir
export function calculerExperienceRestantusine_a_sort_noir(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le usine_a_sort_noir
export function calculerExperiencedepuisHDVusine_a_sort_noir(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(usine_a_sort_noir)
        .map(key => parseInt(key.replace("usine_a_sort_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];
        if (usine_a_sort_noir.hdvrequis <= hdvNiveau) {
            experienceTotal += usine_a_sort_noir.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le usine_a_sort_noir
export function calculerExperienceConstructionParHDVusine_a_sort_noir(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const usine_a_sort_noir = usine_a_sort_noir[`usine_a_sort_noir_nv_${i}`];

        if (usine_a_sort_noir.hdvrequis === hdvNiveau) {
            experienceTotal += usine_a_sort_noir.experience;
        }
    }
    return experienceTotal;
}