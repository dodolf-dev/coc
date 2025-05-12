export function convertirSecondesfull(secondes) {
        let annees = Math.floor(secondes / 31536000);
        secondes %= 31536000;
        let mois = Math.floor(secondes / 2592000);
        secondes %= 2592000;
        let jours = Math.floor(secondes / 86400);
        secondes %= 86400;
        let heures = Math.floor(secondes / 3600);
        secondes %= 3600;
        let minutes = Math.floor(secondes / 60);
        secondes %= 60;
    
        let result = [];
        if (annees) result.push(`${annees} ${annees > 1 ? 'ans' : 'an'}`);
        if (mois) result.push(`${mois} mois`);
        if (jours) result.push(`${jours} ${jours > 1 ? 'jours' : 'jour'}`);
        if (heures) result.push(`${heures} ${heures > 1 ? 'heures' : 'heure'}`);
        if (minutes) result.push(`${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`);
        if (secondes) result.push(`${secondes} ${secondes > 1 ? 'secondes' : 'seconde'}`);
    
        if (result.length === 0) {
            return '0 seconde';
        }
    
        return result.join(' ');
}

export function convertirSecondescompact(secondes) {
        let annees = Math.floor(secondes / 31536000);
        secondes %= 31536000;
        let mois = Math.floor(secondes / 2592000);
        secondes %= 2592000;
        let jours = Math.floor(secondes / 86400);
        secondes %= 86400;
        let heures = Math.floor(secondes / 3600);
        secondes %= 3600;
        let minutes = Math.floor(secondes / 60);
        secondes %= 60;
    
        let result = [];
        if (annees) result.push(`${annees}a`);
        if (mois) result.push(`${mois}m`);
        if (jours) result.push(`${jours}j`);
        if (heures) result.push(`${heures}h`);
        if (minutes) result.push(`${minutes}min`);
        if (secondes) result.push(`${secondes}s`);
    
        if (result.length === 0) {
            return '0s';
        }
    
        return result.join(' ');
}