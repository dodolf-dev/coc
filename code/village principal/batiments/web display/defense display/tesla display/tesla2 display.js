import { tesla2 } from "/coc/code/village principal/batiments/database/data defense/data tesla.js";
import { tesla2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla2.calc.js";
import { calculerPrixRestanttesla2 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla2.calc.js";
import { calculerTempsRestanttesla2 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tesla2_box = document.getElementById("tesla2_box");
const selecttesla2 = document.getElementById("tesla2");
const imagetesla2 = document.getElementById("image-tesla2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateteslaOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentteslaLevel = parseInt(selecttesla2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tesla disponibles en fonction de l'HDV
    const teslaLevels = Object.entries(tesla2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttesla2.innerHTML = "";
    let selectedLevel = null;

    teslaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tesla 2 Niveau ${level}`;
        selecttesla2.appendChild(option);

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
        tesla2_box.style.display = "none";
        selecttesla2.style.display = "none";
        imagetesla2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tesla2_box.style.display = "block";
        selecttesla2.style.display = "block";
        imagetesla2.style.display = "block";
        infoContainer.style.display = "block";
        selecttesla2.value = selectedLevel;
        updatetesla2Info();
    }
}

function updatetesla2Info() {
    const niveau = `tesla2_nv_${selecttesla2.value}`;
    const data = tesla2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttesla2(parseInt(selecttesla2.value, 10),tesla2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttesla2(parseInt(selecttesla2.value, 10), tesla2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetesla2.src = data.image;
        imagetesla2.alt = `tesla Niveau ${selecttesla2.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tesla2_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tesla2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tesla2_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tesla2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateteslaOptions);
selecttesla2.addEventListener("change", updatetesla2Info);

updateteslaOptions();