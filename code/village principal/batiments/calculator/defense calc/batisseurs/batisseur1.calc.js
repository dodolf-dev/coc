import { batisseur1 } from '/coc/code/village principal/batiments/database/data defense/data batisseur.js';

//général
export function batisseur1_nv_max_hdv(hdvNiveau) {
    let niveauMax = 0;
    const niveaux = Object.keys(batisseur1)
        .map(key => parseInt(key.replace("batisseur1_nv_", ""), 10))
        .filter(n => !isNaN(n)); 

    const niveauMaxPossible = Math.max(...niveaux);
    for (let i = 1; i <= niveauMaxPossible; i++) {
        if (batisseur1[`batisseur1_nv_${i}`].hdvrequis <= hdvNiveau) {
            niveauMax = i;
        }
}
    return niveauMax;
}

//calcul de temps

//temps passer a construire le batisseur
export function calculerTempsTotalbatisseur1(niveauMax) {
    let tempsTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        tempsTotal += batisseur1[`batisseur1_nv_${i}`].tconstru;
    }
    return tempsTotal;
}

//calcul le temps de construction restant pour le batisseur
export function calculerTempsRestantbatisseur1(niveauActuel, niveauMax) {
    let tempsRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        const key = `batisseur1_nv_${parseInt(i, 10)}`; // Supprime les zéros inutiles
        if (batisseur1.hasOwnProperty(key)) {
            tempsRestant += batisseur1[key].tconstru;
        } else {
            console.warn(`La clé ${key} est introuvable dans l'objet batisseur1.`);
        }
    }
    return tempsRestant;
}

//calcul le temps de construction par rapport a l'hdv hdv pour le batisseur
export function calculerTempsdepuisHDVbatisseur1(hdvNiveau) {
    let tempsTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur1)
        .map(key => parseInt(key.replace("batisseur1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            tempsTotal += batisseur.tconstru;
        }
    }
    return tempsTotal;
}

//calcul le temps de construction pour l'hdv séléctionner pour le batisseur
export function calculerTempsConstructionParHDVbatisseur1(hdvNiveau) {
    let tempsTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            tempsTotal += batisseur.tconstru;
        }
    }
    return tempsTotal;
}

//calcul de prix

//prix déjà payer pour le batisseur
export function calculerPrixTotalbatisseur1(niveauMax) {
    let prixTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        prixTotal += batisseur1[`batisseur1_nv_${i}`].prix;
    }
    return prixTotal;
}

//calcul le prix restant pour le batisseur
export function calculerPrixRestantbatisseur1(niveauActuel, niveauMax) {
    let prixRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        prixRestant += batisseur1[`batisseur1_nv_${i}`].prix;
    }
    return prixRestant;
}

//calcul le prix de construction par rapport a l'hdv pour le batisseur
export function calculerPrixdepuisHDVbatisseur1(hdvNiveau) {
    let prixTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur1)
        .map(key => parseInt(key.replace("batisseur1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            prixTotal += batisseur.prix;
        }
    }
    return prixTotal;
}

//calcul le prix de construction pour l'hdv séléctionner pour le batisseur
export function calculerPrixConstructionParHDVbatisseur1(hdvNiveau) {
    let prixTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            prixTotal += batisseur.prix;
        }
    }
    return prixTotal;
}


//calcul d'expérience

//éxpérience déjà gagner pour le batisseur
export function calculerExperienceTotalbatisseur1(niveauMax) {
    let experienceTotal = 0;
    for (let i = 1; i <= niveauMax; i++) {
        experienceTotal += batisseur1[`batisseur1_nv_${i}`].experience;
    }
    return experienceTotal;
}

//calcul l'éxpérience restant pour le batisseur
export function calculerExperienceRestantbatisseur1(niveauActuel, niveauMax) {
    let experienceRestant = 0;
    for (let i = niveauActuel + 1; i <= niveauMax; i++) {
        experienceRestant += batisseur1[`batisseur1_nv_${i}`].experience;
    }
    return experienceRestant;
}

//calcul l'éxpérience de construction par rapport a l'hdv pour le batisseur
export function calculerExperiencedepuisHDVbatisseur1(hdvNiveau) {
    let experienceTotal = 0;
    const niveauMax = Math.max(...Object.keys(batisseur1)
        .map(key => parseInt(key.replace("batisseur1_nv_", ""), 10))
        .filter(n => !isNaN(n))
    );
    for (let i = 0; i <= niveauMax; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        if (batisseur.hdvrequis <= hdvNiveau) {
            experienceTotal += batisseur.experience;
        }
    }
    return experienceTotal;
}

//calcul l'éxpérience de construction pour l'hdv séléctionner pour le batisseur
export function calculerExperienceConstructionParHDVbatisseur1(hdvNiveau) {
    let experienceTotal = 0;

    for (let i = 1; i <= 21; i++) {
        const batisseur = batisseur1[`batisseur1_nv_${i}`];
        
        if (batisseur.hdvrequis === hdvNiveau) {
            experienceTotal += batisseur.experience;
        }
    }
    return experienceTotal;
}