import { reservoir_elixir4 } from '/coc/code/village principal/batiments/database/data ressource/data reservoir elixir.js';

//général
export function reservoir_elixir4_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(reservoir_elixir4)
        .map(key => parseInt(key.replace("reservoir_elixir4_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (reservoir_elixir4[`reservoir_elixir4_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le reservoir_elixir
export function calculerTempsTotalreservoir_elixir4(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += reservoir_elixir4[`reservoir_elixir4_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le reservoir_elixir
export function calculerTempsRestantreservoir_elixir4(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `reservoir_elixir4_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (reservoir_elixir4.hasOwnProperty(key)) {
            tempsRestant += reservoir_elixir4[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet reservoir_elixir4.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le reservoir_elixir
export function calculerTempsdepuisHDVreservoir_elixir4(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir4)
        .map(key => parseInt(key.replace("reservoir_elixir4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        if (reservoir_elixir.hdvrequis <= hdvNiveau) {
            tempsTotal += reservoir_elixir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le reservoir_elixir
export function calculerTempsConstructionParHDVreservoir_elixir4(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        
        if (reservoir_elixir.hdvrequis === hdvNiveau) {
            tempsTotal += reservoir_elixir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le reservoir_elixir
export function calculerPrixTotalreservoir_elixir4(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += reservoir_elixir4[`reservoir_elixir4_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le reservoir_elixir
export function calculerPrixRestantreservoir_elixir4(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += reservoir_elixir4[`reservoir_elixir4_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le reservoir_elixir
export function calculerPrixdepuisHDVreservoir_elixir4(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir4)
        .map(key => parseInt(key.replace("reservoir_elixir4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        if (reservoir_elixir.hdvrequis <= hdvNiveau) {
            prixTotal += reservoir_elixir.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le reservoir_elixir
export function calculerPrixConstructionParHDVreservoir_elixir4(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        
        if (reservoir_elixir.hdvrequis === hdvNiveau) {
            prixTotal += reservoir_elixir.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le reservoir_elixir
export function calculerExperienceTotalreservoir_elixir4(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += reservoir_elixir4[`reservoir_elixir4_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le reservoir_elixir
export function calculerExperienceRestantreservoir_elixir4(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += reservoir_elixir4[`reservoir_elixir4_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le reservoir_elixir
export function calculerExperiencedepuisHDVreservoir_elixir4(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir4)
        .map(key => parseInt(key.replace("reservoir_elixir4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        if (reservoir_elixir.hdvrequis <= hdvNiveau) {
            experienceTotal += reservoir_elixir.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le reservoir_elixir
export function calculerExperienceConstructionParHDVreservoir_elixir4(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const reservoir_elixir = reservoir_elixir4[`reservoir_elixir4_nv_${i}`];
        
        if (reservoir_elixir.hdvrequis === hdvNiveau) {
            experienceTotal += reservoir_elixir.experience;
        }
    }
    return experienceTotal;
}