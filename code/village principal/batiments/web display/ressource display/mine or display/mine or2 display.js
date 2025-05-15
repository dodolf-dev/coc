import { mine_or2 } from "/coc/code/village principal/batiments/database/data ressource/data mine or.js";
import { mine_or2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/ressource calc/mine ors/mine or2.calc.js";
import { calculerPrixRestantmine_or2 } from "/coc/code/village principal/batiments/calculator/ressource calc/mine ors/mine or2.calc.js";
import { calculerTempsRestantmine_or2 } from "/coc/code/village principal/batiments/calculator/ressource calc/mine ors/mine or2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const mine_or2_box = document.getElementById("mine_or2_box");
const selectmine_or2 = document.getElementById("mine_or2");
const imagemine_or2 = document.getElementById("image-mine_or2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updatemine_orOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentmine_orLevel = parseInt(selectmine_or2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de mine_or disponibles en fonction de l'HDV
    const mine_orLevels = Object.entries(mine_or2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selectmine_or2.innerHTML = "";
    let selectedLevel = null;

    mine_orLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `mine_or 1 Niveau ${level}`;
        selectmine_or2.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentmine_orLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = mine_orLevels.length ? parseInt(mine_orLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le mine_or 1
    if (mine_orLevels.length === 0) {
        mine_or2_box.style.display = "none";
        selectmine_or2.style.display = "none";
        imagemine_or2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        mine_or2_box.style.display = "block";
        selectmine_or2.style.display = "block";
        imagemine_or2.style.display = "block";
        infoContainer.style.display = "block";
        selectmine_or2.value = selectedLevel;
        updatemine_or2Info();
    }
}

function updatemine_or2Info() {
    const niveau = `mine_or2_nv_${selectmine_or2.value}`;
    const data = mine_or2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestantmine_or2(parseInt(selectmine_or2.value, 10),mine_or2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestantmine_or2(parseInt(selectmine_or2.value, 10), mine_or2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagemine_or2.src = data.image;
        imagemine_or2.alt = `mine_or Niveau ${selectmine_or2.value}`;
    }
    document.getElementById("mine_or2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/elixir village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("mine_or2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updatemine_orOptions);
selectmine_or2.addEventListener("change", updatemine_or2Info);

updatemine_orOptions();