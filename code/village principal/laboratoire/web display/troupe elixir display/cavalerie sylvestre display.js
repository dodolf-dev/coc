import { cavalerie_sylvestre } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { cavalerie_sylvestre_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cavalerie_sylvestre.calc.js";
import { calculerPrixRestantcavalerie_sylvestre } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cavalerie_sylvestre.calc.js";
import { calculerTempsRestantcavalerie_sylvestre } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/cavalerie_sylvestre.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const cavalerie_sylvestre_box = document.getElementById("cavalerie_sylvestre_box");
const selectcavalerie_sylvestre = document.getElementById("cavalerie_sylvestre");
const imagecavalerie_sylvestre = document.getElementById("image-cavalerie_sylvestre");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatecavalerie_sylvestreOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentcavalerie_sylvestreLevel = parseInt(selectcavalerie_sylvestre.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de cavalerie_sylvestre disponibles en fonction de l'laboratoire
    const cavalerie_sylvestreLevels = Object.entries(cavalerie_sylvestre)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectcavalerie_sylvestre.innerHTML = "";
    let selectedLevel = null;

    cavalerie_sylvestreLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `cavalerie_sylvestre 1 Niveau ${level}`;
        selectcavalerie_sylvestre.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentcavalerie_sylvestreLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = cavalerie_sylvestreLevels.length ? parseInt(cavalerie_sylvestreLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le cavalerie_sylvestre 1
    if (cavalerie_sylvestreLevels.length === 0) {
        cavalerie_sylvestre_box.style.display = "none";
        selectcavalerie_sylvestre.style.display = "none";
        imagecavalerie_sylvestre.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        cavalerie_sylvestre_box.style.display = "block";
        selectcavalerie_sylvestre.style.display = "block";
        imagecavalerie_sylvestre.style.display = "block";
        infoContainer.style.display = "block";
        selectcavalerie_sylvestre.value = selectedLevel;
        updatecavalerie_sylvestreInfo();
    }
}

function updatecavalerie_sylvestreInfo() {
    const niveau = `cavalerie_sylvestre_nv_${selectcavalerie_sylvestre.value}`;
    const data = cavalerie_sylvestre[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantcavalerie_sylvestre(parseInt(selectcavalerie_sylvestre.value, 10),cavalerie_sylvestre_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantcavalerie_sylvestre(parseInt(selectcavalerie_sylvestre.value, 10), cavalerie_sylvestre_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagecavalerie_sylvestre.src = data.image;
        imagecavalerie_sylvestre.alt = `cavalerie_sylvestre Niveau ${selectcavalerie_sylvestre.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("cavalerie_sylvestre_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("cavalerie_sylvestre_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("cavalerie_sylvestre_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("cavalerie_sylvestre_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatecavalerie_sylvestreOptions);
selectcavalerie_sylvestre.addEventListener("change", updatecavalerie_sylvestreInfo);

updatecavalerie_sylvestreOptions();