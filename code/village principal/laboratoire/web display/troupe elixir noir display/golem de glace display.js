import { golem_de_glace } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { golem_de_glace_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem_de_glace.calc.js";
import { calculerPrixRestantgolem_de_glace } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem_de_glace.calc.js";
import { calculerTempsRestantgolem_de_glace } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem_de_glace.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const golem_de_glace_box = document.getElementById("golem_de_glace_box");
const selectgolem_de_glace = document.getElementById("golem_de_glace");
const imagegolem_de_glace = document.getElementById("image-golem_de_glace");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updategolem_de_glaceOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentgolem_de_glaceLevel = parseInt(selectgolem_de_glace.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de golem_de_glace disponibles en fonction de l'laboratoire
    const golem_de_glaceLevels = Object.entries(golem_de_glace)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectgolem_de_glace.innerHTML = "";
    let selectedLevel = null;

    golem_de_glaceLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `golem_de_glace Niveau ${level}`;
        selectgolem_de_glace.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentgolem_de_glaceLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = golem_de_glaceLevels.length ? parseInt(golem_de_glaceLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le golem_de_glace 1
    if (golem_de_glaceLevels.length === 0) {
        golem_de_glace_box.style.display = "none";
        selectgolem_de_glace.style.display = "none";
        imagegolem_de_glace.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        golem_de_glace_box.style.display = "block";
        selectgolem_de_glace.style.display = "block";
        imagegolem_de_glace.style.display = "block";
        infoContainer.style.display = "block";
        selectgolem_de_glace.value = selectedLevel;
        updategolem_de_glaceInfo();
    }
}

function updategolem_de_glaceInfo() {
    const niveau = `golem_de_glace_nv_${selectgolem_de_glace.value}`;
    const data = golem_de_glace[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantgolem_de_glace(parseInt(selectgolem_de_glace.value, 10),golem_de_glace_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantgolem_de_glace(parseInt(selectgolem_de_glace.value, 10), golem_de_glace_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagegolem_de_glace.src = data.image;
        imagegolem_de_glace.alt = `golem_de_glace Niveau ${selectgolem_de_glace.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("golem_de_glace_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("golem_de_glace_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("golem_de_glace_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("golem_de_glace_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updategolem_de_glaceOptions);
selectgolem_de_glace.addEventListener("change", updategolem_de_glaceInfo);

updategolem_de_glaceOptions();