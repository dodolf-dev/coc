import { animalerie } from '/coc/code/village principal/batiments/database/data armee/data animalerie.js';

//général
export function animalerie_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(animalerie)
        .map(key => parseInt(key.replace("animalerie_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (animalerie[`animalerie_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le animalerie
export function calculerTempsTotalanimalerie(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += animalerie[`animalerie_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le animalerie
export function calculerTempsRestantanimalerie(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `animalerie_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (animalerie.hasOwnProperty(key)) {
            tempsRestant += animalerie[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet animalerie.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le animalerie
export function calculerTempsdepuisHDVanimalerie(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(animalerie)
        .map(key => parseInt(key.replace("animalerie_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];
        if (animalerie.hdvrequis <= hdvNiveau) {
            tempsTotal += animalerie.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le animalerie
export function calculerTempsConstructionParHDVanimalerie(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];

        if (animalerie.hdvrequis === hdvNiveau) {
            tempsTotal += animalerie.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le animalerie
export function calculerPrixTotalanimalerie(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += animalerie[`animalerie_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le animalerie
export function calculerPrixRestantanimalerie(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += animalerie[`animalerie_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le animalerie
export function calculerPrixdepuisHDVanimalerie(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(animalerie)
        .map(key => parseInt(key.replace("animalerie_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];
        if (animalerie.hdvrequis <= hdvNiveau) {
            prixTotal += animalerie.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le animalerie
export function calculerPrixConstructionParHDVanimalerie(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];

        if (animalerie.hdvrequis === hdvNiveau) {
            prixTotal += animalerie.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le animalerie
export function calculerExperienceTotalanimalerie(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += animalerie[`animalerie_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le animalerie
export function calculerExperienceRestantanimalerie(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += animalerie[`animalerie_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le animalerie
export function calculerExperiencedepuisHDVanimalerie(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(animalerie)
        .map(key => parseInt(key.replace("animalerie_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];
        if (animalerie.hdvrequis <= hdvNiveau) {
            experienceTotal += animalerie.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le animalerie
export function calculerExperienceConstructionParHDVanimalerie(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const animalerie = animalerie[`animalerie_nv_${i}`];

        if (animalerie.hdvrequis === hdvNiveau) {
            experienceTotal += animalerie.experience;
        }
    }
    return experienceTotal;
}