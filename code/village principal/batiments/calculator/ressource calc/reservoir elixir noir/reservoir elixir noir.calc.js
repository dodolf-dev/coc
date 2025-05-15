import { reservoir_elixir_noir } from '/coc/code/village principal/batiments/database/data ressource/data reservoir elixir noir.js';

//général
export function reservoir_elixir_noir_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(reservoir_elixir_noir)
        .map(key => parseInt(key.replace("reservoir_elixir_noir_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le canon
export function calculerTempsTotalreservoir_elixir_noir(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le canon
export function calculerTempsRestantreservoir_elixir_noir(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `reservoir_elixir_noir_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (reservoir_elixir_noir.hasOwnProperty(key)) {
            tempsRestant += reservoir_elixir_noir[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet reservoir_elixir_noir.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le canon
export function calculerTempsdepuisHDVreservoir_elixir_noir(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir_noir)
        .map(key => parseInt(key.replace("reservoir_elixir_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le canon
export function calculerTempsConstructionParHDVreservoir_elixir_noir(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            tempsTotal += canon.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le canon
export function calculerPrixTotalreservoir_elixir_noir(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le canon
export function calculerPrixRestantreservoir_elixir_noir(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le canon
export function calculerPrixdepuisHDVreservoir_elixir_noir(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir_noir)
        .map(key => parseInt(key.replace("reservoir_elixir_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le canon
export function calculerPrixConstructionParHDVreservoir_elixir_noir(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            prixTotal += canon.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le canon
export function calculerExperienceTotalreservoir_elixir_noir(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le canon
export function calculerExperienceRestantreservoir_elixir_noir(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le canon
export function calculerExperiencedepuisHDVreservoir_elixir_noir(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(reservoir_elixir_noir)
        .map(key => parseInt(key.replace("reservoir_elixir_noir_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        if (canon.hdvrequis <= hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le canon
export function calculerExperienceConstructionParHDVreservoir_elixir_noir(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const canon = reservoir_elixir_noir[`reservoir_elixir_noir_nv_${i}`];
        
        if (canon.hdvrequis === hdvNiveau) {
            experienceTotal += canon.experience;
        }
    }
    return experienceTotal;
}