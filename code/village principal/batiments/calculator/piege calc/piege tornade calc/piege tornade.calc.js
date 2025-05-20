import { piege_tornade } from '/coc/code/village principal/batiments/database/data piege/data piege tornade.js';

//général
export function piege_tornade_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(piege_tornade)
        .map(key => parseInt(key.replace("piege_tornade_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (piege_tornade[`piege_tornade_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le piege_tornade
export function calculerTempsTotalpiege_tornade(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += piege_tornade[`piege_tornade_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le piege_tornade
export function calculerTempsRestantpiege_tornade(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `piege_tornade_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (piege_tornade.hasOwnProperty(key)) {
            tempsRestant += piege_tornade[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet piege_tornade.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le piege_tornade
export function calculerTempsdepuisHDVpiege_tornade(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_tornade)
        .map(key => parseInt(key.replace("piege_tornade_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        if (piege_tornade.hdvrequis <= hdvNiveau) {
            tempsTotal += piege_tornade.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le piege_tornade
export function calculerTempsConstructionParHDVpiege_tornade(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        
        if (piege_tornade.hdvrequis === hdvNiveau) {
            tempsTotal += piege_tornade.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le piege_tornade
export function calculerPrixTotalpiege_tornade(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += piege_tornade[`piege_tornade_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le piege_tornade
export function calculerPrixRestantpiege_tornade(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += piege_tornade[`piege_tornade_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le piege_tornade
export function calculerPrixdepuisHDVpiege_tornade(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_tornade)
        .map(key => parseInt(key.replace("piege_tornade_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        if (piege_tornade.hdvrequis <= hdvNiveau) {
            prixTotal += piege_tornade.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le piege_tornade
export function calculerPrixConstructionParHDVpiege_tornade(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        
        if (piege_tornade.hdvrequis === hdvNiveau) {
            prixTotal += piege_tornade.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le piege_tornade
export function calculerExperienceTotalpiege_tornade(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += piege_tornade[`piege_tornade_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le piege_tornade
export function calculerExperienceRestantpiege_tornade(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += piege_tornade[`piege_tornade_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le piege_tornade
export function calculerExperiencedepuisHDVpiege_tornade(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(piege_tornade)
        .map(key => parseInt(key.replace("piege_tornade_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        if (piege_tornade.hdvrequis <= hdvNiveau) {
            experienceTotal += piege_tornade.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le piege_tornade
export function calculerExperienceConstructionParHDVpiege_tornade(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const piege_tornade = piege_tornade[`piege_tornade_nv_${i}`];
        
        if (piege_tornade.hdvrequis === hdvNiveau) {
            experienceTotal += piege_tornade.experience;
        }
    }
    return experienceTotal;
}