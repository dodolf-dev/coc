import { forgeron } from '/coc/code/village principal/batiments/database/data armee/data forgeron.js';

//général
export function forgeron_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(forgeron)
        .map(key => parseInt(key.replace("forgeron_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (forgeron[`forgeron_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le forgeron
export function calculerTempsTotalforgeron(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += forgeron[`forgeron_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le forgeron
export function calculerTempsRestantforgeron(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `forgeron_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (forgeron.hasOwnProperty(key)) {
            tempsRestant += forgeron[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet forgeron.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le forgeron
export function calculerTempsdepuisHDVforgeron(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(forgeron)
        .map(key => parseInt(key.replace("forgeron_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];
        if (forgeron.hdvrequis <= hdvNiveau) {
            tempsTotal += forgeron.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le forgeron
export function calculerTempsConstructionParHDVforgeron(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];

        if (forgeron.hdvrequis === hdvNiveau) {
            tempsTotal += forgeron.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le forgeron
export function calculerPrixTotalforgeron(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += forgeron[`forgeron_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le forgeron
export function calculerPrixRestantforgeron(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += forgeron[`forgeron_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le forgeron
export function calculerPrixdepuisHDVforgeron(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(forgeron)
        .map(key => parseInt(key.replace("forgeron_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];
        if (forgeron.hdvrequis <= hdvNiveau) {
            prixTotal += forgeron.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le forgeron
export function calculerPrixConstructionParHDVforgeron(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];

        if (forgeron.hdvrequis === hdvNiveau) {
            prixTotal += forgeron.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le forgeron
export function calculerExperienceTotalforgeron(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += forgeron[`forgeron_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le forgeron
export function calculerExperienceRestantforgeron(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += forgeron[`forgeron_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le forgeron
export function calculerExperiencedepuisHDVforgeron(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(forgeron)
        .map(key => parseInt(key.replace("forgeron_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];
        if (forgeron.hdvrequis <= hdvNiveau) {
            experienceTotal += forgeron.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le forgeron
export function calculerExperienceConstructionParHDVforgeron(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const forgeron = forgeron[`forgeron_nv_${i}`];

        if (forgeron.hdvrequis === hdvNiveau) {
            experienceTotal += forgeron.experience;
        }
    }
    return experienceTotal;
}