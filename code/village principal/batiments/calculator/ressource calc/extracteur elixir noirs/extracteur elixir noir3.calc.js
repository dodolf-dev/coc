import { extracteur_elixir_noir3 } from '/coc/code/village principal/batiments/database/data ressource/data extracteur elixir noir.js';

//général
export function extracteur_elixir_noir3_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(extracteur_elixir_noir3)
        .map(key => parseInt(key.replace("extracteur_elixir_noir3_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le extracteur_elixir_noir
export function calculerTempsTotalextracteur_elixir_noir3(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le extracteur_elixir_noir
export function calculerTempsRestantextracteur_elixir_noir3(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `extracteur_elixir_noir3_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (extracteur_elixir_noir3.hasOwnProperty(key)) {
            tempsRestant += extracteur_elixir_noir3[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet extracteur_elixir_noir3.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le extracteur_elixir_noir
export function calculerTempsdepuisHDVextracteur_elixir_noir3(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir_noir3)
        .map(key => parseInt(key.replace("extracteur_elixir_noir3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        if (extracteur_elixir_noir.hdvrequis <= hdvNiveau) {
            tempsTotal += extracteur_elixir_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le extracteur_elixir_noir
export function calculerTempsConstructionParHDVextracteur_elixir_noir3(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        
        if (extracteur_elixir_noir.hdvrequis === hdvNiveau) {
            tempsTotal += extracteur_elixir_noir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le extracteur_elixir_noir
export function calculerPrixTotalextracteur_elixir_noir3(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le extracteur_elixir_noir
export function calculerPrixRestantextracteur_elixir_noir3(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le extracteur_elixir_noir
export function calculerPrixdepuisHDVextracteur_elixir_noir3(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir_noir3)
        .map(key => parseInt(key.replace("extracteur_elixir_noir3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        if (extracteur_elixir_noir.hdvrequis <= hdvNiveau) {
            prixTotal += extracteur_elixir_noir.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le extracteur_elixir_noir
export function calculerPrixConstructionParHDVextracteur_elixir_noir3(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        
        if (extracteur_elixir_noir.hdvrequis === hdvNiveau) {
            prixTotal += extracteur_elixir_noir.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le extracteur_elixir_noir
export function calculerExperienceTotalextracteur_elixir_noir3(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le extracteur_elixir_noir
export function calculerExperienceRestantextracteur_elixir_noir3(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le extracteur_elixir_noir
export function calculerExperiencedepuisHDVextracteur_elixir_noir3(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir_noir3)
        .map(key => parseInt(key.replace("extracteur_elixir_noir3_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        if (extracteur_elixir_noir.hdvrequis <= hdvNiveau) {
            experienceTotal += extracteur_elixir_noir.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le extracteur_elixir_noir
export function calculerExperienceConstructionParHDVextracteur_elixir_noir3(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir_noir = extracteur_elixir_noir3[`extracteur_elixir_noir3_nv_${i}`];
        
        if (extracteur_elixir_noir.hdvrequis === hdvNiveau) {
            experienceTotal += extracteur_elixir_noir.experience;
        }
    }
    return experienceTotal;
}