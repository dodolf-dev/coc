import { geant } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { geant_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/geant.calc.js";
import { calculerPrixRestantgeant } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/geant.calc.js";
import { calculerTempsRestantgeant } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/geant.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const geant_box = document.getElementById("geant_box");
const selectgeant = document.getElementById("geant");
const imagegeant = document.getElementById("image-geant");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updategeantOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentgeantLevel = parseInt(selectgeant.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de geant disponibles en fonction de l'laboratoire
    const geantLevels = Object.entries(geant)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectgeant.innerHTML = "";
    let selectedLevel = null;

    geantLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `geant Niveau ${level}`;
        selectgeant.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentgeantLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = geantLevels.length ? parseInt(geantLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le geant 1
    if (geantLevels.length === 0) {
        geant_box.style.display = "none";
        selectgeant.style.display = "none";
        imagegeant.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        geant_box.style.display = "block";
        selectgeant.style.display = "block";
        imagegeant.style.display = "block";
        infoContainer.style.display = "block";
        selectgeant.value = selectedLevel;
        updategeantInfo();
    }
}

function updategeantInfo() {
    const niveau = `geant_nv_${selectgeant.value}`;
    const data = geant[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantgeant(parseInt(selectgeant.value, 10),geant_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantgeant(parseInt(selectgeant.value, 10), geant_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagegeant.src = data.image;
        imagegeant.alt = `geant Niveau ${selectgeant.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("geant_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("geant_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("geant_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("geant_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updategeantOptions);
selectgeant.addEventListener("change", updategeantInfo);

updategeantOptions();