import { extracteur_elixir5 } from '/coc/code/village principal/batiments/database/data ressource/data extracteur elixir.js';

//général
export function extracteur_elixir5_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(extracteur_elixir5)
        .map(key => parseInt(key.replace("extracteur_elixir5_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 0; i <= niveauMaxPossible; i++) {
        if (extracteur_elixir5[`extracteur_elixir5_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le extracteur_elixir
export function calculerTempsTotalextracteur_elixir5(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += extracteur_elixir5[`extracteur_elixir5_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le extracteur_elixir
export function calculerTempsRestantextracteur_elixir5(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `extracteur_elixir5_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (extracteur_elixir5.hasOwnProperty(key)) {
            tempsRestant += extracteur_elixir5[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet extracteur_elixir5.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le extracteur_elixir
export function calculerTempsdepuisHDVextracteur_elixir5(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir5)
        .map(key => parseInt(key.replace("extracteur_elixir5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        if (extracteur_elixir.hdvrequis <= hdvNiveau) {
            tempsTotal += extracteur_elixir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le extracteur_elixir
export function calculerTempsConstructionParHDVextracteur_elixir5(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        
        if (extracteur_elixir.hdvrequis === hdvNiveau) {
            tempsTotal += extracteur_elixir.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le extracteur_elixir
export function calculerPrixTotalextracteur_elixir5(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += extracteur_elixir5[`extracteur_elixir5_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le extracteur_elixir
export function calculerPrixRestantextracteur_elixir5(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += extracteur_elixir5[`extracteur_elixir5_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le extracteur_elixir
export function calculerPrixdepuisHDVextracteur_elixir5(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir5)
        .map(key => parseInt(key.replace("extracteur_elixir5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        if (extracteur_elixir.hdvrequis <= hdvNiveau) {
            prixTotal += extracteur_elixir.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le extracteur_elixir
export function calculerPrixConstructionParHDVextracteur_elixir5(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        
        if (extracteur_elixir.hdvrequis === hdvNiveau) {
            prixTotal += extracteur_elixir.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le extracteur_elixir
export function calculerExperienceTotalextracteur_elixir5(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += extracteur_elixir5[`extracteur_elixir5_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le extracteur_elixir
export function calculerExperienceRestantextracteur_elixir5(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += extracteur_elixir5[`extracteur_elixir5_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le extracteur_elixir
export function calculerExperiencedepuisHDVextracteur_elixir5(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(extracteur_elixir5)
        .map(key => parseInt(key.replace("extracteur_elixir5_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        if (extracteur_elixir.hdvrequis <= hdvNiveau) {
            experienceTotal += extracteur_elixir.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le extracteur_elixir
export function calculerExperienceConstructionParHDVextracteur_elixir5(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const extracteur_elixir = extracteur_elixir5[`extracteur_elixir5_nv_${i}`];
        
        if (extracteur_elixir.hdvrequis === hdvNiveau) {
            experienceTotal += extracteur_elixir.experience;
        }
    }
    return experienceTotal;
}