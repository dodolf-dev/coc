import { tesla1 } from "/coc/code/village principal/batiments/database/data defense/data tesla.js";
import { tesla1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla1.calc.js";
import { calculerPrixRestanttesla1 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla1.calc.js";
import { calculerTempsRestanttesla1 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tesla1_box = document.getElementById("tesla1_box");
const selecttesla1 = document.getElementById("tesla1");
const imagetesla1 = document.getElementById("image-tesla1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateteslaOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentteslaLevel = parseInt(selecttesla1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tesla disponibles en fonction de l'HDV
    const teslaLevels = Object.entries(tesla1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttesla1.innerHTML = "";
    let selectedLevel = null;

    teslaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tesla 1 Niveau ${level}`;
        selecttesla1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentteslaLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = teslaLevels.length ? parseInt(teslaLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le tesla 1
    if (teslaLevels.length === 0) {
        tesla1_box.style.display = "none";
        selecttesla1.style.display = "none";
        imagetesla1.style.display = "none";
        infoContainer.style.display = "none";
        tesla_block.style.display = "none";
    } else {
        tesla1_box.style.display = "block";
        selecttesla1.style.display = "block";
        imagetesla1.style.display = "block";
        infoContainer.style.display = "block";
        tesla_block.style.display = "block";
        selecttesla1.value = selectedLevel;
        updatetesla1Info();
    }
}

function updatetesla1Info() {
    const niveau = `tesla1_nv_${selecttesla1.value}`;
    const data = tesla1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttesla1(parseInt(selecttesla1.value, 10),tesla1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttesla1(parseInt(selecttesla1.value, 10), tesla1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetesla1.src = data.image;
        imagetesla1.alt = `tesla Niveau ${selecttesla1.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tesla1_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tesla1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tesla1_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tesla1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateteslaOptions);
selecttesla1.addEventListener("change", updatetesla1Info);

updateteslaOptions();