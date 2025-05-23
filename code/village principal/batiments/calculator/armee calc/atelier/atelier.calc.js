import { atelier } from '/coc/code/village principal/batiments/database/data armee/data atelier.js';

//général
export function atelier_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(atelier)
        .map(key => parseInt(key.replace("atelier_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (atelier[`atelier_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le atelier
export function calculerTempsTotalatelier(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += atelier[`atelier_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le atelier
export function calculerTempsRestantatelier(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `atelier_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (atelier.hasOwnProperty(key)) {
            tempsRestant += atelier[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet atelier.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le atelier
export function calculerTempsdepuisHDVatelier(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(atelier)
        .map(key => parseInt(key.replace("atelier_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const atelier = atelier[`atelier_nv_${i}`];
        if (atelier.hdvrequis <= hdvNiveau) {
            tempsTotal += atelier.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le atelier
export function calculerTempsConstructionParHDVatelier(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const atelier = atelier[`atelier_nv_${i}`];

        if (atelier.hdvrequis === hdvNiveau) {
            tempsTotal += atelier.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le atelier
export function calculerPrixTotalatelier(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += atelier[`atelier_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le atelier
export function calculerPrixRestantatelier(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += atelier[`atelier_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le atelier
export function calculerPrixdepuisHDVatelier(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(atelier)
        .map(key => parseInt(key.replace("atelier_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const atelier = atelier[`atelier_nv_${i}`];
        if (atelier.hdvrequis <= hdvNiveau) {
            prixTotal += atelier.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le atelier
export function calculerPrixConstructionParHDVatelier(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const atelier = atelier[`atelier_nv_${i}`];

        if (atelier.hdvrequis === hdvNiveau) {
            prixTotal += atelier.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le atelier
export function calculerExperienceTotalatelier(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += atelier[`atelier_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le atelier
export function calculerExperienceRestantatelier(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += atelier[`atelier_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le atelier
export function calculerExperiencedepuisHDVatelier(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(atelier)
        .map(key => parseInt(key.replace("atelier_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const atelier = atelier[`atelier_nv_${i}`];
        if (atelier.hdvrequis <= hdvNiveau) {
            experienceTotal += atelier.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le atelier
export function calculerExperienceConstructionParHDVatelier(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const atelier = atelier[`atelier_nv_${i}`];

        if (atelier.hdvrequis === hdvNiveau) {
            experienceTotal += atelier.experience;
        }
    }
    return experienceTotal;
}