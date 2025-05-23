import { hall_des_heros } from '/coc/code/village principal/ atiments/database/data armee/data hall des heros.js';

//général
export function hall_des_heros_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(hall_des_heros)
        .map(key => parseInt(key.replace("hall_des_heros_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (hall_des_heros[`hall_des_heros_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le hall_des_heros
export function calculerTempsTotalhall_des_heros(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += hall_des_heros[`hall_des_heros_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le hall_des_heros
export function calculerTempsRestanthall_des_heros(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `hall_des_heros_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (hall_des_heros.hasOwnProperty(key)) {
            tempsRestant += hall_des_heros[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet hall_des_heros.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le hall_des_heros
export function calculerTempsdepuisHDVhall_des_heros(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(hall_des_heros)
        .map(key => parseInt(key.replace("hall_des_heros_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];
        if (hall_des_heros.hdvrequis <= hdvNiveau) {
            tempsTotal += hall_des_heros.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le hall_des_heros
export function calculerTempsConstructionParHDVhall_des_heros(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];

        if (hall_des_heros.hdvrequis === hdvNiveau) {
            tempsTotal += hall_des_heros.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le hall_des_heros
export function calculerPrixTotalhall_des_heros(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += hall_des_heros[`hall_des_heros_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le hall_des_heros
export function calculerPrixRestanthall_des_heros(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += hall_des_heros[`hall_des_heros_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le hall_des_heros
export function calculerPrixdepuisHDVhall_des_heros(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(hall_des_heros)
        .map(key => parseInt(key.replace("hall_des_heros_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];
        if (hall_des_heros.hdvrequis <= hdvNiveau) {
            prixTotal += hall_des_heros.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le hall_des_heros
export function calculerPrixConstructionParHDVhall_des_heros(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];

        if (hall_des_heros.hdvrequis === hdvNiveau) {
            prixTotal += hall_des_heros.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le hall_des_heros
export function calculerExperienceTotalhall_des_heros(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += hall_des_heros[`hall_des_heros_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le hall_des_heros
export function calculerExperienceRestanthall_des_heros(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += hall_des_heros[`hall_des_heros_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le hall_des_heros
export function calculerExperiencedepuisHDVhall_des_heros(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(hall_des_heros)
        .map(key => parseInt(key.replace("hall_des_heros_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];
        if (hall_des_heros.hdvrequis <= hdvNiveau) {
            experienceTotal += hall_des_heros.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le hall_des_heros
export function calculerExperienceConstructionParHDVhall_des_heros(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const hall_des_heros = hall_des_heros[`hall_des_heros_nv_${i}`];

        if (hall_des_heros.hdvrequis === hdvNiveau) {
            experienceTotal += hall_des_heros.experience;
        }
    }
    return experienceTotal;
}