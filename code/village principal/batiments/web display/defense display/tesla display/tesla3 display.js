import { tesla3 } from "/coc/code/village principal/batiments/database/data defense/data tesla.js";
import { tesla3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla3.calc.js";
import { calculerPrixRestanttesla3 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla3.calc.js";
import { calculerTempsRestanttesla3 } from "/coc/code/village principal/batiments/calculator/defense calc/teslas/tesla3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tesla3_box = document.getElementById("tesla3_box");
const selecttesla3 = document.getElementById("tesla3");
const imagetesla3 = document.getElementById("image-tesla3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateteslaOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentteslaLevel = parseInt(selecttesla3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de tesla disponibles en fonction de l'HDV
    const teslaLevels = Object.entries(tesla3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttesla3.innerHTML = "";
    let selectedLevel = null;

    teslaLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tesla 3 Niveau ${level}`;
        selecttesla3.appendChild(option);

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
        tesla3_box.style.display = "none";
        selecttesla3.style.display = "none";
        imagetesla3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tesla3_box.style.display = "block";
        selecttesla3.style.display = "block";
        imagetesla3.style.display = "block";
        infoContainer.style.display = "block";
        selecttesla3.value = selectedLevel;
        updatetesla3Info();
    }
}

function updatetesla3Info() {
    const niveau = `tesla3_nv_${selecttesla3.value}`;
    const data = tesla3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttesla3(parseInt(selecttesla3.value, 10),tesla3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttesla3(parseInt(selecttesla3.value, 10), tesla3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetesla3.src = data.image;
        imagetesla3.alt = `tesla Niveau ${selecttesla3.value}`;
    }if (prixrestant === 0) {
        document.getElementById("tesla3_prix_niveau").innerHTML = `Prix restant : max <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;    
    }
    else {
        document.getElementById("tesla3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    }
    if (tempsRestant === 0) {
        document.getElementById("tesla3_temps_niveau").innerHTML = `Temps restant: max <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }
    else {
        document.getElementById("tesla3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
    }}
selectHdv.addEventListener("change", updateteslaOptions);
selecttesla3.addEventListener("change", updatetesla3Info);

updateteslaOptions();