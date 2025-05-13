import { tour_sorcier1 } from "/coc/code/village principal/batiments/database/data defense/data tour sorcier.js";
import { tour_sorcier1_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier1.calc.js";
import { calculerPrixRestanttour_sorcier1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier1.calc.js";
import { calculerTempsRestanttour_sorcier1 } from "/coc/code/village principal/batiments/calculator/defense calc/tour sorciers/tour sorcier1.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_sorcier1_box = document.getElementById("tour_sorcier1_box");
const selecttour_sorcier1 = document.getElementById("tour_sorcier1");
const imagetour_sorcier1 = document.getElementById("image-tour_sorcier1");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_sorcier1.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_sorcier1)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_sorcier1.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour de sorcier 1 Niveau ${level}`;
        selecttour_sorcier1.appendChild(option);

        // Si l'ancien niveau est toujours disponible, on le sélectionne
        if (level === currentCanonLevel) {
            selectedLevel = level;
        }
    });

    // Si l'ancien niveau n'existe plus, prendre le niveau le plus bas possible
    if (!selectedLevel) {
        selectedLevel = canonLevels.length ? parseInt(canonLevels[0][0].split("_").pop()) : 0;
    }

    // Si aucun niveau n'est disponible, masquer le Tour arhcere 1
    if (canonLevels.length === 0) {
        tour_sorcier1_box.style.display = "none";
        selecttour_sorcier1.style.display = "none";
        imagetour_sorcier1.style.display = "none";
        infoContainer.style.display = "none";
        def_anti_air_block.style.display = "none";
    } else {
        tour_sorcier1_box.style.display = "block";
        selecttour_sorcier1.style.display = "block";
        imagetour_sorcier1.style.display = "block";
        infoContainer.style.display = "block";
        def_anti_air_block.style.display = "block";
        selecttour_sorcier1.value = selectedLevel;
        updatetour_sorcier1Info();
    }
}

function updatetour_sorcier1Info() {
    const niveau = `tour_sorcier1_nv_${selecttour_sorcier1.value}`;
    const data = tour_sorcier1[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_sorcier1(parseInt(selecttour_sorcier1.value, 10),tour_sorcier1_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_sorcier1(parseInt(selecttour_sorcier1.value, 10), tour_sorcier1_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_sorcier1.src = data.image;
        imagetour_sorcier1.alt = `Tour arhcere Niveau ${selecttour_sorcier1.value}`;
    }
    document.getElementById("tour_sorcier1_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_sorcier1_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_sorcier1.addEventListener("change", updatetour_sorcier1Info);

updateCanonOptions();