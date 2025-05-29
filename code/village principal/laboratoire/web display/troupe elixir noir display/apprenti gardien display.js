import { apprenti_gardien } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { apprenti_gardien_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/apprenti_gardien.calc.js";
import { calculerPrixRestantapprenti_gardien } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/apprenti_gardien.calc.js";
import { calculerTempsRestantapprenti_gardien } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/apprenti_gardien.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const apprenti_gardien_box = document.getElementById("apprenti_gardien_box");
const selectapprenti_gardien = document.getElementById("apprenti_gardien");
const imageapprenti_gardien = document.getElementById("image-apprenti_gardien");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateapprenti_gardienOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentapprenti_gardienLevel = parseInt(selectapprenti_gardien.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de apprenti_gardien disponibles en fonction de l'laboratoire
    const apprenti_gardienLevels = Object.entries(apprenti_gardien)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectapprenti_gardien.innerHTML = "";
    let selectedLevel = null;

    apprenti_gardienLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `apprenti_gardien Niveau ${level}`;
        selectapprenti_gardien.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentapprenti_gardienLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = apprenti_gardienLevels.length ? parseInt(apprenti_gardienLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le apprenti_gardien 1
    if (apprenti_gardienLevels.length === 0) {
        apprenti_gardien_box.style.display = "none";
        selectapprenti_gardien.style.display = "none";
        imageapprenti_gardien.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        apprenti_gardien_box.style.display = "block";
        selectapprenti_gardien.style.display = "block";
        imageapprenti_gardien.style.display = "block";
        infoContainer.style.display = "block";
        selectapprenti_gardien.value = selectedLevel;
        updateapprenti_gardienInfo();
    }
}

function updateapprenti_gardienInfo() {
    const niveau = `apprenti_gardien_nv_${selectapprenti_gardien.value}`;
    const data = apprenti_gardien[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantapprenti_gardien(parseInt(selectapprenti_gardien.value, 10),apprenti_gardien_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantapprenti_gardien(parseInt(selectapprenti_gardien.value, 10), apprenti_gardien_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imageapprenti_gardien.src = data.image;
        imageapprenti_gardien.alt = `apprenti_gardien Niveau ${selectapprenti_gardien.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("apprenti_gardien_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("apprenti_gardien_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("apprenti_gardien_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("apprenti_gardien_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateapprenti_gardienOptions);
selectapprenti_gardien.addEventListener("change", updateapprenti_gardienInfo);

updateapprenti_gardienOptions();