import { golem } from "/coc/code/village principal/laboratoire/database/data troupe elixir noir.js";
import { golem_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem.calc.js";
import { calculerPrixRestantgolem } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem.calc.js";
import { calculerTempsRestantgolem } from "/coc/code/village principal/laboratoire/calculator/troupe elixir noir/golem.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const golem_box = document.getElementById("golem_box");
const selectgolem = document.getElementById("golem");
const imagegolem = document.getElementById("image-golem");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updategolemOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentgolemLevel = parseInt(selectgolem.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de golem disponibles en fonction de l'laboratoire
    const golemLevels = Object.entries(golem)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectgolem.innerHTML = "";
    let selectedLevel = null;

    golemLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `golem Niveau ${level}`;
        selectgolem.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentgolemLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = golemLevels.length ? parseInt(golemLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le golem 1
    if (golemLevels.length === 0) {
        golem_box.style.display = "none";
        selectgolem.style.display = "none";
        imagegolem.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        golem_box.style.display = "block";
        selectgolem.style.display = "block";
        imagegolem.style.display = "block";
        infoContainer.style.display = "block";
        selectgolem.value = selectedLevel;
        updategolemInfo();
    }
}

function updategolemInfo() {
    const niveau = `golem_nv_${selectgolem.value}`;
    const data = golem[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantgolem(parseInt(selectgolem.value, 10),golem_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantgolem(parseInt(selectgolem.value, 10), golem_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imagegolem.src = data.image;
        imagegolem.alt = `golem Niveau ${selectgolem.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("golem_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("golem_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("golem_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("golem_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updategolemOptions);
selectgolem.addEventListener("change", updategolemInfo);

updategolemOptions();