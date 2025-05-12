import { hoteldeville } from "/coc/code/village principal/batiments/database/data hotel de ville/data hdv.js";

document.addEventListener("DOMContentLoaded", () => {
    const selectHdv = document.getElementById("hdv");
    const imageHdv = document.getElementById("image-hdv");
    const infoContainer = document.createElement("div");
    document.body.appendChild(infoContainer);
    
    function updateHdvInfo() {
        const niveau = `hoteldeville_nv_${selectHdv.value}`; 
        const data = hoteldeville[niveau];
        
        if (data) {
            imageHdv.src = data.image;
            imageHdv.alt = `Hôtel de Ville Niveau ${selectHdv.value}`;
        }
    }
    
    selectHdv.addEventListener("change", updateHdvInfo);
    
    updateHdvInfo(); // Mettre à jour au chargement de la page

    const selectCanon = document.getElementById('hdv');
    const maxOption = Array.from(selectCanon.options)
    .map(opt => parseInt(opt.value))
    .filter(v => !isNaN(v))
    .reduce((a, b) => Math.max(a, b), 0);

    selectCanon.addEventListener('change', () => {
    if (parseInt(selectCanon.value) === maxOption) {
        selectCanon.classList.add('select-max-level');
    } else {
        selectCanon.classList.remove('select-max-level');
    }
});
});