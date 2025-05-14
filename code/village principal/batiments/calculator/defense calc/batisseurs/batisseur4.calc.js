import { batisseur4 } from '/coc/code/village principal/batiments/database/data defense/data batisseur.js';

//général
export function batisseur4_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(batisseur4)
        .map(key => parseInt(key.replace("batisseur4_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 1; i <= niveauMaxPossible; i++) {
        if (batisseur4[`batisseur4_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le batisseur
export function calculerTempsTotalbatisseur4(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += batisseur4[`batisseur4_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le batisseur
export function calculerTempsRestantbatisseur4(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `batisseur4_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (batisseur4.hasOwnProperty(key)) {
            tempsRestant += batisseur4[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet batisseur4.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le batisseur
export function calculerTempsdepuisHDVbatisseur4(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur4)
        .map(key => parseInt(key.replace("batisseur4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            tempsTotal += batisseur.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le batisseur
export function calculerTempsConstructionParHDVbatisseur4(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            tempsTotal += batisseur.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le batisseur
export function calculerPrixTotalbatisseur4(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += batisseur4[`batisseur4_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le batisseur
export function calculerPrixRestantbatisseur4(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += batisseur4[`batisseur4_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le batisseur
export function calculerPrixdepuisHDVbatisseur4(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur4)
        .map(key => parseInt(key.replace("batisseur4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            prixTotal += batisseur.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le batisseur
export function calculerPrixConstructionParHDVbatisseur4(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            prixTotal += batisseur.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le batisseur
export function calculerExperienceTotalbatisseur4(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += batisseur4[`batisseur4_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le batisseur
export function calculerExperienceRestantbatisseur4(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += batisseur4[`batisseur4_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le batisseur
export function calculerExperiencedepuisHDVbatisseur4(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur4)
        .map(key => parseInt(key.replace("batisseur4_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            experienceTotal += batisseur.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le batisseur
export function calculerExperienceConstructionParHDVbatisseur4(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur4[`batisseur4_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            experienceTotal += batisseur.experience;
        }
    }
    return experienceTotal;
}