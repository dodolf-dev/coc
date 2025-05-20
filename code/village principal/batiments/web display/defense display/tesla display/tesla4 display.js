import { tesla4 } from "/coc/code/village principal/batiments/database/data defense/data tesla.js";
import { tesla4_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla4.calc.js";
import { calculerPrixRestanttesla4 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla4.calc.js";
import { calculerTempsRestanttesla4 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla4.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tesla4_box = document.getElementById("tesla4_box");
const selecttesla4 = document.getElementById("tesla4");
const imagetesla4 = document.getElementById("image-tesla4");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateteslaOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentteslaLevel = parseInt(selecttesla4.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tesla disponibles en fonction de l'HDV
    const teslaLevels = Object.entries(tesla4)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttesla4.innerHTML = "";
    let selectedLevel = null;

    teslaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tesla 4 Niveau ${level}`;
        selecttesla4.appendChild(option);

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
        tesla4_box.style.display = "none";
        selecttesla4.style.display = "none";
        imagetesla4.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tesla4_box.style.display = "block";
        selecttesla4.style.display = "block";
        imagetesla4.style.display = "block";
        infoContainer.style.display = "block";
        selecttesla4.value = selectedLevel;
        updatetesla4Info();
    }
}

function updatetesla4Info() {
    const niveau = `tesla4_nv_${selecttesla4.value}`;
    const data = tesla4[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttesla4(parseInt(selecttesla4.value, 10),tesla4_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttesla4(parseInt(selecttesla4.value, 10), tesla4_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetesla4.src = data.image;
        imagetesla4.alt = `tesla Niveau ${selecttesla4.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tesla4_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tesla4_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tesla4_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tesla4_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateteslaOptions);
selecttesla4.addEventListener("change", updatetesla4Info);

updateteslaOptions();