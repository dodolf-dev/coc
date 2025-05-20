import { tesla5 } from "/coc/code/village principal/batiments/database/data defense/data tesla.js";
import { tesla5_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla5.calc.js";
import { calculerPrixRestanttesla5 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla5.calc.js";
import { calculerTempsRestanttesla5 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla5.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tesla5_box = document.getElementById("tesla5_box");
const selecttesla5 = document.getElementById("tesla5");
const imagetesla5 = document.getElementById("image-tesla5");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateteslaOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentteslaLevel = parseInt(selecttesla5.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tesla disponibles en fonction de l'HDV
    const teslaLevels = Object.entries(tesla5)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttesla5.innerHTML = "";
    let selectedLevel = null;

    teslaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tesla 5 Niveau ${level}`;
        selecttesla5.appendChild(option);

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
        tesla5_box.style.display = "none";
        selecttesla5.style.display = "none";
        imagetesla5.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tesla5_box.style.display = "block";
        selecttesla5.style.display = "block";
        imagetesla5.style.display = "block";
        infoContainer.style.display = "block";
        selecttesla5.value = selectedLevel;
        updatetesla5Info();
    }
}

function updatetesla5Info() {
    const niveau = `tesla5_nv_${selecttesla5.value}`;
    const data = tesla5[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttesla5(parseInt(selecttesla5.value, 10),tesla5_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttesla5(parseInt(selecttesla5.value, 10), tesla5_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetesla5.src = data.image;
        imagetesla5.alt = `tesla Niveau ${selecttesla5.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tesla5_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tesla5_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tesla5_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tesla5_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateteslaOptions);
selecttesla5.addEventListener("change", updatetesla5Info);

updateteslaOptions();