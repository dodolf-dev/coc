import { tour_enfer2 } from "/coc/code/village principal/batiments/database/data defense/data tour enfer.js";
import { tour_enfer2_nv_max_hdv } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerPrixRestanttour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { calculerTempsRestanttour_enfer2 } from "/coc/code/village principal/batiments/calculator/defense calc/tour enfers/tour enfer2.calc.js";
import { convertirSecondescompact } from "/coc/code/outils/convertisseurtemps.js";
import { formatPrix } from "/coc/code/outils/affichge nombre.js";


const tour_enfer2_box = document.getElementById("tour_enfer2_box");
const selecttour_enfer2 = document.getElementById("tour_enfer2");
const imagetour_enfer2 = document.getElementById("image-tour_enfer2");
const selectHdv = document.getElementById("hdv");
const infoContainer = document.createElement("div");
document.body.appendChild(infoContainer);

function updateCanonOptions() {
    const hdvLevel = parseInt(selectHdv.value);
    const currentCanonLevel = parseInt(selecttour_enfer2.value) || 0; // Récupérer l'ancien niveau

    // Filtrer les niveaux de Tour arhcere disponibles en fonction de l'HDV
    const canonLevels = Object.entries(tour_enfer2)
        .filter(([key, data]) => data.hdvrequis <= hdvLevel)
        .sort((a, b) => a[1].hdvrequis - b[1].hdvrequis);

    // Réinitialiser les options du select
    selecttour_enfer2.innerHTML = "";
    let selectedLevel = null;

    canonLevels.forEach(([key, data]) => {
        const level = parseInt(key.split("_").pop());
        const option = document.createElement("option");
        option.value = level;
        option.textContent = `Tour arhcere 1 Niveau ${level}`;
        selecttour_enfer2.appendChild(option);

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
        tour_enfer2_box.style.display = "none";
        selecttour_enfer2.style.display = "none";
        imagetour_enfer2.style.display = "none";
        infoContainer.style.display = "none";
    } else {
        tour_enfer2_box.style.display = "block";
        selecttour_enfer2.style.display = "block";
        imagetour_enfer2.style.display = "block";
        infoContainer.style.display = "block";
        selecttour_enfer2.value = selectedLevel;
        updatetour_enfer2Info();
    }
}

function updatetour_enfer2Info() {
    const niveau = `tour_enfer2_nv_${selecttour_enfer2.value}`;
    const data = tour_enfer2[niveau];
    const hdvNiveau = parseInt(document.getElementById("hdv").value, 10);
    const prixrestant = calculerPrixRestanttour_enfer2(parseInt(selecttour_enfer2.value, 10),tour_enfer2_nv_max_hdv(hdvNiveau));
    const tempsRestant = calculerTempsRestanttour_enfer2(parseInt(selecttour_enfer2.value, 10), tour_enfer2_nv_max_hdv(hdvNiveau));

    if (data) {
        imagetour_enfer2.src = data.image;
        imagetour_enfer2.alt = `Tour arhcere Niveau ${selecttour_enfer2.value}`;
    }
    document.getElementById("tour_enfer2_prix_niveau").innerHTML = `Prix restant : ${formatPrix(prixrestant)} <img src="/coc/image/village principal/ressource/or village-p.jpg" alt="or" class="icone-ressource">`;
    document.getElementById("tour_enfer2_temps_niveau").innerHTML = `Temps restant: ${convertirSecondescompact(tempsRestant)} <img src="/coc/image/général/ressource/temps icone.png" alt="temps" class="icone-ressource">`;
}
selectHdv.addEventListener("change", updateCanonOptions);
selecttour_enfer2.addEventListener("change", updatetour_enfer2Info);

updateCanonOptions();