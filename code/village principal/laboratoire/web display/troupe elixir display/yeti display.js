import { yeti } from "/coc/code/village principal/laboratoire/database/data troupe elixir.js";
import { yeti_nv_max_laboratoire } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/yeti.calc.js";
import { calculerPrixRestantyeti } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/yeti.calc.js";
import { calculerTempsRestantyeti } from "/coc/code/village principal/laboratoire/calculator/troupe elixir/yeti.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const yeti_box = document.getElementById("yeti_box");
const selectyeti = document.getElementById("yeti");
const imageyeti = document.getElementById("image-yeti");
const selectlaboratoire = document.getElementById("laboratoire");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateyetiOptions() {
    const laboratoireLevel = parseInt(selectlaboratoire.value);
    const currentyetiLevel = parseInt(selectyeti.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de yeti disponibles en fonction de l'laboratoire
    const yetiLevels = Object.entries(yeti)
        .filter(([key, data]) => data.laboratoirerequis <= laboratoireLevel)
        .sort((a, b) => a[1].laboratoirerequis - b[1].laboratoirerequis);

    // Réinitialiser les options du select
    selectyeti.innerHTML = "";
    let selectedLevel = null;

    yetiLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `yeti Niveau ${level}`;
        selectyeti.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentyetiLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = yetiLevels.length ? parseInt(yetiLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le yeti 1
    if (yetiLevels.length === 0) {
        yeti_box.style.display = "none";
        selectyeti.style.display = "none";
        imageyeti.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        yeti_box.style.display = "block";
        selectyeti.style.display = "block";
        imageyeti.style.display = "block";
        infoContainer.style.display = "block";
        selectyeti.value = selectedLevel;
        updateyetiInfo();
    }
}

function updateyetiInfo() {
    const niveau = `yeti_nv_${selectyeti.value}`;
    const data = yeti[niveau];
    const laboratoireNiveau = parseInt(document.getElementById("laboratoire").value, 10);
    const prixrestant = calculerPrixRestantyeti(parseInt(selectyeti.value, 10),yeti_nv_max_laboratoire(laboratoireNiveau));
    const tempsRestant = calculerTempsRestantyeti(parseInt(selectyeti.value, 10), yeti_nv_max_laboratoire(laboratoireNiveau));

    if (data) {
        imageyeti.src = data.image;
        imageyeti.alt = `yeti Niveau ${selectyeti.value}`;
    }

    if (prixrestant === 0) {
        document.getElementById("yeti_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    else {
        document.getElementById("yeti_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }

    if (tempsRestant === 0) {
        document.getElementById("yeti_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else{
        document.getElementById("yeti_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
}
selectlaboratoire.addEventListener("change", updateyetiOptions);
selectyeti.addEventListener("change", updateyetiInfo);

updateyetiOptions();