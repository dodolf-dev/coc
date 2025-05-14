import { tour_enfer3 } from "/coc/code/village principal/batiments/database/data defense/data tour enfer.js";
import { tour_enfer3_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";
import { calculerPrixRestanttour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";
import { calculerTempsRestanttour_enfer3 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer3.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_enfer3_box = document.getElementById("tour_enfer3_box");
const selecttour_enfer3 = document.getElementById("tour_enfer3");
const imagetour_enfer3 = document.getElementById("image-tour_enfer3");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_enfer3.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_enfer3)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_enfer3.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour de l'enfer 3 Niveau ${level}`;
        selecttour_enfer3.appendChild(option);

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
        tour_enfer3_box.style.display = "none";
        selecttour_enfer3.style.display = "none";
        imagetour_enfer3.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_enfer3_box.style.display = "block";
        selecttour_enfer3.style.display = "block";
        imagetour_enfer3.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_enfer3.value = selectedLevel;
        updatetour_enfer3Info();
    }
}

function updatetour_enfer3Info() {
    const niveau = `tour_enfer3_nv_${selecttour_enfer3.value}`;
    const data = tour_enfer3[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_enfer3(parseInt(selecttour_enfer3.value, 10),tour_enfer3_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_enfer3(parseInt(selecttour_enfer3.value, 10), tour_enfer3_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_enfer3.src = data.image;
        imagetour_enfer3.alt = `Tour arhcere Niveau ${selecttour_enfer3.value}`;
    }
    document.getElementById("tour_enfer3_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_enfer3_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_enfer3.addEventListener("change", updatetour_enfer3Info);

updateCanonOptions();