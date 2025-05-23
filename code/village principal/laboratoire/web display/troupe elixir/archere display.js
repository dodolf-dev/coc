import { archere } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { archere_nv_max_laboratoirpe } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/archere.calc.js";
import { calculerPrixRestantarchere } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/archere.calc.js";
import { calculerTempsRestantarchere } from "/coc/code/village principal/laboratoire/calculator/troupe elixir calc/archere.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const archere_box = document.getElementById("archere_box");
const selectarchere = document.getElementById("archere");
const imagearchere = document.getElementById("image-archere");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatearchereOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentarchereLevel = parseInt(selectarchere.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de archere disponibles en fonction de l'laboratoire
    const archereLevels = Object.entries(archere)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectarchere.innerHTML = "";
    let selectedLevel = null;

    archereLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `archere 1 Niveau ${level}`;
        selectarchere.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentarchereLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = archereLevels.length ? parseInt(archereLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le archere 1
    if (archereLevels.length === 0) {
        archere_box.style.display = "none";
        selectarchere.style.display = "none";
        imagearchere.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        archere_box.style.display = "block";
        selectarchere.style.display = "block";
        imagearchere.style.display = "block";
        infoContainer.style.display = "block";
        selectarchere.value = selectedLevel;
        updatearchereInfo();
    }
}

function updatearchereInfo() {
    const niveau = `archere_nv_${selectarchere.value}`;
    const data = archere[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantarchere(parseInt(selectarchere.value, 10),archere_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantarchere(parseInt(selectarchere.value, 10), archere_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagearchere.src = data.image;
        imagearchere.alt = `archere Niveau ${selectarchere.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("archere_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("archere_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("archere_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("archere_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updatearchereOptions);
selectarchere.addEventListener("change", updatearchereInfo);

updatearchereOptions();